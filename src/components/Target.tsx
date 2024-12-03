import React from 'react';

interface TargetProps {
  id: number;
  x: number;
  y: number;
  scale: number;
  imageUrl: string;
  onClick: () => void;
}

export function Target({ x, y, scale, imageUrl, onClick }: TargetProps) {
  return (
    <div
      className="absolute transition-transform animate-bounce cursor-none"
      style={{
        left: x,
        top: y,
        transform: `scale(${scale})`,
      }}
      onClick={onClick}
    >
      <img 
        src={imageUrl} 
        alt="Target"
        className="w-16 h-16 object-cover rounded-full"
        style={{ filter: 'brightness(1.2) contrast(0.8)' }}
      />
    </div>
  );
}