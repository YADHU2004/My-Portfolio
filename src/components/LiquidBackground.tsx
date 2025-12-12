import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function LiquidBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const moveBlob = (blob: HTMLDivElement | null, factor: number) => {
        if (!blob) return;
        const moveX = (x - 0.5) * factor;
        const moveY = (y - 0.5) * factor;
        blob.style.transform = `translate(${moveX}px, ${moveY}px)`;
      };

      moveBlob(blob1Ref.current, 40);
      moveBlob(blob2Ref.current, 25);
      moveBlob(blob3Ref.current, 15);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || !e.touches[0]) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.touches[0].clientX - rect.left) / rect.width;
      const y = (e.touches[0].clientY - rect.top) / rect.height;

      const moveBlob = (blob: HTMLDivElement | null, factor: number) => {
        if (!blob) return;
        const moveX = (x - 0.5) * factor;
        const moveY = (y - 0.5) * factor;
        blob.style.transform = `translate(${moveX}px, ${moveY}px)`;
      };

      moveBlob(blob1Ref.current, 40);
      moveBlob(blob2Ref.current, 25);
      moveBlob(blob3Ref.current, 15);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Teal blob */}
      <motion.div
        ref={blob1Ref}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 rounded-full animate-blob transition-transform duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle, hsl(187 94% 43% / 0.4) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      
      {/* Purple blob */}
      <motion.div
        ref={blob2Ref}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute top-1/3 right-1/3 w-56 md:w-80 h-56 md:h-80 rounded-full animate-blob animation-delay-2000 transition-transform duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle, hsl(280 70% 50% / 0.35) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      
      {/* Pink blob */}
      <motion.div
        ref={blob3Ref}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute top-1/2 right-1/4 w-48 md:w-72 h-48 md:h-72 rounded-full animate-blob animation-delay-4000 transition-transform duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle, hsl(330 80% 55% / 0.3) 0%, transparent 70%)',
          filter: 'blur(45px)',
        }}
      />

      {/* Noise overlay for texture */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
