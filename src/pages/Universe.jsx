import React from 'react';
import { motion } from 'framer-motion';
import EventCard from '../components/EventCard';
import { EV } from '../data/events';
import UniverseTimeline from './UniverseTimeline';

const Universe = () => {
  return (
    <div className="page-wrapper" style={{ background: 'transparent' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2.5rem)' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ fontFamily:'var(--font-heading)', fontSize:'.64rem', letterSpacing:'5px', color:'var(--gold)', textTransform:'uppercase', marginBottom:'.8rem', display:'block' }}>
            Navigate the Galaxy
          </span>
          <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(1.9rem,4vw,3rem)', fontWeight:700, lineHeight:1.1, color:'var(--white)' }}>
            The <em style={{ color:'transparent', WebkitTextStroke:'1px var(--gold)', fontStyle:'normal' }}>Universe</em> of Events
          </h2>
          <p style={{ color:'var(--dim)', marginTop:'.9rem', fontSize:'.9rem', lineHeight:1.85, fontWeight:300, maxWidth:580, marginLeft:'auto', marginRight:'auto' }}>
            Eight planets. Eight disciplines. One extraordinary journey through the Instellation galaxy.
          </p>
          <div style={{ width:'1px', height:'55px', background:'linear-gradient(180deg,var(--gold),transparent)', margin:'1.5rem auto 0' }}></div>
        </div>

        <div className="responsive-grid grid-cards">
          {EV.map((event, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              style={{ height: '100%' }}
            >
              <EventCard e={event} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline Section added as continuation */}
      <section id="timeline" style={{ marginTop: '2rem' }}>
        <UniverseTimeline />
      </section>
    </div>
  );
};

export default Universe;
