import React from 'react';
import { motion } from 'framer-motion';

function Home() {
  return (
    <div className="page">
      <motion.h1 
        className="logo-text"
        initial={{ x: -1000, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        TUNEBOXED
      </motion.h1>
      <p>Showcase your music taste.</p>
      <div className="preview-grid">
        <div className="preview-box"></div>
        <div className="preview-box"></div>
        <div className="preview-box"></div>
      </div>
    </div>
  );
}

export default Home;
