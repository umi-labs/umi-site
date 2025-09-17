"use client";

import React from "react";
import { BackgroundGradientAnimation, UmiGradientPresets } from "./background-gradient-animation";
import { cn } from "@/lib/utils";

interface GradientShowcaseProps {
  className?: string;
}

export const GradientShowcase = ({ className }: GradientShowcaseProps) => {
  const presets = [
    { name: "Primary", preset: UmiGradientPresets.primary, description: "Umi brand colors" },
    { name: "Soft", preset: UmiGradientPresets.soft, description: "Soft gradient theme" },
  ];

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-8 p-8", className)}>
      {presets.map(({ name, preset, description }, index) => (
        <div key={name} className="relative h-64 rounded-2xl overflow-hidden shadow-2xl">
          <BackgroundGradientAnimation
            {...preset}
            size="100%"
            blendingValue="soft-light"
            interactive={true}
            className="opacity-80"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-2xl font-bold mb-2">{name}</h3>
                <p className="text-sm opacity-90">{description}</p>
              </div>
            </div>
          </BackgroundGradientAnimation>
        </div>
      ))}
    </div>
  );
};

// Usage examples for different sections
export const GradientExamples = {
  // For hero sections
  hero: {
    ...UmiGradientPresets.primary,
    size: "100%",
    blendingValue: "soft-light",
    interactive: true,
    className: "opacity-60",
  },
  
  // For content sections
  content: {
    ...UmiGradientPresets.primary,
    size: "60%",
    blendingValue: "soft-light",
    interactive: false,
    className: "opacity-20",
  },
  
  // For cards or smaller elements
  card: {
    ...UmiGradientPresets.soft,
    size: "80%",
    blendingValue: "hard-light",
    interactive: true,
    className: "opacity-40",
  },
  
  // For call-to-action sections
  cta: {
    ...UmiGradientPresets.primary,
    size: "100%",
    blendingValue: "multiply",
    interactive: true,
    className: "opacity-70",
  },
};
