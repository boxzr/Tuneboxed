import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import tuneboxedLogo from './tuneboxed-logo.png';

function App() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [currentSection, setCurrentSection] = useState('home');
  const [isBoxClicked, setIsBoxClicked] = useState(false);
  const audioRef = useRef(new Audio('/explosion.mp3'));

  // Add background animation
  const instruments = ['🎸', '🎹', '🎺', '🎷', '🎻', '🥁', '🎼', '🎵', '🎶'];
  const [backgroundElements, setBackgroundElements] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const elements = Array.from({ length: 20 }, (_, i) => {
      const instrument = instruments[Math.floor(Math.random() * instruments.length)];
      const delay = Math.random() * 20;
      const duration = 15 + Math.random() * 10;
      const startX = Math.random() * window.innerWidth;
      
      return (
        <motion.span
          key={i}
          className="floating-instrument"
          initial={{ 
            x: startX,
            y: window.innerHeight + 100,
            opacity: 0,
            rotate: 0
          }}
          animate={{
            x: startX + (Math.random() - 0.5) * 200,
            y: -100,
            opacity: [0, 0.5, 0],
            rotate: 360
          }}
          transition={{
            duration: duration,
            delay: delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {instrument}
        </motion.span>
      );
    });

    setBackgroundElements(elements);
  }, []);

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
      <div className="background-animation">
        {backgroundElements}
      </div>
      
      <nav className="nav-menu">
        <a href="/" className="nav-logo">
          <img src={tuneboxedLogo} alt="Tuneboxed" className="nav-logo-image" />
        </a>
        <div className="nav-links">
          <a href="#home" className="nav-link" onClick={handleNavClick('home')}>Home</a>
          <a href="#about" className="nav-link" onClick={handleNavClick('about')}>About</a>
          <a href="#signup" className="nav-link" onClick={handleNavClick('signup')}>Sign Up</a>
        </div>
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
                </div>
              </motion.div>
            )}

            {isBoxClicked && (
              <>
                <motion.div 
                  className="explosion-effect"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ 
                    scale: [1, 1.5, 2],
                    opacity: [1, 0.5, 0]
                  }}
                  transition={{ duration: 0.5 }}
                />

                <motion.div 
                  className="content-container"
                  initial={{ 
                    opacity: 0,
                    scale: 0.2,
                    y: 0
                  }}
                  animate={{ 
                    opacity: 1,
                    scale: [0.2, 1.2, 1],
                    y: [-100, 50, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    times: [0, 0.6, 1],
                    ease: "easeOut"
                  }}
                >
                  <motion.h1 
                    className="logo-text"
                    initial={{ opacity: 0, scale: 0.5, y: -100 }}
                    animate={{ 
                      opacity: 1,
                      scale: [0.5, 1.2, 1],
                      y: [-100, 20, 0]
                    }}
                    transition={{ 
                      duration: 0.8,
                      delay: 0.2
                    }}
                  >
                    TUNEBOXED
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Showcase your music taste.
                  </motion.p>

                  <motion.div 
                    className="preview-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="preview-box"
                        initial={{ 
                          opacity: 0,
                          x: 0,
                          y: 0,
                          scale: 0,
                          rotate: -180
                        }}
                        animate={{ 
                          opacity: 1,
                          x: 0,
                          y: 0,
                          scale: 1,
                          rotate: 0
                        }}
                        transition={{ 
                          delay: 0.7 + (i * 0.2),
                          duration: 0.6,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </motion.div>

                  <motion.div 
                    className="mission-section"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    <motion.img 
                      src={tuneboxedLogo}
                      alt="Tuneboxed"
                      className="mission-logo"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.4 }}
                    />
                    <motion.h2 
                      className="mission-title"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.6 }}
                    >
                      TuneBoxed© - Showcase Your Music Taste
                    </motion.h2>
                    <motion.p 
                      className="mission-text"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.8 }}
                    >
                      Share and Express Yourself Through Sound
                    </motion.p>
                    <motion.p 
                      className="mission-description"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 2.0 }}
                    >
                      First app where you can draw and write about how music makes you feel.
                    </motion.p>
                  </motion.div>
                </motion.div>

                {[...Array(40)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="explosion-particle"
                    initial={{ 
                      opacity: 0,
                      x: 0,
                      y: 0,
                      scale: 0
                    }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      y: [(Math.random() - 0.5) * 300, (Math.random() - 0.5) * 800],
                      x: [(Math.random() - 0.5) * 300, (Math.random() - 0.5) * 800],
                      scale: [0, 1, 0],
                      rotate: Math.random() * 720 - 360
                    }}
                    transition={{ 
                      duration: 1.5,
                      ease: "easeOut"
                    }}
                  >
                    {['🎵', '🎶', '🎸', '🎹', '🎼', '✨', '💫'][i % 7]}
                  </motion.span>
                ))}
              </>
            )}
          </motion.div>
        </section>
      )}

      {currentSection === 'about' && (
        <section id="about" className="about-section">
          <motion.div 
            className="about-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="about-title gradient-text"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Revolutionizing Music Expression
            </motion.h2>

            <motion.div 
              className="about-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <motion.p 
                className="about-intro gradient-text-orange"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                TuneBoxed is transforming how we experience and share music in the digital age.
              </motion.p>

              <div className="about-features">
                <motion.div 
                  className="feature-block"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <h3 className="gradient-text-blue">Vision & Innovation</h3>
                  <p>Create a vibrant ecosystem where music lovers can express their emotional connection to songs through unique visual and written expressions. Our innovative TuneBox feature allows users to draw and describe their musical journey.</p>
                </motion.div>

                <motion.div 
                  className="feature-block"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                >
                  <h3 className="gradient-text-orange">Community & Connection</h3>
                  <p>Foster meaningful connections through music with location-based communities, genre-specific groups, and interactive challenges. Engage with fellow music enthusiasts, discover new artists, and share your musical discoveries.</p>
                </motion.div>

                <motion.div 
                  className="feature-block"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <h3 className="gradient-text-navy">Platform Features</h3>
                  <p>Weekly curated music posts, creative expression tools, verified profiles, direct messaging, and personalized event discoveries. Experience music sharing reimagined for the modern social era.</p>
                </motion.div>
              </div>

              <motion.div 
                className="about-mission"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                <p className="gradient-text">Join us in redefining the future of music sharing and discovery.</p>
              </motion.div>
            </motion.div>
          </motion.div>
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
