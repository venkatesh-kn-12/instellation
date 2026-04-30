import React from 'react';
import { motion } from 'framer-motion';
const Sponsors = () => {
  return (
    <div className="page-wrapper" style={{
      paddingLeft: '1rem',
      paddingRight: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: 'clamp(2rem, 8vw, 3.2rem)', letterSpacing: 'clamp(4px, 2vw, 8px)', color: '#fff', textAlign: 'center', marginBottom: '1rem' }}
      >
        GALACTIC PARTNERS
      </motion.h1>
      <p style={{ color: 'var(--dim)', marginBottom: '4rem', letterSpacing: '2px', fontSize: '0.75rem', textAlign: 'center' }}>
        SUPPORTING THE FRONTIER OF TECHNOLOGY
      </p>
      {/* TITLE SPONSORS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        style={{ width: '100%', maxWidth: '800px', marginBottom: '5rem' }}
      >
        <h3 style={{ color: 'var(--gold)', textAlign: 'center', letterSpacing: '4px', marginBottom: '2.5rem', fontSize: '1rem', fontWeight: '600' }}>TITLE SPONSORS</h3>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {[
            { name: 'BRAHMA 3', img: '/brahma3.jpeg' },
            { name: 'LI2EDU', img: '/li2edu.jpeg' }
          ].map((partner) => (
            <div key={partner.name} style={{
              width: 'clamp(200px, 40%, 300px)',
              minHeight: '140px',
              background: 'rgba(201, 168, 76, 0.05)',
              border: '1px solid var(--gold)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              color: '#fff',
              letterSpacing: '2px',
              textAlign: 'center',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}>
              <img
                src={partner.img}
                alt={partner.name}
                style={{ width: '100%', height: '90px', objectFit: 'contain', marginBottom: '12px' }}
              />
              <span style={{ fontWeight: 700, color: '#fff' }}>{partner.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tier 1 - Associate Sponsor (temporarily hidden) */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        style={{ width: '100%', maxWidth: '800px', marginBottom: '5rem' }}
      >
        <h3 style={{ color: 'var(--gold)', textAlign: 'center', letterSpacing: '4px', marginBottom: '2.5rem', fontSize: '0.9rem', fontWeight: '400' }}>ASSOCIATE SPONSOR</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: 'clamp(200px, 80%, 340px)',
            height: 'clamp(100px, 20vh, 160px)',
            background: 'rgba(201, 168, 76, 0.05)',
            border: '1px solid var(--gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'clamp(1.5rem, 6vw, 2.8rem)',
            color: '#fff',
            fontWeight: '800',
            letterSpacing: '4px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            borderRadius: '4px'
          }}>
            amd
          </div>
        </div>
      </motion.div> */}

      {/* Tier 2 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
        style={{ width: '100%', maxWidth: '1000px' }}
      >
        <h3 style={{ color: 'var(--dim2)', textAlign: 'center', letterSpacing: '4px', marginBottom: '2.5rem', fontSize: '0.8rem', fontWeight: '400' }}>ASSOCIATE SPONSOR</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          {[
            { name: 'MASTER VLSI', img: '/mastervlsi.png' },
          ].map((partner) => (
            <div key={partner.name || partner} style={{
              width: 'clamp(140px, 45%, 220px)',
              minHeight: '110px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              color: 'var(--dim)',
              letterSpacing: '1.5px',
              textAlign: 'center',
              padding: '1rem',
              borderRadius: '4px'
            }}>
              {partner.img ? (
                <>
                  <img
                    src={partner.img}
                    alt={partner.name}
                    style={{ width: '100%', height: '70px', objectFit: 'contain', marginBottom: '8px' }}
                  />
                  <span style={{ fontWeight: 600, color: '#fff' }}>{partner.name}</span>
                </>
              ) : (
                partner.name || partner
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
export default Sponsors;
