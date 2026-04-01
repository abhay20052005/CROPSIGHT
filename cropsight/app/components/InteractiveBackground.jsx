'use client';

import { useEffect, useRef } from 'react';

export default function InteractiveBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const dotsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots();
    };

    // Initialize dots
    const initDots = () => {
      dotsRef.current = [];
      const spacing = 100;
      const cols = Math.ceil(canvas.width / spacing);
      const rows = Math.ceil(canvas.height / spacing);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dotsRef.current.push({
            x: i * spacing,
            y: j * spacing,
            baseX: i * spacing,
            baseY: j * spacing,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY + window.scrollY,
      };
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dotsRef.current.forEach((dot) => {
        // Calculate distance from mouse
        const dx = mouseRef.current.x - dot.x;
        const dy = mouseRef.current.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          // Move dot away from cursor
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          dot.vx = -Math.cos(angle) * force * 20;
          dot.vy = -Math.sin(angle) * force * 20;
        } else {
          // Return to base position
          dot.vx += (dot.baseX - dot.x) * 0.05;
          dot.vy += (dot.baseY - dot.y) * 0.05;
        }

        // Apply velocity with damping
        dot.vx *= 0.9;
        dot.vy *= 0.9;
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Calculate opacity and size based on distance from mouse
        const opacity = distance < maxDistance ? 0.4 : 0.15;
        const size = distance < maxDistance ? 2.5 : 1.5;

        // Draw dot with glow effect - lighter colors for intersection dots
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        
        // Add glow for dots near cursor with lighter colors
        if (distance < maxDistance) {
          const gradient = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, size * 4);
          gradient.addColorStop(0, `rgba(144, 238, 144, ${opacity})`); // Light green
          gradient.addColorStop(0.5, `rgba(152, 251, 152, ${opacity * 0.5})`); // Pale green
          gradient.addColorStop(1, 'rgba(144, 238, 144, 0)');
          ctx.fillStyle = gradient;
          ctx.arc(dot.x, dot.y, size * 4, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(152, 251, 152, ${opacity})`; // Pale green for dots
        } else {
          ctx.fillStyle = `rgba(144, 238, 144, ${opacity})`; // Light green for dots
        }
        ctx.fill();

        // Draw connecting lines to nearby dots
        dotsRef.current.forEach((otherDot) => {
          const dx2 = dot.x - otherDot.x;
          const dy2 = dot.y - otherDot.y;
          const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist < 150 && dist > 0) {
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(otherDot.x, otherDot.y);
            const lineOpacity = distance < maxDistance ? 0.15 : 0.05;
            ctx.strokeStyle = `rgba(76, 175, 80, ${lineOpacity * (1 - dist / 150)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 pointer-events-none"
      style={{ 
        width: '100%',
        height: '100%',
        zIndex: 0
      }}
    />
  );
}
