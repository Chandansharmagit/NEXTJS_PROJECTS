'use client'
import { useEffect, useState } from 'react'
import gsap from 'gsap'
import styles from './PopName.module.css'

const PopName = () => {
  const [name, setName] = useState('')
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    // Check if name exists in localStorage
    const storedName = localStorage.getItem('userName')
    if (storedName) {
      setIsOpen(false)
    }

    if (isOpen) {
      // Create a timeline for better animation control
      const tl = gsap.timeline()

      // Animate popup container with bounce effect
      tl.fromTo('.popup-container',
        {
          opacity: 0,
          scale: 0.3,
          y: -100
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1.2, 0.5)'
        }
      )

      // Animate image with a reveal effect
      .fromTo('.side-image',
        {
          opacity: 0,
          scale: 1.2,
          rotate: -5
        },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.8,
          ease: 'power2.out'
        },
        '-=0.3'
      )

      // Animate content elements with improved stagger
      .fromTo('.animate-item',
        {
          opacity: 0,
          x: -30,
          filter: 'blur(10px)'
        },
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out'
        },
        '-=0.5'
      )
    }
  }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      // Store name in localStorage
      localStorage.setItem('userName', name.trim())

      // Create exit animation timeline
      const tl = gsap.timeline({
        onComplete: () => {
          setIsOpen(false)
          // Add timeout to refresh page after 2 seconds
          setTimeout(() => {
            window.location.reload()
          }, 500)
        }
      })

      tl.to('.animate-item', {
        opacity: 0,
        x: 30,
        filter: 'blur(5px)',
        duration: 0.3,
        stagger: 0.1,
        ease: 'power2.in'
      })
      .to('.side-image', {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: 'power2.in'
      }, '-=0.2')
      .to('.popup-container', {
        opacity: 0,
        scale: 0.3,
        y: -50,
        duration: 0.4,
        ease: 'power3.in'
      }, '-=0.2')
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      <div className={`${styles.popupContainer} popup-container`}>
        <div className={styles.imageSection}>
          <img 
            src="https://i.pinimg.com/736x/55/9b/8a/559b8a2c6a05119c5f63def2e4b0fb57.jpg" 
            alt="Welcome" 
            className={`${styles.sideImage} side-image`}
            loading="eager"
            onLoad={(e) => {
              gsap.from(e.target, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out'
              })
            }}
          />
        </div>
        <div className={styles.formSection}>
          <h2 className="animate-item">Welcome!</h2>
          <p className="animate-item">Please enter your name:</p>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className={`${styles.input} animate-item`}
            />
            <button type="submit" className={`${styles.button} animate-item`}>
              Get Started
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PopName
