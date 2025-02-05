// components/HeroImage.js
"use client";
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import styles from './HeroImage.module.css';

const HeroImage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={styles.heroContainer}>
      <div className={styles.imageWrapper}>
        <img
          src="https://chandansharmablogs.tech/static/media/chandan1.108c13a9dc35936cac1b.jpg
" // Replace with your image path
          alt="Hero Background"
          className={styles.heroImage}
        />
        <div className={styles.overlay} />
        <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
          <h1 className={styles.title}>Welcome to My Personal Website</h1>
          <p className={styles.subtitle}>
            Discover amazing experiences and unforgettable moments
          </p>
          <button className={styles.cta}>Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;