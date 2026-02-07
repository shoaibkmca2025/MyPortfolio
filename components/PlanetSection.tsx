import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PlanetSectionProps {
  title: string;
  subtitle: string;
  description: string;
  stats?: { label: string; value: string }[];
  align?: 'left' | 'right';
}

const PlanetSection: React.FC<PlanetSectionProps> = ({ title, subtitle, description, stats, align = 'left' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.planet-content', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`max-w-7xl mx-auto flex ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
      <div className="planet-content max-w-xl backdrop-blur-md bg-black/30 border border-white/10 p-8 md:p-12 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <h4 className="text-accent font-mono text-xs uppercase tracking-[0.4em] mb-4 font-bold">{subtitle}</h4>
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tighter mb-8 leading-none">
          {title}
        </h2>
        <p className="text-white/70 text-lg leading-relaxed font-light mb-8 border-l-2 border-accent/30 pl-6">
          {description}
        </p>
        
        {stats && (
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-2xl md:text-3xl font-display font-bold text-white mb-1">{stat.value}</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanetSection;
