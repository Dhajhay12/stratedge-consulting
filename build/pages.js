const { buildPage } = require('./shell.js');

/* ================= ABOUT ================= */
buildPage({
  file: 'about.html',
  title: 'About — StratEdge Consulting',
  description: 'The story, mission, and values behind StratEdge Consulting, a boutique firm for growth-stage businesses.',
  content: `
    <section class="max-w-6xl mx-auto px-5 pt-16 pb-16 md:pt-24 md:pb-20">
      <span aria-hidden="true" class="hero-rise block w-14 h-[3px] bg-brass-500 mb-8"></span>
      <h1 class="hero-rise font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-navy-900">The people behind the practice</h1>
      <p class="hero-rise-delay mt-6 max-w-xl text-lg text-navy-700">StratEdge is deliberately small. Every engagement is led by a senior consultant who has run the numbers, sat in the meetings, and owned the outcome.</p>
    </section>

    <div class="rule-brass max-w-6xl mx-auto"></div>

    <section>
      <div class="max-w-6xl mx-auto px-5 py-16 md:py-24 md:grid md:grid-cols-12 md:gap-12">
        <div class="md:col-span-5">
          <figure class="frame-brass">
            <img src="images/founder-miriam-reyes.jpg" alt="Miriam Reyes, founder of StratEdge Consulting, in a professional headshot" width="900" height="1125"
                 class="w-full object-cover" style="aspect-ratio: 4 / 5;">
          </figure>
          <p class="mt-4 text-sm text-navy-700">Miriam Reyes, founder and managing consultant.</p>
        </div>
        <div class="mt-10 md:mt-0 md:col-span-7 max-w-prose">
          <h2 class="heading-tick-top font-display text-3xl md:text-4xl font-semibold text-navy-900">Miriam Reyes, Founder</h2>
          <div class="mt-6 space-y-5 text-navy-700">
            <p>Miriam spent eleven years in operations roles before founding StratEdge, the last six as VP of Operations at a regional grocery wholesaler, where she was responsible for 300 employees across three distribution centers. There she learned that most “strategy problems” are actually operating problems wearing a nicer suit: the plan looked fine in the deck, but orders still slipped because nobody owned the handoff between scheduling and shipping.</p>
            <p>She left to start StratEdge in 2016 with a narrow thesis: growth-stage companies between roughly ten and five hundred employees rarely need a full-time executive for the problem in front of them, but they often need senior judgment for six to twelve weeks. Since then the firm has completed more than 120 engagements across retail, software, healthcare, and light manufacturing, typically working directly with the founder or COO rather than through layers.</p>
            <p>Miriam holds an MBA from a public university and teaches a workshop on operating cadence at a local business school each spring. She writes most of the firm’s essays on strategy and operations, several of which have been picked up by industry newsletters.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="surface-tint">
      <div class="max-w-4xl mx-auto px-5 py-20 md:py-28">
        <span aria-hidden="true" class="block w-14 h-[3px] bg-brass-500 mb-8"></span>
        <p class="font-display text-3xl md:text-5xl font-medium leading-tight text-navy-900">We exist to give growing companies the caliber of judgment usually reserved for the Fortune 500, without the baggage that comes with it.</p>
      </div>
    </section>

    <section>
      <div class="max-w-6xl mx-auto px-5 py-16 md:py-24 md:grid md:grid-cols-12 md:gap-12">
        <div class="md:col-span-7">
          <h2 class="heading-tick-top font-display text-3xl md:text-4xl font-semibold text-navy-900">What we hold to</h2>
          <div class="mt-10 divide-y divide-brass-500/25 border-y border-brass-500/25">
            <div class="py-7">
              <h3 class="font-display text-2xl text-navy-900">Judgment over frameworks</h3>
              <p class="mt-2 text-navy-700">A framework is a starting point, not an answer. We adapt the method to your business rather than forcing your business into the method.</p>
            </div>
            <div class="py-7">
              <h3 class="font-display text-2xl text-navy-900">Senior people on the work</h3>
              <p class="mt-2 text-navy-700">The consultant in the first meeting is the consultant doing the work. We do not sell senior and staff junior.</p>
            </div>
            <div class="py-7">
              <h3 class="font-display text-2xl text-navy-900">Evidence before opinion</h3>
              <p class="mt-2 text-navy-700">We form views from data and direct observation, and we change them when the evidence changes. Strong opinions are held loosely.</p>
            </div>
            <div class="py-7">
              <h3 class="font-display text-2xl text-navy-900">Plain language</h3>
              <p class="mt-2 text-navy-700">Recommendations you can read without a glossary. If we cannot explain it to your front-line team, it is not finished.</p>
            </div>
          </div>
        </div>
        <figure class="mt-12 md:mt-0 md:col-span-5">
          <span class="frame-brass block">
            <img src="images/about-office.jpg" alt="The StratEdge consulting team working together in their Portland office" width="1100" height="733"
                 class="w-full h-72 md:h-[28rem] object-cover">
          </span>
          <figcaption class="mt-4 text-sm text-navy-700">The working session rarely stays at the desk. Most of what we learn happens beside the people doing the work.</figcaption>
        </figure>
      </div>
    </section>

    <section class="bg-navy-950 text-white">
      <div class="max-w-6xl mx-auto px-5 py-16 md:py-24 md:flex md:items-center md:justify-between md:gap-12">
        <div class="max-w-xl">
          <span aria-hidden="true" class="block w-14 h-[3px] bg-brass-500 mb-6"></span>
          <h2 class="font-display text-3xl md:text-4xl font-semibold">Curious whether we are the right fit?</h2>
          <p class="mt-4 text-white/80">The first conversation is free and unhurried.</p>
        </div>
        <a href="contact.html" class="mt-8 md:mt-0 inline-flex shrink-0 items-center gap-2 bg-white text-navy-900 font-medium px-7 py-3.5 hover:bg-brass-100 transition-colors">
          <i data-lucide="calendar" class="w-4 h-4 text-brass-600" aria-hidden="true"></i> Book a Consultation
        </a>
      </div>
    </section>
`,
});
