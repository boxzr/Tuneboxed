import React from 'react';
import { motion } from 'framer-motion';

function About() {
  return (
    <div className="page about-page">
      <div className="content-container">
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Tuneboxed
        </motion.h1>
        <motion.div 
          className="about-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p>Tuneboxed is your personal music time capsule. We help you track, visualize, and share your music journey.</p>
          <div className="features">
            <div className="feature">
              <h3>Track Your Favorites</h3>
              <p>Keep up with your most played artists and tracks</p>
            </div>
            <div className="feature">
              <h3>Visualize Trends</h3>
              <p>See how your music taste evolves over time</p>
            </div>
            <div className="feature">
              <h3>Share Your Style</h3>
              <p>Create shareable music boxes to show off your unique taste</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
