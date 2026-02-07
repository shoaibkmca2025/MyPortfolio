import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('about');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sections = ['about', 'skills', 'projects', 'contact'];
    const triggers = sections.map(id =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveId(id),
        onEnterBack: () => setActiveId(id)
      })
    );
    return () => {
      triggers.forEach(t => t.kill());
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation(); // CRITICAL: Stop propagation to prevent background crash
    
    const element = document.getElementById(id);
    if (element) {
      // Calculate dynamic duration based on distance
      const currentY = window.scrollY;
      const targetY = element.getBoundingClientRect().top + window.scrollY;
      const distance = Math.abs(targetY - currentY);
      // Min 1.2s, Max 2.5s. Roughly 1s per 2500px
      const duration = Math.min(2.5, Math.max(1.2, distance / 2000));

      gsap.to(window, {
        duration: duration,
        scrollTo: { y: element, autoKill: false },
        ease: "power2.inOut" // Smoother easing than power3
      });
      setMobileMenuOpen(false);
    } else if (id === 'hero') {
      const distance = window.scrollY;
      const duration = Math.min(2.5, Math.max(1.2, distance / 2000));
      
      gsap.to(window, { duration: duration, scrollTo: 0, ease: "power2.inOut" });
      setMobileMenuOpen(false);
    }
  };

  const navItems = ['About', 'Skills', 'Projects', 'Contact'];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled || mobileMenuOpen ? 'bg-obsidian/95 backdrop-blur-md py-4 border-b border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.4)]' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" onClick={(e) => scrollToSection(e, 'hero')} className="group flex items-center gap-2 relative z-[60]">
          <div className="w-8 h-8 bg-accent flex items-center justify-center font-display font-black text-obsidian text-lg group-hover:rotate-90 transition-transform duration-500">S</div>
          <span className="font-display font-bold text-xl tracking-tighter uppercase text-white">Shoaib.Dev</span>
        </a>
        
        <div className="hidden md:flex gap-12">
          {navItems.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={(e) => scrollToSection(e, item.toLowerCase())} 
              className={`text-[10px] font-mono font-bold uppercase tracking-[0.3em] transition-all relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-accent after:to-transparent hover:after:w-full after:transition-all cursor-pointer hover:scale-105 ${activeId === item.toLowerCase() ? 'text-accent' : 'text-white/60 hover:text-accent'}`}
            >
              {item}
            </a>
          ))}
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); setMobileMenuOpen(!mobileMenuOpen); }} 
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center relative z-[60] group gap-1.5" 
          aria-label="Toggle Menu" 
          type="button"
        >
          <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
          <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>

        <div className={`fixed inset-0 bg-obsidian transition-all duration-500 ease-in-out md:hidden flex flex-col items-center justify-center gap-8 z-50 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
          {navItems.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={(e) => scrollToSection(e, item.toLowerCase())} 
              className="text-4xl font-display font-bold uppercase tracking-tighter text-white hover:text-accent transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
