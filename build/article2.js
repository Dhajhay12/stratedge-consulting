const { buildPage } = require('./shell.js');
const { articleBody } = require('./article-helper.js');

buildPage({
  file: 'blog-planning-guide.html',
  title: 'Business Planning Guide — StratEdge Consulting',
  description: 'A practical guide to writing a business plan people will actually use, from StratEdge Consulting.',
  content: articleBody({
    title: 'Business Planning Guide',
    date: 'April 9, 2026',
    readTime: '10 minute read',
    inner: `
      <p>Most business plans are written for someone else to read and then never opened again. The plan for the bank sits in a drawer; the plan for the team lives in a slide deck that drifts from reality within a quarter. This guide is about the second kind of failure, because a plan that gets used looks nothing like a plan written to impress. It is shorter, more honest about uncertainty, and rebuilt on a rhythm rather than composed once a year.</p>

      <h2 class="heading-tick font-display text-2xl md:text-3xl text-navy-900 pt-4">Start with the constraint, not the vision</h2>
      <p>A useful plan begins with the honest answer to one question: what is the single limit holding the company back right now? It might be pipeline, capacity, cash, or a leadership gap. Building the plan around that constraint gives every initiative a way to justify itself, and it gives you permission to say no to good ideas that do not touch the limit. Vision statements do not make choices; constraints do.</p>

      <h2 class="heading-tick font-display text-2xl md:text-3xl text-navy-900 pt-4">Plan on one page before you plan on thirty</h2>
      <p>Write the whole strategy on a single page: who the customer is, what they buy and why, what the constraint is, the three moves for the year, and the number that tells you it worked. If the one-pager cannot survive scrutiny, a longer document will not save it. The detailed plan, where one is needed, is an appendix that supports the page, not a substitute for it.</p>

      <h2 class="heading-tick font-display text-2xl md:text-3xl text-navy-900 pt-4">Make the goals boring and testable</h2>
      <p>"Become the leading provider in our region" cannot fail, which means it also cannot succeed. A workable goal has a number and a date: orders shipped within four hours by October, two new clinic locations staffed by spring, overhead held under a stated ceiling while revenue grows. Boring goals are a feature. They survive contact with Monday morning.</p>

      <h2 class="heading-tick font-display text-2xl md:text-3xl text-navy-900 pt-4">Give every bet an owner and a review date</h2>
      <p>Three moves per quarter is more than most companies can absorb, and each one needs a single owner, a definition of done, and a date on the calendar when its progress will be examined. The review matters more than the kickoff. A plan without scheduled reviews is a wish list with better formatting, and the review date is where quiet failures surface while they are still cheap to fix.</p>

      <h2 class="heading-tick font-display text-2xl md:text-3xl text-navy-900 pt-4">Rebuild the plan on a rhythm, not on a crisis</h2>
      <p>Set a cadence, a short weekly look at the metrics, a monthly look at the bets, and a quarterly rebuild of the plan itself. When conditions change, and they will, you amend the document rather than abandoning it. The companies that plan well are not the ones with the best predictions. They are the ones that repair their plans quickly and without drama.</p>

      <p>The measure of a plan is not how it reads. It is what a new employee could infer from it in a week, and what your team says when you are not in the room. If the plan passes that test, it is doing its job.</p>
    `,
    related: `
      <a href="blog-scale-a-business.html" class="block border-t-2 border-brass-500 pt-5 group">
        <h3 class="font-display text-xl text-navy-900 group-hover:text-brass-600 transition-colors">5 Ways to Scale a Business</h3>
        <p class="mt-2 text-sm text-navy-700">Remove the constraint before you feed the machine. 8 minute read</p>
      </a>
      <a href="blog-leadership-tips.html" class="block border-t-2 border-brass-500 pt-5 group">
        <h3 class="font-display text-xl text-navy-900 group-hover:text-brass-600 transition-colors">Leadership Tips</h3>
        <p class="mt-2 text-sm text-navy-700">The habits that keep leaders from becoming the bottleneck. 7 minute read</p>
      </a>
    `,
  }),
});
