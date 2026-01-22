
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-text', {
        scrollTrigger: {
          trigger: '.reveal-text',
          start: 'top 85%',
        },
        y: 80,
        opacity: 0,
        duration: 1.8,
        stagger: 0.15,
        ease: 'expo.out'
      });

      gsap.to('.parallax-img', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: -100,
        ease: 'none'
      });

      gsap.from('.stat-item', {
        scrollTrigger: {
          trigger: '.stats-container',
          start: 'top 90%',
        },
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'expo.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
      <div className="relative group parallax-img">
        <div className="aspect-[4/6] relative overflow-hidden rounded-[3rem] border border-white/5 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&grayscale=true" 
            alt="Portrait of Ahsan Dogar" 
            className="w-full h-full object-cover grayscale brightness-75 transition-transform duration-1500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
        </div>
        <div className="absolute -bottom-12 -right-12 w-48 h-48 glass rounded-full flex flex-col items-center justify-center text-center p-8 border border-white/10 z-20 backdrop-blur-3xl">
          <span className="text-2xl luxury-font mb-2">✧</span>
          <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/60">Digital <br /> Architect</p>
        </div>
      </div>

      <div className="space-y-12">
        <div>
          <h2 className="reveal-text text-xs uppercase tracking-[0.5em] text-white/30 mb-6 font-bold">A Legacy of Precision</h2>
          <h3 className="reveal-text text-6xl md:text-8xl luxury-font mb-12 leading-none tracking-tighter">
            Engineering <br /> <span className="italic">Excellence</span>
          </h3>
          <div className="space-y-8 text-xl text-white/50 font-light leading-relaxed tracking-tight">
            <p className="reveal-text">
              I am Ahsan Dogar, a senior web architect committed to bridging the gap between high-end aesthetic design and robust technical engineering.
            </p>
            <p className="reveal-text">
              My approach is surgical: every line of code, every micro-interaction, and every frame of motion is meticulously calibrated to deliver a sensory experience that resonates with prestige.
            </p>
          </div>
        </div>
        
        <div className="stats-container flex space-x-16 pt-10">
          <div className="stat-item">
            <div className="text-5xl luxury-font font-light mb-2">06<span className="text-sm align-top ml-1 text-white/30">+</span></div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Years Obsessed</div>
          </div>
          <div className="stat-item">
            <div className="text-5xl luxury-font font-light mb-2">40<span className="text-sm align-top ml-1 text-white/30">+</span></div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Masterpieces</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
