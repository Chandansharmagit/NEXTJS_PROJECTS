// components/Navbar.js
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import HeroImage from "../Main_Image/HeroImage";
import Article from "../Article/Article";
import AnimatedText from "../Article/Article";
import BodyPartDescription from "../BodyPartDescription/BodyPartDescriptions";
import AnimatedPage from "../AnimatedPages/AnimatedPage";
import Contactform from "../Contactforms/Contactform";
import ResumePreviews from "../ResumePreview/ResumePreviews";
import Footer from "../Footer/Footers";
import Aboutus from "../aboutus/Aboutus";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNavLinks, setShowNavLinks] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Get username from localStorage
    const storedUsername = localStorage.getItem('userName') || 'Guest';
    setUsername(storedUsername);

    // Set greeting based on time of day
    const hour = new Date().getHours();
    let timeGreeting;
    if (hour >= 5 && hour < 12) {
      timeGreeting = 'Good Morning';
    } else if (hour >= 12 && hour < 17) {
      timeGreeting = 'Good Afternoon';
    } else if (hour >= 17 && hour < 22) {
      timeGreeting = 'Good Evening';
    } else {
      timeGreeting = 'Good Night';
    }
    setGreeting(timeGreeting);

    // Add timer to show nav links after welcome animation
    const timer = setTimeout(() => {
      setShowNavLinks(true);
    }, 2000); // Adjust this time to match your welcome animation duration

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const menuItems = [
    { id: 1, text: "Home", href: "/", icon: "🏠" },
    { id: 2, text: "About", href: "/about", icon: "👤" },
    { id: 3, text: "Services", href: "/services", icon: "⚡" },
    { id: 4, text: "Portfolio", href: "/portfolio", icon: "🎨" },
    { id: 5, text: "Contact", href: "/contact", icon: "✉️" },
  ];

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoSymbol}>⚡</span>
            <span className={styles.logoText}>{`${greeting}, ${username}`}</span>
          </Link>

          <button
            className={`${styles.hamburger} ${isOpen ? styles.active : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className={styles.hamburgerBox}>
              <span className={styles.hamburgerInner}></span>
            </div>
          </button>

          <div className={`${styles.navMenu} ${isOpen ? styles.active : ""}`}>
            {menuItems.map((item, index) => (
              <Link
                key={item.id}
                href={item.href}
                className={`${styles.navLink} ${showNavLinks ? styles.visible : ''}`}
                style={{ 
                  animationDelay: `${index * 0.1 + 2}s`,
                  opacity: 0
                }}
                onClick={() => setIsOpen(false)}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navText}>{item.text}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <HeroImage />
      <AnimatedText />
   
 
      <BodyPartDescription />
      <ResumePreviews/>
      <Aboutus/>
      {/* <AnimatedPage /> */}
      <Contactform/>
      <Footer/>
   

     
      
 
    
    </>
  );
};

export default Navbar;
