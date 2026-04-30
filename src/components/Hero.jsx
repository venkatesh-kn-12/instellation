import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/image.png';
import './Hero.css';

const Hero = () => {
  const [cd, setCd] = useState({ d: '00', h: '00', m: '00', s: '00' });

  useEffect(() => {
    const ED = new Date('2026-05-06T09:00:00');
    const updateCd = () => {
      const d = Math.max(0, ED - new Date());
      setCd({
        d: String(Math.floor(d / 86400000)).padStart(2, '0'),
        h: String(Math.floor((d % 86400000) / 3600000)).padStart(2, '0'),
        m: String(Math.floor((d % 3600000) / 60000)).padStart(2, '0'),
        s: String(Math.floor((d % 60000) / 1000)).padStart(2, '0')
      });
    };
    updateCd();
    const interval = setInterval(updateCd, 1000);
    return () => clearInterval(interval);
  }, []);

  const fps = [
    { s: 95, t: '48%', l: '10%', bg: 'radial-gradient(circle at 32% 32%,#2060d4,#0a1840 55%,#020408 82%)', gl: 'rgba(32,96,212,.55)', dl: 0, ring: true },
    { s: 58, t: '20%', r: '8%', bg: 'radial-gradient(circle at 35% 30%,#b0883a,#6a4a20 50%,#020408 80%)', gl: 'rgba(160,120,50,.5)', dl: 2.5 },
    { s: 44, b: '28%', l: '3%', bg: 'radial-gradient(circle at 35% 35%,#206030,#0a3818 55%,#020408 82%)', gl: 'rgba(32,96,48,.45)', dl: 4.5 },
    { s: 72, b: '20%', r: '6%', bg: 'radial-gradient(circle at 36% 36%,#c04030,#7a1a10 50%,#020408 82%)', gl: 'rgba(180,50,30,.5)', dl: 1.2 },
  ];

  return (
    <>
      <div className="hero">
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
        <div className="planet-sys">
          {fps.map((p, i) => (
            <div
              key={i}
              className="fp"
              style={{
                width: `${p.s}px`, height: `${p.s}px`,
                top: p.t, bottom: p.b, left: p.l, right: p.r,
                background: p.bg,
                boxShadow: `0 0 40px ${p.gl}, inset -10px -10px 20px rgba(0,0,0,.6)`,
                '--dur': `${9 + i * 1.5}s`,
                '--del': `${p.dl}s`,
                borderRadius: '50%'
              }}
            >
              {p.ring && (
                <div style={{
                  position: 'absolute', width: `${Math.round(p.s * 1.82)}px`, height: `${Math.round(p.s * 0.32)}px`,
                  border: '2px solid rgba(201,168,76,.23)', borderRadius: '50%', top: '50%', left: '50%',
                  transform: 'translate(-50%,-50%) rotateX(74deg)', boxShadow: '0 0 14px rgba(201,168,76,.1)'
                }}></div>
              )}
            </div>
          ))}
        </div>
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div className="college-header-banner" style={{
            position: 'relative',
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            background: 'linear-gradient(90deg, rgba(2,4,8,0.95), rgba(15,25,45,0.9) 50%, rgba(2,4,8,0.95))',
            backdropFilter: 'blur(20px)',
            borderTop: '2px solid rgba(201, 168, 76, 0.2)',
            borderBottom: '2px solid rgba(201, 168, 76, 0.2)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.8), inset 0 20px 40px rgba(201,168,76,0.03)',
            padding: 'clamp(0.5rem, 2vw, 1.2rem) clamp(0.5rem, 3vw, 2rem)',
            marginBottom: '3.5rem',
            marginTop: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'clamp(0.5rem, 3vw, 1.8rem)',
            zIndex: 10,
            flexWrap: 'nowrap'
          }}>
            {/* Left accent */}
            <div className="banner-accent-line l-accent"></div>

            {/* Logo */}
            <div className="banner-logo-wrap" style={{
              position: 'relative',
              width: 'clamp(60px, 15vw, 130px)',
              height: 'clamp(60px, 15vw, 130px)',
              flexShrink: 0
            }}>
              <img src={logoImg} alt="DSATM Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 0 35px rgba(201, 168, 76, 0.6)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))' }} />
            </div>

            {/* Title Block */}
            <div style={{ textAlign: 'center', zIndex: 2, flexShrink: 1, minWidth: 0 }}>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(0.7rem, 2.5vw, 1.8rem)',
                background: 'linear-gradient(180deg, #FFF, var(--gold))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: '0 0 0.2rem 0',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: 'clamp(0.5px, 0.5vw, 2px)',
                lineHeight: '1.2',
                filter: 'drop-shadow(0 8px 16px rgba(201, 168, 76, 0.25))',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}>
                Dayananda Sagar Academy of Technology & Management
              </h2>
              <div className="banner-subtitle" style={{ gap: 'clamp(0.4rem, 2vw, 1.5rem)', flexWrap: 'nowrap', alignItems: 'center' }}>
                <div className="banner-subtitle-line" style={{ width: 'clamp(10px, 5vw, 50px)', background: 'linear-gradient(90deg, transparent, var(--gold))' }}></div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.4' }}>
                  <span style={{
                    color: '#fff',
                    fontWeight: '700',
                    textShadow: '0 0 15px rgba(255,255,255,0.6)',
                    fontSize: 'clamp(0.68rem, 1.5vw, 1.3rem)',
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.5px'
                  }}>
                    Department of Master of Computer Application
                  </span>
                  <span style={{
                    color: 'var(--gold)',
                    fontWeight: '600',
                    fontSize: 'clamp(0.75rem, 1.2vw, 1.1rem)',
                    whiteSpace: 'nowrap',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    marginTop: '4px',
                    textShadow: '0 0 12px rgba(201,168,76,0.5)'
                  }}>
                    Xccurate Club
                  </span>
                </div>
                <div className="banner-subtitle-line" style={{ width: 'clamp(10px, 5vw, 50px)', background: 'linear-gradient(270deg, transparent, var(--gold))' }}></div>
              </div>
            </div>

            {/* Right accent */}
            <div className="banner-accent-line r-accent"></div>
          </div>
          <div style={{ position: 'relative' }}>
            <div className="hero-title" style={{ display: 'flex', flexWrap: 'nowrap' }}>
              {'INSTELLATION'.split('').map((c, i) => (
                <span key={i} className="tc" style={{ '--cd': `${0.68 + i * 0.065}s` }}>{c}</span>
              ))}
            </div>
            <div className="title-shimmer"></div>
          </div>
          {/* TITLE SPONSORS ON HERO */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1.5rem', marginBottom: '1.5rem', zIndex: 5 }}>
            <span style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: '600' }}>Powered by </span>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 15px', borderRadius: '12px', border: '1px solid rgba(201,168,76,0.3)', width: 'clamp(120px, 20vw, 160px)', height: '70px', display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(4px)' }}>
                <img src="/brahma3.jpeg" alt="Brahma 3" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 15px', borderRadius: '12px', border: '1px solid rgba(201,168,76,0.3)', width: 'clamp(120px, 20vw, 160px)', height: '70px', display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(4px)' }}>
                <img src="/li2edu.jpeg" alt="Li2Edu" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>

            </div>
          </div>

          <p className="hero-tagline">Navigate the Technical Universe &nbsp;·&nbsp; May 6-7, 2026</p>

          <div className="hero-meta">
            <div className="hm-item"><div className="hm-l">Venue</div><div className="hm-v">DSATM - M Block, Kanakapura Road Bengaluru</div></div>
            <div className="hm-item"><div className="hm-l">Date</div><div className="hm-v">May 6-7, 2026</div></div>
            <div className="hm-item"><div className="hm-l">Events</div><div className="hm-v">7 Planets</div></div>
            <div className="hm-item"><div className="hm-l">Prize Pool</div><div class="hm-v">₹30,000+</div></div>
          </div>

          <div className="countdown">
            <div className="cd-box"><span className="cd-num">{cd.d}</span><span className="cd-lbl">Days</span></div>
            <span className="cd-sep">:</span>
            <div className="cd-box"><span className="cd-num">{cd.h}</span><span className="cd-lbl">Hours</span></div>
            <span className="cd-sep">:</span>
            <div className="cd-box"><span className="cd-num">{cd.m}</span><span className="cd-lbl">Mins</span></div>
            <span className="cd-sep">:</span>
            <div className="cd-box"><span className="cd-num">{cd.s}</span><span className="cd-lbl">Secs</span></div>
          </div>

          <div className="hero-btns" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <Link to="/universe" className="btn-g btn-p">Explore Events →</Link>
            <Link to="/register" className="btn-g btn-o">Register Now</Link>
            <a
              href="/INSTELLATION BROUCHER.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                const link = document.createElement('a');
                link.href = "/INSTELLATION BROUCHER.pdf";
                link.download = "INSTELLATION BROUCHER.pdf";
                link.click();
              }}
              className="btn-g btn-ghost"
            >
              ⬇ Brochure
            </a>
          </div>
        </div>

        <div className="scroll-hint">
          <div className="scroll-mouse"><div className="scroll-wheel"></div></div>
          <span>Scroll to Explore</span>
        </div>
      </div>
      <div className="para-band">
        <div className="para-text">INSTELLATION 2026 · MCA · DSATM · XCCURATE · BENGALURU ·</div>
      </div>
    </>
  );
};

export default Hero;
