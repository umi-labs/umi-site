"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BackgroundGradientAnimationProps {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(108, 0, 162)",
  gradientBackgroundEnd = "rgb(0, 17, 82)",
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  fourthColor = "200, 50, 50",
  fifthColor = "180, 180, 50",
  pointerColor = "140, 100, 255",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: BackgroundGradientAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth) * 100;
      const y = (clientY / innerHeight) * 100;
      
      container.style.setProperty("--mouse-x", `${x}%`);
      container.style.setProperty("--mouse-y", `${y}%`);
    };

    if (interactive) {
      document.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (interactive) {
        document.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full w-full overflow-hidden",
        containerClassName
      )}
      style={{
        background: `linear-gradient(${gradientBackgroundStart}, ${gradientBackgroundEnd})`,
      }}
    >
      <div className={cn("absolute inset-0", className)}>
        {/* Simple static gradient overlay */}
        <div
          className="absolute h-full w-full opacity-20"
          style={{
            background: `radial-gradient(ellipse at 20% 80%, rgba(${firstColor}, 0.1) 0%, transparent 70%), radial-gradient(ellipse at 80% 20%, rgba(${secondColor}, 0.1) 0%, transparent 70%), radial-gradient(ellipse at 40% 40%, rgba(${thirdColor}, 0.1) 0%, transparent 70%)`,
          }}
        />

        {/* Interactive pointer effect */}
        {interactive && (
          <div
            className="absolute h-96 w-96 rounded-full opacity-30 blur-3xl"
            style={{
              background: `radial-gradient(circle, rgba(${pointerColor}, 0.4) 0%, transparent 70%)`,
              left: "var(--mouse-x, 50%)",
              top: "var(--mouse-y, 50%)",
              transform: "translate(-50%, -50%)",
              transition: "all 0.1s ease-out",
            }}
          />
        )}
      </div>
      
      {/* Content */}
      {children && (
        <div className="relative z-10 h-full w-full">
          {children}
        </div>
      )}
    </div>
  );
};

// Umi-specific gradient presets - Simple light backgrounds
export const UmiGradientPresets = {
  primary: {
    gradientBackgroundStart: "rgb(255, 255, 255)", // White
    gradientBackgroundEnd: "rgb(243, 245, 246)", // Umi Light Gray #F3F5F6
    firstColor: "54, 141, 177", // Umi Blue #368DB1
    secondColor: "176, 222, 230", // Umi Light Blue #B0DEE6
    thirdColor: "255, 228, 140", // Umi Yellow #FFE48C
    fourthColor: "236, 205, 127", // Umi Dark Yellow #ECCD7F
    fifthColor: "49, 62, 78", // Umi Black #313E4E
    pointerColor: "176, 222, 230", // Umi Light Blue #B0DEE6
  },
  soft: {
    gradientBackgroundStart: "rgb(255, 255, 255)", // White
    gradientBackgroundEnd: "rgb(249, 250, 251)", // Gray-50
    firstColor: "176, 222, 230", // Umi Light Blue #B0DEE6
    secondColor: "255, 228, 140", // Umi Yellow #FFE48C
    thirdColor: "236, 205, 127", // Umi Dark Yellow #ECCD7F
    fourthColor: "54, 141, 177", // Umi Blue #368DB1
    fifthColor: "197, 199, 201", // Umi Gray #C5C7C9
    pointerColor: "176, 222, 230", // Umi Light Blue #B0DEE6
  },
};
