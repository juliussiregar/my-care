// app/TransitionLayout.tsx
"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; 
import Loading from './loading'; 

const TransitionLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [direction, setDirection] = useState("slide-in");

  useEffect(() => {
    // Trigger loading state on pathname change
    const handleStart = () => {
      setIsLoading(true);
      setDirection("slide-out");
    };

    const handleComplete = () => {
      setIsLoading(false);
      setDirection("slide-in");
    };

    handleStart();

    // Simulate the loading complete after a short delay
    const timer = setTimeout(handleComplete, 500); // Match duration to your CSS animation

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {isLoading && <Loading />} {/* Show loading component */}
      <div className={`transition-container ${direction}`}>
        {!isLoading ? children : null} {/* Prevent rendering children during loading */}
      </div>
    </>
  );
};

export default TransitionLayout;
