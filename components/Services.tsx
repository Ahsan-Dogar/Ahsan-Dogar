
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const services = [
  {
    title: 'Immersive Experiences',
    desc: 'Leveraging WebGL and Three.js to create interactive 3D environments that redefine user engagement.',
    icon: '✦'
  },
  {
    title: 'Senior Architecture',
    desc: 'Architecting scalable, performance-driven React applications with meticulous attention to clean code.',
    icon: '✧'
  },
  {
    title: 'Cinematic Motion',
    desc: 'Bringing interfaces to life with GSAP timelines, ensuring every interaction feels premium and intentional.',
    icon: '⚛'
  },
  {
    title: 'Luxury UI/UX',
    desc: 'Crafting high-end visual systems that embody the essence of luxury, elegance, and exclusivity.',
    icon: '◇'
  }
];

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-item', {
        scrollTrigger: {
          trigger: '.service-item',
          start: 'top 85%',
        },
        x: -40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
        {services.map((service, index) => (
          <div key={index} className="service-item bg-[#050505] p-10 hover:bg-white/[0.02] transition-colors group">
            <div className="text-3xl mb-8 group-hover:rotate-12 transition-transform">{service.icon}</div>
            <h4 className="text-2xl luxury-font mb-4">{service.title}</h4>
            <p className="text-sm text-white/40 leading-relaxed font-light italic">
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
