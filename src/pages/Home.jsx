import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CreditCard, Globe, Ban, Laptop, FileText, 
  ShieldAlert, User, Users, AlertTriangle, Sparkles, BookOpen 
} from 'lucide-react';
import Hero from '../components/Hero';
import EventCard from '../components/EventCard';
import Timeline from './Timeline';
import { EV } from '../data/events';
import './Home.css';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const Home = () => {
  return (
    <motion.div 
      className="home-page"
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <Hero />
      
      {/* PROCLAMATION SECTION */}
      <div className="section-pad" style={{ position: 'relative', zIndex: 1, background: 'transparent', textAlign: 'center', overflow: 'hidden' }}>
        
        {/* Floating background gradient orbs for elegance */}
        <div style={{ position: 'absolute', top: '-10%', left: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255,200,50,0.05) 0%, transparent 70%)', filter: 'blur(30px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', right: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(50,150,255,0.05) 0%, transparent 70%)', filter: 'blur(30px)' }}></div>

        <motion.div 
          className="proclamation-container"
          style={{ 
            maxWidth: '850px', 
            margin: '0 auto', 
            background: 'linear-gradient(145deg, rgba(20,25,35,0.6), rgba(5,10,15,0.8))', 
            padding: 'clamp(2.5rem, 6vw, 4.5rem) clamp(1.5rem, 5vw, 3.5rem)', 
            borderRadius: '24px', 
            backdropFilter: 'blur(16px)', 
            border: '1px solid rgba(255, 204, 0, 0.1)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)',
            position: 'relative'
          }}
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.1 }}
          whileHover={{ boxShadow: '0 25px 60px rgba(255, 204, 0, 0.08), inset 0 0 0 1px rgba(255,204,0,0.1)' }}
        >
          {/* Decorative Sparkle */}
          <motion.div 
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--gold)', opacity: 0.5 }}
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles size={24} />
          </motion.div>

          <motion.span 
            variants={fadeUp}
            style={{ fontFamily:'var(--font-heading)', fontSize:'0.85rem', letterSpacing:'6px', color:'var(--gold)', textTransform:'uppercase', marginBottom:'1.5rem', display:'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <div style={{ width: '30px', height: '1px', background: 'var(--gold)' }}></div>
            The Galactic Proclamation
            <div style={{ width: '30px', height: '1px', background: 'var(--gold)' }}></div>
          </motion.span>
          
          <motion.h3 
            variants={fadeUp}
            style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(2.5rem, 5vw, 3.5rem)', fontWeight:700, color:'var(--white)', marginBottom: '1.5rem', background: 'linear-gradient(to right, #fff, #ffd700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            Namaskara
          </motion.h3>
          
          <motion.p variants={fadeUp} style={{ color:'rgba(255,255,255,0.9)', fontStyle: 'italic', fontSize:'clamp(1.1rem, 2vw, 1.3rem)', lineHeight:1.7, marginBottom: '2.5rem', fontWeight: 300 }}>
            "We extend a stellar welcome to all participants, tech enthusiasts, and students from various institutes joining us across the cosmos."
          </motion.p>
          
          <motion.p variants={fadeUp} style={{ color:'var(--dim)', fontSize:'1.05rem', lineHeight:1.8, marginBottom: '1.5rem' }}>
            Organized by the Department of Master of Computer Applications (MCA) at DSATM, we proudly present <strong style={{color:'var(--gold)', fontWeight:600, letterSpacing: '1px', padding: '0 4px'}}>INSTELLATION 2026</strong>.
          </motion.p>
          
          <motion.p variants={fadeUp} style={{ color:'var(--dim)', fontSize:'1.05rem', lineHeight:1.8 }}>
            On <strong style={{color:'var(--white)', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px'}}>May 6th, 2026</strong>, the cosmic gates open. Step into our celestial realm, showcase your excellence, and be part of this majestic celebration of technology and innovation.
          </motion.p>
        </motion.div>
      </div>
      
      {/* EVENTS SECTION */}
      <div style={{ position: 'relative', zIndex: 1, background: 'transparent' }}>
        <motion.div 
          className="section section-pad"
          style={{ maxWidth: '1200px', margin: '0 auto' }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontFamily:'var(--font-heading)', fontSize:'.64rem', letterSpacing:'5px', color:'var(--gold)', textTransform:'uppercase', marginBottom:'.8rem', display:'block' }}>
              The Galaxy Awaits
            </span>
            <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(1.9rem,4vw,3rem)', fontWeight:700, lineHeight:1.1, color:'var(--white)' }}>
              7 <em style={{ color:'transparent', WebkitTextStroke:'1px var(--gold)', fontStyle:'normal' }}>Celestial</em> Events
            </h2>
            <p style={{ color:'var(--dim)', marginTop:'.9rem', fontSize:'.9rem', lineHeight:1.85, fontWeight:300, maxWidth:580, marginLeft:'auto', marginRight:'auto' }}>
              Each event orbits a planet in the Instellation galaxy. Navigate the cosmos and claim your constellation.
            </p>
            <div style={{ width:'1px', height:'55px', background:'linear-gradient(180deg,var(--gold),transparent)', margin:'1.5rem auto 0' }}></div>
          </div>
          
          <div className="responsive-grid grid-cards">
            {EV.slice(0, 3).map((event, index) => (
              <motion.div key={index} variants={fadeUp} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <EventCard e={event} />
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link to="/universe" className="btn-g btn-o">View All 7 Events →</Link>
          </div>
        </motion.div>
      </div>

      {/* GENERAL RULES & REGULATIONS */}
      <div className="section-pad" style={{ position: 'relative', zIndex: 1, background: 'transparent' }}>
        <motion.div
          style={{ maxWidth: '900px', margin: '0 auto' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontFamily:'var(--font-heading)', fontSize:'.7rem', letterSpacing:'5px', color:'var(--gold)', textTransform:'uppercase', marginBottom:'.8rem', display:'block' }}>
              ⚖️ Intergalactic Law
            </span>
            <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(1.6rem,3.5vw,2.5rem)', fontWeight:700, lineHeight:1.1, color:'var(--white)' }}>
              Galactic <em style={{ color:'transparent', WebkitTextStroke:'1px var(--gold)', fontStyle:'normal' }}>Protocols</em>
            </h2>
            <p style={{ color:'var(--dim)', marginTop:'.9rem', fontSize:'.85rem', lineHeight:1.7, fontWeight:300, maxWidth:500, marginLeft:'auto', marginRight:'auto' }}>
              All crew members must comply with these directives. Violations may result in immediate expulsion from the mission.
            </p>
            <div style={{ width:'1px', height:'40px', background:'linear-gradient(180deg,var(--gold),transparent)', margin:'1.2rem auto 0' }}></div>
          </div>

          <div className="responsive-grid grid-rules">
            {[
              { icon: CreditCard, text: 'Valid College ID is mandatory for all participants.' },
              { icon: Globe, text: 'Only Online Registration is accepted.' },
              { icon: AlertTriangle, text: 'Registration fees are non-refundable.' },
              { icon: Ban, text: 'The use of any substances that alter consciousness is strictly prohibited.' },
              { icon: Laptop, text: 'Participants are required to bring their own electronic devices.' },
              { icon: FileText, text: 'Detailed event instructions will be provided by the coordinators.' },
              { icon: ShieldAlert, text: 'The college will not be responsible for any loss of personal belongings.' },
              { icon: User, text: 'Individual Events: Maximum 3 participants per college.' },
              { icon: Users, text: 'Group Events: Maximum 3 teams per college.' },
              { icon: AlertTriangle, text: 'Any malpractice will lead to immediate elimination.' }
            ].map((rule, i) => {
              const IconComponent = rule.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.2rem',
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, rgba(20,25,30,0.4) 0%, rgba(10,15,20,0.6) 100%)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 20px rgba(0,0,0,0.3)',
                    borderRadius: '16px',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  whileHover={{ 
                    y: -5,
                    borderColor: 'rgba(255,204,0,0.3)', 
                    background: 'linear-gradient(135deg, rgba(30,35,40,0.7) 0%, rgba(15,20,25,0.8) 100%)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 10px 30px rgba(255,204,0,0.1)'
                  }}
                >
                  <div style={{
                    width: '45px', 
                    height: '45px', 
                    borderRadius: '12px', 
                    background: 'rgba(255,204,0,0.1)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid rgba(255,204,0,0.2)',
                    color: 'var(--gold)'
                  }}>
                    <IconComponent size={20} strokeWidth={2.5} />
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0, fontWeight: 400 }}>
                    {rule.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ADVANCED PHYSICS TIMELINE SECTION */}
      <section id="timeline">
        <Timeline />
      </section>

    </motion.div>
  );
};

export default Home;
