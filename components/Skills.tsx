
import React, { useEffect, useRef, useState, useMemo, Suspense } from 'react';
import gsap from 'gsap';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const SkillShape: React.FC<{ type: string; isExpanded?: boolean }> = ({ type, isExpanded }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.cos(t / 4) / 4;
    meshRef.current.rotation.y = Math.sin(t / 4) / 4;
    meshRef.current.rotation.z = Math.sin(t / 2) / 4;
    
    if (isExpanded) {
      meshRef.current.rotation.y += 0.01;
    } else {
      meshRef.current.rotation.y += 0.005;
    }
  });

  const geometry = useMemo(() => {
    switch (type) {
      // @ts-ignore
      case 'react': return <torusKnotGeometry args={[0.6, 0.18, 128, 16]} />;
      // @ts-ignore
      case 'js': return <icosahedronGeometry args={[0.7, 0]} />;
      // @ts-ignore
      case 'css': return <torusGeometry args={[0.5, 0.2, 16, 100]} />;
      // @ts-ignore
      case 'html': return <boxGeometry args={[0.8, 0.8, 0.8]} />;
      // @ts-ignore
      case 'three': return <octahedronGeometry args={[0.8, 2]} />;
      // @ts-ignore
      case 'motion': return <dodecahedronGeometry args={[0.7]} />;
      // @ts-ignore
      case 'typescript': return <capsuleGeometry args={[0.4, 0.4, 4, 12]} />;
      // @ts-ignore
      case 'design': return <sphereGeometry args={[0.65, 32, 32]} />;
      // @ts-ignore
      default: return <boxGeometry args={[0.7, 0.7, 0.7]} />;
    }
  }, [type]);

  return (
    // @ts-ignore
    <mesh ref={meshRef}>
      {geometry}
      {/* @ts-ignore */}
      <meshPhysicalMaterial 
        color="#ffffff"
        wireframe
        transparent
        opacity={0.4}
        emissive="#333333"
        roughness={0.1}
        metalness={0.9}
        reflectivity={1}
      />
    </mesh>
  );
};

const Skill3DIcon: React.FC<{ type: string; size?: number; isExpanded?: boolean }> = ({ type, size = 120, isExpanded }) => {
  return (
    <div style={{ width: size, height: size }}>
      <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          {/* @ts-ignore */}
          <ambientLight intensity={1.5} />
          {/* @ts-ignore */}
          <pointLight position={[10, 10, 10]} intensity={2} />
          {/* @ts-ignore */}
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
          <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <SkillShape type={type} isExpanded={isExpanded} />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
};

const skillsData = [
  { 
    id: 'html',
    name: 'HTML5 Semantic', 
    level: 98, 
    desc: 'Mastery of accessible structures and advanced SEO-ready markup.',
    subSkills: ['Accessibility (A11y)', 'SEO Optimization', 'Canvas API', 'Web Components'],
    longDesc: 'The foundation of the web. I build with semantic precision, ensuring that every element serves a purpose and is accessible to all users.'
  },
  { 
    id: 'css',
    name: 'CSS3 Luxury', 
    level: 96, 
    desc: 'Architecting high-end visual systems with SCSS, Grid, and Flexbox.',
    subSkills: ['Modern SCSS/Sass', 'CSS-in-JS', 'Responsive Design', 'Tailwind CSS Mastery'],
    longDesc: 'Translating high-end design into pixel-perfect code. I specialize in complex layouts and premium typography that feels both solid and ethereal.'
  },
  { 
    id: 'js',
    name: 'JavaScript Logic', 
    level: 94, 
    desc: 'Advanced ES6+ logic for high-performance frontend applications.',
    subSkills: ['Async/Await Logic', 'Functional Programming', 'Web Workers', 'Algorithm Design'],
    longDesc: 'The engine of interaction. I write clean, performant, and scalable logic to drive complex user experiences without friction.'
  },
  { 
    id: 'react',
    name: 'React Ecosystem', 
    level: 95, 
    desc: 'Senior-level architecture using Next.js and high-performance patterns.',
    subSkills: ['Next.js 15', 'Server Components', 'State Management', 'Hook Optimization'],
    longDesc: 'Designing component-based ecosystems that are maintainable and ultra-fast. My React architecture is built for the future of the web.'
  },
  { 
    id: 'typescript',
    name: 'TypeScript Architect', 
    level: 90, 
    desc: 'Constructing robust, type-safe foundations for global apps.',
    subSkills: ['Generics Mastery', 'Advanced Types', 'Interface Design', 'Utility Logic'],
    longDesc: 'Enforcing stability through strict typing. I minimize runtime errors by building type-safe structures that scale elegantly.'
  },
  { 
    id: 'motion',
    name: 'GSAP Motion', 
    level: 92, 
    desc: 'Cinematic timelines and complex frame-perfect interactions.',
    subSkills: ['ScrollTrigger', 'Timeline Control', 'SVG Animation', 'Micro-interactions'],
    longDesc: 'Motion is not an ornament; it is a guide. I use GSAP to create purposeful transitions that feel intuitive and premium.'
  },
  { 
    id: 'three',
    name: 'Three.js / WebGL', 
    level: 88, 
    desc: 'Shaders and immersive 3D browser environments.',
    subSkills: ['Shader Programming', 'Buffer Geometry', 'Lighting & Shadows', 'R3F Integration'],
    longDesc: 'Expanding the browser into three dimensions. I build interactive WebGL scenes that push the boundaries of digital presentation.'
  },
  { 
    id: 'design',
    name: 'Aesthetic UI', 
    level: 93, 
    desc: 'Minimalist aesthetics and luxury typography precision.',
    subSkills: ['Luxury Typography', 'Glassmorphism', 'Grid Precision', 'Visual Hierarchy'],
    longDesc: 'Design is intelligence made visible. I focus on the balance of negative space and contrast to create interfaces that feel truly expensive.'
  },
];

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.skill-card');
    
    // Counter and Progress Bar Animation
    cards.forEach((card: any, index: number) => {
      const level = skillsData[index].level;
      const counterSpan = card.querySelector('.level-counter');
      const progressBar = card.querySelector('.progress-fill');

      const counterObj = { value: 0 };

      gsap.to(counterObj, {
        value: level,
        duration: 2.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
        },
        onUpdate: () => {
          if (counterSpan) counterSpan.textContent = Math.round(counterObj.value).toString();
        }
      });

      gsap.fromTo(progressBar, 
        { width: '0%' }, 
        {
          width: `${level}%`,
          duration: 2.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          }
        }
      );

      // Mouse Move Tilt Effect
      card.addEventListener('mousemove', (e: MouseEvent) => {
        if (expandedIndex !== null) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 12;
        const rotateY = (centerX - x) / 12;

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 0.6,
          ease: 'power2.out',
          transformPerspective: 1200
        });
      });

      card.addEventListener('mouseleave', () => {
        if (expandedIndex !== null) return;
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 1.2,
          ease: 'elastic.out(1, 0.4)'
        });
      });
    });

    gsap.from('.skill-card', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
      },
      y: 100,
      opacity: 0,
      duration: 1.8,
      stagger: 0.12,
      ease: 'expo.out'
    });
  }, [expandedIndex]);

  const handleExpand = (index: number) => {
    setExpandedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedIndex(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-6 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-28 gap-8">
        <div className="max-w-xl">
          <h2 className="text-xs uppercase tracking-[0.7em] text-white/40 mb-6 font-bold">Scientific Craft</h2>
          <h3 className="text-6xl md:text-9xl luxury-font leading-none tracking-tighter">Core Arsenal</h3>
        </div>
        <p className="max-w-sm text-white/30 italic font-light leading-relaxed text-sm">
          Dynamic 3D representations of a decade of technical obsession. Click any segment to dive into the architecture.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {skillsData.map((skill, index) => (
          <div 
            key={index}
            onClick={() => handleExpand(index)}
            className="skill-card group glass p-10 rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all duration-1000 bg-white/[0.01] backdrop-blur-xl relative overflow-hidden cursor-pointer"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/[0.01] blur-[80px] pointer-events-none group-hover:bg-white/[0.03] transition-colors" />
            
            <div className="mb-10 flex justify-center transform group-hover:scale-110 transition-transform duration-700" style={{ transform: 'translateZ(60px)' }}>
              <Skill3DIcon type={skill.id} size={140} />
            </div>
            
            <div className="flex justify-between items-end mb-6" style={{ transform: 'translateZ(40px)' }}>
              <h4 className="text-lg luxury-font font-medium tracking-tight leading-tight">{skill.name}</h4>
              <div className="text-[10px] text-white/30 tracking-[0.4em] font-bold">
                <span className="level-counter">0</span>%
              </div>
            </div>
            
            <div className="w-full h-[1px] bg-white/5 mb-8 relative overflow-hidden" style={{ transform: 'translateZ(20px)' }}>
              <div 
                className="progress-fill absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/40 to-white transition-all duration-1500 ease-expo-out group-hover:bg-white"
              />
            </div>
            
            <p className="text-[10px] text-white/40 font-light italic leading-loose opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ transform: 'translateZ(10px)' }}>
              {skill.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Expanded Modal View */}
      {expandedIndex !== null && (
        <div 
          className="fixed inset-0 z-[1000] flex items-center justify-center p-6 md:p-12 animate-in"
          onClick={() => handleClose()}
        >
          <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" />
          
          <Suspense fallback={<div className="text-white">Initializing Neural Module...</div>}>
            <div 
              className="relative glass max-w-6xl w-full max-h-[90vh] rounded-[3.5rem] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-[0_80px_160px_rgba(0,0,0,1)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => handleClose()}
                className="absolute top-10 right-10 w-14 h-14 glass rounded-full flex items-center justify-center z-50 hover:bg-white/10 transition-all group"
              >
                <span className="text-3xl font-light group-hover:rotate-90 transition-transform duration-500">&times;</span>
              </button>

              {/* Left Column: Visual */}
              <div className="w-full md:w-5/12 bg-white/[0.02] flex items-center justify-center p-12 border-b md:border-b-0 md:border-r border-white/5">
                <div className="transform scale-125 md:scale-[2] flex flex-col items-center">
                  <Skill3DIcon type={skillsData[expandedIndex].id} size={250} isExpanded={true} />
                  <div className="mt-16 text-center">
                    <div className="text-[10px] uppercase tracking-[1em] text-white/20 font-bold mb-4">Level Of Mastery</div>
                    <div className="text-6xl luxury-font italic">{skillsData[expandedIndex].level}%</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Information */}
              <div className="w-full md:w-7/12 p-12 md:p-24 overflow-y-auto scrollbar-hide">
                <div className="space-y-16">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-bold mb-6">Discipline Overview</h4>
                    <h3 className="text-5xl md:text-8xl luxury-font mb-8 leading-none tracking-tighter">
                      {skillsData[expandedIndex].name}
                    </h3>
                    <div className="text-xl text-white/60 font-light leading-relaxed italic border-l-2 border-white/10 pl-8 py-4 bg-white/[0.01]">
                      {skillsData[expandedIndex].longDesc}
                    </div>
                  </div>

                  <div className="space-y-8">
                    <h4 className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-bold">Sub-Architecture Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {skillsData[expandedIndex].subSkills.map((sub, i) => (
                        <div key={i} className="flex items-center space-x-6 group/sub">
                          <div className="w-2 h-2 bg-white/10 rounded-full group-hover/sub:bg-white transition-all group-hover/sub:scale-150 duration-500" />
                          <span className="text-sm font-light tracking-widest text-white/30 group-hover/sub:text-white transition-colors duration-500 uppercase">{sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-10">
                    <button 
                      onClick={() => handleClose()}
                      className="group relative px-14 py-6 bg-white text-black text-[11px] uppercase tracking-[0.4em] font-black rounded-full transition-all overflow-hidden"
                    >
                      <span className="relative z-10">Collapse Module</span>
                      <div className="absolute inset-0 bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Suspense>
        </div>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes modal-in {
          from { opacity: 0; filter: blur(40px); transform: translateY(40px) scale(0.95); }
          to { opacity: 1; filter: blur(0); transform: translateY(0) scale(1); }
        }
        .animate-in {
          animation: modal-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Skills;