import { useEffect, useRef, useState } from "react";
import styles from "./BodyPartDescription.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Contactform from "../Contactforms/Contactform";

const BodyPartDescription = () => {
  const sectionRef = useRef(null);
  const skillsRef = useRef([]);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const skills = [
    {
      title: "Java",
      subtitle: "Spring boot developer",
      description: "Expert in building robust and scalable backend applications using Spring Boot framework with extensive experience in RESTful APIs and microservices.",
      icon: "🚀"
    },
    {
      title: "Next.js",
      subtitle: "Frontend Developer",
      description: "Creating modern, responsive web applications with server-side rendering and optimal performance using Next.js and React.",
      icon: "⚛️"
    },
    {
      title: "MERN",
      subtitle: "Developer",
      description: "Full-stack development using MongoDB, Express, React, and Node.js for building scalable and robust web applications.",
      icon: "🌐"
    },
    {
      title: "AWS",
      subtitle: "(EC2)",
      description: "Expertise in deploying and managing scalable web applications on Amazon Web Services EC2 instances.",
      icon: "☁️"
    },
    {
      title: "Apache",
      subtitle: "(Kafka Java)",
      description: "Proficient in using Apache Kafka for building scalable and reliable messaging systems in Java applications.",
      icon: "🐱"
    },
    {
      title: "Microservices",
      subtitle: "(Architecture .Java)",
      description: "Skilled in designing and implementing microservices architecture in Java for building scalable and maintainable systems.",
      icon: "🔗"
    },
    {
      title: "Docker",
      subtitle: "",
      description: "Experienced in containerization using Docker for building and deploying applications efficiently.",
      icon: "🐳"
    },
    {
      title: ".Net",
      subtitle: "(Developer)",
      description: "Proficient in developing .NET applications using C# and ASP.NET for building robust and scalable software solutions.",
      icon: "💻"
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate skills in a grid layout with staggered entrance
    gsap.set(skillsRef.current, {
      opacity: 0,
      y: 50,
      scale: 0.8,
    });

    // Updated stagger grid to 3 columns
    gsap.to(skillsRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: {
        amount: 1.5,
        grid: [3, 3], // Changed to 3 columns
        from: "random"
      },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "center center",
        toggleActions: "play none none reverse",
      }
    });

    // Modified hover animations
    skillsRef.current.forEach((skill, index) => {
      skill.addEventListener('mouseenter', () => {
        if (selectedSkill === null) {  // Only apply hover effect if no card is selected
          gsap.to(skill, {
            scale: 1.1,
            duration: 0.3,
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            y: -10,
            zIndex: 10,
          });
        }
      });

      skill.addEventListener('mouseleave', () => {
        if (selectedSkill === null) {  // Only apply hover effect if no card is selected
          gsap.to(skill, {
            scale: 1,
            duration: 0.3,
            boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
            y: 0,
            zIndex: 1,
          });
        }
      });

      skill.addEventListener('click', () => {
        if (selectedSkill === index) {
          // Collapse the card
          setSelectedSkill(null);
          gsap.to(skill, {
            scale: 1,
            width: "auto",
            height: "auto",
            position: "relative",
            zIndex: 1,
            duration: 0.5,
          });
        } else {
          // Expand the card
          setSelectedSkill(index);
          gsap.to(skill, {
            scale: 1.2,
            width: "80vw",
            height: "auto",
            position: "fixed",
            top: "50%",
            left: "50%",
            xPercent: -50,
            yPercent: -50,
            zIndex: 100,
            duration: 0.5,
          });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [selectedSkill]);  // Added selectedSkill to dependency array

  // Add overlay for when a card is selected
  useEffect(() => {
    if (selectedSkill !== null) {
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
      overlay.style.zIndex = '50';
      overlay.style.opacity = '0';
      document.body.appendChild(overlay);

      gsap.to(overlay, {
        opacity: 1,
        duration: 0.3,
      });

      overlay.addEventListener('click', () => {
        setSelectedSkill(null);
        gsap.to(skillsRef.current[selectedSkill], {
          scale: 1,
          width: "auto",
          height: "auto",
          position: "relative",
          zIndex: 1,
          duration: 0.5,
        });
      });

      return () => {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            document.body.removeChild(overlay);
          },
        });
      };
    }
  }, [selectedSkill]);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${styles.darkWhite}`}
      id="skills"
    >
      <div className={styles.content}>
        <h2 className={`${styles.h1} ${styles.green}`}>
          My Skills In{" "}
          <span className={styles.outsourceSales}>Today's Technology</span>
        </h2>

        <div className={styles.skillsGrid}>
          {skills.map((skill, index) => (
            <div
              key={index}
              ref={el => skillsRef.current[index] = el}
              className={styles.skillCard}
            >
              <div className={styles.skillContent}>
                <div className={styles.skillIcon}>{skill.icon}</div>
                <h3 className={styles.skillTitle}>
                  {skill.title}
                  <span className={styles.skillSubtitle}>{skill.subtitle}</span>
                </h3>
                <p className={styles.skillDescription}>
                  {skill.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <Contactform/> */}
    </section>
  );
};

export default BodyPartDescription;
