import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkillsSection from './components/SkillsSection';
import ProjectCard from './components/ProjectCard';
import AIChat from './components/AIChat';
import AnimatedBackground from './components/AnimatedBackground';
import { PROJECTS, DEV_BIO } from './constants';

const App: React.FC = () => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("TRANSMISSION_RECEIVED: Connection established.");
  };

  return (
    <div className="min-h-screen text-[var(--text-primary)] selection:bg-accent selection:text-black relative bg-transparent">
      <AnimatedBackground />
      <Navbar />
      
      <main className="relative z-10">
        {/* HERO - SUN */}
        <section id="hero" className="min-h-screen">
          <Hero />
        </section>

        {/* SPACER: Sun -> Earth */}
        <div id="spacer-hero-about" className="h-[150vh]"></div>

        {/* ABOUT - EARTH */}
        <section id="about" className="min-h-screen flex items-center justify-center py-64 max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 relative group opacity-0 lg:opacity-100 pointer-events-none">
            <div className="aspect-square bg-white/5 overflow-hidden rounded-full border border-white/10 p-4 backdrop-blur-sm shadow-[0_0_80px_rgba(204,255,0,0.1)]">
              <img src="/Myimage.png" alt="Profile" className="w-full h-full rounded-full object-cover" />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-10">
            <div className="backdrop-blur-xl bg-black/40 p-12 border border-white/10 rounded-2xl shadow-2xl">
              <h2 className="text-xs font-mono text-accent uppercase tracking-[0.8em] mb-8 animate-pulse font-bold">Orbit_Entry // Identity</h2>
              <h3 className="text-5xl md:text-7xl font-display font-bold leading-[0.85] tracking-tighter mb-10 uppercase text-white">
                Bridging <span className="text-outline">Code</span> & Cosmos.
              </h3>
              <div className="space-y-8 text-xl text-[var(--text-secondary)] font-medium leading-relaxed max-w-2xl">
                <p>
                  I am <span className="text-[var(--text-primary)] font-extrabold">Shoaib Khatik</span>, a digital architect navigating the complexities of the MERN stack and Django ecosystems. Currently orbiting my MCA at Dr. Moonje Institute.
                </p>
                <div className="flex gap-4">
                  <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-xs font-mono uppercase tracking-widest text-white">Nashik_Base</div>
                  <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-xs font-mono uppercase tracking-widest text-white">MCA_Scholar</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SPACER: Earth -> Mars */}
        <div id="spacer-about-skills" className="h-[150vh]"></div>

        {/* SKILLS - MARS */}
        <section id="skills" className="min-h-screen py-64 px-6 relative">
          <SkillsSection />
        </section>

        {/* SPACER: Mars -> Jupiter */}
        <div id="spacer-skills-projects" className="h-[150vh]"></div>

        {/* PROJECTS - JUPITER */}
        <section id="projects" className="min-h-screen py-64 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="mb-32 text-center">
              <h2 className="text-xs font-mono text-accent uppercase tracking-[1em] mb-6 font-bold">Exploration.log</h2>
              <h3 className="text-7xl md:text-9xl font-display font-bold tracking-tighter uppercase opacity-10 absolute left-0 w-full select-none pointer-events-none text-white">DISCOVERIES</h3>
              <h3 className="text-6xl font-display font-bold tracking-tighter uppercase relative z-10 text-white drop-shadow-xl">Deployed Universes</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {PROJECTS.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* SPACER FOR SATURN (Specific ID for 3D alignment) */}
        <div id="projects-saturn" className="h-[150vh] flex items-center justify-center">
            <div className="backdrop-blur-xl bg-black/40 p-8 border border-white/10 rounded-xl text-center max-w-lg mx-auto">
                <h4 className="font-display font-bold text-2xl uppercase tracking-tighter mb-4">Deep Space Scaling</h4>
                <p className="text-white/70 font-mono text-xs uppercase tracking-widest leading-relaxed">Scaling applications across vast distributed systems, much like the rings of Saturn. Engineering for high gravity traffic.</p>
            </div>
        </div>

        {/* SPACER: Saturn -> Neptune */}
        <div id="spacer-saturn-contact" className="h-[150vh]"></div>

        {/* CONTACT - NEPTUNE */}
        <section id="contact" className="min-h-screen py-64 px-6 relative overflow-hidden flex items-center">
          <div className="max-w-4xl mx-auto backdrop-blur-2xl bg-black/40 p-16 border border-white/10 rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.6)]">
            <div className="text-center mb-20">
              <h3 className="text-6xl font-display font-black tracking-tighter uppercase mb-6 text-white">
                Establish <span className="text-accent">Comms</span>
              </h3>
              <p className="text-[var(--text-secondary)] font-mono uppercase tracking-widest text-sm font-bold opacity-80">Waiting for incoming signal...</p>
            </div>
            
            <form className="space-y-12" onSubmit={handleFormSubmit}>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="group border-b border-white/30 focus-within:border-accent transition-colors">
                  <input required type="text" className="w-full bg-transparent py-4 font-mono text-lg placeholder:text-white/30 outline-none uppercase text-white" placeholder="Identifier" />
                </div>
                <div className="group border-b border-white/30 focus-within:border-accent transition-colors">
                  <input required type="email" className="w-full bg-transparent py-4 font-mono text-lg placeholder:text-white/30 outline-none uppercase text-white" placeholder="Frequency" />
                </div>
              </div>
              <div className="group border-b border-white/30 focus-within:border-accent transition-colors">
                <textarea required rows={3} className="w-full bg-transparent py-4 font-mono text-lg placeholder:text-white/30 outline-none resize-none uppercase text-white" placeholder="Message_Payload"></textarea>
              </div>
              <button type="submit" className="w-full py-8 bg-accent text-black font-display font-black text-2xl tracking-[0.2em] uppercase hover:scale-[1.02] transition-all active:scale-95 shadow-[0_0_40px_rgba(204,255,0,0.5)]">
                Send Signal
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/10 px-6 relative z-10 bg-black/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
           <div className="font-display font-bold text-2xl tracking-tighter flex items-center gap-3 text-white">
            <div className="w-10 h-10 bg-accent text-black flex items-center justify-center font-black shadow-lg">S</div>
            SHOAIB.DEV
          </div>
          <div className="flex gap-16 text-xs font-mono uppercase tracking-[0.4em] text-white/60">
            <a href="https://www.linkedin.com/in/shoaib-khatik-a422a7346" target="_blank" className="hover:text-accent transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-accent transition-colors">GitHub</a>
            <a href="#" className="hover:text-accent transition-colors">Resume</a>
          </div>
          <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">© 2024 Shoaib Khatik // Stellar Voyager.</p>
        </div>
      </footer>

      <AIChat />
    </div>
  );
};

export default App;
