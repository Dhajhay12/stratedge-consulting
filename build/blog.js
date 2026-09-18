const { buildPage } = require('./shell.js');

/* ================= BLOG INDEX ================= */
buildPage({
  file: 'blog.html',
  title: 'Blog — StratEdge Consulting',
  description: 'Practical essays on strategy, planning, and leadership from the consultants at StratEdge Consulting.',
  content: `
    <section class="max-w-6xl mx-auto px-5 pt-16 pb-16 md:pt-24 md:pb-20">
      <span aria-hidden="true" class="hero-rise block w-14 h-[3px] bg-brass-500 mb-8"></span>
      <h1 class="hero-rise font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-navy-900">Notes from the work</h1>
      <p class="hero-rise-delay mt-6 max-w-xl text-lg text-navy-700">Short, practical essays on strategy, planning, and leadership, written between engagements rather than delegated to an intern.</p>
    </section>

    <div class="rule-brass max-w-6xl mx-auto"></div>

    <section class="surface-tint">
      <div class="max-w-6xl mx-auto px-5 py-16 md:py-24">
        <h2 class="heading-tick-top font-display text-3xl md:text-4xl font-semibold text-navy-900">Latest essays</h2>
        <div class="mt-12 space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-10">
          <a href="blog-scale-a-business.html" class="block border-t-2 border-brass-500 pt-5 group">
            <span class="text-sm text-brass-600 font-semibold">8 minute read</span>
            <h2 class="mt-2 font-display text-2xl text-navy-900 group-hover:text-brass-600 transition-colors">5 Ways to Scale a Business</h2>
            <p class="mt-3 text-navy-700">Scaling is not growing faster. It is removing the specific constraints that would break first if you did.</p>
          </a>
          <a href="blog-planning-guide.html" class="block border-t-2 border-brass-500 pt-5 group">
            <span class="text-sm text-brass-600 font-semibold">10 minute read</span>
            <h2 class="mt-2 font-display text-2xl text-navy-900 group-hover:text-brass-600 transition-colors">Business Planning Guide</h2>
            <p class="mt-3 text-navy-700">A plan that gets used looks nothing like the one written for the bank. Here is how to build one your team will actually follow.</p>
          </a>
          <a href="blog-leadership-tips.html" class="block border-t-2 border-brass-500 pt-5 group">
            <span class="text-sm text-brass-600 font-semibold">7 minute read</span>
            <h2 class="mt-2 font-display text-2xl text-navy-900 group-hover:text-brass-600 transition-colors">Leadership Tips</h2>
            <p class="mt-3 text-navy-700">The habits that separate leaders who scale from leaders who become the bottleneck to their own companies.</p>
          </a>
        </div>
      </div>
    </section>

    <!-- Lead-gen banner (inline, quiet) -->
    <section class="bg-navy-900 border-y border-brass-500/40 text-white">
      <div class="max-w-6xl mx-auto px-5 py-12 md:flex md:items-center md:justify-between md:gap-10">
        <div class="max-w-xl">
          <h2 class="font-display text-2xl md:text-3xl font-semibold">Reading is cheaper than consulting</h2>
          <p class="mt-2 text-white/75">Get the essays twice a month, before they appear anywhere else, plus occasional notes on new case studies.</p>
        </div>
        <div class="mt-6 md:mt-0 w-full md:max-w-md">
          <form data-newsletter class="flex flex-col sm:flex-row flex-wrap gap-3" novalidate>
            <label for="blog-newsletter" class="sr-only">Email address</label>
            <input id="blog-newsletter" type="email" required placeholder="you@company.com"
                   class="w-full min-w-0 sm:flex-1 sm:basis-40 border border-white/25 bg-navy-950 px-4 py-2.5 text-sm text-white placeholder:text-white/45 focus:border-brass-500">
            <button type="submit" class="shrink-0 bg-brass-500 text-navy-950 text-sm font-semibold px-6 py-2.5 hover:bg-brass-100 transition-colors">Subscribe</button>
          </form>
          <p data-newsletter-msg hidden class="mt-3 text-sm text-brass-100 font-medium"></p>
        </div>
      </div>
    </section>
`,
});
