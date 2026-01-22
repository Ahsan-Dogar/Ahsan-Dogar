
import React, { useState, useEffect } from 'react';
import gsap from 'gsap';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Services', id: 'services' },
    { name: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 250;

      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    gsap.to(window, {
      duration: 1.8,
      scrollTo: { y: `#${id}`, offsetY: 80 },
      ease: 'expo.inOut'
    });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-10 transition-all duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-full px-14 py-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <div 
          className="text-2xl luxury-font font-semibold tracking-[0.3em] cursor-pointer hover:opacity-50 transition-opacity"
          onClick={() => scrollTo('home')}
        >
          A.DOGAR
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-14">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-[9px] uppercase tracking-[0.4em] transition-all duration-700 relative group
                ${activeSection === link.id ? 'text-white font-bold' : 'text-white/30 hover:text-white'}`}
            >
              {link.name}
              <span className={`absolute -bottom-3 left-1/2 -translate-x-1/2 h-[1px] bg-white transition-all duration-700 rounded-full
                ${activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'}`} 
              />
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden flex flex-col space-y-2 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={`w-7 h-[1px] bg-white transition-all duration-500 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
          <div className={`w-7 h-[1px] bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <div className={`w-7 h-[1px] bg-white transition-all duration-500 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#050505] z-[150] flex flex-col items-center justify-center space-y-12 transition-all duration-1000 md:hidden backdrop-blur-3xl
        ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <button 
          className="absolute top-14 right-14 text-white text-4xl font-light hover:rotate-90 transition-transform duration-500"
          onClick={() => setIsMenuOpen(false)}
        >
          &times;
        </button>
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            className="text-6xl luxury-font hover:italic tracking-tighter transition-all duration-500 hover:scale-110"
          >
            {link.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
