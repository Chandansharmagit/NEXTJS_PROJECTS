'use client';
import React from 'react';
import styles from './Aboutus.module.css';

const Aboutus = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.leftSection}>
          <div className={styles.logo}>
            {/* Logo Image */}
            <img 
              src="https://scontent.fktm21-1.fna.fbcdn.net/v/t39.30808-6/469122874_1615162399071260_2369097480446863848_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=VM-WAp64tQ4Q7kNvgGQ-5yi&_nc_zt=23&_nc_ht=scontent.fktm21-1.fna&_nc_gid=ARE20Qg7HhbcXmRIJCWbgke&oh=00_AYD9wmukihW26goIEKHtxrBPNIY5H1XMayz2Sr6i7DMSZw&oe=67A7EFC7" 
              alt="Logo"
              className={styles.logoImage}
            />
          </div>
          <h1 className={styles.title}>
            A New <span className={styles.highlight}>Innovation</span>
            <br />
            for Your Business
          </h1>
          <p className={styles.description}>
            I am a freelancer developer. I have completed many projects for national and 
            international clients using various programming languages and microservices. 
            Feel free to reach out—I am always available to provide you with the best service.
          </p>
          <button className={styles.ctaButton}>Get Started</button>
        </div>
        <div className={styles.rightSection}>
          {/* Dashboard Preview Image */}
          <img 
            src="https://scontent.fktm21-1.fna.fbcdn.net/v/t39.30808-6/469122874_1615162399071260_2369097480446863848_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=VM-WAp64tQ4Q7kNvgGQ-5yi&_nc_zt=23&_nc_ht=scontent.fktm21-1.fna&_nc_gid=ARE20Qg7HhbcXmRIJCWbgke&oh=00_AYD9wmukihW26goIEKHtxrBPNIY5H1XMayz2Sr6i7DMSZw&oe=67A7EFC7" 
            alt="Dashboard Preview"
            className={styles.dashboardImage}
          />
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
