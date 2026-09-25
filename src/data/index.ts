export type Project = {
  id: string;
  number: string;
  company: string;
  year: string;
  role: string;
  title: string;
  description: string;
  tags: string[];
  metric: string;
  metricLabel: string;
  previewImage: string;
  previewGradient: string;
  imagePosition?: string;
  website: string;
  scope: string;
  problem: string;
  approach: string[];
  outcome: string[];
  nextProject: string;
  nextProjectLabel: string;
};

export const projects: Project[] = [
  {
    id: 'datamellon',
    number: '01',
    company: 'DATAMELLON',
    year: '2026',
    role: 'UI/UX Engineer',
    title: 'Redesigned an AWS Advanced Tier Partner’s site around AI, Cloud and Data.',
    description:
      "A full redesign of Datamellon's marketing site — from information architecture and visual system to 60+ responsive page designs and developer handoff — making 21 services, 5 products and 4 partners easy to find across a consulting, product and events business spanning Africa and the Middle East.",
    tags: ['WEB DESIGN', 'DESIGN SYSTEM', 'IA'],
    metric: '<2',
    metricLabel: 'WEEKS TO LAUNCH',
    previewImage: '/images/datamellon-preview.png',
    previewGradient: 'linear-gradient(135deg, #0a1f0f 0%, #16321c 40%, #060f08 100%)',
    website: 'https://www.datamellon.com/',
    scope: 'IA · Visual System · Design System · Responsive Design · Developer Handoff',
    problem:
      "Datamellon's offer spans consulting services, in-house products, technology partnerships, client work and events, and the previous site didn't show that breadth clearly. The new site had to make 21 services, 5 products and 4 partners easy to find, give case studies and news a consistent home, and be ready for development on a short timeline.",
    approach: [
      'Grouped 21 services into three practices — AI, Cloud and Data — and organised products, partners, company pages and the newsroom into a clear sitemap.',
      'Built a dark, editorial visual system on the brand green #74AE46 and Roboto, with shared tokens for colour, type, spacing and components.',
      'Designed full-width mega-menu navigation for Services, Products, Partners, About and Newsroom, with every page adapting from desktop to mobile.',
      'Set a content and copy system — Title Case headlines, sentence-case tags, preserved acronyms, consistent AI/Cloud/Data ordering — and reusable templates for 13 case studies, 13 articles and 5 events.',
      'Ran several stakeholder review rounds with leadership, applying each change across every affected page to keep the system consistent, then packaged the full handoff with a README covering tokens, pages and interactions.',
    ],
    outcome: [
      'Launched 21 September 2026, less than two weeks after work began',
      '60+ pages designed, including 21 service pages, 13 case studies and 18 articles & events',
      'Development received a complete, responsive design system with full documentation and final assets',
    ],
    nextProject: 'mellyguard',
    nextProjectLabel: 'MellyGuard',
  },
  {
    id: 'mellyguard',
    number: '02',
    company: 'MELLYGUARD',
    year: '2026',
    role: 'UI/UX Engineer',
    title: 'Designed the homepage for a Financial Crime Operating System.',
    description:
      'A dark, motion-rich marketing site explaining MellyGuard — a platform unifying KYC, fraud, AML, sanctions, investigations, reporting, audit and governance — to compliance leaders at financial institutions. Owned the page end to end: information architecture, visual system, every motion and canvas visualization, navigation, inner pages and developer handoff.',
    tags: ['WEB DESIGN', 'MOTION DESIGN', 'ENTERPRISE SAAS'],
    metric: '8',
    metricLabel: 'MODULES, ONE SYSTEM',
    previewImage: '/images/mellyguard-preview.png',
    previewGradient: 'linear-gradient(135deg, #050707 0%, #0d1f0a 45%, #030404 100%)',
    website: 'https://mellyguard.ai/',
    scope: 'IA · Visual System · Motion & Canvas Visualization · Navigation · Developer Handoff',
    problem:
      "Financial institutions manage financial crime with disconnected tools — one for onboarding, others for transaction monitoring, fraud, sanctions, investigations and reporting. MellyGuard replaces that stack with a single operating system, and the homepage had to make that clear to buyers who already live with the fragmentation, without reading like a feature list.",
    approach: [
      'Built the information architecture from the product document, then designed a visual system on the MellyGuard brand — one bright green (#7BC043) on a near-black operations console, with the green reserved for approved paths, live data and primary actions.',
      'Opened with a live operations-map hero: an interactive network graph tracing a case from Customer through KYC, monitoring, investigation, MLRO and reporting, with particles flowing along the edges over an animated canvas of drifting nodes.',
      'Designed a vertical 12-stage workflow timeline paired with a live-updating case-file preview, 12 role workspaces that highlight who hands off to whom, and 8 module cards that read like live consoles with streaming event feeds.',
      'Iterated through stakeholder reviews — stripping ornament, swapping flat diagrams for a rotating-globe intelligence layer, reworking the hero into a fully animated background, and widening scope to a full mega-menu with Industries, Resources and Company pages.',
      'Packaged the full developer handoff: design tokens, layout, and the parameters of every animation so engineering could rebuild it in production.',
    ],
    outcome: [
      'A complete, high-fidelity homepage covering every section of the product document, from hero to footer, plus 3 inner pages',
      'Every animation built as a procedural canvas drawing — sharp at any size, with no added image weight',
      'Shipped with a developer handoff package documenting tokens, layout and animation parameters for production rebuild',
    ],
    nextProject: 'klaudworks',
    nextProjectLabel: 'KlaudWorks',
  },
  {
    id: 'klaudworks',
    number: '03',
    company: 'KLAUDWORKS',
    year: '2026',
    role: 'Product Designer',
    title: 'Unified one cloud-billing platform across customer, Finance, Admin and Alliance experiences.',
    description:
      "KlaudWorks helps businesses understand, control and pay for their AWS spend. I turned a scattered FRD, backend docs, an SPP workflow sheet and 12 items of Finance feedback into one system spanning a public site and four dashboards — customers, Finance, Platform Admins and the AWS Alliance team — all sharing one visual language and one live dataset.",
    tags: ['DASHBOARD DESIGN', 'FINTECH', 'PRODUCT STRATEGY'],
    metric: '2',
    metricLabel: 'DAYS, BRIEF TO PROTOTYPE',
    previewImage: '/images/klaudworks-preview.png',
    previewGradient: 'linear-gradient(135deg, #0d2e1f 0%, #1a4d34 40%, #0a1f15 100%)',
    website: 'https://dev.klaudworks.io/',
    scope: 'Research · IA · UI Design · Design System · Prototyping',
    problem:
      "Requirements were scattered across an FRD, backend documentation, an SPP workflow sheet and 12 items of Finance feedback — covering four groups with very different jobs: customers paying invoices, Finance issuing and reconciling them, Platform Admins onboarding accounts, and the Alliance team managing AWS partner data. Nothing tied the experience together, and Finance hadn't yet settled key FX and discount-sharing rules.",
    approach: [
      'Designed one shared visual language — a single green accent, calm neutrals and consistent status colours — so a customer and a Finance officer see the same invoice status the same way.',
      'Built customer, Finance, Platform Admin and Alliance experiences around their real jobs: wallets and multi-currency invoices, a 5-step invoice wizard with a transparent AWS charge breakdown, customer onboarding with TIN/RC verification, and partner data uploads.',
      'Modelled the real payment rules — Naira invoices expiring at 5PM, GTBank and Providus auto-confirming while every other bank routes to a Finance review queue, and a pay button that locks overnight (10PM–9AM).',
      "Where Finance hadn't settled FX or discount-sharing rules, designed configurable placeholders so the product didn't have to wait on policy.",
    ],
    outcome: [
      '2 days from brief to a working prototype across the website and all four dashboards',
      '12 of 12 Finance feedback items addressed — 9 built, 3 as configurable placeholders',
      'One shared live dataset: issue an invoice in Finance and it appears instantly in the customer wallet',
      'Every feedback item written up as a Jira ticket, ready for engineering handoff',
    ],
    nextProject: 'viscio-logistics',
    nextProjectLabel: 'Viscio Logistics',
  },
  {
    id: 'viscio-logistics',
    number: '04',
    company: 'VISCIO LOGISTICS',
    year: '2024',
    role: 'Lead Product Designer',
    title: 'Made farm-to-market agro-logistics efficient, predictable and affordable.',
    description:
      "Redesigned Viscio's web platform around the realities of African logistics — fragmented routes, high costs and trust gaps. A cleaner order, pricing and tracking experience helped lift visibility and revenue by ~5% and surfaced 1,780+ successful trips across 17+ bases.",
    tags: ['WEB DESIGN', 'PRODUCT STRATEGY'],
    metric: '+5%',
    metricLabel: 'VISIBILITY & REVENUE',
    previewImage: '/images/viscio-preview.png',
    previewGradient: 'linear-gradient(135deg, #0d1b2a 0%, #1a2f4a 40%, #0a1520 100%)',
    imagePosition: 'center 18%',
    website: 'https://www.viscio.com.ng/',
    scope: 'Research · IA · UI Design · Design System',
    problem:
      "New users couldn't tell what Viscio actually did within 5 seconds. Pricing felt opaque, and there was no visible proof of operational scale — leading to high bounce on the landing page and friction in the booking flow.",
    approach: [
      'Mapped the three core personas — farmer, transporter, enterprise buyer — and rebuilt the IA around their first questions.',
      'Designed a pricing & route surface that exposes real numbers (trips, bases, partners) as social proof.',
      'Tightened the booking flow from 7 steps to 4 with clearer states and recoverable errors.',
    ],
    outcome: [
      '+5% lift in visibility & revenue post-launch',
      '1,780+ successful trips surfaced across 17+ bases',
      'Reduced support tickets around pricing clarity',
    ],
    nextProject: 'eco-academy',
    nextProjectLabel: 'Eco Academy',
  },
  {
    id: 'eco-academy',
    number: '05',
    company: 'ECO ACADEMY',
    year: '2024',
    role: 'Product Designer',
    title: 'Repositioned an environmental career platform around 100+ programs.',
    description:
      'Eco Academy serves environmental professionals across memberships, certifications, employment programs and learning paths — a catalog wide enough to overwhelm.',
    tags: ['WEB DESIGN', 'INFORMATION ARCHITECTURE'],
    metric: '+20%',
    metricLabel: 'PROJECTED GROWTH',
    previewImage: '/images/eco-preview.png',
    previewGradient: 'linear-gradient(135deg, #0d3b2a 0%, #1a5c3e 40%, #0a2e20 100%)',
    website: 'https://ecoacademy.ca/',
    scope: 'IA · UX Writing · UI Design',
    problem:
      "Visitors couldn't quickly distinguish between programs, memberships and jobs. The catalog buried high-intent paths under generic navigation.",
    approach: [
      'Restructured navigation around user intent (Learn, Get Certified, Get Hired, Join).',
      'Designed program cards with consistent metadata so users can scan and compare.',
      'Created a membership funnel that surfaces value before asking for commitment.',
    ],
    outcome: [
      '~20% projected lift in visibility & revenue',
      '100+ programs reorganised into 4 clear entry points',
      'Faster path from landing to enrolment',
    ],
    nextProject: 'silicash',
    nextProjectLabel: 'Silicash',
  },
  {
    id: 'silicash',
    number: '06',
    company: 'SILICASH',
    year: '2023',
    role: 'Product Designer',
    title: 'Simplified digital payments into one trusted wallet for iOS, Android and web.',
    description:
      'Silicash is a multi-platform wallet covering transfers, virtual cards, bills, airtime and travel — built for users who need certainty around money movement.',
    tags: ['MOBILE APP DESIGN', 'FINTECH', 'WEB DESIGN'],
    metric: '3',
    metricLabel: 'PLATFORMS SHIPPED',
    previewImage: '/images/silicash-preview.png',
    previewGradient: 'linear-gradient(135deg, #0d1f3c 0%, #1a3a6e 40%, #0a1530 100%)',
    website: 'https://www.silicash.com/',
    scope: 'iOS · Android · Web · Design System',
    problem:
      'Money apps fail on trust signals. Ambiguous confirmations, unclear fees and inconsistent states erode confidence fast — especially across iOS, Android and web.',
    approach: [
      'Built a shared design system so confirmation, error and success states feel identical across platforms.',
      'Designed every money-moving flow with an explicit review step and reversible patterns where possible.',
      'Tuned typography and number rendering for at-a-glance scanning of amounts and balances.',
    ],
    outcome: [
      'Shipped on 3 platforms with one consistent system',
      'Clearer confirmation patterns reduced anxious support contacts',
      'Faster repeat-transaction completion',
    ],
    nextProject: 'ojiffy',
    nextProjectLabel: 'Ojiffy',
  },
  {
    id: 'ojiffy',
    number: '07',
    company: 'OJIFFY',
    year: '2026',
    role: 'Co-Founder & Head of Design',
    title: 'Built a quick commerce brand and platform from concept to launch.',
    description:
      'Ojiffy is a quick commerce platform connecting users with nearby stores and service providers for fast, on-demand delivery of everyday essentials — groceries, food, pharmacy, and more. Built around speed, convenience, and reliability.',
    tags: ['BRAND IDENTITY', 'PRODUCT DESIGN', 'UI/UX'],
    metric: '0→1',
    metricLabel: 'BRAND TO LAUNCH',
    previewImage: '/images/ojiffy-preview.png',
    previewGradient: 'linear-gradient(135deg, #1a0f00 0%, #3d2500 40%, #150c00 100%)',
    website: 'https://ojiffy.com',
    scope: 'Brand Strategy · Logo & Mascot Design · UI/UX · Design System · Website Design · Creative Direction',
    problem:
      'Build a trusted, scalable platform and a memorable brand that delivers a seamless shopping experience while making local commerce faster and more accessible.',
    approach: [
      'Led brand strategy and identity — logo, mascot design and visual language built for recognition and trust across all touchpoints.',
      'Designed the full UI/UX and website experience, from information architecture through to high-fidelity screens.',
      'Established a scalable design system to ensure consistency across mobile, web and marketing assets.',
      'Collaborated directly with developers through QA to ensure design intent was accurately translated to production.',
    ],
    outcome: [
      'Built the Ojiffy brand from concept to launch',
      'Designed the website and core user experience',
      'Established a scalable design system',
      'Created a modern, consistent brand across all touchpoints',
    ],
    nextProject: 'datamellon',
    nextProjectLabel: 'Datamellon',
  },
];

export const experience = [
  { period: '2025 — Present', company: 'Datamellon', role: 'UXUI Designer' },
  { period: 'Jan 2026 — Present', company: 'Ojiffy', role: 'Co-Founder & Head of Design' },
  { period: 'Feb 2025 — Aug 2025', company: 'Codar Tech Academy', role: 'Design Instructor & Mentor' },
  { period: '2024 — 2025', company: 'Viscio Logistics', role: 'Lead Product Designer' },
  { period: 'Jun 2024 — Dec 2024', company: 'Zeph Agency', role: 'UI/UX Designer' },
  { period: '2021 — 2022', company: 'Freelance', role: 'Product Designer · Front-end' },
  { period: '2021', company: 'Suno Studio', role: 'UI/UX Design Intern' },
];

export const stats = [
  { value: 5, suffix: '+', label: 'Years shipping across dynamic teams and freelance engagements' },
  { value: 75, suffix: '+', label: 'Members across Africa, taught through Codar Tech Academy' },
  { value: 25, suffix: '+', label: 'Projects completed across fintech, logistics, education and more' },
];

export const skills = [
  'Figma', 'Figma Make', 'Prototyping',
  'User Research', 'Information Architecture', 'Design Systems',
  'UX Writing', 'Claude Code', 'Stitch',
  'Vibe Coding', 'Lovable', 'Jira',
];
