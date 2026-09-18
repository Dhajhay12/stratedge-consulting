const { buildPage } = require('./shell.js');
const { articleBody } = require('./article-helper.js');

buildPage({
  file: 'blog-leadership-tips.html',
  title: 'Leadership Tips — StratEdge Consulting',
  description: 'Practical leadership habits for founders and executives, from the consultants at StratEdge Consulting.',
  content: articleBody({
    title: 'Leadership Tips',
    date: 'May 21, 2026',
    readTime: '7 minute read',
    inner: `
      <p>Leadership advice tends to orbit character, be decisive, empower people, communicate vision. All true, and all useless on Monday morning. What follows are habits we have watched work in real companies, including the uncomfortable ones that most leadership writing skips. None require charisma. All require consistency.</p>

      <h2 class="heading-tick font-display text-2xl md:text-3xl text-navy-900 pt-4">Run the meeting, or the meeting runs you</h2>
      <p>Most leadership teams meet often and decide rarely. The fix is mechanical: every recurring meeting gets a stated decision it exists to make, a short agenda sent in advance, and a visible list of who owns what by the end. If a meeting has no decision attached to it, cancel it and send an update instead. Leaders who protect their calendars this way find they have hours they did not know they possessed.</p>

      <h2 class="heading-tick font-display text-2xl md:text-3xl text-navy-900 pt-4">Ask the second question</h2>
      <p>The first answer a team gives is usually the safe one, polished for the boss. The real information sits one question deeper, so ask it: what would have to be true for that to fail? What are we not saying? The habit costs thirty seconds and routinely surfaces the risk that everyone saw and nobody named. Teams notice quickly whether the second question is welcome, and they calibrate their candor accordingly.</p>

      <h2 class="heading-tick font-display text-2xl md:text-3xl text-navy-900 pt-4">Name the trade-off out loud</h2>
      <p>Every meaningful decision gives something up, and pretending otherwise breeds the quiet resentment that surfaces as resistance later. If speed is chosen over polish, say so and say what it costs. People commit to plans they helped shape far more readily than to plans handed down, and a stated trade-off invites the person who knows about the missing detail to speak while it still matters.</p>

      <h2 class="heading-tick font-display text-2xl md:text-3xl text-navy-900 pt-4">Delegate outcomes, not tasks</h2>
      <p>Hand over the result you need and the constraints around it, then let the person find their own route. Delegating tasks creates assistants; delegating outcomes creates leaders. It is slower the first month and faster every month after, and it is the only delegation that survives your vacation.</p>

      <h2 class="heading-tick font-display text-2xl md:text-3xl text-navy-900 pt-4">Praise in public, correct in private, and do both quickly</h2>
      <p>Feedback ages badly. Praise lands when it is specific and soon, and correction lands when it is private, direct, and free of the sandwich. The habit of saving issues for the annual review is a disservice to everyone involved; the goal is that nobody should ever be surprised by their own performance conversation.</p>

      <h2 class="heading-tick font-display text-2xl md:text-3xl text-navy-900 pt-4">Protect the standard when it is expensive</h2>
      <p>Culture is what you tolerate, and it is tested precisely when upholding it costs something. Answer the late-night email from the customer who bullies your support team with the same courtesy you would show a partner. Everyone watches what happens next, and the lesson persists far longer than the incident.</p>

      <p>None of this is heroic. That is the point: leadership at scale is less about the rare dramatic call and more about the ordinary habits, kept visible, that make a hundred small decisions unnecessary.</p>
    `,
    related: `
      <a href="blog-scale-a-business.html" class="block border-t-2 border-brass-500 pt-5 group">
        <h3 class="font-display text-xl text-navy-900 group-hover:text-brass-600 transition-colors">5 Ways to Scale a Business</h3>
        <p class="mt-2 text-sm text-navy-700">Fix the constraint before you feed the machine. 8 minute read</p>
      </a>
      <a href="blog-planning-guide.html" class="block border-t-2 border-brass-500 pt-5 group">
        <h3 class="font-display text-xl text-navy-900 group-hover:text-brass-600 transition-colors">Business Planning Guide</h3>
        <p class="mt-2 text-sm text-navy-700">Build a plan your team will actually follow. 10 minute read</p>
      </a>
    `,
  }),
});
