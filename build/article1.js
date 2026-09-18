const { buildPage } = require('./shell.js');
const { articleBody } = require('./article-helper.js');

buildPage({
  file: 'blog-scale-a-business.html',
  title: '5 Ways to Scale a Business — StratEdge Consulting',
  description: 'Five practical ways to scale a business, drawn from more than a hundred consulting engagements.',
  content: articleBody({
    title: '5 Ways to Scale a Business',
    date: 'March 4, 2026',
    readTime: '8 minute read',
    inner: `
      <p>Every company that hits a growth ceiling tells itself the same story: we need to sell more. Sometimes that is true. More often, the company cannot deliver what it already sold, and more sales would only make the failure louder. Scaling is the work of making sure the second problem never shows up. Across more than a hundred engagements, five moves consistently separate companies that scale from companies that stall.</p>

      <h2 class="heading-tick font-display text-2xl md:text-3xl text-navy-900 pt-4">1. Fix the constraint before you feed the machine</h2>
      <p>Every business has one bottleneck that determines how much it can deliver, and it is rarely where leadership thinks it is. In a wholesale client it was not sales and not production, but a single scheduling decision made each morning by whoever arrived first. Find the true constraint, relieve it, and only then pour more demand into the system. Feeding a constrained machine just moves the queue somewhere less visible.</p>

      <h2 class="heading-tick font-display text-2xl md:text-3xl text-navy-900 pt-4">2. Standardize the work before you multiply the people</h2>
      <p>Hiring ahead of growth feels like progress, but hiring into chaos produces more chaos at a higher payroll. Document how the work is actually done, make the good habits the default, and train against that standard. A company with two great locations and no written process is not a scalable company. It is two good teams that will diverge the moment a third opens.</p>

      <h2 class="heading-tick font-display text-2xl md:text-3xl text-navy-900 pt-4">3. Push decisions down, with guardrails</h2>
      <p>The founder who approves every purchase order becomes the constraint from point one. Scaling requires decisions to move to the people closest to the work, and that only functions when those people know which calls they can make alone. Write the guardrails down, spend thresholds, discount limits, refund authority, and then hold yourself to not re-deciding what you delegated.</p>

      <h2 class="heading-tick font-display text-2xl md:text-3xl text-navy-900 pt-4">4. Get ahead of your cash cycle</h2>
      <p>Growth consumes cash before it produces it. Inventory, payroll, and delivery costs all leave before the revenue arrives, and companies fail not from lack of profit but from lack of timing. Model the next two quarters of the cash cycle honestly, negotiate terms while you do not desperately need them, and keep a buffer that would let you survive your own success.</p>

      <h2 class="heading-tick font-display text-2xl md:text-3xl text-navy-900 pt-4">5. Grow the leaders, not just the headcount</h2>
      <p>The skills that built a company to ten people are not the skills that run it at fifty. Identify the people who can own an outcome rather than a task list, give them real scope, and accept that they will decide some things differently than you would. If your plan for growth requires you in every meeting, the plan is the problem.</p>

      <p>None of these five are glamorous, which is precisely why they work. Scaling is mostly the discipline to do obvious things before urgency forces them. Companies that treat it that way tend to arrive at the next stage still recognizable to the people who built them.</p>
  `,
  related: `
    <a href="blog-planning-guide.html" class="block border-t-2 border-brass-500 pt-5 group">
      <h3 class="font-display text-xl text-navy-900 group-hover:text-brass-600 transition-colors">Business Planning Guide</h3>
      <p class="mt-2 text-sm text-navy-700">How to build a plan your team will actually follow. 10 minute read</p>
    </a>
    <a href="blog-leadership-tips.html" class="block border-t-2 border-brass-500 pt-5 group">
      <h3 class="font-display text-xl text-navy-900 group-hover:text-brass-600 transition-colors">Leadership Tips</h3>
      <p class="mt-2 text-sm text-navy-700">Habits that keep leaders from becoming the bottleneck. 7 minute read</p>
    </a>
  `,
  }),
});

