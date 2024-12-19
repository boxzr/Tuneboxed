import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [currentSection, setCurrentSection] = useState('home');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup:', { name, email });
  };

  const handleNavClick = (section: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentSection(section);
  };

  return (
    <div className="App">
      <nav className="nav-menu">
        <a href="#home" className="nav-link" onClick={handleNavClick('home')}>Home</a>
        <a href="#about" className="nav-link" onClick={handleNavClick('about')}>About</a>
        <a href="#signup" className="nav-link" onClick={handleNavClick('signup')}>Sign Up</a>
      </nav>

      {currentSection === 'home' && (
        <section id="home" className="hero-section">
          <motion.div className="box-container">
            {/* Initial Cardboard Box */}
            <motion.div 
              className="cardboard-box"
              initial={{ scale: 1 }}
              animate={{ 
                scale: [
                  1, // start
                  1, 1, 1, 1, 1, 1, // maintain size during shaking
                  1.1, 0 // explosion
                ],
                rotate: [
                  0, // start
                  -5, 0, 5, -5, 5, 0, // side to side movement
                  10, 20 // explosion
                ],
                x: [
                  0, // start
                  -20, 0, 20, -20, 20, 0, // side movement
                  0, 0 // explosion
                ],
                y: [
                  0, // start
                  5, 0, 5, 0, 5, 0, // subtle vertical bounce
                  -20, -40 // explosion
                ],
                skewX: [
                  0, // start
                  -5, 0, 5, -5, 5, 0, // box distortion
                  0, 0 // explosion
                ]
              }}
              transition={{ 
                duration: 3,
                times: [
                  0,
                  0.1, 0.25, 0.4, 0.55, 0.7, 0.85, // longer shaking sequence
                  0.9, 1 // explosion
                ],
                ease: [0.6, 0.05, -0.01, 0.9] // custom easing for more organic movement
              }}
            >
              {/* Box edges */}
              <div className="box-edge box-edge-top"></div>
              <div className="box-edge box-edge-bottom"></div>
              <div className="box-edge box-edge-left"></div>
              <div className="box-edge box-edge-right"></div>
              
              {/* Cardboard texture */}
              <div className="cardboard-texture"></div>
              
              {/* Shipping label */}
              <div className="shipping-label"></div>
            </motion.div>

            {/* Content that appears after explosion */}
            <motion.div className="content-container"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.9, duration: 0.5 }}
            >
              <motion.h1 
                className="logo-text"
                initial={{ y: 0, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 2.9,
                  duration: 0.6,
                  ease: "easeOut"
                }}
              >
                TUNEBOXED
              </motion.h1>

              {/* Flying Elements */}
              {[...Array(20)].map((_, i) => (
                <motion.span
                  key={i}
                  className={`floating-item ${i % 2 === 0 ? 'note' : 'brush'}`}
                  initial={{ 
                    opacity: 0,
                    x: 0,
                    y: 0,
                    scale: 0
                  }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    y: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 500],
                    x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 500],
                    scale: [0, 1, 0],
                    rotate: Math.random() * 720
                  }}
                  transition={{ 
                    duration: 1.5,
                    delay: 2.9 + (i * 0.02),
                    ease: "easeOut"
                  }}
                >
                  {i % 2 === 0 ? '♪' : '🖌️'}
                </motion.span>
              ))}

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 }}
              >
                Showcase your music taste.
              </motion.p>
              
              <motion.div 
                className="preview-container"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.8 }}
              >
                <div className="preview-box"></div>
                <div className="preview-box"></div>
                <div className="preview-box"></div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
      )}

      {currentSection === 'about' && (
        <section id="about" className="section">
          <h2>About Us</h2>
          <p>Blank</p>
          <motion.div 
            className="preview-container"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="preview-box"></div>
            <div className="preview-box"></div>
            <div className="preview-box"></div>
          </motion.div>
        </section>
      )}

      {currentSection === 'signup' && (
        <section id="signup" className="section">
          <div className="signup-form">
            <h2>Join Tuneboxed</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="signup-button">
                Sign Up
              </button>
            </form>
          </div>
          <motion.div 
            className="preview-container"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="preview-box"></div>
            <div className="preview-box"></div>
            <div className="preview-box"></div>
          </motion.div>
        </section>
      )}

      <footer className="footer">
        <p>Made by Jonah Boxer © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
