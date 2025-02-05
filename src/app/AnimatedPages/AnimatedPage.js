// components/AnimatedPage.js

"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./AnimatedPage.module.css";  // Import CSS file

const AnimatedPage = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const hero = document.querySelector(".hero");
    const heroIcons = document.querySelectorAll(".hero .icons li");

    let tl = gsap.timeline({
      onComplete: () => {
        console.warn("done");
        gsap.set("body", {
          overflow: "auto",
        });
      },
      onReverseComplete: () => {
        console.warn("done");
        gsap.set("body", {
          overflow: "auto",
        });
      },
      scrollTrigger: {
        trigger: ".wrap-pin",
        start: "+=25px top",
        pin: hero,
        pinSpacing: false,
        markers: true,
        onEnter: () => {
          gsap.set("body", {
            overflow: "hidden",
          });
        },
        onLeaveBack: () => {
          tl.pause(0);
        },
      },
    });

    tl.to(heroIcons, {
      opacity: 1,
      duration: 0.5,
      y: 0,
      ease: "power2.out",
      stagger: {
        each: 0.2,
        from: "random",
      },
    });

    const container = document.querySelector("#scroll");
    const img = document.querySelector(".section__img");

    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      pin: img,
      pinSpacing: false,
    });
  }, []);

  return (
    <div className={styles.wrapPin}>
      <div className={styles.hero}>
        <h1>Title project</h1>
        <ul className={styles.icons}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div id="scroll">
        <section className={`${styles.sectionGrid} ${styles.red}`}>
          <div className={styles.sectionImg}></div>
          <div className={styles.sectionContent}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit
            impedit porro et provident magni, incidunt vel omnis possimus ut nobis
            consequatur vero, aut amet totam fugit ea illum, ipsa error reiciendis
            necessitatibus placeat. Sequi ullam deleniti tenetur consequatur. Veritatis,
            molestias modi dignissimos libero saepe pariatur blanditiis cumque natus eos
            repellat praesentium assumenda laboriosam beatae recusandae. Ducimus fugit
            officiis animi modi delectus quidem doloremque voluptatem sapiente cumque
            voluptatibus? Earum aliquid ipsam temporibus et laboriosam eligendi nihil?
          </div>
        </section>
        <section className={`${styles.sectionGrid} ${styles.blue}`}>
          <div className={styles.sectionContent}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit
            impedit porro et provident magni, incidunt vel omnis possimus ut nobis
            consequatur vero, aut amet totam fugit ea illum, ipsa error reiciendis
            necessitatibus placeat. Sequi ullam deleniti tenetur consequatur. Veritatis,
            molestias modi dignissimos libero saepe pariatur blanditiis cumque natus eos
            repellat praesentium assumenda laboriosam beatae recusandae. Ducimus fugit
            officiis animi modi delectus quidem doloremque voluptatem sapiente cumque
            voluptatibus? Earum aliquid ipsam temporibus et laboriosam eligendi nihil?
          </div>
        </section>
      </div>
    </div>
  );
};

export default AnimatedPage;
