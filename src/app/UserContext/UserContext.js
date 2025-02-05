"use client";
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [username, setUsername] = useState(() => {
    // Only run this on client side
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userName') || 'Guest';
    }
    return 'Guest';
  });

  const updateUsername = (newUsername) => {
    localStorage.setItem('userName', newUsername);
    setUsername(newUsername);
  };

  return (
    <UserContext.Provider value={{ username, updateUsername }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
