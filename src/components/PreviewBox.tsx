import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface PreviewBoxProps {
  title: string;
  description: string;
  link: string;
}

const PreviewBox: React.FC<PreviewBoxProps> = ({ title, description, link }) => {
  return (
    <Link to={link} style={{ textDecoration: 'none' }}>
      <motion.div 
        className="preview-box"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h3>{title}</h3>
        <p>{description}</p>
      </motion.div>
    </Link>
  );
};

export default PreviewBox; 