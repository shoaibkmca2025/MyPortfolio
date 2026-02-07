import React, { useEffect, useRef } from 'react';
import { EXPERIENCE } from '../constants';
import gsap from 'gsap';

const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.experience-item', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto w-full">
      <div className="mb-20 text-center">
        <h2 className="text-xs font-mono text-accent uppercase tracking-[1em] mb-6 font-bold">Log_Book // History</h2>
        <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tighter uppercase text-white drop-shadow-lg">
          Mission <span className="text-outline">Timeline</span>
        </h3>
      </div>

      <div className="relative border-l border-white/10 ml-6 md:ml-12 space-y-16">
        {EXPERIENCE.map((item, index) => (
          <div key={item.id} className="experience-item relative pl-12 md:pl-24">
            {/* Timeline Node */}
            <div className="absolute left-[-5px] top-2 w-3 h-3 bg-accent rounded-full shadow-[0_0_20px_var(--accent)]">
              <div className="absolute inset-0 bg-accent animate-ping opacity-50 rounded-full"></div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              
              <div className="relative backdrop-blur-md bg-black/40 border border-white/10 p-8 rounded-2xl hover:border-accent/30 transition-colors duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <h4 className="text-2xl font-bold text-white font-display uppercase tracking-wide">
                    {item.role}
                  </h4>
                  <span className="font-mono text-xs text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                    {item.period}
                  </span>
                </div>
                
                <h5 className="text-lg text-white/70 mb-6 font-mono border-b border-white/5 pb-4">
                  {item.company}
                </h5>
                
                <p className="text-white/60 leading-relaxed font-light text-lg">
                  {item.description}
                </p>

                <div className="mt-6 flex gap-2">
                   <span className="text-[10px] uppercase tracking-widest text-white/30 font-mono">
                     Type: {item.type}
                   </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
