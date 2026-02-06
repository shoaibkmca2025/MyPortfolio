import React from 'react';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const target = document.getElementById('about');
    if (target) {
      gsap.to(window, {
        duration: 2.5,
        scrollTo: { y: target, autoKill: false },
        ease: "power4.inOut"
      });
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center text-center px-6">
      <div className="reveal-on-scroll active flex flex-col items-center mb-10">
        <div className="text-[12px] font-mono font-black tracking-[1em] text-accent uppercase mb-6 opacity-90">
          Neural_Interface // System_Boot
        </div>
      </div>
      
      <h1 className="reveal-on-scroll active text-7xl md:text-[12rem] font-display font-black leading-[0.8] tracking-tighter mb-12 uppercase text-white drop-shadow-2xl">
        BEYOND<br />
        <span className="text-outline">CODE</span>
      </h1>
      
      <div className="reveal-on-scroll active flex flex-col items-center gap-14">
        <p className="text-lg md:text-2xl text-white/60 font-mono tracking-[0.5em] uppercase max-w-3xl leading-relaxed">
          Full-Stack Architect <span className="text-white font-bold">&</span> AI Pioneer
        </p>
        
        <div className="flex flex-col items-center gap-8">
          <button
            onClick={handleCtaClick}
            className="group relative px-16 py-6 border border-white/10 hover:border-accent transition-all duration-700 overflow-hidden glass rounded-xl"
          >
            <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <span className="relative z-10 text-[14px] font-black tracking-[0.6em] uppercase text-white group-hover:text-black transition-colors">Initiate Launch</span>
          </button>
          
          <div className="flex flex-col items-center gap-4 mt-10">
            <div className="w-px h-24 bg-gradient-to-b from-accent to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;