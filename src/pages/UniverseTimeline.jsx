import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { EV } from '../data/events';
import './UniverseTimeline.css';

const UniverseTimeline = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Compressed Desktop orbital config to avoid excessive scrolling
  const desktopConfig = [
    { r: 250, angle: 70 },
    { r: 500, angle: 110 },
    { r: 750, angle: 75 },
    { r: 1000, angle: 105 },
    { r: 1250, angle: 80 },
    { r: 1500, angle: 100 },
    { r: 1750, angle: 83 }
  ];

  // Compressed Mobile orbital config
  const mobileConfig = [
    { r: 180, angle: 82 },
    { r: 380, angle: 98 },
    { r: 580, angle: 84 },
    { r: 780, angle: 96 },
    { r: 980, angle: 86 },
    { r: 1100, angle: 94 },
    { r: 1300, angle: 87 }
  ];

  const config = isMobile ? mobileConfig : desktopConfig;
  
  // Adjusted realistic proportions for planets (larger sizes on desktop, smaller on mobile)
  // [Mercury, Earth, Mars, Jupiter, Saturn, Uranus, Neptune]
  const planetSizes = isMobile 
    ? [35, 55, 45, 90, 80, 65, 60] 
    : [70, 110, 90, 220, 180, 130, 120];

  // Dynamically calculate the precise height of the wrapper to perfectly fit the bottom-most planet
  let maxDy = 0;
  EV.forEach((_, idx) => {
    const { r, angle } = config[idx] || config[config.length - 1];
    const rad = angle * (Math.PI / 180);
    // Squash the orbit vertically (0.8) for better 3D perspective and shorter scrolling
    const ry = r * 0.8;
    const dy = ry * Math.sin(rad);
    if (dy > maxDy) maxDy = dy;
  });
  
  // top(150px) + max(dy) + planetRadius offset + padding
  const wrapperHeight = `${150 + maxDy + (isMobile ? 120 : 180)}px`;

  return (
    <div 
      className="galaxy-container" 
      style={{
        // Smoothly fade out the top 100px so it isn't a hard cut!
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 150px)',
        maskImage: 'linear-gradient(to bottom, transparent, black 150px)'
      }}
    >
      {/* The Orbits Environment */}
      <div className="galaxy-orbits-wrapper" style={{ height: wrapperHeight }}>
        {/* Central Sun - Now sharing the exact same coordinate origin as the orbits */}
        <motion.div 
          className="galaxy-sun-wrapper"
          initial={{ opacity: 0, scale: 0.5, x: '-50%', y: '-50%' }}
          whileInView={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
          viewport={{ once: true }}
          style={{ top: '150px', left: '50%' }}
        >
          <div className="galaxy-sun">
            <div className="sun-flare"></div>
          </div>
        </motion.div>

        {EV.map((event, idx) => {
          const { r, angle } = config[idx] || config[config.length - 1]; // Fallback
          const rad = angle * (Math.PI / 180);
          
          const rx = isMobile ? (r * 0.3) : r; // Horizontal radius
          const ry = r * 0.8; // Squashed Vertical radius
          const dx = rx * Math.cos(rad);
          const dy = ry * Math.sin(rad);
          const isLeft = angle > 90;

          return (
            <div key={idx} className="galaxy-orbit-layer">
              {/* Event Planet Component with Orbital Swing Animation */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '150px',
                  left: '50%',
                  width: 0,
                  height: 0,
                  zIndex: 20 + idx
                }}
                animate={{ rotate: [0, 2.5, -2.5, 0] }} // Subtle sway
                transition={{ duration: 15 + (idx % 3) * 5, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Orbit Ring - Now inside the same rotation container to stay perfectly synced with the planet */}
                <motion.div 
                  className="galaxy-orbit-ring"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1 }}
                  style={{
                    width: `${rx * 2}px`,
                    height: `${ry * 2}px`,
                    position: 'absolute',
                    left: `-${rx}px`,
                    top: `-${ry}px`,
                    borderRadius: '50%',
                    pointerEvents: 'none'
                  }}
                />

                <motion.div 
                  style={{
                    position: 'absolute',
                    left: `${dx}px`,
                    top: `${dy}px`,
                  }}
                  initial={{ opacity: 0, scale: 0.3, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                >
                  {/* Inner element handles counter-rotation so text always stays readable */}
                  <motion.div
                    className={`galaxy-planet-group ${isLeft ? 'left-side' : 'right-side'}`}
                    style={{ position: 'relative', cursor: 'pointer' }}
                    animate={{ rotate: [0, -2.5, 2.5, 0] }}
                    transition={{ duration: 15 + (idx % 3) * 5, repeat: Infinity, ease: "easeInOut" }}
                    onClick={() => navigate(`/register?event=${event.id}`)}
                  >
                    <div 
                      className="galaxy-planet"
                      style={{
                        width: `${planetSizes[idx % planetSizes.length]}px`,
                        height: `${planetSizes[idx % planetSizes.length]}px`,
                        backgroundImage: `url('${event.img}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        boxShadow: event.cpg || 'inset -10px -10px 10px rgba(0,0,0,0.6), 0 0 15px rgba(90, 153, 255, 0.6)'
                      }}
                    >
                       <div className={`galaxy-planet-accent p-accent-${idx % 3}`}></div>
                    </div>
                    
                    <div className="galaxy-event-content">
                      <div className="galaxy-connector"></div>
                      <div className="galaxy-card">
                        <h3 className="galaxy-title">{event.name}</h3>
                        <p className="galaxy-desc">{event.sub}</p>
                        <div className="galaxy-rocket-stamp">
                          
                        </div>
                        <div style={{ marginTop: '0.8rem', fontSize: '0.75rem', color: 'var(--gold)', letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', alignItems: 'center' }}>
                           Register <span style={{ marginLeft: '4px' }}>→</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Deep Space / End of Universe Marker added to fill empty space aesthetically */}
      <motion.div 
        className="galaxy-deep-space"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ 
          textAlign: 'center', 
          padding: '6rem 2rem 8rem', 
          marginTop: '4rem', 
          position: 'relative', 
          zIndex: 30,
          background: 'linear-gradient(180deg, transparent 0%, rgba(2, 4, 8, 0.8) 30%, rgba(2, 4, 8, 1) 100%)'
        }}
      >
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '4px', color: 'var(--gold)', textTransform: 'uppercase' }}>
          Deep Space
        </span>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--white)', marginTop: '0.5rem', marginBottom: '1rem' }}>
          Your journey begins here.
        </h2>
        <p style={{ color: 'var(--dim)', maxWidth: '500px', margin: '0 auto', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: '1.6' }}>
          Explore these celestial disciplines, prepare for cosmic combat, and leave your mark on the Instellation galaxy.
        </p>
        <button 
          onClick={() => navigate('/register')}
          style={{ background: 'transparent', border: '1px solid var(--gold)', color: 'var(--gold)', padding: '0.8rem 2rem', borderRadius: '50px', cursor: 'pointer', fontFamily: 'var(--font-heading)', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.8rem', transition: 'all 0.3s ease' }}
          onMouseOver={(e) => { e.target.style.background = 'var(--gold)'; e.target.style.color = '#000'; }}
          onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--gold)'; }}
        >
          Initiate Launch
        </button>
      </motion.div>
    </div>
  );
};

export default UniverseTimeline;
