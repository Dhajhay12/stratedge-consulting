const { buildPage } = require('./shell.js');

/* ================= SERVICES ================= */
buildPage({
  file: 'services.html',
  title: 'Services — StratEdge Consulting',
  description: 'Business strategy, market research, process optimization, and startup consulting from StratEdge Consulting.',
  content: `
    <section class="max-w-6xl mx-auto px-5 pt-16 pb-16 md:pt-24 md:pb-20">
      <span aria-hidden="true" class="hero-rise block w-14 h-[3px] bg-brass-500 mb-8"></span>
      <h1 class="hero-rise font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-navy-900">Four practices, one standard of work</h1>
      <p class="hero-rise-delay mt-6 max-w-xl text-lg text-navy-700">Each service is led end to end by a senior consultant. Engagements typically run six to twelve weeks, with a defined deliverable rather than an open-ended retainer.</p>
    </section>

    <div class="rule-brass max-w-6xl mx-auto"></div>

    <section>
      <div class="max-w-6xl mx-auto md:divide-y md:divide-brass-500/25">

        <article id="business-strategy" class="py-14 md:py-20 md:grid md:grid-cols-12 md:gap-12 scroll-mt-24">
          <div class="md:col-span-5">
            <figure class="frame-brass">
              <img src="images/team-collaboration.jpg" alt="Consultants reviewing a strategic plan together at a work table" width="1100" height="733"
                   class="w-full h-64 md:h-72 object-cover">
            </figure>
            <span class="mt-8 block text-sm text-brass-600 font-semibold">01</span>
            <h2 class="font-display text-3xl md:text-5xl font-semibold text-navy-900 mt-1">Business Strategy</h2>
          </div>
          <div class="mt-6 md:mt-0 md:col-span-7">
            <p class="text-navy-700 max-w-prose">Where should you compete, and how will you win there? We work with leadership to answer those two questions concretely, then translate the answer into a plan the operating teams can execute. That usually means choosing what not to do, which is harder to hold to than it sounds.</p>
            <h3 class="heading-tick mt-8 font-semibold text-navy-900">Key deliverables</h3>
            <ul class="mt-3 max-w-prose space-y-2 text-navy-700 list-disc list-inside marker:text-brass-500">
              <li>A one-page strategy statement the whole company can repeat</li>
              <li>Two to three prioritized growth bets with owners and dates</li>
              <li>A decision calendar for the quarter ahead</li>
              <li>A pricing and positioning review against your closest alternatives</li>
            </ul>
            <p class="mt-6 text-sm text-navy-700"><span class="font-semibold text-navy-900">Ideal for:</span> founders and CEOs of companies past product-market fit who keep winning deals but cannot say precisely why.</p>
            <a href="contact.html" class="link-underline mt-6 inline-flex items-center gap-2 text-navy-900 font-medium underline underline-offset-8">
              <i data-lucide="calendar" class="w-4 h-4" aria-hidden="true"></i> Book a Consultation
            </a>
          </div>
        </article>

        <article id="market-research" class="px-5 md:px-6 py-14 md:py-20 md:grid md:grid-cols-12 md:gap-12 scroll-mt-24 surface-tint">
          <div class="md:col-span-5">
            <figure class="frame-brass">
              <img src="images/services-research.jpg" alt="A consultant mapping customer research findings on a whiteboard" width="1100" height="733"
                   class="w-full h-64 md:h-72 object-cover">
            </figure>
            <span class="mt-8 block text-sm text-brass-600 font-semibold">02</span>
            <h2 class="font-display text-3xl md:text-5xl font-semibold text-navy-900 mt-1">Market Research</h2>
          </div>
          <div class="mt-6 md:mt-0 md:col-span-7">
            <p class="text-navy-700 max-w-prose">Decisions made on instinct alone get expensive as the company grows. We run primary research such as interviews, win-loss conversations, and pricing surveys, alongside the secondary data that exists, to replace guessing with knowing. The output is written for decision makers, not for a research archive.</p>
            <h3 class="heading-tick mt-8 font-semibold text-navy-900">Key deliverables</h3>
            <ul class="mt-3 max-w-prose space-y-2 text-navy-700 list-disc list-inside marker:text-brass-500">
              <li>A segmentation of who buys and, as importantly, who does not</li>
              <li>Interview findings from 15 to 25 customer and prospect conversations</li>
              <li>A willingness-to-pay read with recommended price points</li>
              <li>A competitor teardown grounded in what buyers actually compare</li>
            </ul>
            <p class="mt-6 text-sm text-navy-700"><span class="font-semibold text-navy-900">Ideal for:</span> leadership teams about to enter a new market, launch a product line, or reprice, who want evidence rather than a boardroom debate.</p>
            <a href="contact.html" class="link-underline mt-6 inline-flex items-center gap-2 text-navy-900 font-medium underline underline-offset-8">
              <i data-lucide="calendar" class="w-4 h-4" aria-hidden="true"></i> Book a Consultation
            </a>
          </div>
        </article>

        <article id="process-optimization" class="px-5 md:px-6 py-14 md:py-20 md:grid md:grid-cols-12 md:gap-12 scroll-mt-24 surface-tint">
          <div class="md:col-span-5">
            <figure class="frame-brass">
              <img src="images/services-process.jpg" alt="An operations specialist working through a process map on screen" width="1100" height="733"
                   class="w-full h-64 md:h-72 object-cover">
            </figure>
            <span class="mt-8 block text-sm text-brass-600 font-semibold">03</span>
            <h2 class="font-display text-3xl md:text-5xl font-semibold text-navy-900 mt-1">Process Optimization</h2>
          </div>
          <div class="mt-6 md:mt-0 md:col-span-7">
            <p class="text-navy-700 max-w-prose">Growth exposes every weak seam in an operation. We map the work as it actually happens, find the bottlenecks and redundant handoffs, and fix them with your team rather than at them. The result is measured in hours returned and errors avoided, and it shows up in the P&L within the quarter.</p>
            <h3 class="heading-tick mt-8 font-semibold text-navy-900">Key deliverables</h3>
            <ul class="mt-3 max-w-prose space-y-2 text-navy-700 list-disc list-inside marker:text-brass-500">
              <li>A current-state map of your three to five core workflows</li>
              <li>A prioritized fix list with effort, impact, and owner for each</li>
              <li>Redesigned workflows with every handoff made explicit</li>
              <li>A simple weekly metrics sheet the team maintains itself</li>
            </ul>
            <p class="mt-6 text-sm text-navy-700"><span class="font-semibold text-navy-900">Ideal for:</span> COOs and operations leads whose teams work nights and weekends to keep up with demand that keeps rising.</p>
            <a href="contact.html" class="link-underline mt-6 inline-flex items-center gap-2 text-navy-900 font-medium underline underline-offset-8">
              <i data-lucide="calendar" class="w-4 h-4" aria-hidden="true"></i> Book a Consultation
            </a>
          </div>
        </article>

        <article id="startup-consulting" class="py-14 md:py-20 md:grid md:grid-cols-12 md:gap-12 scroll-mt-24">
          <div class="md:col-span-5">
            <figure class="frame-brass">
              <img src="images/services-startup.jpg" alt="A small startup team working through plans on laptops in a shared workspace" width="1100" height="733"
                   class="w-full h-64 md:h-72 object-cover">
            </figure>
            <span class="mt-8 block text-sm text-brass-600 font-semibold">04</span>
            <h2 class="font-display text-3xl md:text-5xl font-semibold text-navy-900 mt-1">Startup Consulting</h2>
          </div>
          <div class="mt-6 md:mt-0 md:col-span-7">
            <p class="text-navy-700 max-w-prose">The gap between a promising product and a durable company is mostly a set of learnable decisions: who the first customers are, what to charge, when to hire, and how to spend the runway. We work alongside founders through those decisions, drawing on operators who have made them before, badly and then better.</p>
            <h3 class="heading-tick mt-8 font-semibold text-navy-900">Key deliverables</h3>
            <ul class="mt-3 max-w-prose space-y-2 text-navy-700 list-disc list-inside marker:text-brass-500">
              <li>A go-to-market plan for the next two quarters</li>
              <li>An operating budget with realistic runway math</li>
              <li>A first-hires sequence tied to the plan, not to titles</li>
              <li>An investor-readiness review of the story and the numbers</li>
            </ul>
            <p class="mt-6 text-sm text-navy-700"><span class="font-semibold text-navy-900">Ideal for:</span> first-time founders with early revenue, typically a team of 3 to 30 people, who want senior judgment without a full-time executive hire.</p>
            <a href="contact.html" class="link-underline mt-6 inline-flex items-center gap-2 text-navy-900 font-medium underline underline-offset-8">
              <i data-lucide="calendar" class="w-4 h-4" aria-hidden="true"></i> Book a Consultation
            </a>
          </div>
        </article>
      </div>
    </section>

    <!-- Lead-gen banner (inline, quiet) -->
    <section class="bg-navy-900 border-y border-brass-500/40 text-white">
      <div class="max-w-6xl mx-auto px-5 py-12 md:flex md:items-center md:justify-between md:gap-10">
        <div class="max-w-xl">
          <h2 class="font-display text-2xl md:text-3xl font-semibold">Not sure which service fits?</h2>
          <p class="mt-2 text-white/75">Get one practical essay on strategy or operations, twice a month, and hear about new case studies first.</p>
        </div>
        <div class="mt-6 md:mt-0 w-full md:max-w-md">
          <form data-newsletter class="flex flex-col sm:flex-row gap-3" novalidate>
            <label for="svc-newsletter" class="sr-only">Email address</label>
            <input id="svc-newsletter" type="email" required placeholder="you@company.com"
                   class="flex-1 border border-white/25 bg-navy-950 px-4 py-2.5 text-sm text-white placeholder:text-white/45 focus:border-brass-500">
            <button type="submit" class="bg-brass-500 text-navy-950 text-sm font-semibold px-6 py-2.5 hover:bg-brass-100 transition-colors">Subscribe</button>
          </form>
          <p data-newsletter-msg hidden class="mt-3 text-sm text-brass-100 font-medium"></p>
        </div>
      </div>
    </section>

    <section class="bg-navy-950 text-white">
      <div class="max-w-6xl mx-auto px-5 py-16 md:py-24 md:flex md:items-center md:justify-between md:gap-12">
        <div class="max-w-xl">
          <span aria-hidden="true" class="block w-14 h-[3px] bg-brass-500 mb-6"></span>
          <h2 class="font-display text-3xl md:text-4xl font-semibold">Ready to scope the work?</h2>
          <p class="mt-4 text-white/80">Tell us what you are facing. We will tell you what we would do first.</p>
        </div>
        <a href="contact.html" class="mt-8 md:mt-0 inline-flex shrink-0 items-center gap-2 bg-white text-navy-900 font-medium px-7 py-3.5 hover:bg-brass-100 transition-colors">
          <i data-lucide="calendar" class="w-4 h-4 text-brass-600" aria-hidden="true"></i> Book a Consultation
        </a>
      </div>
    </section>
`,
});

