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
    id: 'viscio-logistics',
    number: '01',
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
    number: '02',
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
    number: '03',
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
    nextProject: 'viscio-logistics',
    nextProjectLabel: 'Viscio Logistics',
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
