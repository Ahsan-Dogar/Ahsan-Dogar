
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal', {
        scrollTrigger: {
          trigger: '.contact-reveal',
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20">
      <div>
        <h2 className="contact-reveal text-xs uppercase tracking-[0.4em] text-white/50 mb-4">Contact</h2>
        <h3 className="contact-reveal text-5xl md:text-7xl luxury-font mb-10 leading-tight">
          Let's create something <br /> eternal together.
        </h3>
        <p className="contact-reveal text-white/40 mb-12 italic max-w-sm">
          Currently accepting exclusive partnerships and high-impact digital ventures for 2024.
        </p>
        
        <div className="space-y-8 contact-reveal">
          <a href="mailto:hello@ahsandogar.dev" className="group flex items-center space-x-4">
            <div className="w-12 h-12 glass rounded-full flex items-center justify-center group-hover:bg-white/10 transition-all">
              <span className="text-lg">✉</span>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/30">Direct Inquiries</p>
              <p className="text-lg luxury-font">hello@ahsandogar.dev</p>
            </div>
          </a>
          <div className="flex space-x-6 pt-4">
            {['LinkedIn', 'Github', 'Twitter', 'Dribbble'].map((social) => (
              <a key={social} href="#" className="text-xs uppercase tracking-[0.2em] text-white/30 hover:text-white transition-all">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>

      <form className="space-y-12 contact-reveal">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Name"
            className="w-full bg-transparent border-b border-white/10 py-4 focus:border-white outline-none transition-all placeholder:text-white/20 text-lg font-light"
          />
          <div className="absolute bottom-0 left-0 h-[1px] bg-white w-0 group-focus-within:w-full transition-all duration-700" />
        </div>
        <div className="relative group">
          <input 
            type="email" 
            placeholder="Email Address"
            className="w-full bg-transparent border-b border-white/10 py-4 focus:border-white outline-none transition-all placeholder:text-white/20 text-lg font-light"
          />
          <div className="absolute bottom-0 left-0 h-[1px] bg-white w-0 group-focus-within:w-full transition-all duration-700" />
        </div>
        <div className="relative group">
          <textarea 
            placeholder="Your Vision"
            rows={4}
            className="w-full bg-transparent border-b border-white/10 py-4 focus:border-white outline-none transition-all placeholder:text-white/20 text-lg font-light resize-none"
          />
          <div className="absolute bottom-0 left-0 h-[1px] bg-white w-0 group-focus-within:w-full transition-all duration-700" />
        </div>
        <button className="group relative px-12 py-5 bg-white text-black text-xs uppercase tracking-[0.3em] font-bold rounded-full overflow-hidden transition-transform active:scale-95">
          <span className="relative z-10">Send Inquiry</span>
          <div className="absolute inset-0 bg-gray-200 scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-500" />
        </button>
      </form>
    </div>
  );
};

export default Contact;
