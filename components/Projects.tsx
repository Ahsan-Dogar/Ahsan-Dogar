
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const projects = [
  { 
    title: 'Aura Luxury Estates', 
    category: 'Real Estate / 3D', 
    img: 'https://picsum.photos/1200/800?1', 
    accent: 'border-blue-500/20'
  },
  { 
    title: 'Vanguard Automotive', 
    category: 'Automotive / Performance', 
    img: 'https://picsum.photos/1200/800?2',
    accent: 'border-red-500/20'
  },
  { 
    title: 'Stellar Crypto', 
    category: 'Web3 / Fintech', 
    img: 'https://picsum.photos/1200/800?3',
    accent: 'border-purple-500/20'
  },
  { 
    title: 'Noir Fashion House', 
    category: 'E-commerce / Motion', 
    img: 'https://picsum.photos/1200/800?4',
    accent: 'border-white/20'
  },
];

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.project-item');
      items.forEach((item: any) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
          },
          y: 100,
          opacity: 0,
          duration: 1.5,
          ease: 'power4.out'
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <div>
          <h2 className="text-xs uppercase tracking-[0.4em] text-white/50 mb-4">Portfolio</h2>
          <h3 className="text-5xl md:text-7xl luxury-font">Selected Works</h3>
        </div>
        <p className="max-w-md text-white/40 italic font-light">
          A curation of high-impact digital experiences where design meets unparalleled engineering.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {projects.map((project, index) => (
          <div key={index} className="project-item group cursor-pointer">
            <div className={`relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/5 transition-all duration-700 group-hover:border-white/20 ${project.accent}`}>
              <img 
                src={project.img} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-1000 scale-105 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="px-8 py-3 glass rounded-full text-xs uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  View Experience
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-between items-start">
              <div>
                <h4 className="text-2xl luxury-font group-hover:translate-x-2 transition-transform duration-500">{project.title}</h4>
                <p className="text-xs uppercase tracking-widest text-white/30 mt-2">{project.category}</p>
              </div>
              <div className="text-white/20 group-hover:text-white transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
