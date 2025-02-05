'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ResumePreviews.module.css';

gsap.registerPlugin(ScrollTrigger);

const NetworkDiagram = () => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [scale, setScale] = useState(1);

  const networkData = {
    nodes: [
      {
        id: 'profile',
        title: 'Chandan Sharma',
        subtitle: 'Full Stack Developer',
        icon: '👨‍💻',
        x: 100,
        y: 300,
        connections: ['skills', 'languages', 'training']
      },
      {
        id: 'skills',
        title: 'Core Skills',
        icon: '💻',
        x: 300,
        y: 300,
        connections: ['frontend', 'backend', 'devops', 'databases']
      },
      {
        id: 'frontend',
        title: 'Frontend',
        subtitle: 'React.js, Tailwind CSS, Bootstrap',
        icon: '🎨',
        x: 500,
        y: 200,
        connections: ['projects']
      },
      {
        id: 'backend',
        title: 'Backend',
        subtitle: 'Java, Spring Boot, Node.js',
        icon: '⚙️',
        x: 500,
        y: 300,
        connections: ['projects']
      },
      {
        id: 'devops',
        title: 'DevOps',
        subtitle: 'AWS, Docker',
        icon: '🚀',
        x: 500,
        y: 400,
        connections: ['projects']
      },
      {
        id: 'databases',
        title: 'Databases',
        subtitle: 'MongoDB, SQL',
        icon: '🗄️',
        x: 500,
        y: 500,
        connections: ['projects']
      },
      {
        id: 'languages',
        title: 'Languages',
        subtitle: 'English, Hindi, Nepali',
        icon: '🗣️',
        x: 300,
        y: 500,
      },
      {
        id: 'training',
        title: 'Training',
        subtitle: 'Microservices Architecture',
        icon: '📚',
        x: 300,
        y: 400,
        connections: ['certifications']
      },
      {
        id: 'certifications',
        title: 'Certifications',
        subtitle: 'Java Spring Boot',
        icon: '🏆',
        x: 500,
        y: 600,
      },
      {
        id: 'projects',
        title: 'Projects',
        icon: '📂',
        x: 700,
        y: 350,
        connections: ['mernWebsite', 'whatsappClone', 'notepad', 'cricketAcademy', 'furniture']
      },
      {
        id: 'mernWebsite',
        title: 'MERN Dynamic Website',
        subtitle: 'Full Stack with Authentication',
        icon: '🌐',
        x: 900,
        y: 150,
      },
      {
        id: 'whatsappClone',
        title: 'WhatsApp Clone',
        subtitle: 'Spring Boot Microservices',
        icon: '💬',
        x: 900,
        y: 250,
      },
      {
        id: 'notepad',
        title: 'Notepad Application',
        subtitle: 'Java Desktop App',
        icon: '📝',
        x: 900,
        y: 350,
      },
      {
        id: 'cricketAcademy',
        title: 'Cricket Academy Website',
        subtitle: 'React & Node.js Dynamic Platform',
        icon: '🏏',
        x: 900,
        y: 450,
      },
      {
        id: 'furniture',
        title: 'Furniture Store',
        subtitle: 'Microservices E-commerce',
        icon: '🪑',
        x: 900,
        y: 550,
      },
      {
        id: 'experience',
        title: 'Experience',
        subtitle: 'Freelance Developer',
        icon: '💼',
        x: 700,
        y: 150,
        connections: ['projects']
      },
      {
        id: 'contact',
        title: 'Contact',
        subtitle: '+977-984-527-041',
        icon: '📧',
        x: 100,
        y: 400,
      }
    ],
  };

  const calculateScale = () => {
    if (!containerRef.current) return 1;
    const containerWidth = containerRef.current.offsetWidth;
    const baseWidth = 1200; // This should match your design's base width
    return Math.min(containerWidth / baseWidth, 1);
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current && svgRef.current) {
        const newScale = calculateScale();
        setScale(newScale);
        
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });

        gsap.to(['.'+styles.nodesContainer, svgRef.current], {
          scale: newScale,
          duration: 0.3,
          ease: 'power2.out',
          transformOrigin: 'top left'
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const generatePath = (start, end) => {
    const controlPointOffset = 100;
    const midX = (start.x + end.x) / 2;
    
    return `M ${start.x},${start.y} 
            C ${start.x + controlPointOffset},${start.y} 
              ${end.x - controlPointOffset},${end.y} 
              ${end.x},${end.y}`;
  };

  return (
    <div className={styles.networkContainer} ref={containerRef}>
      <h1 className={styles.resumetext}>Check out My Network Resume</h1>
      <div className={styles.diagramWrapper}>
        <svg ref={svgRef} className={styles.connections}>
          {networkData.nodes.map(node =>
            node.connections?.map(targetId => {
              const targetNode = networkData.nodes.find(n => n.id === targetId);
              if (!targetNode) return null;
              
              return (
                <path
                  key={`${node.id}-${targetId}`}
                  d={generatePath(node, targetNode)}
                  className={`${styles.connection} ${
                    node.isWireless || targetNode.isWirelessDevice ? styles.connectionDashed : ''
                  }`}
                />
              );
            })
          )}
        </svg>
        
        <div className={styles.nodesContainer}>
          {networkData.nodes.map((node) => (
            <div
              key={node.id}
              className={styles.nodeWrapper}
              style={{
                left: `${node.x}px`,
                top: `${node.y}px`,
                transform: `scale(${scale})`
              }}
            >
              <div className={styles.networkNode}>
                <div className={styles.nodeIcon}>{node.icon}</div>
                <div className={styles.nodeContent}>
                  <h3>{node.title}</h3>
                  {node.subtitle && (
                    <span className={styles.subtitle}>{node.subtitle}</span>
                  )}
                  {node.wirelessStats && (
                    <span className={styles.wirelessStats}>{node.wirelessStats}</span>
                  )}
                </div>
                {(node.isWireless || node.isWirelessDevice) && (
                  <div className={styles.deviceStatus} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetworkDiagram;
