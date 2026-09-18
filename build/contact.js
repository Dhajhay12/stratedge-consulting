const { buildPage } = require('./shell.js');

/* ================= CONTACT ================= */
buildPage({
  file: 'contact.html',
  title: 'Contact — StratEdge Consulting',
  description: 'Book a consultation with StratEdge Consulting, or send a message about your business.',
  content: `
    <section class="max-w-6xl mx-auto px-5 pt-16 pb-16 md:pt-24 md:pb-20">
      <span aria-hidden="true" class="hero-rise block w-14 h-[3px] bg-brass-500 mb-8"></span>
      <h1 class="hero-rise font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-navy-900">Start the conversation</h1>
      <p class="hero-rise-delay mt-6 max-w-xl text-lg text-navy-700">Send a note about what you are working through, or pick a time below. Every inquiry is read by a senior consultant, usually within one business day.</p>
    </section>

    <div class="rule-brass max-w-6xl mx-auto"></div>

    <section>
      <div class="max-w-6xl mx-auto py-16 md:py-24 md:grid md:grid-cols-12 md:gap-14">

        <!-- Consultation request form -->
        <div class="md:col-span-7">
          <h2 class="heading-tick-top font-display text-3xl font-semibold text-navy-900">Request a consultation</h2>
          <form id="contactForm" class="mt-8 space-y-6" novalidate>
            <div class="grid sm:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-sm font-medium text-navy-900">Full name</label>
                <input id="name" name="name" type="text" required autocomplete="name"
                       class="mt-2 w-full border border-navy-700/30 bg-white px-4 py-2.5 text-sm focus:border-brass-500">
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-navy-900">Email</label>
                <input id="email" name="email" type="email" required autocomplete="email"
                       class="mt-2 w-full border border-navy-700/30 bg-white px-4 py-2.5 text-sm focus:border-brass-500">
              </div>
            </div>
            <div class="grid sm:grid-cols-2 gap-6">
              <div>
                <label for="phone" class="block text-sm font-medium text-navy-900">Phone <span class="font-normal text-navy-700">(optional)</span></label>
                <input id="phone" name="phone" type="tel" autocomplete="tel"
                       class="mt-2 w-full border border-navy-700/30 bg-white px-4 py-2.5 text-sm focus:border-brass-500">
              </div>
              <div>
                <label for="company" class="block text-sm font-medium text-navy-900">Company</label>
                <input id="company" name="company" type="text" required autocomplete="organization"
                       class="mt-2 w-full border border-navy-700/30 bg-white px-4 py-2.5 text-sm focus:border-brass-500">
              </div>
            </div>
            <div>
              <label for="service" class="block text-sm font-medium text-navy-900">Service of interest</label>
              <select id="service" name="service" required
                      class="mt-2 w-full border border-navy-700/30 bg-white px-4 py-2.5 text-sm focus:border-brass-500">
                <option value="" selected disabled>Select a service</option>
                <option>Business Strategy</option>
                <option>Market Research</option>
                <option>Process Optimization</option>
                <option>Startup Consulting</option>
                <option>Not sure yet</option>
              </select>
            </div>
            <div>
              <label for="message" class="block text-sm font-medium text-navy-900">What are you working through?</label>
              <textarea id="message" name="message" rows="5" required
                        class="mt-2 w-full border border-navy-700/30 bg-white px-4 py-2.5 text-sm focus:border-brass-500"></textarea>
            </div>
            <button type="submit" class="inline-flex items-center gap-2 bg-navy-900 text-white font-medium px-7 py-3.5 hover:bg-navy-700 transition-colors">
              Send request <i data-lucide="arrow-right" class="w-4 h-4" aria-hidden="true"></i>
            </button>
          </form>

          <!-- Success state -->
          <div id="formSuccess" hidden tabindex="-1" class="success-panel mt-8 border border-navy-900/15 bg-white p-8">
            <div class="flex items-center gap-3">
              <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-navy-900 text-white">
                <i data-lucide="check" class="w-5 h-5" aria-hidden="true"></i>
              </span>
              <h3 class="font-display text-2xl font-semibold text-navy-900">Request received</h3>
            </div>
            <p class="mt-4 text-navy-700 max-w-prose">Thank you<span id="successName"></span>. A senior consultant will reply within one business day. If your need is urgent, mention it in a follow-up email and we will move it up the queue.</p>
          </div>
        </div>

        <!-- Contact info column -->
        <div class="mt-12 md:mt-0 md:col-span-5">
          <div class="border-t-2 border-navy-900 pt-6 max-w-sm">
            <h3 class="font-display text-xl font-semibold text-navy-900">Reach us directly</h3>
            <p class="mt-3 text-navy-700 text-sm">hello@stratedge-consulting.example</p>
            <p class="mt-1 text-navy-700 text-sm">(555) 014-2830, weekdays 9 to 5</p>
            <p class="mt-1 text-navy-700 text-sm">418 Wren Street, Suite 210, Portland, OR 97205</p>
          </div>
          <div class="mt-8 border-t border-brass-500/30 pt-6 max-w-sm">
            <h3 class="font-display text-xl font-semibold text-navy-900">What to expect</h3>
            <p class="mt-3 text-navy-700 text-sm max-w-prose">The first consultation is a 45-minute conversation about your situation, not a pitch. You will leave with a point of view on the problem even if we never work together.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="surface-tint border-y border-brass-500/25">
      <div class="max-w-6xl mx-auto px-5 py-16 md:py-24">
        <div class="max-w-2xl">
          <h2 class="heading-tick-top font-display text-3xl md:text-4xl font-semibold text-navy-900">Prefer to pick a time?</h2>
          <p class="mt-4 text-navy-700">Choose any open slot below. This is a preview of availability for the week ahead; the selected time is confirmed with you before anything is finalized.</p>
        </div>

        <div class="mt-10 -mx-5 px-5 overflow-x-auto pb-2">
          <div class="min-w-[820px] grid grid-cols-6 gap-3">
            <div></div>
            <div class="text-sm font-semibold text-navy-900 pb-2">Monday</div>
            <div class="text-sm font-semibold text-navy-900 pb-2">Tuesday</div>
            <div class="text-sm font-semibold text-navy-900 pb-2">Wednesday</div>
            <div class="text-sm font-semibold text-navy-900 pb-2">Thursday</div>
            <div class="text-sm font-semibold text-navy-900 pb-2">Friday</div>

            <div class="text-sm text-navy-700 py-3">9:00 AM</div>
            <button type="button" class="slot border border-navy-700/40 bg-white text-sm py-3 px-2 hover:border-brass-500" data-slot="Monday 9:00 AM">Open</button>
            <button type="button" class="slot border border-navy-700/40 bg-white text-sm py-3 px-2 hover:border-brass-500" data-slot="Tuesday 9:00 AM">Open</button>
            <button type="button" class="slot border border-navy-700/40 bg-white text-sm py-3 px-2 hover:border-brass-500" disabled>Booked</button>
            <button type="button" class="slot border border-navy-700/40 bg-white text-sm py-3 px-2 hover:border-brass-500" data-slot="Thursday 9:00 AM">Open</button>
            <button type="button" class="slot border border-navy-700/40 bg-white text-sm py-3 px-2 hover:border-brass-500" disabled>Booked</button>

            <div class="text-sm text-navy-700 py-3">10:30 AM</div>
            <button type="button" class="slot border border-navy-700/40 bg-white text-sm py-3 px-2 hover:border-brass-500" disabled>Booked</button>
            <button type="button" class="slot border border-navy-700/40 bg-white text-sm py-3 px-2 hover:border-brass-500" data-slot="Tuesday 10:30 AM">Open</button>
            <button type="button" class="slot border border-navy-700/40 bg-white text-sm py-3 px-2 hover:border-brass-500" data-slot="Wednesday 10:30 AM">Open</button>
            <button type="button" class="slot border border-navy-700/40 bg-white text-sm py-3 px-2 hover:border-brass-500" data-slot="Thursday 10:30 AM">Open</button>
            <button type="button" class="slot border border-navy-700/40 bg-white text-sm py-3 px-2 hover:border-brass-500" data-slot="Friday 10:30 AM">Open</button>

            <div class="text-sm text-navy-700 py-3">1:00 PM</div>
            <button type="button" class="slot border border-navy-700/40 bg-white text-sm py-3 px-2 hover:border-brass-500" data-slot="Monday 1:00 PM">Open</button>
            <button type="button" class="slot border border-navy-700/40 bg-white text-sm py-3 px-2 hover:border-brass-500" data-slot="Tuesday 1:00 PM">Open</button>
            <button type="button" class="slot border border-navy-700/40 bg-white text-sm py-3 px-2 hover:border-brass-500" data-slot="Wednesday 1:00 PM">Open</button>
            <button type="button" class="slot border border-navy-700/40 bg-white text-sm py-3 px-2 hover:border-brass-500" disabled>Booked</button>
            <button type="button" class="slot border border-navy-700/40 bg-white text-sm py-3 px-2 hover:border-brass-500" data-slot="Friday 1:00 PM">Open</button>

            <div class="text-sm text-navy-700 py-3">3:30 PM</div>
            <button type="button" class="slot border border-navy-700/40 bg-white text-sm py-3 px-2 hover:border-brass-500" data-slot="Monday 3:30 PM">Open</button>
            <button type="button" class="slot border border-navy-700/40 bg-white text-sm py-3 px-2 hover:border-brass-500" disabled>Booked</button>
            <button type="button" class="slot border border-navy-700/40 bg-white text-sm py-3 px-2 hover:border-brass-500" data-slot="Wednesday 3:30 PM">Open</button>
            <button type="button" class="slot border border-navy-700/40 bg-white text-sm py-3 px-2 hover:border-brass-500" data-slot="Thursday 3:30 PM">Open</button>
            <button type="button" class="slot border border-navy-700/40 bg-white text-sm py-3 px-2 hover:border-brass-500" data-slot="Friday 3:30 PM">Open</button>
          </div>
        </div>

        <div id="slotConfirm" hidden class="success-panel mt-8 max-w-xl border border-brass-500/50 bg-white p-6">
          <div class="flex items-center gap-3">
            <span class="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brass-500 text-navy-950">
              <i data-lucide="check" class="w-4 h-4" aria-hidden="true"></i>
            </span>
            <p class="text-navy-900"><span class="font-semibold">Time selected:</span> <span id="slotText"></span></p>
          </div>
          <p class="mt-3 text-sm text-navy-700">Send the consultation request above or call us, and mention this slot so we can lock it in.</p>
        </div>
      </div>
    </section>

    <section class="bg-navy-950 text-white">
      <div class="max-w-6xl mx-auto px-5 py-16 md:py-20 text-center">
        <h2 class="font-display text-3xl md:text-4xl font-semibold">We read every message ourselves.</h2>
        <p class="mt-4 text-white/80 max-w-xl mx-auto">No intake forms that vanish into a portal. No junior gatekeepers. Just a consultant who will reply.</p>
      </div>
    </section>
`,
});

