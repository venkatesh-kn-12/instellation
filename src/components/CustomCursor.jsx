import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  // Exact instant cursor position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Elastic delayed physics for the orbit
  const springConfig = { damping: 25, stiffness: 150, mass: 2 };
  const orbitX = useSpring(cursorX, springConfig);
  const orbitY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updatePosition = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="custom-cursor-container"
        style={{ left: cursorX, top: cursorY }}
      >
        <div className="cursor-planet"></div>
      </motion.div>

      <motion.div
        className="custom-cursor-container"
        style={{ left: orbitX, top: orbitY }}
      >
        <div className="cursor-orbit">
          <div className="cursor-moon"></div>
        </div>
      </motion.div>
    </>
  );
};

export default CustomCursor;
