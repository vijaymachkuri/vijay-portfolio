import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  theme: 'dark' | 'light';
}

const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ theme }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const particlesMaterialRef = useRef<THREE.PointsMaterial | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Initial Fog
    const fogColor = theme === 'light' ? 0xf2f2f2 : 0x0a0a0a;
    scene.fog = new THREE.FogExp2(fogColor, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        // Spread particles
        posArray[i] = (Math.random() - 0.5) * 150; 
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Material
    const particleColor = theme === 'light' ? 0x0a0a0a : 0xffffff;
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        color: particleColor,
        transparent: true,
        opacity: 0.8,
    });
    particlesMaterialRef.current = particlesMaterial;
    
    // Red Accents
    const redParticlesGeometry = new THREE.BufferGeometry();
    const redParticlesCount = 300;
    const redPosArray = new Float32Array(redParticlesCount * 3);
    for(let i = 0; i < redParticlesCount * 3; i++) {
        redPosArray[i] = (Math.random() - 0.5) * 120;
    }
    redParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(redPosArray, 3));
    const redParticlesMaterial = new THREE.PointsMaterial({
        size: 0.3,
        color: 0xD71920, // Nth Red (constant)
        transparent: true,
        opacity: 0.9,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    const redParticlesMesh = new THREE.Points(redParticlesGeometry, redParticlesMaterial);
    
    scene.add(particlesMesh);
    scene.add(redParticlesMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    };
    
    document.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        const targetX = mouseX * 0.001;
        const targetY = mouseY * 0.001;

        // Smooth rotation
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;

        redParticlesMesh.rotation.y -= 0.0015; // Counter rotation
        redParticlesMesh.rotation.x -= 0.0005;

        // Mouse influence
        particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
        particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

        renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationFrameId);
        if (mountRef.current) {
            mountRef.current.removeChild(renderer.domElement);
        }
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        redParticlesGeometry.dispose();
        redParticlesMaterial.dispose();
        renderer.dispose();
    };
  }, []);

  // Effect to update colors when theme changes
  useEffect(() => {
    if (sceneRef.current) {
        const fogColor = theme === 'light' ? 0xf2f2f2 : 0x0a0a0a;
        sceneRef.current.fog = new THREE.FogExp2(fogColor, 0.002);
    }
    if (particlesMaterialRef.current) {
        const particleColor = theme === 'light' ? 0x0a0a0a : 0xffffff;
        particlesMaterialRef.current.color.setHex(particleColor);
    }
  }, [theme]);

  return (
    <div 
      ref={mountRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-nth-black transition-colors duration-300"
    />
  );
};

export default ThreeBackground;