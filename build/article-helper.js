const { buildPage } = require('./shell.js');

function articleBody({ title, date, readTime, inner, related }) {
  return `
    <section class="max-w-3xl mx-auto px-5 pt-16 pb-10 md:pt-24">
      <span aria-hidden="true" class="block w-14 h-[3px] bg-brass-500 mb-6"></span>
      <p class="text-sm text-navy-700">By Miriam Reyes, Founder</p>
      <p class="text-sm text-navy-700 mt-1">${date}, ${readTime}</p>
      <h1 class="font-display text-4xl md:text-5xl font-semibold text-navy-900 mt-6 leading-tight">${title}</h1>
    </section>

    <div class="rule-brass"></div>

    <section>
      <article class="max-w-3xl mx-auto px-5 py-12 md:py-16">
        <div class="max-w-prose space-y-5 text-navy-700">
          ${inner}
        </div>
      </article>
    </section>

    <div class="rule-brass"></div>

    <section class="surface-tint">
      <div class="max-w-3xl mx-auto px-5 py-12 md:py-16">
        <h2 class="heading-tick-top font-display text-2xl md:text-3xl font-semibold text-navy-900">Related articles</h2>
        <div class="mt-8 grid sm:grid-cols-2 gap-8">
          ${related}
        </div>
      </div>
    </section>

    <section class="bg-navy-950 text-white">
      <div class="max-w-6xl mx-auto px-5 py-16 md:py-20 md:flex md:items-center md:justify-between md:gap-12">
        <div class="max-w-xl">
          <span aria-hidden="true" class="block w-14 h-[3px] bg-brass-500 mb-6"></span>
          <h2 class="font-display text-2xl md:text-3xl font-semibold">Working through a scaling problem right now?</h2>
          <p class="mt-3 text-white/80">That is most of what we do. The first conversation is free.</p>
        </div>
        <a href="contact.html" class="mt-8 md:mt-0 inline-flex shrink-0 items-center gap-2 bg-white text-navy-900 font-medium px-7 py-3.5 hover:bg-brass-100 transition-colors">
          <i data-lucide="calendar" class="w-4 h-4 text-brass-600" aria-hidden="true"></i> Book a Consultation
        </a>
      </div>
    </section>
  `;
}

module.exports = { articleBody };
