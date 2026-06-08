/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo, MouseEvent, FormEvent, ChangeEvent } from 'react';
import { 
  ArrowUpRight, 
  Check, 
  Loader2, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  Globe, 
  X, 
  Send, 
  Cpu, 
  Sparkles, 
  Layers, 
  Compass, 
  Smile, 
  ExternalLink, 
  Star, 
  Volume2, 
  VolumeX, 
  Plus, 
  Minus,
  MessageSquare,
  Activity,
  Bot
} from 'lucide-react';
import { PageId, Service, PortfolioItem, TeamMember, FAQItem, Testimonial } from './types';

export default function App() {
  // Navigation active tab State
  const [activeTab, setActiveTab] = useState<PageId>('home');
  
  // Custom audio synthesizer settings 
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Custom particle state
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number }>>([]);
  
  // Mouse position status for background glow
  const [mousePos, setMousePos] = useState({ x: 500, y: 350 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Live date & clock state
  const [currentTime, setCurrentTime] = useState<string>('');
  
  // Portfolio filter categories
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Selected portfolio item for detail modal
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  
  // AI Chat panel states
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; time: string }>>([
    {
      sender: 'assistant',
      text: 'SYSTEM ONLINE // I am AETHER core director. How may I configure your next interactive SaaS experience today?',
      time: '16:28'
    }
  ]);
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Quick email subscribe state in hero
  const [heroEmail, setHeroEmail] = useState('');
  const [heroEmailSuccess, setHeroEmailSuccess] = useState(false);

  // Pricing premium calculator states (Embedded in services)
  const [budgetRange, setBudgetRange] = useState<number>(35000);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['ux_strategy', 'custom_motion']);

  // Contact Form state with custom validators
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Interactive Product Platforms',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSuccess, setFormSuccess] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  
  // FAQ accordion active indices state
  const [openFaqIndexes, setOpenFaqIndexes] = useState<Record<number, boolean>>({ 0: true });

  // Generate background particles once on load
  useEffect(() => {
    const list = [];
    for (let i = 0; i < 20; i++) {
      list.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10
      });
    }
    setParticles(list);
  }, []);

  // Update timezone clock every single second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format as New York time or similar premium visual clock style
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const nyTime = new Intl.DateTimeFormat('en-US', options).format(now);
      setCurrentTime(`NEW YORK, USA - ${nyTime}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Web Audio frequency synthesizer trigger for feedback sound effects
  const playBeep = (freq = 800, duration = 0.05, type: OscillatorType = 'sine') => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio failed or blocked by iframe security policy
    }
  };

  // Track cursor movement across background panel grid
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // Mock static datasets optimized for luxurious presentation
  const services: Service[] = useMemo(() => [
    {
      id: 'platform',
      title: 'Interactive Product Platforms',
      description: 'Ultra-responsive frontend experiences engineered in React & WebGL.',
      longDescription: 'We merge hyper-optimized state machine systems with gorgeous motion mechanics, turning static websites into physical, cinematic products that convert customers on impact.',
      category: 'Frontend Engineering & Strategy',
      iconName: 'Layers',
      features: ['Bespoke Fluid Architecture', '120fps Rendering Velocity', 'State Sync Engines', 'Strict WCAG AAA Contrast Levels'],
      priceRange: '$25K - $50K'
    },
    {
      id: 'ai-orchestra',
      title: 'Artificial Intelligence Orchestration',
      description: 'Custom-instantiated autonomous LLM intelligence panels.',
      longDescription: 'We install custom LLM bridges (Google Gemini 2.5) that operate client-side or server-side. Track, audit, and analyze business telemetry streams using tailored context frameworks.',
      category: 'AI Integrations & Automation',
      iconName: 'Cpu',
      features: ['Direct Gemini SDK Integrations', 'Strict API Privacy Sandboxing', 'Custom Memory Cache Pools', 'Dynamic Prompt Architecture'],
      priceRange: '$35K - $80K'
    },
    {
      id: 'brand-system',
      title: 'Cinematic Brand Systems',
      description: 'Sophisticated typography guidelines and luxury identity kits.',
      longDescription: 'We craft high-contrast dark-mode brand universes. From tailored geometric SVG motion frames to custom micro-sound, we define the next generation of premium business luxury.',
      category: 'Creative Art Direction',
      iconName: 'Sparkles',
      features: ['Tailored Brand Archetype Books', 'Micro-haptics & Sound Architecture', 'Bespoke SVG Vector Motion Lines', 'Immersive UX Copywriting'],
      priceRange: '$15K - $30K'
    },
    {
      id: 'saas-ecosystem',
      title: 'Immersive SaaS Ecosystems',
      description: 'Scalable multi-tenant dashboards with high-throughput metrics.',
      longDescription: 'Enterprise panels with custom bento-grid modular layouts. Built edge-first to guarantee lightning fast response metrics independent of local bandwidth variance.',
      category: 'Cloud Engineering & SaaS',
      iconName: 'Compass',
      features: ['Edge-served Static Page Pipelines', 'Responsive Bento grid interfaces', 'Real-time state telemetry tracking', 'Zero layout shift architecture'],
      priceRange: '$40K - $100K'
    }
  ], []);

  const portfolioItems: PortfolioItem[] = useMemo(() => [
    {
      id: 'gemini-orbit',
      title: 'GEMINI ORBIT',
      category: 'Artificial Intelligence',
      description: 'Interactive telemetry workspace for configuring client-side neural agent paths.',
      imageUrl: '/images/futuristic_hero_1780862257652.png', // Main generated hero reference asset
      services: ['UX/UI Re-engineering', 'Gemini APIs', 'Dashboard Motion Flow'],
      stats: { label: 'Data Processing Rate', value: '8.4M keys/sec' },
      scope: 'Core Web Platform',
      client: 'Orbital Dynamics Inc.'
    },
    {
      id: 'kronos-core',
      title: 'KRONOS TRANSACTION ENGINE',
      category: 'Fintech Platform',
      description: 'High-throughput black luxury trading interface showing latency fluctuations below 4ms.',
      imageUrl: '/images/project_kronos.svg',
      services: ['High-Performance State Engine', 'Telemetry Feeds', 'Audio Click-Sync'],
      stats: { label: 'Transaction Latency', value: '2.8ms avg' },
      scope: 'Interactive Dashboard',
      client: 'Kronos Securities LLC'
    },
    {
      id: 'nebula-stream',
      title: 'NEBULA CLOUD MATRIX',
      category: 'Creative Product',
      description: 'Ultra-low-latency real-time video streaming client with full-mesh audio visualization.',
      imageUrl: '/images/project_nebula.svg',
      services: ['WebGL Particle Fields', 'Adaptive Buffering Systems', 'Tactile UI Mode'],
      stats: { label: 'Stream Resolution Up', value: '+42% efficiency' },
      scope: 'Static SPA Experience',
      client: 'Nebula Visionary Entertainment'
    },
    {
      id: 'vertex-cargo',
      title: 'VERTEX CONTROL GRID',
      category: 'SaaS Ecosystem',
      description: 'Interactive geographical and structural warehouse telemetry panel with fluid layout.',
      imageUrl: '/images/project_vertex.svg',
      services: ['Bento Grid Component Setup', 'SVG Asset Pipelines', 'Real-time Alerts'],
      stats: { label: 'Audit Time Reduction', value: '-85% saved' },
      scope: 'Multi-Tenant Panel UI',
      client: 'Vertex Global Cargo Corp.'
    }
  ], []);

  const milestones = [
    { year: '2024', title: 'AETHER Foundation', desc: 'Agency launched as an elite collective of 3 elite developer-designers dedicated to raw web excellence.' },
    { year: '2025', title: 'SaaS Acceleration Shift', desc: 'Integrated custom AI APIs into client interfaces, doubling active user engagement retention scores.' },
    { year: '2026', title: 'Future Paradigm Unleashed', desc: 'Achieved sub-10ms response thresholds on all responsive production static architectures.' }
  ];

  const team: TeamMember[] = [
    {
      name: 'Dr. Evelyn Vance',
      role: 'CREATIVE DIRECTOR & HUMAN IN THE LOOP',
      avatarUrl: '/images/avatar_evelyn.svg',
      bio: 'Evelyn leads standard design hierarchies. She brings over 14 years of creative conceptual styling and premium brand architecture.'
    },
    {
      name: 'Julian Thorne',
      role: 'CHIEF FRONTEND GENERAL',
      avatarUrl: '/images/avatar_julian.svg',
      bio: 'Julian is obsessed with raw browser framerates, CSS physics loops, and reactive state optimization. Hand-writes complex audio contexts.'
    },
    {
      name: 'AETHER Mainframe AI',
      role: 'INTELLIGENCE ORCHESTRATOR',
      avatarUrl: '/images/avatar_ai.svg',
      bio: 'Our co-pilot custom autonomous agent system, answering development queries, sorting file structures, and checking validation syntax.'
    }
  ];

  const faqs: FAQItem[] = [
    {
      question: 'What sets AETHER separated from generic agencies?',
      answer: 'We reject generic pre-made templates and slow builder frameworks. Every aspect of our code is carved from bare metal using responsive React state, custom Web Audio loops, and premium custom CSS variables configured to deliver extremely beautiful cinematic results.'
    },
    {
      question: 'Will this premium layout run efficiently on mobile mobile devices?',
      answer: 'Absolutely. Every grid layer is configured using responsive CSS classes (sm, md, lg, xl) that snap fluidly from desktop visual boards to intuitive single-screen touch interfaces with spacious targets.'
    },
    {
      question: 'How do you approach AI model integration in client dashboards?',
      answer: 'We implement direct server-to-server proxies or secure client access tokens with Gemini. We set up prompt orchestration states that provide contextual memory without revealing private core API keys to browser console monitors.'
    },
    {
      question: 'What is the standard development timeline?',
      answer: 'Initial premium interactive blueprints are fully compiled in 2-3 weeks. Full-scale SaaS products with customized dashboard systems typically take between 6 to 8 weeks depending on telemetry requirements.'
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: 'Leandra Hayes',
      role: 'Director of UX Strategy',
      company: 'Quantum Ascent',
      text: 'AETHER completely re-sculpted our SaaS landing workflow. Users are captivated by the gorgeous visual transition states. Our Conversion targets soared by 280% in the first month alone!',
      avatarUrl: '/images/avatar_leandra.svg',
      rating: 5
    },
    {
      name: 'Marcus Kaelen',
      role: 'VP Ecosystem Engineering',
      company: 'Kronos Group',
      text: 'Engineering compliance usually means visually boring screens. Julian and Evelyn crafted an incredibly beautiful, reactive dashboard that makes asset analysis feel like a sci-fi motion sequence.',
      avatarUrl: '/images/avatar_marcus.svg',
      rating: 5
    }
  ];

  // Quick subscribe from hero section
  const handleHeroSubmit = (e: FormEvent) => {
    e.preventDefault();
    playBeep(900, 0.08, 'triangle');
    if (!heroEmail || !heroEmail.includes('@')) {
      alert('A valid communication format email is required.');
      return;
    }
    setHeroEmailSuccess(true);
    setTimeout(() => {
      setHeroEmail('');
      setHeroEmailSuccess(false);
    }, 5000);
  };

  // Pricing calculator toggle function
  const toggleFeature = (id: string) => {
    playBeep(600, 0.03, 'sine');
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  // Calculated custom budget calculation from services slider
  const calculatedQuote = useMemo(() => {
    let basis = budgetRange;
    selectedFeatures.forEach(f => {
      if (f === 'ux_strategy') basis += 8500;
      if (f === 'custom_motion') basis += 12000;
      if (f === 'gemini_chat') basis += 15000;
      if (f === 'offline_mesh') basis += 9500;
    });
    return basis;
  }, [budgetRange, selectedFeatures]);

  // Form handle change
  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors as user tapes
    if (formErrors[name]) {
      setFormErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  // Custom client validation on contact form
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    playBeep(1000, 0.1, 'sine');
    
    // Simple validator logic
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Identified identity label required.';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'A valid digital post address required.';
    if (!formData.message.trim() || formData.message.length < 10) errors.message = 'Please provide a clear project brief (minimum 10 characters).';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      playBeep(300, 0.25, 'sawtooth');
      return;
    }

    setFormLoading(true);
    // Simulate premium microsecond delay callback
    setTimeout(() => {
      setFormLoading(false);
      setFormSuccess(true);
      playBeep(1200, 0.15, 'sine');
      // Reset form fields
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: 'Interactive Product Platforms',
        message: ''
      });
    }, 1800);
  };

  // Safe client-side Gemini chat interaction
  const handleSendAiMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    
    playBeep(980, 0.05, 'triangle');
    const userMsg = aiInput.trim();
    setAiInput('');
    
    const formattedTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    const messageHistory = [...aiMessages, { sender: 'user' as const, text: userMsg, time: formattedTime }];
    setAiMessages(messageHistory);
    
    setIsAiTyping(true);

    try {
      // Check if GEMINI_API_KEY environment variable presents or simulate highly immersive expert response
      const env = (import.meta as any).env || {};
      const hasApiKey = env.VITE_GEMINI_API_KEY && env.VITE_GEMINI_API_KEY !== 'MY_GEMINI_API_KEY';
      
      let replyText = '';
      
      if (hasApiKey) {
        // Fetch client-side response dynamically from the Gemini API model
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${env.VITE_GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are AETHER CORE DIRECTOR, an award-winning creative developer agent specializing in high-contrast neon-orange cybersecurity dark luxury UI designs, React/Tailwind code, and sleek web experiences. Respond briefly (max 3 sentences) with a futuristic technical tone, using labels like "// PROPOSAL CONFIGURED" or "// INTEL ONLINE" depending on user's inquiry: "${userMsg}"`
              }]
            }]
          })
        });
        const data = await response.json();
        replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '// ERROR: Telemetry loop fault. Simulated offline core loaded.';
      } else {
        // Highly customized preset smart simulation based on user keywords
        await new Promise(resolve => setTimeout(resolve, 1200));
        const normalized = userMsg.toLowerCase();
        
        if (normalized.includes('price') || normalized.includes('cost') || normalized.includes('budget') || normalized.includes('how much')) {
          replyText = `// INTELLIGENCE CORE ONLINE: Visual experiences scale from $15,000 for boutique brands to $100,000+ for enterprise dashboard applications. What target system complexity level fits your road map?`;
        } else if (normalized.includes('time') || normalized.includes('duration') || normalized.includes('fast') || normalized.includes('long')) {
          replyText = `// TIMELINE SYNC: Elegant visual prototype wireframes initialize in 2 weeks. Complete React dashboards with full telemetry integrations execute in 40 to 60 solar cycles.`;
        } else if (normalized.includes('technology') || normalized.includes('stack') || normalized.includes('react') || normalized.includes('code')) {
          replyText = `// MAINFRAME ARCHITECTURE: We assemble custom layouts utilizing React 19, Tailwind CSS v4, customized Web Audio synthesizers, and optimized DOM canvas loops. Solid, fluid, hand-crafted code with zero bloat.`;
        } else {
          replyText = `// TELEMETRY LOGGED: AETHER matches system parameters to requested input. Our senior human architects will sync with you immediately. Type 'price', 'technology', or 'timeline' for instant core telemetry metrics.`;
        }
      }

      setAiMessages(prev => [...prev, {
        sender: 'assistant',
        text: replyText,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
      }]);
      playBeep(1100, 0.08, 'sine');
    } catch (err) {
      console.error(err);
      setAiMessages(prev => [...prev, {
        sender: 'assistant',
        text: '// TELEMETRY ERROR: Mainframe network congested. Active link connection requested.',
        time: formattedTime
      }]);
    } finally {
      setIsAiTyping(false);
    }
  };

  return (
    <div 
      id="aether-workspace"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#030303] text-white relative flex flex-col font-sans select-none overflow-x-hidden selection:bg-[#F27D26] selection:text-black"
      style={{
        cursor: 'default'
      }}
    >
      {/* Dynamic Background Grid and Radial Glow Tracker */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Animated grid overlay */}
        <div className="absolute inset-0 animate-grid-flow opacity-15" />
        
        {/* Custom interactive mouse glow mapped dynamically */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[160px] opacity-[0.12] transition-transform duration-300 ease-out pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #F27D26 0%, #FF2D55 70%, transparent 100%)',
            left: `${mousePos.x - 300}px`,
            top: `${mousePos.y - 300}px`
          }}
        />

        {/* Static Neon Mood Glows at critical layout junctions */}
        <div className="absolute top-[10%] left-[-150px] w-[500px] h-[500px] rounded-full bg-[#f27d26] opacity-[0.05] blur-[140px]" />
        <div className="absolute bottom-[15%] right-[-150px] w-[600px] h-[600px] rounded-full bg-[#ff2d55] opacity-[0.06] blur-[150px]" />
        
        {/* Drift ambient particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            id={`particle-${p.id}`}
            className="absolute bg-gradient-to-tr from-[#F27D26] to-[#FF2D55] rounded-full opacity-60 pointer-events-none"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `floatParticle ${p.duration}s infinite linear`,
              animationDelay: `${p.delay}s`
            }}
          />
        ))}

        {/* Scanline atmospheric tint */}
        <div className="scanlines absolute inset-0 opacity-15" />
      </div>

      {/* Futuristic Floating Interactive Audio and Navigation Rails */}
      <div className="fixed left-6 bottom-8 z-50 hidden xl:flex flex-col items-center gap-6 mix-blend-difference">
        <button 
          id="audio-toggle-btn"
          onClick={() => {
            setSoundEnabled(!soundEnabled);
            if (!soundEnabled) {
              // Beep immediately to indicate state set to ON
              setTimeout(() => {
                const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                const osc = ctx.createOscillator();
                const g = ctx.createGain();
                osc.frequency.setValueAtTime(600, ctx.currentTime);
                g.gain.setValueAtTime(0.01, ctx.currentTime);
                osc.connect(g);
                g.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.05);
              }, 50);
            }
          }}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
            soundEnabled 
              ? 'border-[#F27D26]/60 text-[#F27D26] bg-[#F27D26]/5 shadow-[0_0_10px_rgba(242,125,38,0.2)]' 
              : 'border-white/20 text-white/50 bg-black/40 hover:border-white/40'
          }`}
          title={soundEnabled ? "Mute interactive synthesized bleeps" : "Unmute interactive synthesized bleeps"}
        >
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
        <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent"></div>
        <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase rotate-180 select-none whitespace-nowrap [writing-mode:vertical-rl]">
          AETHER MATRIX INTERVIEW
        </span>
      </div>

      <div className="fixed right-6 bottom-8 z-50 hidden xl:flex flex-col items-center gap-4">
        {/* Step indicator aligned with current page screen */}
        <div className="flex flex-col gap-2.5 items-center">
          {(['home', 'services', 'portfolio', 'about', 'contact'] as PageId[]).map((tab) => (
            <button
              key={tab}
              id={`rail-dot-${tab}`}
              onClick={() => {
                playBeep(450 + 100 * ['home', 'services', 'portfolio', 'about', 'contact'].indexOf(tab), 0.04);
                setActiveTab(tab);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeTab === tab 
                  ? 'bg-[#F27D26] scale-125 shadow-[0_0_8px_#F27D26]' 
                  : 'bg-white/25 hover:bg-white/50'
              }`}
              title={`Switch view to ${tab}`}
            />
          ))}
        </div>
      </div>

      {/* Cyberpunk Top Header Nav */}
      <header id="aether-navbar" className="sticky top-0 z-40 bg-black/60 backdrop-blur-md border-b border-white/5 px-4 md:px-10 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo element with red-orange accent */}
          <div 
            onClick={() => { playBeep(850, 0.06); setActiveTab('home'); }} 
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="relative w-9 h-9 bg-gradient-to-br from-[#F27D26] to-[#FF2D55] rounded-xl flex items-center justify-center p-[1px] shadow-[0_0_15px_rgba(242,125,38,0.25)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#050505] rounded-[11px] flex items-center justify-center">
                <span className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F27D26] to-[#FF2D55] tracking-tighter">Æ</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-md font-bold tracking-tight uppercase font-mono text-white group-hover:text-[#F27D26] transition-colors">
                AETHER<span className="text-[#F27D26]">.</span>CO
              </span>
              <span className="text-[9px] text-white/30 font-mono tracking-widest leading-none">CORE MODULE</span>
            </div>
          </div>
        </div>

        {/* Tab Selection Navigation links */}
        <nav className="hidden md:flex items-center gap-1.5 border border-white/5 rounded-full p-1 bg-white/[0.02] backdrop-blur-sm">
          {(['home', 'services', 'portfolio', 'about', 'contact'] as PageId[]).map((tab) => (
            <button
              key={tab}
              id={`nav-link-${tab}`}
              onClick={() => {
                playBeep(650 + (100 * ['home', 'services', 'portfolio', 'about', 'contact'].indexOf(tab)), 0.05);
                setActiveTab(tab);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-[#F27D26] to-[#FF2D55]/90 text-white shadow-[0_2px_10px_rgba(242,125,38,0.2)]'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Call to action button with sound feedback */}
        <div className="flex items-center gap-4">
          <button 
            id="button-start-nav"
            onClick={() => {
              playBeep(1100, 0.09, 'sine');
              setActiveTab('contact');
            }}
            className="hidden sm:inline-flex px-5 py-2.5 bg-[#ffffff] hover:bg-gradient-to-r hover:from-[#F27D26] hover:to-[#FF2D55] text-black hover:text-white text-xs font-bold tracking-widest rounded-full transition-all duration-300 shadow-[0_2px_12px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(242,125,38,0.25)] hover:scale-105 cursor-pointer"
          >
            START PROJECT
          </button>

          {/* Clean Mobile menu trigger inside iframe view */}
          <div className="md:hidden flex gap-2">
            <select
              value={activeTab}
              onChange={(e) => {
                playBeep(700, 0.06);
                setActiveTab(e.target.value as PageId);
              }}
              className="bg-[#111111] border border-white/15 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#F27D26] text-white"
            >
              <option value="home">Home</option>
              <option value="services">Services</option>
              <option value="portfolio">Portfolio</option>
              <option value="about">About</option>
              <option value="contact">Contact</option>
            </select>
          </div>
        </div>
      </header>

      {/* Global Status/Ticker Tapes representing visual elite agency metrics */}
      <div id="live-telemetry-banner" className="bg-[#0c0c0d] border-b border-white/5 py-2.5 px-4 md:px-10 flex flex-wrap justify-between items-center text-[11px] font-mono tracking-widest text-white/50 select-none gap-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26] animate-pulse"></span>
          <span>AETHER GLOBAL INTEGRITY SECURE CLIENT CONNECTED</span>
        </div>
        <div className="flex items-center gap-4">
          <span>LATENCY // OK (3.24ms)</span>
          <span className="hidden sm:inline text-[#FF2D55] uppercase font-bold">{currentTime || 'LOADING DATASTREAM...'}</span>
        </div>
      </div>

      {/* Main View Workspace Area */}
      <main className="flex-1 flex flex-col relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* HOME VIEW: Stunning Cinematic Presentation Inspired by references */}
        {activeTab === 'home' && (
          <div id="home-view" className="space-y-16 animate-fade-in">
            
            {/* Supercharged Visual Hero: Resembling Gander composition and layout exactly */}
            <div className="relative w-full min-h-[640px] lg:h-[calc(100vh-160px)] lg:min-h-[750px] flex flex-col lg:flex-row items-center justify-between pt-4 pb-12 lg:py-0 overflow-hidden select-none">
              
              {/* Radial Hot-glow behind the main subject */}
              <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[680px] md:h-[680px] rounded-full blur-[100px] md:blur-[160px] opacity-[0.25] pointer-events-none z-0 mix-blend-screen bg-radial from-[#F27D26] via-[#FF2154] to-transparent" />
              
              {/* Massive Oversized Typography behind the subject */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center font-black pointer-events-none select-none z-0">
                <span className="text-[14vw] tracking-tighter text-white/[0.035] leading-none text-center font-sans tracking-wide select-none font-bold">
                  AETHER
                </span>
              </div>

              {/* CENTER SUBJECT: Center-focused exquisite female android composition */}
              <div className="absolute lg:inset-0 flex items-center justify-center pointer-events-none z-10 select-none order-2 lg:order-none my-8 lg:my-0">
                <div className="relative w-[300px] sm:w-[380px] lg:w-[480px] aspect-[4/5] flex items-center justify-center">
                  <img 
                    src="/images/futuristic_hero_1780862257652.png" 
                    alt="AETHER Cybernetic Android Helmet Portrait" 
                    className="w-full h-full object-cover rounded-2xl filter brightness-110 contrast-100 drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)] shadow-[0_0_80px_rgba(242,125,38,0.15)] transition-transform duration-700 hover:scale-105 pointer-events-auto"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle inner-atmosphere halo */}
                  <div className="absolute rounded-full border border-[#F27D26]/20 bg-[#F27D26]/3 blur-md h-[180px] w-[180px] md:h-[300px] md:w-[300px] pointer-events-none mix-blend-color-dodge animate-pulse opacity-60" />
                  
                  {/* Visual mask fading the bottom of description */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none" />
                </div>
              </div>

              {/* LEFT COLUMN PANEL: Beautiful aligned left-hand blocks */}
              <div className="w-full lg:w-[35%] flex flex-col items-start gap-8 z-25 order-1 lg:order-none relative">
                {/* 900+ Happy Clients Pill */}
                <div className="inline-flex items-center gap-2.5 py-2 px-4 rounded-full border border-white/5 bg-neutral-950/40 backdrop-blur-md shadow-lg">
                  <div className="flex -space-x-1.5">
                    <img className="w-5 h-5 rounded-full border border-black object-cover" src="/images/avatar_leandra.svg" alt="avatar-1" />
                    <img className="w-5 h-5 rounded-full border border-black object-cover" src="/images/avatar_generic1.svg" alt="avatar-2" />
                    <img className="w-5 h-5 rounded-full border border-black object-cover" src="/images/avatar_generic2.svg" alt="avatar-3" />
                  </div>
                  <span className="text-[10px] font-mono tracking-[0.15em] text-white/50 uppercase font-bold">900+ Happy Clients</span>
                </div>

                {/* Oversized typography layout block */}
                <div className="space-y-2">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.4vw] font-black tracking-tighter leading-[0.9] text-white">
                    Helped <br />
                    Launch <span className="text-shimmer bg-gradient-to-r from-[#F27D26] via-[#FF264D] to-[#F27D26] bg-clip-text text-transparent italic">&gt;120+</span> <br />
                    SaaS Systems<span className="text-[#F27D26]">.</span>
                  </h1>
                </div>

                {/* Left CTAs Pill Row */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    id="hero-start-now-pill"
                    onClick={() => { playBeep(950, 0.08, 'triangle'); setActiveTab('contact'); }}
                    className="px-8 py-4 bg-gradient-to-r from-[#F27D26] to-[#FF2D55] text-white font-bold rounded-full text-xs tracking-widest shadow-[0_4px_25px_rgba(242,125,38,0.35)] hover:shadow-[0_4px_35px_rgba(242,125,38,0.55)] hover:scale-[1.03] transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    START NOW
                  </button>
                  <button
                    id="hero-chat-now-pill"
                    onClick={() => { playBeep(750, 0.04); setIsAIChatOpen(true); }}
                    className="px-7 py-4 border border-white/10 bg-white/5 text-white/90 hover:bg-white/10 hover:border-white/30 font-bold rounded-full text-xs tracking-widest transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    CHAT WITH US
                    <ChevronRight size={13} className="text-white/60" />
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN PANEL: Aligned right-hand narrative description & Glass widgets */}
              <div className="w-full lg:w-[35%] flex flex-col items-start lg:items-end gap-10 z-25 order-3 lg:order-none relative">
                
                {/* Visual Description block */}
                <div className="space-y-4 lg:text-right flex flex-col lg:items-end max-w-sm">
                  <p className="text-white/50 text-sm md:text-base font-sans tracking-wide leading-relaxed">
                    AETHER is a premium global branding and digital design powerhouse focused on engineering tactile Web SaaS platforms and cinema-fidelity responsive interfaces.
                  </p>
                  
                  {/* Decorative underline guide */}
                  <button 
                    onClick={() => { playBeep(700, 0.04); setActiveTab('services'); }}
                    className="text-xs font-mono font-bold tracking-[0.2em] text-[#F27D26] hover:text-[#FF2D55] uppercase transition-colors inline-flex items-center gap-1.5 group font-bold"
                  >
                    HOW CAN WE HELP YOU?
                    <ArrowRight size={12} className="inline transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

                {/* Premium Glass Card Call Contact Widget */}
                <div className="bg-black/45 border border-white/5 rounded-2xl p-6 backdrop-blur-md max-w-[340px] w-full shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-t-white/10 relative overflow-hidden group">
                  {/* Top neon hairline indicator */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#F27D26]/40 to-transparent" />
                  
                  <div className="space-y-1.5 mb-5">
                    <h3 className="text-xs font-mono tracking-[0.25em] text-white uppercase font-bold">Contact by Email</h3>
                    <p className="text-[11px] text-white/35 font-sans">Enter your email and connect with are architects</p>
                  </div>

                  {/* Icon pills to mimic Gander social card symbols */}
                  <div className="flex gap-2 mb-6">
                    <button 
                      onClick={() => playBeep(500, 0.03)}
                      className="w-6 h-6 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-white/50 hover:text-white text-[9px] flex items-center justify-center font-mono font-bold transition-all cursor-pointer"
                    >
                      X
                    </button>
                    <button 
                      onClick={() => playBeep(520, 0.03)}
                      className="w-6 h-6 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-white/50 hover:text-white text-[9px] flex items-center justify-center font-mono font-bold transition-all cursor-pointer"
                    >
                      @
                    </button>
                    <button 
                      onClick={() => playBeep(540, 0.03)}
                      className="w-6 h-6 rounded-full bg-[#F27D26]/20 border border-[#F27D26]/40 text-[#F27D26] text-[9px] flex items-center justify-center font-mono font-bold transition-all"
                    >
                      in
                    </button>
                  </div>

                  {/* Form input frame */}
                  <form onSubmit={handleHeroSubmit} className="relative select-text">
                    {heroEmailSuccess ? (
                      <div className="text-[10px] font-mono font-bold text-[#F27D26] bg-[#F27D26]/10 py-3 px-4 rounded-xl border border-[#F27D26]/20 text-center uppercase animate-pulse">
                        // SECURE SYSTEM LINK DEPLOYED
                      </div>
                    ) : (
                      <div className="flex items-center bg-black/60 rounded-xl border border-white/10 px-4 py-1.5 focus-within:border-[#F27D26] transition-colors shadow-inner">
                        <input 
                          type="email" 
                          required
                          placeholder="Your Email" 
                          value={heroEmail}
                          onChange={(e) => setHeroEmail(e.target.value)}
                          className="bg-transparent text-white text-xs font-mono py-2 w-full focus:outline-none placeholder:text-white/20 select-text"
                        />
                        <button 
                          type="submit" 
                          className="w-8 h-8 rounded-full bg-[#F27D26] hover:bg-[#FF2D55] text-black hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2 shadow-md hover:scale-105"
                          title="Connect Address"
                        >
                          <Send size={11} className="transition-transform group-hover:translate-x-0.5" />
                        </button>
                      </div>
                    )}
                  </form>
                </div>

              </div>

            </div>

            {/* Trusted Brand Grid Banner */}
            <div className="border-y border-white/5 py-12 px-2 bg-neutral-950/20 backdrop-blur-sm">
              <div className="text-center mb-8">
                <span className="text-[10px] font-mono tracking-[0.3em] text-white/30 uppercase">
                  PROVIDING PREMIUM CODES FOR ELITE CLIENT ARCHITECTS
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center opacity-40 grayscale hover:opacity-75 transition-opacity max-w-4xl mx-auto">
                <div className="text-xs font-mono tracking-[0.4em] text-white uppercase font-bold">QUANTUM</div>
                <div className="text-xs font-mono tracking-[0.4em] text-white uppercase font-bold">NEBULA.IO</div>
                <div className="text-xs font-mono tracking-[0.4em] text-white uppercase font-bold">KRONOS</div>
                <div className="text-xs font-mono tracking-[0.4em] text-white uppercase font-bold">VERTEX_ST</div>
                <div className="hidden lg:block text-xs font-mono tracking-[0.4em] text-white uppercase font-bold">ORBITAL</div>
              </div>
            </div>

            {/* Feature Bento Grid (Brief Overview inside Home view to entice clients) */}
            <div className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-[#F27D26] text-[10px] font-mono tracking-[0.25em] uppercase">// CORE ATTRIBUTES</span>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">HOW WE CUSTOMIZE YOUR PARADIGM</h2>
                <p className="text-white/40 text-sm">We provide clean, pristine architectures with complete manual calibration controls.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Card 1 */}
                <div className="bg-[#0b0c0d]/60 border border-white/5 p-8 rounded-2xl space-y-4 hover:border-white/10 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[#F27D26] group-hover:scale-110 transition-transform">
                    <Cpu size={18} />
                  </div>
                  <h3 className="text-lg font-bold font-mono tracking-wider"> Bare-Metal Velocity</h3>
                  <p className="text-white/40 text-xs leading-relaxed">
                    Zero layout shifts. Optimized React DOM nodes crafted with strict component scoping guarantees quick rendering speeds.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-[#0b0c0d]/60 border border-white/5 p-8 rounded-2xl space-y-4 hover:border-white/10 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-[#FF2D55] group-hover:scale-110 transition-transform">
                    <Layers size={18} />
                  </div>
                  <h3 className="text-lg font-bold font-mono tracking-wider">Luxury Spacing Layouts</h3>
                  <p className="text-white/40 text-xs leading-relaxed">
                    Designed around generous negatives spaces, high-contrast text ratios, and custom linear glow effects to establish visual luxury hierarchy.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-[#0b0c0d]/60 border border-white/5 p-8 rounded-2xl space-y-4 hover:border-white/10 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                    <Sparkles size={18} />
                  </div>
                  <h3 className="text-lg font-bold font-mono tracking-wider">Cinematic Soundscapes</h3>
                  <p className="text-white/40 text-xs leading-relaxed">
                    Tailored audio synthesizers generated internally on interaction. Turn your client experience into a physical tech demonstration.
                  </p>
                </div>

              </div>
            </div>

            {/* Testimonials Showcase */}
            <div className="space-y-10 border-t border-white/5 pt-16">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                  <span className="text-[#FF2D55] text-[10px] font-mono tracking-[0.25em] uppercase">// METRIC PROOFS</span>
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">END-USER RESPONSE AUDITS</h2>
                </div>
                <div className="text-white/40 text-xs max-w-sm">Listen to direct telemetry feedback from core UX strategists who successfully deployed are interfaces.</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((t, idx) => (
                  <div key={idx} className="bg-gradient-to-b from-[#090a0b] to-[#040405] border border-white/5 p-8 rounded-2xl relative space-y-6">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} size={11} className="fill-[#F27D26] text-[#F27D26]" />
                        ))}
                      </div>
                      <span className="text-[12px] font-mono text-white/20 uppercase">CR-CODE // v.98</span>
                    </div>
                    <p className="text-white/60 text-sm tracking-wide leading-relaxed italic font-mono">
                      "{t.text}"
                    </p>
                    <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                      <img src={t.avatarUrl} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-white">{t.name}</h4>
                        <p className="text-[10px] text-white/40 uppercase font-mono">{t.role} — <span className="text-[#F27D26]">{t.company}</span></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini CTA Section before footer */}
            <div className="bg-gradient-to-r from-neutral-950 via-[#111] to-neutral-950 border border-white/5 rounded-3xl p-8 md:p-12 text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#F27D26]/40 to-transparent"></div>
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter">LAUNCH YOUR INTERACTIVE BLUEPRINT</h3>
              <p className="text-white/45 text-xs max-w-md mx-auto leading-relaxed">
                Unlock immediate technical engagement multipliers. Discuss your exact telemetry layout objectives with AETHER architects.
              </p>
              <div>
                <button
                  id="home-cta-contact"
                  onClick={() => { playBeep(1100, 0.08); setActiveTab('contact'); }}
                  className="px-8 py-3.5 bg-white text-black hover:bg-[#F27D26] hover:text-white font-bold rounded-full text-xs tracking-widest transition-all cursor-pointer"
                >
                  INITIALIZE COGNITIVE CONNECTION //
                </button>
              </div>
            </div>

          </div>
        )}

        {/* SERVICES VIEW: Feature Grid with Active Cost Calculator */}
        {activeTab === 'services' && (
          <div id="services-view" className="space-y-12 animate-fade-in">
            <div className="space-y-4">
              <span className="text-[#F27D26] text-[10px] font-mono tracking-[0.3em] uppercase">// SYSTEM BLUEPRINTS</span>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter">OUR SERVICES</h1>
              <p className="text-white/45 text-sm max-w-2xl">
                We custom-build high-fidelity applications designed to increase visual loyalty and accelerate user transactions. Read our architectural packages below.
              </p>
            </div>

            {/* Service Grid Cards with detailed breakdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((srv) => (
                <div key={srv.id} className="bg-[#0b0c0d]/80 border border-white/5 rounded-2xl p-8 space-y-6 hover:border-white/10 transition-all flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[#F27D26]">
                        {srv.iconName === 'Layers' && <Layers size={22} />}
                        {srv.iconName === 'Cpu' && <Cpu size={22} />}
                        {srv.iconName === 'Sparkles' && <Sparkles size={22} />}
                        {srv.iconName === 'Compass' && <Compass size={22} />}
                      </div>
                      <span className="text-xs font-mono text-white/30 tracking-widest">{srv.priceRange}</span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-mono tracking-widest text-white/40 block">{srv.category}</span>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-[#F27D26] transition-colors">{srv.title}</h3>
                      <p className="text-white/50 text-xs leading-relaxed">{srv.longDescription}</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 mt-6 space-y-3">
                    <span className="text-[9px] font-mono tracking-widest text-[#FF2D55] uppercase block">// IMPLEMENTATION METRICS:</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-white/60">
                      {srv.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <Check size={11} className="text-[#F27D26] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* PREMIUM INTERACTIVE BUDGET ESTIMATOR SLIDER (Showcase of client-side interactive luxury UX) */}
            <div className="bg-[#090a0b] border border-white/5 rounded-3xl p-8 md:p-12 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#F27D26]/10 to-transparent rounded-bl-full pointer-events-none" />
              
              <div className="space-y-2 text-center max-w-xl mx-auto">
                <span className="text-amber-500 text-[10px] font-mono tracking-[0.25em] uppercase">// SIMULATION CONFIGURATION PANEL</span>
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">CALIBRATE PROPOSAL REQUIREMENTS</h3>
                <p className="text-white/40 text-xs">Adjust budget allocations to automatically configure visual frameworks and estimated speeds.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-4">
                
                {/* Controls Left */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-white/50 uppercase">BASE BUDGET ALLOCATION:</span>
                      <span className="text-[#F27D26] font-bold">${budgetRange.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" 
                      min="15000" 
                      max="100000" 
                      step="5000"
                      value={budgetRange}
                      onChange={(e) => {
                        playBeep(400 + Number(e.target.value) / 200, 0.03, 'sine');
                        setBudgetRange(Number(e.target.value));
                      }}
                      className="w-full accent-[#F27D26] bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] font-mono text-white/30">
                      <span>$15,000 (BOUTIQUE)</span>
                      <span>$100,000 (ENTERPRISE MASTER)</span>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <span className="text-[10px] font-mono tracking-widest text-[#FF2D55] uppercase block">// OPTIONAL FRAMEWORK ADAPTERS:</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      
                      {/* Feature Item 1 */}
                      <button
                        onClick={() => toggleFeature('ux_strategy')}
                        className={`p-4 rounded-xl border text-left flex justify-between items-start cursor-pointer transition-all ${
                          selectedFeatures.includes('ux_strategy')
                            ? 'border-[#F27D26] bg-[#F27D26]/5 text-white'
                            : 'border-white/5 bg-black/40 text-white/40 hover:border-white/15'
                        }`}
                      >
                        <div className="space-y-1">
                          <h4 className="text-xs font-mono uppercase tracking-wider font-bold">Deep UX Auditing</h4>
                          <p className="text-[9px] text-white/50 lowercase">+8,500 coins</p>
                        </div>
                        {selectedFeatures.includes('ux_strategy') ? (
                          <div className="w-4 h-4 rounded-full bg-[#F27D26] flex items-center justify-center text-black">
                            <Check size={10} />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-white/20" />
                        )}
                      </button>

                      {/* Feature Item 2 */}
                      <button
                        onClick={() => toggleFeature('custom_motion')}
                        className={`p-4 rounded-xl border text-left flex justify-between items-start cursor-pointer transition-all ${
                          selectedFeatures.includes('custom_motion')
                            ? 'border-[#F27D26] bg-[#F27D26]/5 text-white'
                            : 'border-white/5 bg-black/40 text-white/40 hover:border-white/15'
                        }`}
                      >
                        <div className="space-y-1">
                          <h4 className="text-xs font-mono uppercase tracking-wider font-bold">High-End Motion Beeps</h4>
                          <p className="text-[9px] text-white/50 lowercase">+12,000 coins</p>
                        </div>
                        {selectedFeatures.includes('custom_motion') ? (
                          <div className="w-4 h-4 rounded-full bg-[#F27D26] flex items-center justify-center text-black">
                            <Check size={10} />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-white/20" />
                        )}
                      </button>

                      {/* Feature Item 3 */}
                      <button
                        onClick={() => toggleFeature('gemini_chat')}
                        className={`p-4 rounded-xl border text-left flex justify-between items-start cursor-pointer transition-all ${
                          selectedFeatures.includes('gemini_chat')
                            ? 'border-orange-500/50 bg-[#F27D26]/5 text-white'
                            : 'border-white/5 bg-black/40 text-white/40 hover:border-white/15'
                        }`}
                      >
                        <div className="space-y-1">
                          <h4 className="text-xs font-mono uppercase tracking-wider font-bold">AETHER AI Operator</h4>
                          <p className="text-[9px] text-white/50 lowercase">+15,000 coins</p>
                        </div>
                        {selectedFeatures.includes('gemini_chat') ? (
                          <div className="w-4 h-4 rounded-full bg-[#F27D26] flex items-center justify-center text-black">
                            <Check size={10} />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-white/20" />
                        )}
                      </button>

                      {/* Feature Item 4 */}
                      <button
                        onClick={() => toggleFeature('offline_mesh')}
                        className={`p-4 rounded-xl border text-left flex justify-between items-start cursor-pointer transition-all ${
                          selectedFeatures.includes('offline_mesh')
                            ? 'border-orange-500/50 bg-[#F27D26]/5 text-white'
                            : 'border-white/5 bg-black/40 text-white/40 hover:border-white/15'
                        }`}
                      >
                        <div className="space-y-1">
                          <h4 className="text-xs font-mono uppercase tracking-wider font-bold">Offline Service Mesh</h4>
                          <p className="text-[9px] text-white/50 lowercase">+9,500 coins</p>
                        </div>
                        {selectedFeatures.includes('offline_mesh') ? (
                          <div className="w-4 h-4 rounded-full bg-[#F27D26] flex items-center justify-center text-black">
                            <Check size={10} />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-white/20" />
                        )}
                      </button>

                    </div>
                  </div>
                </div>

                {/* Report Outputs Right */}
                <div className="bg-[#050505] p-8 border border-white/10 rounded-2xl flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-white/5">
                      <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase">CLIENT TELEMETRY ESTIMATE</span>
                      <span className="text-[#FF2D55] text-[10px] font-mono uppercase font-bold">CALIBRATION ONLINE //</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-[10px] font-mono text-white/35">ESTIMATED PRODUCTION QUOTE:</div>
                      <div className="text-4xl md:text-5xl font-mono font-black tracking-tight text-[#F27D26]">
                        ${calculatedQuote.toLocaleString()}
                      </div>
                    </div>

                    <div className="space-y-2 text-[11px] font-mono text-white/50 pt-2 space-y-1.5">
                      <div className="flex justify-between">
                        <span>ESTIMATED DELIVERY METRIC:</span>
                        <span className="text-white font-bold">
                          {budgetRange < 30000 ? '~3 calendar weeks' : budgetRange < 60000 ? '~6 calendar weeks' : '8-10 customized cycles'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>COMMITTED FRAME SVELTENESS:</span>
                        <span className="text-white font-bold">120fps physics target</span>
                      </div>
                      <div className="flex justify-between">
                        <span>INCLUDED SEED CLUSTERS:</span>
                        <span className="text-white font-bold">{selectedFeatures.length} active adapters</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      playBeep(1100, 0.1);
                      setFormData(prev => ({
                        ...prev,
                        service: 'Interactive Product Platforms',
                        message: `Telemetry Proposal requested with Quote configuration: $${calculatedQuote.toLocaleString()}. Services desired: UX strategy: ${selectedFeatures.includes('ux_strategy') ? 'YES' : 'NO'}, Motion: ${selectedFeatures.includes('custom_motion') ? 'YES' : 'NO'}, AETHER AI client: ${selectedFeatures.includes('gemini_chat') ? 'YES' : 'NO'}.`
                      }));
                      setActiveTab('contact');
                    }}
                    className="w-full py-4 bg-white text-black hover:bg-gradient-to-r hover:from-[#F27D26] hover:to-[#FF2D55] hover:text-white rounded-xl text-xs font-mono font-bold tracking-widest transition-all cursor-pointer"
                  >
                    LOCK IN BLUEPRINT PROPOSAL &rarr;
                  </button>
                </div>

              </div>
            </div>

            {/* General FAQs Accordion inside Services screen view */}
            <div className="space-y-8 pt-8">
              <div className="text-center max-w-xl mx-auto space-y-1">
                <span className="text-[#F27D26] text-[10px] font-mono tracking-widest uppercase">// CRITICAL INQUIRY MATRIX</span>
                <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight">FREQUENT SERVICE FAQS</h3>
              </div>
              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, idx) => {
                  const isOpen = !!openFaqIndexes[idx];
                  return (
                    <div key={idx} className="bg-[#0b0c0d] border border-white/5 rounded-xl overflow-hidden transition-all duration-300">
                      <button
                        onClick={() => {
                          playBeep(isOpen ? 500 : 700, 0.04);
                          setOpenFaqIndexes(prev => ({
                            ...prev,
                            [idx]: !isOpen
                          }));
                        }}
                        className="w-full p-5 text-left flex justify-between items-center font-mono cursor-pointer hover:bg-white/[0.02]"
                      >
                        <span className="text-xs sm:text-sm font-bold text-white tracking-wide">{faq.question}</span>
                        <span className={`text-[#F27D26] text-xs transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                          <Plus size={16} />
                        </span>
                      </button>
                      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-48 border-t border-white/5' : 'max-h-0'}`}>
                        <p className="p-5 text-xs text-white/50 leading-relaxed font-sans bg-black/40">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* PORTFOLIO VIEW: Advanced showcase with interactive category filtering */}
        {activeTab === 'portfolio' && (
          <div id="portfolio-view" className="space-y-12 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <span className="text-[#FF2D55] text-[10px] font-mono tracking-[0.3em] uppercase">// CURATED MASTERPIECES</span>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter">PORTFOLIO INDEX</h1>
                <p className="text-white/45 text-sm max-w-xl">Curated layout of tactical design implementations engineered to provide premium responsive interactions and telemetry metrics.</p>
              </div>

              {/* Categorized Filter Selectors */}
              <div className="flex flex-wrap gap-2.5 bg-black/40 p-1 rounded-xl border border-white/5 self-start">
                {['All', 'Artificial Intelligence', 'Fintech Platform', 'SaaS Ecosystem', 'Creative Product'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      playBeep(600 + 50 * ['All', 'Artificial Intelligence', 'Fintech Platform', 'SaaS Ecosystem', 'Creative Product'].indexOf(cat), 0.04);
                      setSelectedCategory(cat);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#F27D26] text-black font-bold'
                        : 'text-white/45 hover:text-white'
                    }`}
                  >
                    {cat === 'Artificial Intelligence' ? 'AI' : cat === 'Fintech Platform' ? 'FINTECH' : cat === 'SaaS Ecosystem' ? 'SAAS' : cat === 'Creative Product' ? 'CREATIVE CODE' : 'ALL'}
                  </button>
                ))}
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {portfolioItems
                .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
                .map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => {
                      playBeep(920, 0.07, 'triangle');
                      setSelectedProject(item);
                    }}
                    className="group bg-[#0c0d0e]/90 border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-white/15 transition-all duration-300 flex flex-col justify-between"
                  >
                    
                    {/* Hover Zoom Image Container */}
                    <div className="aspect-[16/10] overflow-hidden bg-neutral-900 relative">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                        loading="lazy"
                      />
                      
                      {/* Gradient overlay fade */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      
                      {/* Floating Category tag on image */}
                      <span className="absolute top-4 left-4 bg-black/75 text-[#F27D26] text-[9px] font-mono uppercase tracking-wider px-2.5 py-1 rounded border border-orange-500/10 backdrop-blur-sm">
                        {item.category}
                      </span>

                      {/* Interactive View Details Action icon overlay */}
                      <div className="absolute bottom-4 right-4 bg-black/80 w-8 h-8 rounded-full flex items-center justify-center border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowUpRight size={14} className="text-white" />
                      </div>
                    </div>

                    {/* Metadata Content below container */}
                    <div className="p-6 space-y-4">
                      <div className="space-y-1.5">
                        <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest leading-none">CLIENT EXPERIENCE PROFILE</div>
                        <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-[#F27D26] transition-colors">{item.title}</h3>
                        <p className="text-xs text-white/45 line-clamp-2 leading-relaxed">{item.description}</p>
                      </div>

                      {/* Dynamic Stat if available */}
                      {item.stats && (
                        <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg flex justify-between items-center">
                          <span className="text-[9px] font-mono text-white/35 uppercase">{item.stats.label}:</span>
                          <span className="text-xs font-mono font-bold text-white tracking-wider">{item.stats.value}</span>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 pt-2">
                        {item.services.map((srv, index) => (
                          <span key={index} className="text-[9px] font-mono bg-[#111] text-white/40 px-2 py-0.5 rounded border border-white/5 uppercase">
                            {srv}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                ))}
            </div>

            {/* Portfolio Details Overlay Modal */}
            {selectedProject && (
              <div 
                id="portfolio-detail-modal"
                className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
                onClick={() => setSelectedProject(null)}
              >
                <div 
                  className="bg-[#0b0c0d] border border-white/10 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative"
                  onClick={(e) => e.stopPropagation()} // Prevent close on body click
                >
                  
                  {/* Close modal Button */}
                  <button 
                    onClick={() => { playBeep(500, 0.05); setSelectedProject(null); }}
                    className="absolute top-4 right-4 bg-black/80 w-9 h-9 rounded-full flex items-center justify-center border border-white/10 hover:border-white/30 text-white cursor-pointer z-10"
                    title="Close detail popup"
                  >
                    <X size={16} />
                  </button>

                  <div className="aspect-[16/9] w-full relative">
                    <img 
                      src={selectedProject.imageUrl} 
                      alt={selectedProject.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="text-[10px] font-mono text-[#F27D26] uppercase tracking-widest">{selectedProject.category}</span>
                      <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mt-1">{selectedProject.title}</h2>
                    </div>
                  </div>

                  {/* Information block */}
                  <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono">
                      <div className="space-y-1">
                        <span className="text-white/35 uppercase block">CLIENT CONTEXT</span>
                        <span className="text-white font-bold block">{selectedProject.client || 'N/A'}</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-white/35 uppercase block">ENGINEERING SCOPE</span>
                        <span className="text-white font-bold block">{selectedProject.scope || 'Full Redesign'}</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-white/35 uppercase block">METRIC TELEMETRY</span>
                        <span className="text-[#FF2D55] font-bold block">{selectedProject.stats?.value || 'N/A'}</span>
                      </div>
                    </div>

                    <p className="text-xs text-white/55 leading-relaxed font-sans">
                      This digital asset was commissioned to solve high latency barriers and user dropoffs. Using tailored responsive states, custom caching strategies, and a meticulous typographic layout, we achieved outstanding conversion metrics while preserving elite aesthetic identity.
                    </p>

                    <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.services.map((s, idx) => (
                          <span key={idx} className="text-[9px] font-mono bg-white/[0.03] border border-white/10 text-white/50 px-2.5 py-1 rounded uppercase">
                            {s}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => {
                          playBeep(1000, 0.1);
                          setSelectedProject(null);
                          setFormData(prev => ({
                            ...prev,
                            message: `I am interested in designing a custom system inspired by the design layout of project [${selectedProject.title}].`
                          }));
                          setActiveTab('contact');
                        }}
                        className="px-5 py-2.5 bg-[#F27D26] hover:bg-white text-black font-mono text-[10px] font-bold rounded-lg transition-all cursor-pointer"
                      >
                        REPLICATE PARADIGM &rarr;
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>
        )}

        {/* ABOUT VIEW: Company story, dynamic timeline roadmaps, and custom team metrics */}
        {activeTab === 'about' && (
          <div id="about-view" className="space-y-16 animate-fade-in">
            
            {/* Split Header block */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-[#F27D26] text-[10px] font-mono tracking-[0.3em] uppercase">// COGNITIVE ROOTS</span>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter">ABOUT THE COLLECTIVE</h1>
                <p className="text-white/45 text-sm leading-relaxed max-w-xl">
                  AETHER operates as a highly exclusive design and front-end engineering collective. We serve client-partners seeking elegant layouts and maximum rendering speed.
                </p>
              </div>

              {/* Mission Statement Block */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#0c0d0e]/80 to-[#040405] p-6 rounded-2xl border border-white/5 relative">
                <div className="absolute top-2 left-2 text-[50px] font-serif opacity-5 text-white">"</div>
                <p className="text-white/60 text-xs tracking-wide leading-relaxed font-mono italic">
                  We reject browser lag. We reject default component blocks. True structural luxury implies custom state, pristine visual alignment, and beautiful interactive feedback on every single cursor movement.
                </p>
              </div>
            </div>

            {/* Dynamic Milestones Timeline row */}
            <div className="space-y-8">
              <span className="text-amber-500 text-[10px] font-mono tracking-widest uppercase block">// ARCHIVAL RECORDS:</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {/* Horizontal dividing visual line */}
                <div className="hidden md:block absolute top-[21px] left-0 right-0 h-[1px] bg-gradient-to-r from-orange-600/30 via-red-600/30 to-transparent z-0"></div>
                
                {milestones.map((m, idx) => (
                  <div key={idx} className="space-y-4 relative z-10 bg-black/60 p-5 rounded-2xl border border-white/5 md:bg-transparent md:border-none md:p-0">
                    <div className="flex items-center gap-3">
                      <div className="w-[42px] h-[42px] rounded-full bg-black border border-[#F27D26]/40 flex items-center justify-center text-[#F27D26] font-mono font-bold text-xs shadow-[0_0_15px_rgba(242,125,38,0.15)] select-none">
                        {m.year}
                      </div>
                      <span className="text-[10px] font-mono tracking-wider uppercase text-white/30 hidden md:inline">SYSTEM METRIC</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-md font-mono uppercase tracking-wider font-bold text-white">{m.title}</h4>
                      <p className="text-xs text-white/45 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Showcase */}
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-[#FF2D55] text-[10px] font-mono tracking-widest uppercase block">// ARCHITECT CLUSTERS:</span>
                <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">EXPERIENCED DIRECTORS</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {team.map((m, idx) => (
                  <div key={idx} className="bg-[#0b0c0d]/70 border border-white/5 rounded-2xl overflow-hidden group hover:border-white/10 transition-all flex flex-col justify-between">
                    
                    {/* Header bar of team frame */}
                    <div className="p-5 flex items-center justify-between border-b border-white/5 bg-black/40">
                      <span className="text-[9px] font-mono text-white/30">MATRIX UNIT #{100 + idx}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
                    </div>

                    <div className="p-6 space-y-4">
                      {/* Flex layout for image and role */}
                      <div className="flex items-center gap-4">
                        <img 
                          src={m.avatarUrl} 
                          alt={m.name} 
                          className="w-14 h-14 rounded-xl object-cover border border-white/15"
                        />
                        <div className="space-y-1">
                          <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-white leading-tight">{m.name}</h4>
                          <span className="text-[9px] text-[#F27D26] font-mono tracking-wider uppercase">{m.role}</span>
                        </div>
                      </div>

                      <p className="text-xs text-white/45 font-sans leading-relaxed pt-2">
                        {m.bio}
                      </p>
                    </div>

                    {/* Interactive hover detail tab in team */}
                    <div className="p-4 border-t border-white/5 bg-black/20 text-center text-[10px] font-mono text-white/30 uppercase group-hover:text-[#F27D26] transition-colors">
                      // SECURE CLUSTER NODE INITIALIZED
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* CONTACT VIEW: Fully working robust form with validation feedback states & visual vector map */}
        {activeTab === 'contact' && (
          <div id="contact-view" className="space-y-12 animate-fade-in">
            <div className="space-y-4">
              <span className="text-[#F27D26] text-[10px] font-mono tracking-[0.3em] uppercase">// ESTABLISH STREAM LINK</span>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter">PROJECT SECURE CONTACT</h1>
              <p className="text-white/45 text-sm max-w-2xl">
                Submit your target platform specifications below. AETHER human architects will audit your proposal grid within 12 standard solar hours.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Form Input fields column */}
              <div className="lg:col-span-7 bg-[#0b0c0d]/60 border border-white/5 rounded-2xl p-6 sm:p-8 space-y-6 relative">
                
                {formSuccess ? (
                  <div className="py-12 px-4 text-center space-y-4 animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-[#F27D26]/10 border border-[#F27D26]/30 flex items-center justify-center text-[#F27D26] mx-auto shadow-[0_0_20px_rgba(242,125,38,0.2)]">
                      <Check size={28} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold tracking-tight">TRANSMISSION ENCRYPTED</h3>
                      <p className="text-xs text-white/45 max-w-sm mx-auto">
                        Your proposal brief has reached the AETHER central vault. Review code issued instantly to: <span className="text-white font-mono">{formData.email || 'your account'}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        playBeep(800, 0.05);
                        setFormSuccess(false);
                      }}
                      className="px-6 py-2.5 bg-white text-black hover:bg-[#F27D26] hover:text-white rounded-full text-xs font-mono font-bold tracking-widest transition-all cursor-pointer"
                    >
                      TRANSMIT ANOTHER PACKAGE
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Name field */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block font-bold">Identified Label / Name *</label>
                        <input 
                          type="text"
                          required
                          name="name"
                          placeholder="e.g. Director Vance"
                          value={formData.name}
                          onChange={handleFormChange}
                          className={`w-full bg-[#050505] text-white text-xs font-mono px-4 py-3 rounded-lg border focus:outline-none transition-colors ${
                            formErrors.name ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#F27D26]'
                          }`}
                        />
                        {formErrors.name && (
                          <span className="text-[10px] font-mono text-red-400 block">{formErrors.name}</span>
                        )}
                      </div>

                      {/* Email field */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block font-bold">Digital Post Address / Email *</label>
                        <input 
                          type="email"
                          required
                          name="email"
                          placeholder="vance@quantumascent.com"
                          value={formData.email}
                          onChange={handleFormChange}
                          className={`w-full bg-[#050505] text-white text-xs font-mono px-4 py-3 rounded-lg border focus:outline-none transition-colors ${
                            formErrors.email ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#F27D26]'
                          }`}
                        />
                        {formErrors.email && (
                          <span className="text-[10px] font-mono text-red-400 block">{formErrors.email}</span>
                        )}
                      </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Phone field */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block font-bold">Network Core Phone (Optional)</label>
                        <input 
                          type="tel"
                          name="phone"
                          placeholder="+1 (555) 0192"
                          value={formData.phone}
                          onChange={handleFormChange}
                          className="w-full bg-[#050505] text-white text-xs font-mono px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-[#F27D26] transition-colors"
                        />
                      </div>

                      {/* Company Name */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block font-bold">Enterprise Clan Name (Optional)</label>
                        <input 
                          type="text"
                          name="company"
                          placeholder="Quantum Ascent LLC"
                          value={formData.company}
                          onChange={handleFormChange}
                          className="w-full bg-[#050505] text-white text-xs font-mono px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-[#F27D26] transition-colors"
                        />
                      </div>

                    </div>

                    {/* Desired Service Selection dropdown */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block font-bold">Targeted Paradigm Segment</label>
                      <select 
                        name="service"
                        value={formData.service}
                        onChange={handleFormChange}
                        className="w-full bg-[#050505] text-white text-xs font-mono px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-[#F27D26] transition-colors cursor-pointer"
                      >
                        <option value="Interactive Product Platforms">Interactive Product Platforms</option>
                        <option value="Artificial Intelligence Orchestration">Artificial Intelligence Orchestration</option>
                        <option value="Cinematic Brand Systems">Cinematic Brand Systems</option>
                        <option value="Immersive SaaS Ecosystems">Immersive SaaS Ecosystems</option>
                      </select>
                    </div>

                    {/* Message Project Brief */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block font-bold">Project Brief Specifications *</label>
                      <textarea 
                        name="message"
                        required
                        rows={4}
                        placeholder="Detail exact layout parameters, latency requirements, or targeted budgets..."
                        value={formData.message}
                        onChange={handleFormChange}
                        className={`w-full bg-[#050505] text-white text-xs font-mono px-4 py-3 rounded-lg border focus:outline-none transition-colors ${
                          formErrors.message ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#F27D26]'
                        }`}
                      />
                      {formErrors.message ? (
                        <span className="text-[10px] font-mono text-red-400 block">{formErrors.message}</span>
                      ) : (
                        <span className="text-[9px] font-mono text-white/20 block">Be sure to provide some high-level details regarding your visual roadmap request.</span>
                      )}
                    </div>

                    {/* Submit action button */}
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="w-full py-4 bg-white text-black hover:bg-[#F27D26] hover:text-white rounded-xl text-xs font-mono font-bold tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {formLoading ? (
                        <>
                          <Loader2 size={13} className="animate-spin text-[#F27D26]" />
                          SECURE CHANNELS STREAMING ERROR VERIFYING...
                        </>
                      ) : (
                        'TRANSMIT PROPOSAL PACKETS TO VAULT'
                      )}
                    </button>

                  </form>
                )}

              </div>

              {/* Side Info details & Futuristic Visual Vector Map Mock */}
              <div className="lg:col-span-5 space-y-8">
                
                <div className="bg-[#0b0c0d] border border-white/5 rounded-2xl p-6 space-y-4">
                  <span className="text-amber-500 text-[10px] font-mono tracking-widest uppercase block">// SEED LOCATIONS:</span>
                  
                  <div className="space-y-4 text-xs font-mono">
                    <div className="flex items-start gap-3">
                      <MapPin size={15} className="text-[#F27D26] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-white font-bold uppercase">PHYSICAL CORE SYNC</h4>
                        <p className="text-white/45">82 Greene St, Soho, New York, NY 10012, Earth</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail size={15} className="text-[#FF2D55] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-white font-bold uppercase">SECURE ELECTRONIC POST</h4>
                        <p className="text-white/45">quantum-connect@aether-agency.io</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone size={15} className="text-[#F27D26] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-white font-bold uppercase">TELNET VOICE ENCRYPTED</h4>
                        <p className="text-white/45">+1 (212) 555-ÆTHR</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Geolocation Coordinate Map (Genuinely interactive visual showpiece in lieu of unrequested full Google Maps setup) */}
                <div className="bg-[#050505] border border-white/10 rounded-2xl p-4 overflow-hidden relative aspect-square max-w-[340px] mx-auto md:max-w-none">
                  
                  {/* Neon Grid coordinate simulator */}
                  <div className="absolute inset-0 bg-neutral-950 animate-grid-flow opacity-15" />
                  
                  {/* Simulated vector target mapping */}
                  <div className="absolute inset-0 flex flex-col justify-between p-4 selection:bg-transparent">
                    <div className="flex justify-between items-center z-10 text-[9px] font-mono text-[#F27D26] uppercase">
                      <span>RADAR SYNC: CONNECTED</span>
                      <span>SECURE MOCK COORDS</span>
                    </div>

                    {/* Drifting neon radar scan */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-orange-500/10 bg-radial from-orange-500/5 to-transparent flex items-center justify-center animate-pulse z-0" />
                    
                    {/* Glowing Pin location */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                      <span className="w-4 h-4 rounded-full border border-red-500 bg-red-500/30 flex items-center justify-center shadow-[0_0_15px_#ef4444]">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                      </span>
                      <span className="bg-black/90 text-white border border-white/15 text-[8px] font-mono px-2 py-0.5 mt-1 rounded whitespace-nowrap">
                        AETHER NY HQ CORE
                      </span>
                    </div>

                    <div className="mt-auto flex justify-between text-[8px] font-mono text-white/30 z-10 uppercase">
                      <span>40.7259° N, 73.9982° W</span>
                      <span>v.26 PREVIEW ONLY</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        )}

      </main>

      {/* FLOATING CHAT WIDGET INTERGRATION (Prebuilt Gemini logic or Preset Virtual Director fallback) */}
      <div className="fixed right-6 bottom-8 z-40">
        {isAIChatOpen ? (
          <div 
            id="aether-chat-widget" 
            className="w-80 sm:w-96 aspect-[3/4] bg-[#0c0d0e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-fade-in"
          >
            
            {/* Header core assistant title */}
            <header className="p-4 bg-black/80 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-[#F27D26]/30 flex items-center justify-center text-[#F27D26]">
                  <Bot size={15} />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase leading-tight">AETHER AI DIRECTOR</h4>
                  <span className="text-[8px] tracking-widest text-[#F27D26] font-mono block">GEMINI MODEL v.25 ACTIVE</span>
                </div>
              </div>
              <button 
                onClick={() => { playBeep(450, 0.05); setIsAIChatOpen(false); }}
                className="text-white/40 hover:text-white"
                title="Collapse AI chat"
              >
                <X size={14} />
              </button>
            </header>

            {/* Message Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-black/30 scroll-smooth">
              {aiMessages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col max-w-[80%] ${
                    msg.sender === 'user' ? 'ml-auto items-end animate-slide-in-right' : 'mr-auto items-start animate-slide-in-left'
                  }`}
                >
                  <div className={`p-3 rounded-xl text-xs ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-r from-[#F27D26]/12 to-[#FF2D55]/5 text-white/95 border border-[#F27D26]/20' 
                      : 'bg-white/[0.03] text-white/80 border border-white/5'
                  }`}>
                    <p className="font-mono leading-relaxed break-words whitespace-pre-wrap">{msg.text}</p>
                  </div>
                  <span className="text-[8px] font-mono text-white/20 mt-1 uppercase tracking-widest">{msg.time}</span>
                </div>
              ))}
              
              {isAiTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-xl bg-white/[0.01] border border-white/5 w-24 mr-auto">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26] animate-bounce duration-100" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26] animate-bounce duration-300" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26] animate-bounce duration-500" />
                </div>
              )}
            </div>

            {/* Fast suggestion nodes */}
            <div className="px-4 py-2 bg-black/20 border-t border-white/5 flex gap-1.5 overflow-x-auto select-none no-scrollbar">
              {['Pricing?', 'Timeline?', 'Tech stack?'].map((sug) => (
                <button
                  key={sug}
                  onClick={() => {
                    setAiInput(sug);
                    playBeep(850, 0.04);
                  }}
                  className="px-2.5 py-1 bg-white/[0.02] border border-white/5 hover:border-[#F27D26]/40 text-[#F27D26] text-[9px] font-mono rounded whitespace-nowrap cursor-pointer transition-colors"
                >
                  {sug}
                </button>
              ))}
            </div>

            {/* Input submission container */}
            <form onSubmit={handleSendAiMessage} className="p-4 bg-black/60 border-t border-white/5 flex gap-2">
              <input 
                type="text" 
                required
                placeholder="Ask our AI Core about budget, process..." 
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                className="bg-[#050505] text-white text-[11px] font-mono px-3.5 py-2.5 rounded-lg border border-white/10 flex-1 focus:outline-none focus:border-[#F27D26] transition-colors"
              />
              <button 
                type="submit" 
                className="bg-[#F27D26] hover:bg-white text-black px-4 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                title="Send instruction packet"
              >
                <Send size={12} />
              </button>
            </form>

          </div>
        ) : (
          <button
            id="aether-open-chat-btn"
            onClick={() => { playBeep(990, 0.09, 'sine'); setIsAIChatOpen(true); }}
            className="w-14 h-14 bg-gradient-to-r from-[#F27D26] to-[#FF2D55] text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(242,125,38,0.3)] hover:shadow-[0_0_30px_rgba(242,125,38,0.5)] transition-all transform hover:scale-105 cursor-pointer z-50 group"
            title="Summon AI agent assistant"
          >
            <Bot size={22} className="group-hover:rotate-12 transition-transform" />
            
            {/* Active notification indicator */}
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#030303] rounded-full animate-pulse" />
          </button>
        )}
      </div>

      {/* High-End Design Frame Footer bar */}
      <footer id="aether-footer" className="border-t border-white/5 bg-black/60 backdrop-blur-md px-4 md:px-10 py-10 text-[11px] font-mono tracking-widest text-white/30 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6 mt-16 max-w-none">
        
        <div className="flex flex-col gap-2 items-center md:items-start select-none">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white text-xs tracking-tight">AETHER COLLECTIVE .</span>
            <span className="text-[10px] text-[#F27D26] font-bold">ESTD // 2024</span>
          </div>
          <p className="text-[10px] text-white/20">ALL DESIGN PARAMETERS PERSIST ON LOCAL CLUTCH REGISTRY.</p>
        </div>

        {/* Footer center navigation shortcut */}
        <div className="flex flex-wrap justify-center gap-6 text-[10px] uppercase">
          <button onClick={() => { playBeep(500, 0.03); setActiveTab('services'); }} className="hover:text-white transition-colors cursor-pointer">SERVICES BRIEF</button>
          <button onClick={() => { playBeep(500, 0.03); setActiveTab('portfolio'); }} className="hover:text-white transition-colors cursor-pointer">CURATED MASTERPIECES</button>
          <button onClick={() => { playBeep(500, 0.03); setActiveTab('about'); }} className="hover:text-white transition-colors cursor-pointer">THE COLLECTIVE</button>
          <button onClick={() => { playBeep(500, 0.03); setActiveTab('contact'); }} className="hover:text-white transition-colors cursor-pointer">TRANSMIT PACKET</button>
        </div>

        <div className="text-[10px] text-white/20">
          PRODUCED FOR PRE-CLIENT REVIEW // PLATFORM v.26.12
        </div>
      </footer>

    </div>
  );
}
