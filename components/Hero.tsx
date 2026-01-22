
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1 });

      tl.from('.hero-sub', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'expo.out'
      })
      .from('.hero-main', {
        y: 150,
        opacity: 0,
        duration: 2,
        ease: 'expo.out'
      }, '-=0.5')
      .from('.hero-desc', {
        y: 20,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out'
      }, '-=1.2')
      .from('.cta-group', {
        y: 30,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out'
      }, '-=1.2');

      gsap.to('.scroll-indicator', {
        y: 20,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power1.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: `#${id}`, offsetY: 80 },
      ease: 'expo.inOut'
    });
  };

  return (
    <div ref={containerRef} className="h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden">
      {/* Visual background layers */}
      <div className="absolute top-[15%] left-[10%] w-[1px] h-[30%] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-[15%] right-[10%] w-[1px] h-[30%] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      <div className="text-center z-10">
        <p className="hero-sub text-[10px] md:text-xs uppercase tracking-[0.8em] text-white/40 mb-10 font-bold ml-[0.8em]">
          The Pinnacle of Digital Craft
        </p>
        <h1 className="hero-main text-7xl md:text-[14rem] luxury-font font-light leading-none mb-10 tracking-tighter">
          Ahsan Dogar
        </h1>
        <h2 className="hero-desc text-lg md:text-2xl font-light tracking-[0.2em] text-white/30 max-w-2xl mx-auto italic mb-16 leading-loose">
          Architecting high-performance digital ecosystems <br className="hidden md:block" /> with surgical aesthetic precision.
        </h2>
        
        <div className="cta-group flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
          <button 
            onClick={() => scrollTo('projects')}
            className="group relative px-16 py-6 glass overflow-hidden rounded-full border border-white/5 hover:border-white/20 transition-all duration-700 active:scale-95"
          >
            <span className="relative z-10 text-[10px] uppercase tracking-[0.4em] font-bold group-hover:text-black transition-colors duration-500">The Portfolio</span>
            <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700 ease-expo-out" />
          </button>
          
          <button 
            onClick={() => scrollTo('contact')}
            className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30 hover:text-white transition-all duration-500 py-6 group"
          >
            Start a Conversation
            <span className="block w-0 h-[1px] bg-white group-hover:w-full transition-all duration-700 mt-1" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 scroll-indicator cursor-pointer" onClick={() => scrollTo('about')}>
        <div className="flex flex-col items-center space-y-4">
          <span className="text-[8px] uppercase tracking-[0.5em] text-white/20 font-bold">Discover</span>
          <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none" />
    </div>
  );
};

export default Hero;
