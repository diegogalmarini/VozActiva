"use client";

import { useEffect, useRef } from "react";

export default function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Static gradient background - NO ANIMATION
    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      
      // Colores suaves y constantes inspirados en la imagen
      gradient.addColorStop(0, "#1a2332");    // Azul oscuro
      gradient.addColorStop(0.3, "#1e2644");  // Azul medio
      gradient.addColorStop(0.6, "#2a1f3d");  // Púrpura oscuro
      gradient.addColorStop(1, "#3d1f3a");    // Magenta oscuro
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Particle dots configuration - STATIC GRID
    const cols = 40;
    const rows = 25;
    const spacingX = canvas.width / (cols - 1);
    const spacingY = canvas.height / (rows - 1);
    
    const particles: Array<{
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * spacingX;
        const y = j * spacingY;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          opacity: Math.random() * 0.3 + 0.1, // Muy sutil
        });
      }
    }

    let time = 0;

    const animate = () => {
      drawBackground();

      // Movimiento MUY SUAVE de olas - casi imperceptible
      particles.forEach((particle) => {
        const waveX = Math.sin((particle.baseY * 0.001) + (time * 0.0003)) * 15;
        const waveY = Math.cos((particle.baseX * 0.001) + (time * 0.0003)) * 8;
        
        particle.x = particle.baseX + waveX;
        particle.y = particle.baseY + waveY;

        // Dibujar punto muy pequeño y sutil
        ctx.fillStyle = `rgba(150, 180, 220, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2);
        ctx.fill();
      });

      time += 1;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: "transparent" }}
    />
  );
}
