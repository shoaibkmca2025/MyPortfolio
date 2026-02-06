import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import SkillsSection from './SkillsSection';
import ProjectCard from './ProjectCard';
import AIChat from './AIChat';
import AnimatedBackground from './AnimatedBackground';
import ThemeToggle from './ThemeToggle';
import { PROJECTS } from '../constants';
import gsap from 'gsap';

const App: React.FC = () => {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    reveals.forEach(el => {
      gsap.fromTo(el, 
        { opacity: 0, y: 100, filter: 'blur(20px)' },
        { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)',
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            end: "top 65%",
            scrub: 1.5,
          }
        }
      );
    });
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("TRANSMISSION_UPLINK: Data received in the core.");
  };

  return (
    <div className="min-h-screen text-white selection:bg-accent selection:text-black relative bg-black font-display overflow-x-hidden">
      <AnimatedBackground />
      <ThemeToggle />
      <Navbar />
      
      <main className="relative z-10 w-full">
        {/* HERO - THE SUN */}
        <section id="hero" className="h-[120vh] flex items-center justify-center px-6">
          <Hero />
        </section>

        {/* Interplanetary Void */}
        <div className="h-[120vh] pointer-events-none" />

        {/* ABOUT - EARTH */}
        <section id="about" className="min-h-screen flex items-center justify-start py-40 px-6 max-w-7xl mx-auto">
          <div className="max-w-3xl w-full reveal-on-scroll">
            <div className="glass p-12 md:p-24 rounded-[4rem] shadow-2xl relative group border-white/5 backdrop-blur-3xl overflow-hidden">
              <div className="absolute top-0 right-0 p-8 font-mono text-[10px] text-accent/20 uppercase tracking-widest">
                Mission_Log // 01
              </div>
              <header className="mb-14">
                <h2 className="text-[12px] font-mono text-accent uppercase tracking-[1em] mb-6 font-black">Briefing_01 // Identity</h2>
                <h3 className="text-6xl md:text-[8rem] font-black leading-[0.7] tracking-tighter uppercase mb-8">
                  Shoaib <br/><span className="text-outline">Khatik</span>
                </h3>
              </header>
              <div className="space-y-10 text-xl md:text-3xl text-white/60 font-medium leading-relaxed">
                <p>Digital Architect crafting robust application ecosystems using the <span className="text-white font-black underline decoration-accent decoration-4 underline-offset-8">MERN & Django</span> stack.</p>
                <div className="flex flex-wrap gap-6 pt-10 opacity-40">
                  {['React', 'Django', 'Python', 'Architecture'].map(t => (
                    <span key={t} className="text-[10px] font-mono uppercase tracking-[0.5em]">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interplanetary Void */}
        <div className="h-[140vh] pointer-events-none" />

        {/* SKILLS - MARS */}
        <section id="skills" className="min-h-screen flex items-center justify-end py-40 px-6 max-w-7xl mx-auto">
          <div className="max-w-4xl w-full reveal-on-scroll">
            <SkillsSection />
          </div>
        </section>

        {/* Interplanetary Void */}
        <div className="h-[140vh] pointer-events-none" />

        {/* PROJECTS - JUPITER */}
        <section id="projects" className="min-h-screen py-40 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-48 reveal-on-scroll text-left">
              <h2 className="text-[12px] font-mono text-accent uppercase tracking-[1.2em] mb-8 font-black">Archive_03 // Deployments</h2>
              <h3 className="text-7xl md:text-[12rem] font-black tracking-tighter uppercase leading-[0.7] drop-shadow-2xl">Large<br/>Clusters</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 reveal-on-scroll">
              {PROJECTS.map(project => <ProjectCard key={project.id} project={project} />)}
            </div>
          </div>
        </section>

        {/* SCALING - SATURN */}
        <section id="projects-saturn" className="min-h-[60vh] flex items-center justify-center py-40 px-6">
          <div className="max-w-4xl w-full reveal-on-scroll">
            <div className="glass p-20 md:p-32 rounded-[5rem] shadow-2xl relative group text-center border-white/5 backdrop-blur-2xl">
              <h4 className="font-black text-5xl md:text-9xl uppercase tracking-tighter mb-12 text-accent leading-none">High<br/>Gravity</h4>
              <p className="text-white/60 font-mono text-xl md:text-2xl uppercase tracking-widest leading-loose">Engineering distributed systems that thrive under immense computational pressure.</p>
            </div>
          </div>
        </section>

        {/* Interplanetary Void */}
        <div className="h-[160vh] pointer-events-none" />

        {/* CONTACT - NEPTUNE */}
        <section id="contact" className="min-h-screen flex items-center justify-center py-40 px-6">
          <div className="max-w-5xl w-full glass p-16 md:p-32 rounded-[6rem] shadow-2xl reveal-on-scroll backdrop-blur-3xl border-white/5">
            <div className="text-center mb-24">
              <h3 className="text-8xl md:text-[11rem] font-black tracking-tighter uppercase mb-6 leading-none">Uplink</h3>
              <p className="text-white/30 font-mono uppercase tracking-[1.2em] text-[12px] font-bold animate-pulse">Establishing signal frequency...</p>
            </div>
            <form className="space-y-20" onSubmit={handleFormSubmit}>
              <div className="grid md:grid-cols-2 gap-20">
                 <input required type="text" className="w-full bg-transparent border-b-2 border-white/10 px-0 py-8 font-mono text-2xl outline-none focus:border-accent transition-all text-white" placeholder="IDENTIFIER" />
                 <input required type="email" className="w-full bg-transparent border-b-2 border-white/10 px-0 py-8 font-mono text-2xl outline-none focus:border-accent transition-all text-white" placeholder="SIGNAL_URI" />
              </div>
              <textarea required rows={5} className="w-full bg-transparent border-b-2 border-white/10 px-0 py-8 font-mono text-2xl outline-none resize-none focus:border-accent transition-all text-white" placeholder="TRANSMISSION_DATA"></textarea>
              <button type="submit" className="w-full py-12 bg-accent text-black font-black text-4xl tracking-[0.4em] uppercase hover:bg-white transition-all active:scale-[0.98] shadow-[0_0_120px_rgba(204,255,0,0.4)] rounded-[2rem]">Send Pulse</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="py-40 border-t border-white/5 px-6 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-24">
          <div className="font-black text-5xl tracking-tighter">SHOAIB<span className="text-accent">.</span>DEV</div>
          <div className="flex gap-24 text-[12px] font-mono uppercase tracking-[1em] text-white/20">
            <a href="https://www.linkedin.com/in/shoaib-khatik-a422a7346" target="_blank" className="hover:text-accent transition-all">LinkedIn</a>
            <a href="https://github.com" target="_blank" className="hover:text-accent transition-all">GitHub</a>
          </div>
          <div className="text-[10px] font-mono text-white/10 tracking-[0.4em] uppercase font-bold">V1.0 // STELLAR_CORE</div>
        </div>
      </footer>
      <AIChat />
    </div>
  );
};

export default App;