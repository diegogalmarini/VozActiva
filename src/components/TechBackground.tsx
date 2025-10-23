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

    // Particle system configuration
    const particleCount = 150;
    const particles: Array<{
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    // Create particle grid
    const cols = Math.ceil(Math.sqrt(particleCount * (canvas.width / canvas.height)));
    const rows = Math.ceil(particleCount / cols);
    const spacingX = canvas.width / (cols + 1);
    const spacingY = canvas.height / (rows + 1);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = (i + 1) * spacingX;
        const y = (j + 1) * spacingY;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.3,
        });
      }
    }

    let time = 0;
    const waveAmplitude = 80;
    const waveFrequency = 0.002;
    const waveSpeed = 0.002;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Animated gradient background
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      
      // Tech colors with animation
      const hue1 = (time * 10) % 360;
      const hue2 = (time * 10 + 120) % 360;
      const hue3 = (time * 10 + 240) % 360;
      
      gradient.addColorStop(0, `hsl(${hue1}, 70%, 15%)`);
      gradient.addColorStop(0.5, `hsl(${hue2}, 60%, 20%)`);
      gradient.addColorStop(1, `hsl(${hue3}, 65%, 18%)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles with wave motion
      particles.forEach((particle, index) => {
        // Wave displacement
        const waveOffsetX =
          Math.sin(particle.baseY * waveFrequency + time * waveSpeed) *
          waveAmplitude;
        const waveOffsetY =
          Math.cos(particle.baseX * waveFrequency + time * waveSpeed) *
          waveAmplitude *
          0.5;

        // Update position with wave + drift
        particle.x = particle.baseX + waveOffsetX + particle.speedX * time;
        particle.y = particle.baseY + waveOffsetY + particle.speedY * time;

        // Wrap around edges
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3
        );
        
        // Color based on position
        const hue = (particle.x / canvas.width) * 60 + 180 + (time * 5) % 60;
        gradient.addColorStop(0, `hsla(${hue}, 80%, 60%, ${particle.opacity})`);
        gradient.addColorStop(1, `hsla(${hue}, 80%, 60%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        particles.forEach((otherParticle, otherIndex) => {
          if (otherIndex <= index) return;

          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.15;
            ctx.strokeStyle = `rgba(100, 200, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
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
