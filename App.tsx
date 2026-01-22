
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChatBot from './components/AIChatBot';
import Scene from './components/Scene';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Cinematic Intro Animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
      gsap.to('.loader', {
        opacity: 0,
        duration: 1.5,
        ease: 'power4.inOut',
        onComplete: () => {
          document.querySelector('.loader')?.remove();
        }
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      {/* Loader */}
      {!isLoaded && (
        <div className="loader fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505]">
          <h1 className="text-4xl md:text-6xl luxury-font tracking-widest animate-pulse font-light">
            AHSAN DOGAR
          </h1>
          <div className="mt-4 w-48 h-[1px] bg-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-full bg-white animate-[loading_2s_ease-in-out_infinite]"></div>
          </div>
        </div>
      )}

      {/* Background Three.js Scene */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Scene />
      </div>

      {/* Enhanced Parallax Floating Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[5%] w-64 h-64 border border-white/[0.03] rounded-full animate-float-slow blur-sm" />
        <div className="absolute top-[40%] right-[-5%] w-96 h-96 border border-white/[0.02] rounded-full animate-float-slow-reverse blur-md" />
        <div className="absolute bottom-[10%] left-[20%] w-48 h-48 border border-white/[0.04] rounded-full animate-float-mid blur-[2px]" />
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        <Navbar />
        
        <section id="home">
          <Hero />
        </section>

        <section id="about" className="py-24 md:py-60">
          <About />
        </section>

        <section id="skills" className="py-24 md:py-60">
          <Skills />
        </section>

        <section id="projects" className="py-24 md:py-60">
          <Projects />
        </section>

        <section id="services" className="py-24 md:py-60">
          <Services />
        </section>

        <section id="contact" className="py-24 md:py-60">
          <Contact />
        </section>

        <Footer />
      </main>

      {/* AI Assistant FAB */}
      <AIChatBot />

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(40px, -60px) rotate(15deg); }
        }
        @keyframes float-slow-reverse {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-50px, 80px) rotate(-20deg); }
        }
        @keyframes float-mid {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, -30px); }
        }
        .animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
        .animate-float-slow-reverse { animation: float-slow-reverse 25s ease-in-out infinite; }
        .animate-float-mid { animation: float-mid 12s ease-in-out infinite; }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default App;
