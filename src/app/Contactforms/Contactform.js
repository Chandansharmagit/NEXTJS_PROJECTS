'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './Contactform.module.css'
import Image from 'next/image'

export default function ContactForm() {
  const [formProgress, setFormProgress] = useState(0)
  const formRef = useRef(null)
  const inputRefs = useRef([])
  const cupRef = useRef(null)
  const liquidRef = useRef(null)
  const steamRef = useRef(null)

  useEffect(() => {
    if (!formRef.current || !inputRefs.current.length) return

    // Create steam animation
    const steamTl = gsap.timeline({ repeat: -1 })
    steamTl.to(steamRef.current, {
      opacity: 0.8,
      y: -20,
      duration: 2,
      ease: 'power1.inOut'
    })
    .to(steamRef.current, {
      opacity: 0,
      y: -40,
      duration: 2,
      ease: 'power1.inOut'
    })

    // Liquid fill animation based on form progress
    gsap.to(liquidRef.current, {
      height: `${formProgress}%`,
      duration: 1,
      ease: 'power2.out'
    })
  }, [formProgress])

  const handleInputChange = (e) => {
    const inputs = [...inputRefs.current]
    const filledInputs = inputs.filter(input => input.value.length > 0)
    const progress = (filledInputs.length / inputs.length) * 100
    setFormProgress(progress)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    gsap.to(cupRef.current, {
      rotate: 360,
      scale: 1.2,
      duration: 1,
      ease: 'bounce.out',
      onComplete: () => {
        // Add your form submission logic here
        alert('Thanks for brewing with us! ☕')
      }
    })
  }

  return (
    <>
      <h1 className={styles.topText}>Join Coffee with Me !</h1>
      <div className={styles.container}>
        <div className={styles.coffeeSection}>
          <div ref={cupRef} className={styles.coffeeCup}>
            <div ref={liquidRef} className={styles.liquid}></div>
            <div ref={steamRef} className={styles.steam}>
              {'~'.repeat(3).split('').map((_, i) => (
                <span key={i} className={styles.steamWave} style={{ animationDelay: `${i * 0.3}s` }}>∼</span>
              ))}
            </div>
          </div>
          <div className={styles.progressText}>
            {formProgress === 100 ? 'Your coffee is ready!' : `Brewing... ${Math.round(formProgress)}%`}
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>Brew a Conversation</h2>
          <p className={styles.subtitle}>Fill the cup with your thoughts ☕</p>
          
          <div className={styles.inputGroup}>
            <label className={styles.label}>Your Name</label>
            <input
              ref={el => inputRefs.current[0] = el}
              type="text"
              placeholder="What should we call you?"
              required
              className={styles.input}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Your Email</label>
            <input
              ref={el => inputRefs.current[1] = el}
              type="email"
              placeholder="Where can we reach you?"
              required
              className={styles.input}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Your Message</label>
            <textarea
              ref={el => inputRefs.current[2] = el}
              placeholder="What's brewing in your mind?"
              required
              className={styles.textarea}
              onChange={handleInputChange}
            />
          </div>

          <button 
            type="submit" 
            className={`${styles.button} ${formProgress === 100 ? styles.ready : ''}`}
          >
            {formProgress === 100 ? '☕ Serve it Hot!' : '⏳ Still Brewing...'}
          </button>
        </form>
      </div>
    </>
  )
}
