import React from 'react';
import { SKILLS } from '../constants';

const SkillsSection: React.FC = () => {
  return (
    <div className="relative z-10 w-full">
      <header className="mb-20 text-right lg:text-left">
        <h2 className="text-[12px] font-mono text-accent uppercase tracking-[1em] mb-4 font-black">
          Archive_02 // Spec_Sheet
        </h2>
        <h3 className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-white leading-tight">
          System<br/>Inventory
        </h3>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {SKILLS.map((skill) => (
          <div 
            key={skill.name} 
            className="group relative flex flex-col items-center justify-center p-8 glass rounded-[2rem] hover:border-accent transition-all duration-700 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                <div 
                    className="h-full bg-accent opacity-30 group-hover:opacity-100 transition-all duration-1000 origin-left scale-x-0 group-hover:scale-x-100"
                    style={{ width: `${skill.level}%` }}
                ></div>
            </div>

            <i className={`${skill.icon} text-4xl text-white/50 group-hover:text-accent group-hover:scale-125 transition-all mb-6`}></i>
            
            <div className="text-center">
              <div className="text-[10px] font-mono text-white/30 mb-2 uppercase tracking-[0.3em] font-bold">
                {skill.category}
              </div>
              <div className="text-[13px] font-black tracking-widest text-white uppercase">
                {skill.name}
              </div>
            </div>

            <div className="mt-6 font-mono text-[9px] text-accent/50 group-hover:text-accent transition-colors">
              LVL_{skill.level}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;