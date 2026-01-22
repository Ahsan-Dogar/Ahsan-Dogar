
import React from 'react';
import gsap from 'gsap';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    gsap.to(window, { duration: 2, scrollTo: 0, ease: 'power4.inOut' });
  };

  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-xl luxury-font tracking-widest opacity-60">AHSAN DOGAR</div>
        
        <div className="flex space-x-12">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-widest text-white/20 mb-2">Local Time</p>
            <p className="text-xs">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} GMT</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-widest text-white/20 mb-2">Availability</p>
            <p className="text-xs">Project Ready</p>
          </div>
        </div>

        <button 
          onClick={scrollToTop}
          className="group flex flex-col items-center justify-center space-y-2"
        >
          <div className="w-10 h-10 glass rounded-full flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-all">
            <span className="text-xs translate-y-[1px]">↑</span>
          </div>
          <span className="text-[8px] uppercase tracking-[0.2em] opacity-40">Return</span>
        </button>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 text-center text-[8px] uppercase tracking-[0.5em] opacity-20">
        &copy; 2024 Ahsan Dogar. All Rights Reserved. Crafted with Intelligence.
      </div>
    </footer>
  );
};

export default Footer;
