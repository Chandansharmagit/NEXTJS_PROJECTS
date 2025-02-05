"use client";

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import "./article.css";

export default function AnimatedText() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Horizontal Scroll Animation
    const sections = document.querySelectorAll('.section');
    const horizontalScroll = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: "#container",
        pin: true,
        scrub: 1,
        end: () => "+=" + document.querySelector("#container").offsetWidth
      }
    });

    // GSAP animation for text and image
    sections.forEach((section, index) => {
      const text = section.querySelector('.content');
      const image = section.querySelector('.image');
      
      // Animate text appearance
      gsap.fromTo(text, {
        opacity: 0,
        x: -100,
      }, {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 30%",
          scrub: true
        }
      });

      // Animate image appearance
      gsap.fromTo(image, {
        opacity: 0,
        x: 100,
      }, {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 30%",
          scrub: true
        }
      });
    });

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div id="container">
      <h1 className="main-title">My Natural Habits</h1>
      
      <div className="section one">
        <div className="content">
          <h2>Forex and Crypto Trader</h2>
          <p>Knowledge is your most valuable asset. Keep up-to-date with market news, economic indicators, and global events that can influence currency movements.</p>
        </div>
        <div className="image"></div>
      </div>

      <div className="section two">
        <div className="content">
          <h2>Programmer</h2>
          <p>The tech landscape is ever-evolving. Embrace new challenges and continuously strive to innovate. Your code has the power to shape the future.</p>
        </div>
        <div className="image"></div>
      </div>

      <div className="section three">
        <div className="content">
          <h2>Fittness</h2>
          <p>Consistency is key to achieving your fitness goals. Keep pushing forward, even on days when it's challenging. Every workout, no matter how small, brings you one step closer to your goals.</p>
        </div>
        <div className="image"></div>
      </div>
      <div className="section four">
        <div className="content">
          <h2>Adventure Travelling.</h2>
          <p>Consistency is key to achieving your fitness goals. Keep pushing forward, even on days when it's challenging. Every workout, no matter how small, brings you one step closer to your goals.</p>
        </div>
        <div className="image"></div>
      </div>

     
    </div>
  );
}
