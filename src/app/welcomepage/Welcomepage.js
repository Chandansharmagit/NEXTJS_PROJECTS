'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './Welcomepage.module.css'

const Welcomepage = ({ onComplete }) => {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const containerRef = useRef(null)
  const letterRefs = useRef([])
  const glowRef = useRef(null)

  useEffect(() => {
    // Split text into individual letters
    const titleText = titleRef.current.textContent
    titleRef.current.textContent = ''
    const letters = titleText.split('').map((letter, i) => {
      const span = document.createElement('span')
      span.textContent = letter
      span.style.display = 'inline-block'
      titleRef.current.appendChild(span)
      letterRefs.current[i] = span
      return span
    })

    const tl = gsap.timeline({
      onComplete: () => {
        const outroTl = gsap.timeline({
          delay: 2,
          onComplete: onComplete
        })

        outroTl
          .to(containerRef.current, {
            scale: 1.1,
            duration: 0.5
          })
          .to(containerRef.current, {
            opacity: 0,
            filter: 'blur(20px)',
            duration: 0.8,
            ease: "power2.inOut"
          }, "-=0.3")
      }
    })

    // Initial container animation with blur effect
    tl.fromTo(containerRef.current,
      { 
        opacity: 0,
        scale: 1.2,
        filter: 'blur(20px)'
      },
      { 
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: "power2.out"
      }
    )

    // Animate letters individually with random effects
    letters.forEach((letter, i) => {
      tl.fromTo(letter,
        {
          opacity: 0,
          scale: 0,
          rotate: gsap.utils.random(-180, 180),
          y: gsap.utils.random(-100, 100)
        },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)"
        },
        `-=${i ? 0.7 : 0}`
      )
    })

    // Subtitle animation with floating effect
    tl.fromTo(subtitleRef.current,
      { 
        y: 50,
        opacity: 0,
        scale: 0.8
      },
      { 
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      },
      "-=1"
    )

    // Add floating animation to subtitle
    gsap.to(subtitleRef.current, {
      y: '+=10',
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

    // Add hover effects
    const letters3D = letterRefs.current
    letters3D.forEach(letter => {
      letter.addEventListener('mouseenter', () => {
        gsap.to(letter, {
          scale: 1.4,
          rotateY: 360,
          duration: 0.4,
          color: '#00ff00',
          ease: "power2.out"
        })
      })
      letter.addEventListener('mouseleave', () => {
        gsap.to(letter, {
          scale: 1,
          rotateY: 0,
          duration: 0.4,
          color: 'inherit',
          ease: "power2.in"
        })
      })
    })

  }, [onComplete])

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.content}>
        <h1 className={styles.title} ref={titleRef}>
          Welcome to WEHVR
        </h1>
        <p className={styles.subtitle} ref={subtitleRef}>
          Experience Virtual Reality Like Never Before
        </p>
      </div>
    </div>
  )
}

export default Welcomepage
