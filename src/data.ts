import { Service, PortfolioItem, TeamMember, FAQItem, Testimonial } from './types';

export const SERVICES_DATA: Service[] = [
  {
    id: 'digital-craft',
    title: 'Digital Craft & Brand Architecture',
    description: 'We carve high-end digital identities, translating cinematic brand stories into interactive web marvels.',
    longDescription: 'Our brand-first approach ensures your website is not just a utility, but a narrative experience. We design bespoke visual universes with extreme attention to typographic scale, micro-interactions, and visual harmony.',
    category: 'Branding & Design',
    iconName: 'Sparkles',
    features: ['High-fidelity responsive mockups', 'Bespoke typographic systems', 'Custom particle & fluid animations', 'Next-Gen logo & visual identity definition'],
    priceRange: '$12k - $30k'
  },
  {
    id: 'ai-synthetics',
    title: 'AI Integration & Synthetic Cognitive Systems',
    description: 'Deploy real-time server-side Gemini intelligence directly into your workflow to automate complex user workflows.',
    longDescription: 'Inject powerful LLM agents and multi-modal models directly inside of consumer products. From natural language analytical engines to adaptive AI-driven interfaces that personalize layouts in real-time.',
    category: 'AI & Engineering',
    iconName: 'Cpu',
    features: ['Gemini multi-modal pipeline architecture', 'Natural language semantic parsing', 'Predictive UI load caching', 'High-speed edge node deployments'],
    priceRange: '$20k - $50k'
  },
  {
    id: 'motion-narrative',
    title: 'Cinematic Motion & WebVR Experience',
    description: 'Bespoke high-performance interactive physics, scrolling narratives, and immersive 3D-like experiences built for high conversion.',
    longDescription: 'Harness the web as a canvas for emotion. Using advanced canvas rendering, hardware-accelerated scroll-triggers, and responsive micro-animations, we turn boring static pages into cinematic interactive stories.',
    category: 'Creative Engineering',
    iconName: 'Flame',
    features: ['Infinite fluid particle canvas structures', 'Hardware-accelerated webGL integrations', 'Cursor magnetic field interaction models', 'Adaptive timeline-based scroll triggers'],
    priceRange: '$15k - $35k'
  },
  {
    id: 'saas-engines',
    title: 'High-Volume SaaS Core Architectures',
    description: 'Bulletproof full-stack scaling using optimized architectures with sub-millisecond edge API responses.',
    longDescription: 'Enterprise-grade Web apps engineered for maximum throughput. Designed with multi-layered secure endpoints, real-time sync structures, and sub-100ms layout shifts for unmatched professional rendering.',
    category: 'SaaS Engineering',
    iconName: 'Layers',
    features: ['Edge-routed reactive databases', 'Sub-100ms TTFB global rendering', 'Secure JWT/OAuth credential nodes', 'Built-to-scale infrastructure templates'],
    priceRange: '$25k - $80k'
  }
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 'neuro-synth',
    title: 'NEUROSYS™ — AI Mindmap & Synaptic Engine',
    category: 'AI & Engineering',
    description: 'A hardware-accelerated interactive canvas allowing direct mental brainstorming mapped via real-time LLM structures.',
    imageUrl: '/images/futuristic_hero_1780862257652.png',
    services: ['AI Integration', 'Creative Engineering', 'UI/UX Redesign'],
    stats: { label: 'Performance Raise', value: '+340%' },
    scope: 'Full Product Design & LLM Core Integration',
    client: 'NeuroSystems Corp'
  },
  {
    id: 'orion-capsule',
    title: 'ORION CAPSULE — Luxury Temporal Wearables',
    category: 'Branding & Design',
    description: 'Brand identity and dynamic interactive scroll story for the release of Orion\'s premier quantum watch line.',
    imageUrl: '/images/project_kronos.svg',
    services: ['Digital Craft', 'Cinematic Motion'],
    stats: { label: 'Sell-Out Duration', value: '14 Mins' },
    scope: 'Interactive Marketing Engine & Identity',
    client: 'Orion Kronos Switzerland'
  },
  {
    id: 'apex-ledger',
    title: 'APEX LEDGER — Sovereign Asset Core Protocol',
    category: 'SaaS Engineering',
    description: 'High-throughput crypto-asset transaction matrix built with ultra-low latency real-time status modules.',
    imageUrl: '/images/project_nebula.svg',
    services: ['SaaS Engineering', 'Security Architecture'],
    stats: { label: 'Daily Volume Secured', value: '$840M' },
    scope: 'Protocol Interface Mockup & Core Portal',
    client: 'Apex Financial Labs'
  },
  {
    id: 'vortex-capsule',
    title: 'VORTEX — Deep Space Simulation OS',
    category: 'Creative Engineering',
    description: 'An immersive telemetry dashboard visualizing orbital coordinates and atmosphere readings using dynamic Canvas rendering.',
    imageUrl: '/images/project_vertex.svg',
    services: ['Creative Engineering', '3D UI Graphics'],
    stats: { label: 'Frame rate locked', value: '120fps' },
    scope: 'Sub-orbital Simulation UI Engine',
    client: 'Vortex Aerospace'
  }
];

export const TEAM_DATA: TeamMember[] = [
  {
    name: 'Xavier Vance',
    role: 'Creative Director & Founder',
    avatarUrl: '/images/avatar_evelyn.svg',
    bio: 'Pioneering sensory digital layouts for over twelve years. Obsessed with micro-typography, physical hardware visor graphics, and high-contrast styling.'
  },
  {
    name: 'Sariyah Thorne',
    role: 'Principal Creative Engineer',
    avatarUrl: '/images/avatar_julian.svg',
    bio: 'Specialist in custom GPU shader pipelines, math-driven transitions, and interactive physics mechanics. Turning pure ideas into liquid-smooth animations.'
  },
  {
    name: 'Kenji Sato',
    role: 'Lead AI System Architect',
    avatarUrl: '/images/avatar_ai.svg',
    bio: 'Architecting edge LLM middleware structures and multi-modal embedding classifiers. Obsessed with offline-first, speed-first system designs.'
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: 'How does Gander achieve sub-100ms interface rendering speeds?',
    answer: 'We construct all pipelines using modern React frameworks decoupled from redundant library weights. We build custom mathematical transitions via motion state variables rather than complex heavy engines, ensuring smooth 120 FPS on all devices.'
  },
  {
    question: 'Can you integrate real-time server-side Gemini intelligence?',
    answer: 'Yes. We build production-ready agent nodes that consume model predictions, classify intent, handle custom tools, and cache UI layers ahead of user requests using standard server-side routers.'
  },
  {
    question: 'Is the interactive orange halo theme fully responsive?',
    answer: 'Absolutely. Every panel, fluorescent glow, and visual gradient dynamically scales according to device screen sizing, transitioning comfortably from 4K displays down to ultra-compact mobile viewport systems.'
  },
  {
    question: 'What is Gander\'s standard timeline for client launches?',
    answer: 'High-end exploratory landing experiences ship within 4-6 weeks under rigorous design cycles. Comprehensive full-stack SaaS or conversational AI platforms take between 8-12 weeks.'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    name: 'Evelyn Sterling',
    role: 'VP of Digital Innovation',
    company: 'NovaGen Labs',
    text: 'Gander took our conceptual vision and engineered an absolute masterpiece. Our conversion grew by 85% in two weeks pure, driven entirely by the cinematic scroll layouts and futuristic responsive feel.',
    avatarUrl: '/images/avatar_leandra.svg',
    rating: 5
  },
  {
    name: 'Marcus Kaelen',
    role: 'Chief of Strategy',
    company: 'Apex Core Platform',
    text: 'Their design discipline is unlike anything we have seen. They refused to load our page with generic templates, crafting instead an incredibly custom, dark luxury, orange-neon terminal that leaves clients speechless.',
    avatarUrl: '/images/avatar_marcus.svg',
    rating: 5
  }
];
