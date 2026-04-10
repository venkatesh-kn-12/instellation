import React, { useEffect, useRef } from 'react';
import './Background.css';

const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    let W, H, stars = [], parts = [], t = 0;
    let animationFrameId;

    const mkStars = () => {
      stars = [];
      const n = Math.floor((W * H) / 4200);
      for (let i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.5 + 0.2,
          a: Math.random(),
          da: (Math.random() - 0.5) * 0.005,
          vy: Math.random() * 0.4 + 0.1,
          hue: Math.random() > 0.9 ? (Math.random() > 0.5 ? 200 : 40) : 0,
          sat: Math.random() > 0.9 ? 55 : 0
        });
      }
      parts = [];
      for (let i = 0; i < 45; i++) {
        parts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.14,
          r: Math.random() * 0.8 + 0.2,
          a: Math.random() * 0.38 + 0.05
        });
      }
    };

    const resize = () => {
      W = cv.width = window.innerWidth;
      H = cv.height = window.innerHeight;
      mkStars();
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.0018;

      // Nebula layers
      [
        [W * 0.2 + W * 0.04 * Math.sin(t), H * 0.3 + H * 0.035 * Math.cos(t * 0.7), W * 0.44, 'rgba(14,38,118,'],
        [W * 0.8 - W * 0.035 * Math.sin(t * 0.8), H * 0.7 + H * 0.045 * Math.cos(t), W * 0.33, 'rgba(80,18,8,']
      ].forEach(([gx, gy, r, col]) => {
        const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, r);
        g.addColorStop(0, col + (0.1 + 0.03 * Math.sin(t)) + ')');
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      // Stars
      stars.forEach(s => {
        s.y += s.vy;
        if (s.y > H) s.y = 0;
        
        s.a += s.da;
        if (s.a <= 0.04 || s.a >= 1) s.da *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.sat > 0 ? `hsla(${s.hue},${s.sat}%,80%,${s.a})` : `rgba(232,234,240,${s.a})`;
        ctx.fill();
      });

      // Particles
      parts.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.a})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="galaxy" ref={canvasRef} />;
};

export default Background;
