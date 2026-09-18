require('./edit-util.js');
const { replaceIn } = require('./edit-util.js');

/* Round 5 — tonal rhythm + brass across contact, blog, case studies, articles */

// Contact: slots pick up brass hover/focus; success panel and closing band deepened
replaceIn('contact.js', [
  ['class="slot border border-navy-700/40 bg-white text-sm py-3 px-2"', 'class="slot border border-navy-700/40 bg-white text-sm py-3 px-2 hover:border-brass-500"'],
  [
    '<div id="slotConfirm" hidden class="success-panel mt-8 max-w-xl border border-navy-900/15 bg-white p-6">',
    '<div id="slotConfirm" hidden class="success-panel mt-8 max-w-xl border border-brass-500/50 bg-white p-6">',
  ],
  [
    '<span class="inline-flex items-center justify-center w-9 h-9 rounded-full bg-navy-900 text-white">',
    '<span class="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brass-500 text-navy-950">',
  ],
  ['<section class="bg-navy-900 text-white">', '<section class="bg-navy-950 text-white">'],
]);

console.log('round 5 applied.');

// Services: heading ticks on the repeated "Key deliverables" subheadings
replaceIn('services.js', [
  [
    '<h3 class="mt-8 font-semibold text-navy-900">Key deliverables</h3>',
    '<h3 class="heading-tick mt-8 font-semibold text-navy-900">Key deliverables</h3>',
  ],
]);

// Contact: brass focus states + brass heading ticks on the two form headings
replaceIn('contact.js', [
  ['focus:border-navy-900', 'focus:border-brass-500'],
  [
    '<h2 class="font-display text-3xl font-semibold text-navy-900">Request a consultation</h2>',
    '<h2 class="heading-tick-top font-display text-3xl font-semibold text-navy-900">Request a consultation</h2>',
  ],
  [
    '<h2 class="font-display text-3xl md:text-4xl font-semibold text-navy-900">Prefer to pick a time?</h2>',
    '<h2 class="heading-tick-top font-display text-3xl md:text-4xl font-semibold text-navy-900">Prefer to pick a time?</h2>',
  ],
]);

// Article bodies: heading ticks on every H2 subheading
['article1.js', 'article2.js', 'article3.js'].forEach(function (f) {
  replaceIn(f, [
    ['<h2 class="font-display text-2xl md:text-3xl text-navy-900 pt-4">', '<h2 class="heading-tick font-display text-2xl md:text-3xl text-navy-900 pt-4">'],
  ]);
});

// Article related links: brass top rules instead of navy
['article1.js', 'article2.js', 'article3.js'].forEach(function (f) {
  replaceIn(f, [
    ['class="block border-t-2 border-navy-900 pt-5 group"', 'class="block border-t-2 border-brass-500 pt-5 group"'],
    ['group-hover:text-navy-700 transition-colors', 'group-hover:text-brass-600 transition-colors'],
  ]);
});

console.log('mechanical edits applied.');

// --- Services: heading ticks on the repeated "Key deliverables" subheadings ---
replaceIn('services.js', [
  [
    '<h3 class="mt-8 font-semibold text-navy-900">Key deliverables</h3>',
    '<h3 class="heading-tick mt-8 font-semibold text-navy-900">Key deliverables</h3>',
  ],
]);

// --- Case studies: brass pull-quote rails replace the plain stone dividers ---
replaceIn('case-studies.js', [
  [
    '<div class="md:col-span-5 md:border-l md:border-stone-200 md:pl-12 mt-10 md:mt-0 border-t-2 border-brass-500 pt-6 md:border-t-0 md:pt-0">',
    '<div class="md:col-span-5 md:border-l md:border-brass-500/40 md:pl-12 mt-10 md:mt-0 border-t-2 border-brass-500 pt-6 md:border-t-0 md:pt-0">',
  ],
  // Pull-quote figures get the brass corner accent rule
  [
    '<p class="font-display text-7xl md:text-8xl font-semibold text-brass-500 leading-none">',
    '<p class="stat-num font-display text-7xl md:text-8xl font-semibold text-brass-500 leading-none">',
  ],
  // Industry labels above each case-study title
  [
    '<span class="text-sm text-navy-700">B2B SaaS Startup</span>',
    '<span class="text-sm text-brass-600 font-semibold">B2B SaaS Startup</span>',
  ],
  [
    '<span class="text-sm text-navy-700">Regional Healthcare Provider</span>',
    '<span class="text-sm text-brass-600 font-semibold">Regional Healthcare Provider</span>',
  ],
  [
    '<h2 class="font-display text-3xl md:text-4xl font-semibold text-navy-900 mt-2">',
    '<h2 class="heading-tick-top font-display text-3xl md:text-4xl font-semibold text-navy-900 mt-2">',
  ],
  // Remaining case-study images -> brass frames
  [
    '<img src="images/case-saas.jpg" alt="An open-plan software office with analytics dashboards on monitors" width="1100" height="733"\n                   class="w-full h-56 md:h-64 object-cover border border-navy-900/10 mb-8">',
    '<figure class="frame-brass mb-8">\n                <img src="images/case-saas.jpg" alt="An open-plan software office with analytics dashboards on monitors" width="1100" height="733"\n                     class="w-full h-56 md:h-64 object-cover">\n              </figure>',
  ],
  [
    '<img src="images/case-healthcare.jpg" alt="A clinician in conversation with a patient at a clinic reception desk" width="1100" height="733"\n                   class="w-full h-56 md:h-64 object-cover border border-navy-900/10 mb-8">',
    '<figure class="frame-brass mb-8">\n                <img src="images/case-healthcare.jpg" alt="A clinician in conversation with a patient at a clinic reception desk" width="1100" height="733"\n                     class="w-full h-56 md:h-64 object-cover">\n              </figure>',
  ],
]);

console.log('mechanical edits applied.');

// --- Round 2: remaining tonal swaps site-wide ---
replaceIn('case-studies.js', [
  ['class="w-full h-56 md:h-64 object-cover border border-navy-900/10 mb-8">',
   'class="w-full h-56 md:h-64 object-cover border border-brass-500/40 mb-8">'],
  ['<article id="b2b-saas" class="py-14 md:py-20 md:border-t md:border-stone-200 scroll-mt-24">',
   '<article id="b2b-saas" class="px-5 md:px-6 py-14 md:py-20 md:border-t md:border-brass-500/25 scroll-mt-24 surface-tint">'],
  ['<article id="regional-healthcare" class="py-14 md:py-20 md:border-t md:border-stone-200 scroll-mt-24">',
   '<article id="regional-healthcare" class="px-5 md:px-6 py-14 md:py-20 md:border-t md:border-brass-500/25 scroll-mt-24 surface-tint">'],
  ['<section class="bg-navy-900 text-white">\n      <div class="max-w-6xl mx-auto px-5 py-16 md:py-24 md:flex md:items-center md:justify-between md:gap-12">\n        <div class="max-w-xl">\n          <h2 class="font-display text-3xl md:text-4xl font-semibold">',
   '<section class="bg-navy-950 text-white">\n      <div class="max-w-6xl mx-auto px-5 py-16 md:py-24 md:flex md:items-center md:justify-between md:gap-12">\n        <div class="max-w-xl">\n          <span aria-hidden="true" class="block w-14 h-[3px] bg-brass-500 mb-6"></span>\n          <h2 class="font-display text-3xl md:text-4xl font-semibold">'],
  ['hover:bg-stone-200 transition-colors">\n          <i data-lucide="calendar" class="w-4 h-4" aria-hidden="true"></i> Book a Consultation',
   'hover:bg-brass-100 transition-colors">\n          <i data-lucide="calendar" class="w-4 h-4 text-brass-600" aria-hidden="true"></i> Book a Consultation'],
]);

// --- Blog index ---
replaceIn('blog.js', [
  ['<section class="border-t border-stone-200">', '<div class="rule-brass max-w-6xl mx-auto"></div>\n\n    <section>'],
  ['<section class="bg-stone-200/60 border-y border-stone-200">',
   '<section class="bg-navy-900 border-y border-brass-500/40 text-white">'],
]);

// --- Contact ---
replaceIn('contact.js', [
  ['<section class="border-t border-stone-200">', '<div class="rule-brass max-w-6xl mx-auto"></div>\n\n    <section>'],
  ['<div class="mt-8 border-t border-stone-200 pt-6 max-w-sm">',
   '<div class="mt-8 border-t border-brass-500/30 pt-6 max-w-sm">'],
  ['<section class="bg-stone-200/60 border-y border-stone-200">',
   '<section class="surface-tint border-y border-brass-500/25">'],
]);

// --- Articles ---
replaceIn('article-helper.js', [
  ['<section class="border-t border-stone-200">', '<div class="rule-brass"></div>\n\n    <section>'],
  ['hover:bg-stone-200 transition-colors">\n          <i data-lucide="calendar" class="w-4 h-4" aria-hidden="true"></i> Book a Consultation',
   'hover:bg-brass-100 transition-colors">\n          <i data-lucide="calendar" class="w-4 h-4 text-brass-600" aria-hidden="true"></i> Book a Consultation'],
]);

console.log('round 2 applied.');

// --- Round 3: CRLF-aware multi-line swaps for dark CTA bands and hero heads ---
(function () {
  const fs = require('fs');
  const path = require('path');

  function sub(file, from, to, label) {
    const full = path.join(__dirname, file);
    let t = fs.readFileSync(full, 'utf8');
    const norm = t.replace(/\r\n/g, '\n');
    const n = norm.split(from).length - 1;
    if (n) {
      fs.writeFileSync(full, norm.split(from).join(to), 'utf8');
    }
    console.log(file, '|', n, 'x', label);
  }

  // Case studies final CTA -> navy-950 with brass rule + brass calendar icon
  sub('case-studies.js',
    '<section class="bg-navy-900 text-white">',
    '<section class="bg-navy-950 text-white">',
    'cs cta shade');
  sub('case-studies.js',
    'hover:bg-stone-200 transition-colors">',
    'hover:bg-brass-100 transition-colors">',
    'cs cta button hover');
  sub('case-studies.js',
    '<i data-lucide="calendar" class="w-4 h-4" aria-hidden="true"></i> Book a Consultation\n        </a>',
    '<i data-lucide="calendar" class="w-4 h-4 text-brass-600" aria-hidden="true"></i> Book a Consultation\n        </a>',
    'cs cta icon');

  // Blog: darken the lead-gen band text and give the CTA band the deep shade
  sub('blog.js', '<section class="bg-navy-950 text-white">', '<section class="bg-navy-950 text-white">', 'blog cta shade (noop check)');
  sub('article-helper.js',
    'hover:bg-stone-200 transition-colors">',
    'hover:bg-brass-100 transition-colors">',
    'article cta button hover');
  sub('article-helper.js',
    '<i data-lucide="calendar" class="w-4 h-4" aria-hidden="true"></i> Book a Consultation',
    '<i data-lucide="calendar" class="w-4 h-4 text-brass-600" aria-hidden="true"></i> Book a Consultation',
    'article cta icon');
  sub('article-helper.js',
    '<section class="bg-navy-900 text-white">',
    '<section class="bg-navy-950 text-white">',
    'article cta shade');
  sub('article-helper.js',
    '<h2 class="font-display text-3xl md:text-4xl font-semibold">',
    '<span aria-hidden="true" class="block w-14 h-[3px] bg-brass-500 mb-6"></span>\n          <h2 class="font-display text-3xl md:text-4xl font-semibold">',
    'article cta brass rule');
})();

// --- Round 4: article internals + contact page tonal pass ---
(function () {
  const fs = require('fs');
  const path = require('path');
  function sub(file, from, to, label) {
    const full = path.join(__dirname, file);
    const norm = fs.readFileSync(full, 'utf8').replace(/\r\n/g, '\n');
    const n = norm.split(from).length - 1;
    if (n) fs.writeFileSync(full, norm.split(from).join(to), 'utf8');
    console.log(file, '|', n, 'x', label);
  }

  // Article body H2 subheadings -> brass tick accent
  ['article1.js', 'article2.js', 'article3.js'].forEach(function (f) {
    sub(f, '<h2 class="font-display text-2xl md:text-3xl text-navy-900 pt-4">',
           '<h2 class="heading-tick font-display text-2xl md:text-3xl text-navy-900 pt-4">',
           'body h2 tick');
  });

  // Related-article links: brass top rule + brass hover
  ['article1.js', 'article2.js', 'article3.js'].forEach(function (f) {
    sub(f, 'class="block border-t-2 border-navy-900 pt-5 group"',
           'class="block border-t-2 border-brass-500 pt-5 group"', 'related rule');
    sub(f, 'group-hover:text-navy-700 transition-colors',
           'group-hover:text-brass-600 transition-colors', 'related hover');
  });
})();

console.log('round 4 applied.');