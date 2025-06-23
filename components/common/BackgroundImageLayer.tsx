"use client";

import React from "react";

interface BackgroundImageLayerProps {
  imageUrl: string;
  opacity?: number;
  position?: string;
  repeat?: string;
  size?: string;
  className?: string;
}

const BackgroundImageLayer: React.FC<BackgroundImageLayerProps> = ({
  imageUrl,
  opacity = 0.1,
  position = "bottom",
  repeat = "no-repeat",
  size = "100%",
  className = "",
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundRepeat: repeat,
        backgroundPosition: position,
        backgroundSize: size,
        opacity,
      }}
    />
  );
};

export default BackgroundImageLayer;
