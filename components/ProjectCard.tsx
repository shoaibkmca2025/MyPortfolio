import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const stopProp = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div className="group relative glass rounded-2xl overflow-hidden hover:border-accent transition-all duration-500 flex flex-col h-full shadow-lg">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute top-4 left-4 px-3 py-1 bg-accent/90 text-black font-mono text-[9px] font-black uppercase tracking-widest rounded-md">
          {project.category}
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-1">
        <div className="text-[9px] font-mono text-accent mb-2 tracking-[0.4em] uppercase font-black">Pkg_0{project.id}</div>
        <h3 className="text-xl md:text-2xl font-display font-black mb-4 tracking-tight uppercase text-white group-hover:text-accent transition-colors">{project.title}</h3>
        <p className="text-white/60 text-xs md:text-sm font-medium leading-relaxed mb-8">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-8 mt-auto">
          {project.tech.map(t => (
            <span key={t} className="text-[8px] font-mono px-2 py-1 bg-white/5 border border-white/10 text-white/80 rounded uppercase">
              {t}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex gap-5">
            <button onClick={stopProp} className="text-white/40 hover:text-accent transition-colors"><i className="fa-brands fa-github text-lg"></i></button>
            <button onClick={stopProp} className="text-white/40 hover:text-accent transition-colors"><i className="fa-solid fa-external-link text-base"></i></button>
          </div>
          <div className="w-10 h-px bg-white/10"></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;