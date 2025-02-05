"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./chatwithchandan.module.css";

export default function ChatWithChandan() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "I am waiting for your reply.",
      type: "received",
    },
    {
      id: 2,
      text: "I would like to go for a morning walk from tomorrow onwards.",
      type: "sent",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const chatBoxRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    // Add new message to the messages array
    setMessages([
      ...messages,
      {
        id: Date.now(),
        text: inputMessage,
        type: "sent",
      },
    ]);

    // Clear input
    setInputMessage("");

    // Simulate received message (for demo purposes)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Thanks for your message! I'll get back to you soon.",
          type: "received",
        },
      ]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Animate chat box opening
      gsap.fromTo(
        chatBoxRef.current,
        {
          scale: 0,
          opacity: 0,
          y: 100,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        }
      );
    } else {
      // Animate chat box closing
      gsap.to(chatBoxRef.current, {
        scale: 0,
        opacity: 0,
        y: 100,
        duration: 0.3,
      });
    }
  }, [isOpen]);

  return (
    <div className={styles.chatContainer}>
      <button onClick={toggleChat} className={styles.chatButton}>
        Chat with Chandan
      </button>

      {isOpen && (
        <div className={styles.chatOverlay}>
          <div ref={chatBoxRef} className={styles.chatBox}>
            <div className={styles.chatHeader}>
              <h2 className={styles.chatTitle}>Chat with Chandan</h2>
              <button onClick={toggleChat} className={styles.closeButton}>
                ✕
              </button>
            </div>

            <div className={styles.chatContent}>
              <div className={styles.messageArea}>
                <div className={styles.messageList}>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`${styles.message} ${styles[message.type]}`}
                    >
                      <div className={styles.avatar}></div>
                      <div className={styles.messageContent}>
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              
            </div>

            <div className={styles.inputArea}>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  placeholder="Type your messages here..."
                  className={styles.messageInput}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  className={styles.sendButton}
                  onClick={handleSendMessage}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
