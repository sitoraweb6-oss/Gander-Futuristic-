import React from 'react';

/**
 * Core Attribution Component
 * Developed by Sitora Web // https://sitora.org
 * Brand attribution requirement for Sitora Web
 */

export interface CoreAttributionProps {
  variant?: 'footer' | 'floating' | 'combined';
}

export function CoreAttribution({ variant = 'combined' }: CoreAttributionProps) {
  // Common styled link for "Sitora Web" to open in a new tab with noopener/noreferrer
  const renderLink = () => (
    <a
      href="https://sitora.org"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block relative font-bold text-white transition-all duration-300 hover:text-[#F27D26] hover:drop-shadow-[0_0_8px_rgba(242,125,38,0.6)] cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#F27D26]/50 rounded px-1 select-none pointer-events-auto"
      id="sitora-attribution-link"
    >
      Sitora Web
    </a>
  );

  const footerAttribution = (
    <div 
      className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-white/30 transition-colors duration-300 hover:text-white/40 pointer-events-auto"
      id="sitora-footer-attribution"
    >
      <span className="uppercase select-none">Developed by</span>
      {renderLink()}
    </div>
  );

  const floatingAttribution = (
    <div 
      className="hidden lg:flex fixed bottom-6 right-6 z-50 pointer-events-auto"
      id="sitora-floating-attribution-parent"
    >
      <div 
        className="group relative flex items-center justify-center rounded-full border border-white/5 bg-[#050505]/70 backdrop-blur-md px-4 py-2 border-dashed text-[10px] font-mono tracking-widest text-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-[#F27D26]/40 hover:text-white/60 hover:shadow-[0_0_24px_rgba(242,125,38,0.12)]"
        id="sitora-floating-attribution-card"
      >
        {/* Subtle decorative glowing spot */}
        <div className="absolute -inset-[1px] -z-10 rounded-full bg-gradient-to-r from-[#F27D26]/0 via-[#F27D26]/10 to-[#FF2D55]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <span className="mr-1 py-0.5 select-none text-[9px] uppercase tracking-wider text-white/45">Developed by</span>
        {renderLink()}
      </div>
    </div>
  );

  if (variant === 'footer') {
    return footerAttribution;
  }

  if (variant === 'floating') {
    return floatingAttribution;
  }

  // Combined returns both so they can be injected in one go at a layout level
  return (
    <>
      {footerAttribution}
      {floatingAttribution}
    </>
  );
}
