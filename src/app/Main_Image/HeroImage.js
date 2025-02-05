// components/HeroImage.js
"use client";
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import styles from './HeroImage.module.css';
import image from "./chandansharma.jpg";
const HeroImage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={styles.heroContainer}>
      <div className={styles.imageWrapper}>
        <img
          src="https://scontent.fktm21-1.fna.fbcdn.net/v/t39.30808-6/475570222_1655265691727597_4404594821630485611_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=xUJkDIkP81IQ7kNvgGOSsHG&_nc_zt=23&_nc_ht=scontent.fktm21-1.fna&_nc_gid=A4yql9KHbWXFrl2LvhjKbux&oh=00_AYChvf9pGV__qtQinnpwl0LoBj47WSkW0o1hXj3azDkT3w&oe=67A96C65" // Replace with your image path
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