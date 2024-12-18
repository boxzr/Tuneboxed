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
          <motion.h1 
            className="logo-text"
            initial={{ x: -1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            TUNEBOXED
          </motion.h1>
          <p>Showcase your music taste.</p>
          
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
