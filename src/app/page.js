"use client"; // Add this line at the top

import { useState, useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS
import "./globals.css";
import Navbar from "./navbar/Navbar";
import Welcomepage from './welcomepage/Welcomepage';
import ChatWithChandan from "./chatting/chatwithchandan";
import PopName from "./popname/PopName";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      {showWelcome ? (
        <Welcomepage onComplete={() => setShowWelcome(false)} />
      ) : (
        <div className="bg-gray-100 min-h-screen">
          <Navbar />
          {/* Your main content will go here */}
          <ChatWithChandan/>
          <PopName/>
        </div>
      )}
    </>
  );
}
