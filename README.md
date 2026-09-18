# StratEdge Consulting — Marketing Website

A multi-page static website for **StratEdge Consulting**, a fictional business consulting firm. Built with plain HTML5, Tailwind CSS (CDN), and vanilla JavaScript. No backend, no build step required to view the site.

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| About | `about.html` |
| Services | `services.html` |
| Case Studies | `case-studies.html` |
| Blog index | `blog.html` |
| Article: 5 Ways to Scale a Business | `blog-scale-a-business.html` |
| Article: Business Planning Guide | `blog-planning-guide.html` |
| Article: Leadership Tips | `blog-leadership-tips.html` |
| Contact (form + calendar) | `contact.html` |

## Running locally

No build step or install is needed:

1. **Simplest:** double-click `index.html` (or right-click → Open with browser). All assets load from CDNs, so an internet connection is required.
2. **Recommended (local server):**

   ```bash
   # from this folder, any of the following:
   npx serve .
   # or
   python -m http.server 8000
   ```

   then open `http://localhost:8000` (or the port `serve` prints).

### Rebuilding pages (optional)

The 9 secondary pages are generated from a shared shell so the header/footer stay perfectly consistent. If you edit the shared header/footer in `index.html`, regenerate the other pages with:

```bash
node build/run.js
```

`build/` contains the template (`build/shell.js`), one content module per page, and the runner. It is a development convenience only — the HTML files are the deliverable and work standalone.

## Design tokens

Defined as CSS custom properties in `css/styles.css` and mirrored in the inline `tailwind.config` block on every page.

| Token | Value | Role |
|-------|-------|------|
| `--paper-white` | `#FBFBFA` | Primary page background |
| `--navy-950` | `#0D1B2E` | Deeper navy shade: footer, final CTA bands — gives weight below `navy-900` |
| `--navy-900` | `#142845` | Brand color: headings, primary buttons, lead-gen bands |
| `--navy-700` | `#24405F` | Secondary text on white |
| `--navy-050` | `#EEF1F5` | Light navy tint: alternating section background, used site-wide for tonal rhythm |
| `--stone-200` | `#E7E4DD` | Warm neutral surface (reserved; `navy-050` carries the alternation) |
| `--brass-500` | `#A9822F` | Primary accent: stat numerals, case-study result figures, rules, ticks, icon accents, active nav underline |
| `--brass-600` | `#8A6A25` | Deeper brass for small text on light surfaces (link hover, eyebrow text) |
| `--brass-100` | `#F3EAD8` | Brass whisper: hairline borders, subscribe-button hover |
| `--ink-800` | `#1C1C1C` | Body text |

**Tonal system**

The palette is deliberately a three-tone family — paper/navy plus their tints and shades, with brass as the single accent. No fourth hue is introduced.

- **Surface alternation:** `.surface-tint` (`navy-050`) carries the alternating bands on every page, so the page reads as tonal rhythm rather than a continuous white run. Services and Case Studies alternate per service/case-study, not just per section.
- **Depth:** `.bg-navy-950` is used for the footer and each page's final CTA band, so navy is no longer stuck at one flat value.
- **Brass accent layer:** `.rule-brass` (section dividers), `.heading-tick` / `.heading-tick-top` (short accent line beside or above a section heading), `.frame-brass` (photo frames), `.quote-brass` (testimonial blocks), `.stat-block` (stat rules), `.icon-brass` (Lucide glyphs), and brass hover states on all `.link-underline` nav and text links. Brass is never a large background fill.

**Typography**

- Headings: **Fraunces** (Google Fonts), weights 500–600, optical sizing enabled
- Body: **Inter** (Google Fonts), weight 400, line-height 1.6, prose blocks capped at `max-w-prose` (~65–75 characters)

**Icons:** Lucide via `https://unpkg.com/lucide@latest`, initialized with `lucide.createIcons()` in `js/main.js`. Used sparingly (service/contact accents, calendar, check, submit arrow, social).

**Motion:** one orchestrated hero entrance (`.hero-rise`, 360ms); everything else is interaction-triggered (nav underline sweep, mobile menu slide-in, calendar slot feedback, smooth details expansion). All motion is disabled under `prefers-reduced-motion`.

**Responsive:** mobile-first, verified at 375px (hamburger menu, stacked layouts, horizontally scrollable calendar), 768px (nav switches to full menu), and 1440px (12-column content grid, max-width 72rem).

## Interactivity (client-side only)

- **Consultation form** (`contact.html`): required-field + email validation via the browser's constraint API with `novalidate` handling in `js/main.js`; on valid submit the form is replaced by a styled success panel addressing the sender by name.
- **Calendar week view** (`contact.html`): clickable time slots highlight in navy and show an inline "Time selected" confirmation. Booked slots are disabled. Front-end mock only — nothing is stored or sent.
- **Newsletter form** (footer on every page, plus inline banners on Services and Blog): validates the email and swaps to an inline success message on submit.

## Placeholder content

Everything on this site is **fictional and for demonstration only**:

- The firm, founder (Miriam Reyes), employees, clients, testimonials, contact details (address, phone, email), metrics (30%, 18%, 42%, 120+ engagements), and case studies are all invented. No real companies or people are referenced.
- Photography: sourced from **Unsplash** (free to use under the [Unsplash License](https://unsplash.com/license)) and stored locally in `images/` — `founder-miriam-reyes.jpg` (portrait), `team-meeting.jpg`, `team-collaboration.jpg`, and `workspace-review.jpg` (business/team imagery). The people in these photos are not affiliated with the fictional firm; they depict the fictional founder and team for demonstration purposes only.
- Social links are stubs (`href="#"`). The form and calendar do not transmit data anywhere.

## File structure

```
stratedge-consulting/
├── index.html
├── about.html
├── services.html
├── case-studies.html
├── blog.html
├── blog-scale-a-business.html
├── blog-planning-guide.html
├── blog-leadership-tips.html
├── contact.html
├── css/
│   └── styles.css          # tokens, motion, component styles layered on Tailwind
├── js/
│   └── main.js             # nav, forms, calendar, Lucide init
├── images/
│   ├── founder-miriam-reyes.jpg   # Unsplash portrait used for the founder
│   ├── team-meeting.jpg           # Unsplash photo, testimonials section
│   ├── team-collaboration.jpg     # Unsplash photo, services page
│   ├── workspace-review.jpg       # Unsplash photo, case studies page
│   └── founder-placeholder.svg    # original placeholder, kept for reference
├── build/                  # optional page generator (see above)
└── README.md
```
