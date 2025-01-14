import React from 'react';
import { motion } from 'framer-motion';
import PreviewBox from '../components/PreviewBox';

function Home() {
  return (
    <div className="page home-page">
      <div className="content-container">
        <motion.h1 
          className="logo-text"
          initial={{ opacity: 0, scale: 0.5, y: 100, filter: "blur(10px)" }}
          animate={{ 
            opacity: 1, 
            scale: [0.5, 1.2, 0.9, 1],
            y: [100, -20, 10, 0],
            filter: ["blur(10px)", "blur(0px)"]
          }}
          transition={{ 
            duration: 1.2,
            times: [0, 0.3, 0.6, 1],
            ease: "easeOut"
          }}
        >
          TUNEBOXED
        </motion.h1>
        <p>Showcase your music taste.</p>
        <div className="preview-container">
          <PreviewBox 
            title="Top Artists" 
            description="View your most listened to artists"
            link="/artists"
          />
          <PreviewBox 
            title="Top Tracks" 
            description="Check out your favorite songs"
            link="/tracks"
          />
          <PreviewBox 
            title="Recent Activity" 
            description="See what you've been listening to lately"
            link="/recent"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
