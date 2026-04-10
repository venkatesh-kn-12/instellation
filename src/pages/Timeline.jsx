import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Rocket } from 'lucide-react';
import { EV } from '../data/events';
import './Timeline.css';

const Timeline = ({ mode = 'home' }) => {
  const containerRef = useRef(null);
  const [scrollVal, setScrollVal] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track the vertical scrolling against the container heights
  // We want the rocket to stay visible until the user is clearly moving past the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.95"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollVal(Math.max(0, Math.min(1, latest)));
  });

  const isUniverse = mode === 'universe';
  const isMobileView = isMobile;

  // DESKTOP: 800px wide, 400px vertical gaps
  const homePathD = "M 400 50 C 400 200, 600 200, 600 350 S 200 550, 200 750 S 600 950, 600 1150 S 200 1350, 200 1550 S 600 1750, 600 1950 S 200 2150, 200 2350 S 400 2550, 400 2750";
  const universePathD = "M 400 50 C 400 200, 600 200, 600 350 S 200 550, 200 750 S 600 950, 600 1150 S 200 1350, 200 1550 S 600 1750, 600 1950 S 200 2150, 200 2350 S 600 2550, 600 2750 S 400 2950, 400 3150";

  // MOBILE: 400px wide, tighter curves (80 to 320), 500px vertical gaps
  const homePathM = "M 200 50 C 200 200, 320 200, 320 350 S 80 600, 80 850 S 320 1100, 320 1350 S 80 1600, 80 1850 S 320 2100, 320 2350 S 80 2600, 80 2850 S 200 3100, 200 3350";
  const universePathM = "M 200 50 C 200 200, 320 200, 320 350 S 80 600, 80 850 S 320 1100, 320 1350 S 80 1600, 80 1850 S 320 2100, 320 2350 S 80 2600, 80 2850 S 320 3100, 320 3350 S 200 3600, 200 3850";

  const pathString = isUniverse 
    ? (isMobileView ? universePathM : universePathD)
    : (isMobileView ? homePathM : homePathD);
    
  const canvasWidth = isMobileView ? 400 : 800;
  const canvasHeight = isUniverse 
    ? (isMobileView ? 4200 : 3400) 
    : (isMobileView ? 3700 : 3000);

  const times = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM", "07:00 PM", "09:00 PM", "11:00 PM"];
  
  const xPositionsD = [600, 200, 600, 200, 600, 200, 600, 400];
  const xPositionsM = [320, 80, 320, 80, 320, 80, 320, 200];
  const xPositions = isMobileView ? xPositionsM : xPositionsD;

  const yGap = isMobileView ? 500 : 400;
  const thresholdsArray = [0.09, 0.22, 0.35, 0.48, 0.61, 0.74, 0.87, 0.98];

  const universeEvents = EV.map((event, idx) => ({
    id: idx,
    time: times[idx] || "TBD",
    title: event.name,
    desc: event.sub,
    x: xPositions[idx],
    y: 350 + (idx * yGap),
    threshold: thresholdsArray[idx]
  }));

  const homeData = [
    { time: "09:00 AM", title: "🌌Stellar Docking", desc: "On-Board, Arrival at the spaceport.", threshold: 0.11, final: false },
    { time: "9:30 AM", title: "Ignition Protocol🔥", desc: "Opening ceremony briefing.", threshold: 0.25, final: false },
    { time: "10:15 AM", title: "🪐Orbital Launch", desc: "The events commence.", threshold: 0.39, final: false },
    { time: "01:00 PM", title: "Lunar Halt🌙", desc: "Lunch Break-Recharge energy reserves.", threshold: 0.54, final: false },
    { time: "02:00 PM", title: "⚡Hyperdrive", desc: "Final Rounds-Ultimate showdown begins.", threshold: 0.68, final: false },
    { time: "05:30 PM", title: "Galaxy Honours🏆", desc: "Honoring champions.", threshold: 0.82, final: false },
    { time: "06:30 PM", title: "🚀Mission Complete", desc: "Mission accomplished.", threshold: 0.96, final: true }
  ];

  const homeEvents = homeData.map((data, idx) => ({
    id: idx,
    ...data,
    x: data.final ? (isMobileView ? 200 : 400) : xPositions[idx],
    y: 350 + (idx * yGap)
  }));

  const events = isUniverse ? universeEvents : homeEvents;

  return (
    <div className="page-container wavy-roadmap-page">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="roadmap-title"
      >
        MISSION ROUTE
      </motion.h1>

      <div className="wavy-scaler" style={{ '--timeline-height': `${canvasHeight}px` }}>
        <div className="wavy-canvas" ref={containerRef} style={{ height: canvasHeight, width: `${canvasWidth}px` }}>
          {/* Background Dashed Glow Curve */}
          <svg className="wavy-svg" viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}>
            <path 
              d={pathString} 
              fill="none" stroke="rgba(255, 68, 0, 0.3)" strokeWidth="4" strokeDasharray="10 10" 
              style={{ filter: "drop-shadow(0 0 10px rgba(255, 68, 0, 0.8))" }}
            />
          </svg>

          {/* The Scroll-Driven Rocket */}
          <div 
            className="physics-rocket"
            style={{
              offsetPath: `path('${pathString}')`,
              offsetDistance: `${scrollVal * 100}%`
            }}
          >
            <div className="rocket-fire-trail"></div>
            <Rocket className="rocket-icon" size={40} />
          </div>

          {/* Planets and Content Nodes */}
          {events.map((evt) => {
            const isGlowing = Math.abs(scrollVal - evt.threshold) < 0.08;

            return (
              <div 
                key={evt.id} 
                className={`wavy-node ${isGlowing ? 'active-flare' : ''}`}
                style={{ left: evt.x, top: evt.y }}
              >
                {/* The physical planet matching exactly over the point */}
                <div className="wavy-planet">
                  <div className="planet-ring"></div>
                </div>

                {/* The Text Box alternating slightly off the planet */}
                <div className={`wavy-content ${evt.x > (canvasWidth/2) ? 'left-dock' : 'right-dock'} ${evt.x === (canvasWidth/2) ? 'center-dock' : ''}`}>
                  <div className="wavy-branch"></div>
                  <div className="wavy-text-box">
                    <span className="info-time">{evt.time}</span>
                    <h3 className="info-title" style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>{evt.title}</h3>
                    <p className="info-desc">{evt.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
