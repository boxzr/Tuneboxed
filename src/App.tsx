import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [currentSection, setCurrentSection] = useState('home');
  const [isBoxClicked, setIsBoxClicked] = useState(false);
  const audioRef = useRef(new Audio('/explosion.mp3'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup:', { name, email });
  };

  const handleNavClick = (section: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentSection(section);
  };

  const handleBoxClick = () => {
    setIsBoxClicked(true);
    // Play sound only after user interaction
    audioRef.current.play().catch(error => console.log('Audio playback failed:', error));
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
            {!isBoxClicked && (
              <motion.div 
                className="cardboard-box"
                initial={{ scale: 1 }}
                animate={{ 
                  scale: [1, 1.15, 0.9, 1.2, 0.85, 1.1, 0.95],
                  rotate: [0, -8, 12, -15, 15, -10, 8],
                  y: [0, -15, 8, -20, 10, -15, 5],
                  x: [0, -12, 15, -20, 15, -15, 10]
                }}
                transition={{ 
                  duration: 2.5,
                  times: [0, 0.2, 0.4, 0.6, 0.7, 0.8, 1],
                  ease: "easeInOut"
                }}
                onAnimationComplete={() => {
                  setIsBoxClicked(true);
                  audioRef.current.play().catch(error => console.log('Audio playback failed:', error));
                }}
              >
                <div className="box-content">
                  <motion.div 
                    className="box-lid"
                    animate={{ 
                      rotateX: [0, 25, -20, 30, -15, 20, -10],
                      y: [0, -5, 4, -6, 3, -4, 2]
                    }}
                    transition={{
                      duration: 2.5,
                      times: [0, 0.2, 0.4, 0.6, 0.7, 0.8, 1],
                      ease: "easeInOut"
                    }}
                  />
                  <div className="flap-top"></div>
                  <div className="flap-right"></div>
                  <div className="flap-bottom"></div>
                  <div className="flap-left"></div>
                </div>
              </motion.div>
            )}

            {isBoxClicked && (
              <>
                {/* Explosion particles */}
                {[...Array(30)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="explosion-particle"
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      y: [(Math.random() - 0.5) * 200, (Math.random() - 0.5) * 600],
                      x: [(Math.random() - 0.5) * 200, (Math.random() - 0.5) * 600],
                      scale: [0, 1, 0],
                      rotate: Math.random() * 720 - 360
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  >
                    {['🎵', '🎶', '🎸', '🎹', '🎼'][i % 5]}
                  </motion.span>
                ))}

                {/* Homepage content */}
                <motion.div 
                  className="content-container"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.h1 
                    className="logo-text"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    TUNEBOXED
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Showcase your music taste.
                  </motion.p>
                  <motion.div 
                    className="preview-container"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <div className="preview-box"></div>
                    <div className="preview-box"></div>
                    <div className="preview-box"></div>
                  </motion.div>
                </motion.div>
              </>
            )}
          </motion.div>
        </section>
      )}

      {currentSection === 'about' && (
        <section id="about" className="section">
          <h2>About Us</h2>
          <p>Blank</p>
        </section>
      )}

      {currentSection === 'signup' && (
        <section id="signup" className="section">
          <motion.div 
            className="signup-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="signup-title">Join Tuneboxed</h2>
            <p className="signup-subtitle">Start showcasing your music taste today</p>
            
            <div className="signup-options">
              <motion.button 
                className="spotify-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img src="/spotify-icon.png" alt="Spotify" className="spotify-icon" />
                Continue with Spotify
              </motion.button>
              
              <div className="divider">
                <span>or</span>
              </div>

              <motion.div 
                className="signup-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <motion.button 
                    type="submit" 
                    className="signup-button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Create Account
                  </motion.button>
                </form>
              </motion.div>
            </div>
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
