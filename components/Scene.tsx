
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Scene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Geometry 1: Background Particles
    const particlesCount = 4000;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 25;
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.012,
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Geometry 2: Floating Torus Knot
    const knotGeom = new THREE.TorusKnotGeometry(1.5, 0.4, 200, 32);
    const knotMat = new THREE.MeshPhysicalMaterial({ 
      wireframe: true, 
      color: 0xffffff,
      transparent: true,
      opacity: 0.05,
      roughness: 0,
      metalness: 1
    });
    const knot = new THREE.Mesh(knotGeom, knotMat);
    knot.position.x = 4;
    scene.add(knot);

    // Geometry 3: Floating Sphere (Subtle Depth)
    const sphereGeom = new THREE.IcosahedronGeometry(1.2, 1);
    const sphereMat = new THREE.MeshNormalMaterial({ wireframe: true, transparent: true, opacity: 0.1 });
    const sphere = new THREE.Mesh(sphereGeom, sphereMat);
    sphere.position.set(-5, -2, -2);
    scene.add(sphere);

    // Lighting
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - width / 2);
      mouseY = (event.clientY - height / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animate
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;

      particlesMesh.rotation.y = elapsedTime * 0.05;
      particlesMesh.rotation.x += (targetY - particlesMesh.rotation.x) * 0.1;
      particlesMesh.rotation.y += (targetX - particlesMesh.rotation.y) * 0.1;

      knot.rotation.x = elapsedTime * 0.2;
      knot.rotation.y = elapsedTime * 0.15;
      knot.position.y = Math.sin(elapsedTime * 0.5) * 1;
      knot.position.x = 4 + (targetX * 2);

      sphere.rotation.y = elapsedTime * 0.1;
      sphere.position.y = -2 + Math.cos(elapsedTime * 0.3) * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full opacity-60" />;
};

export default Scene;
