/* Shared minimal RFC6455 websocket client for the headless-Chrome audits.
   Avoids adding a runtime npm dependency to this static site. */
const crypto = require('crypto');
const net = require('net');

class MiniWS {
  constructor(url) {
    const u = new URL(url);
    this.sock = net.connect(Number(u.port), u.hostname);
    this.buf = Buffer.alloc(0);
    this.handlers = { open: [], message: [] };
    this.ready = false;
    const key = crypto.randomBytes(16).toString('base64');
    this.sock.on('connect', () => {
      this.sock.write('GET ' + u.pathname + ' HTTP/1.1\r\nHost: ' + u.host +
        '\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: ' + key +
        '\r\nSec-WebSocket-Version: 13\r\n\r\n');
    });
    this.sock.on('data', (chunk) => {
      this.buf = Buffer.concat([this.buf, chunk]);
      if (!this.ready) {
        const i = this.buf.indexOf('\r\n\r\n');
        if (i === -1) return;
        this.buf = this.buf.slice(i + 4);
        this.ready = true;
        this.handlers.open.forEach((h) => h());
      }
      this.drain();
    });
    this.sock.on('error', () => {});
  }
  drain() {
    for (;;) {
      if (this.buf.length < 2) return;
      const b1 = this.buf[1];
      let len = b1 & 127, off = 2;
      if (len === 126) { if (this.buf.length < 4) return; len = this.buf.readUInt16BE(2); off = 4; }
      else if (len === 127) { if (this.buf.length < 10) return; len = Number(this.buf.readBigUInt64BE(2)); off = 10; }
      if (this.buf.length < off + len) return;
      const p = this.buf.slice(off, off + len);
      this.buf = this.buf.slice(off + len);
      if ((b1 & 128) === 0) this.handlers.message.forEach((h) => h(p.toString('utf8')));
    }
  }
  on(e, f) { if (this.handlers[e]) this.handlers[e].push(f); return this; }
  send(s) {
    const d = Buffer.from(s, 'utf8'), len = d.length;
    let h;
    if (len < 126) h = Buffer.from([0x81, 0x80 | len]);
    else if (len < 65536) { h = Buffer.alloc(4); h[0] = 0x81; h[1] = 0x80 | 126; h.writeUInt16BE(len, 2); }
    else { h = Buffer.alloc(10); h[0] = 0x81; h[1] = 0x80 | 127; h.writeBigUInt64BE(BigInt(len), 2); }
    const m = crypto.randomBytes(4), o = Buffer.alloc(len);
    for (let i = 0; i < len; i++) o[i] = d[i] ^ m[i % 4];
    this.sock.write(Buffer.concat([h, m, o]));
  }
  close() { try { this.sock.destroy(); } catch (e) {} }
}

module.exports = { MiniWS };