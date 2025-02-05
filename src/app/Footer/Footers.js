'use client'
import { useEffect, useRef } from 'react'
import styles from './Footer.module.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const footerRef = useRef(null)

  useEffect(() => {
    const footer = footerRef.current
    const elements = footer.querySelectorAll('.animate-on-scroll')

    elements.forEach((element, index) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 50,
          rotateX: 30
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: element,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })
  }, [])

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={styles.footerWave}>
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,90.7C960,96,1056,96,1152,90.7C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>

      <div className={styles.footerContent}>
        <div className={`${styles.footerSection} ${styles.mainSection} animate-on-scroll`}>
          <div className={styles.logoSection}>
            <h2 className={styles.brandName}>Your Brand</h2>
            <p className={styles.tagline}>Creating Digital Excellence</p>
          </div>
          <div className={styles.socialLinks}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <div className={styles.iconWrapper}>⌨️</div>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <div className={styles.iconWrapper}>💼</div>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <div className={styles.iconWrapper}>🐦</div>
            </a>
          </div>
        </div>

        <div className={styles.footerGrid}>
          <div className={`${styles.footerCard} animate-on-scroll`}>
            <h3>Quick Links</h3>
            <nav className={styles.footerNav}>
              <Link href="/" className={styles.footerLink}>Home</Link>
              <Link href="/services" className={styles.footerLink}>Services</Link>
              <Link href="/portfolio" className={styles.footerLink}>Portfolio</Link>
              <Link href="/contact" className={styles.footerLink}>Contact</Link>
            </nav>
          </div>

          <div className={`${styles.footerCard} ${styles.contactCard} animate-on-scroll`}>
            <h3>Let's Connect</h3>
            <div className={styles.contactInfo}>
              <a href="mailto:dpworldsharma@gmail.com" className={styles.contactLink}>
                <span className={styles.contactIcon}>📧</span>
                dpworldsharma@gmail.com
              </a>
              <a href="tel:+9779845427041" className={styles.contactLink}>
                <span className={styles.contactIcon}>📞</span>
                +977 984-542-7041
              </a>
              <p className={styles.contactLink}>
                <span className={styles.contactIcon}>📍</span>
                New Baneshwor, Kathmandu
              </p>
            </div>
          </div>

          <div className={`${styles.footerCard} ${styles.newsletterCard} animate-on-scroll`}>
            <h3>Stay Updated</h3>
            <form className={styles.newsletterForm}>
              <div className={styles.inputWrapper}>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className={styles.newsletterInput}
                />
                <button type="submit" className={styles.newsletterButton}>
                  <span>Subscribe</span>
                  <span className={styles.buttonIcon}>→</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.footerBottomContent}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Your Brand. Crafted with ❤️ in Nepal
          </p>
          <div className={styles.legalLinks}>
            <Link href="/privacy" className={styles.legalLink}>Privacy</Link>
            <Link href="/terms" className={styles.legalLink}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
