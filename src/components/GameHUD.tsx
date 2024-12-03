import React from 'react';

interface GameHUDProps {
  score: number;
  timeLeft: number;
}

export function GameHUD({ score, timeLeft }: GameHUDProps) {
  return (
    <div className="fixed top-20 left-4 right-4 flex justify-between items-center p-4 bg-white/80 rounded-lg backdrop-blur-sm">
      <div className="text-2xl font-bold text-pink-600">Score: {score}</div>
      <div className="text-2xl font-bold text-pink-600">Time: {timeLeft}s</div>
    </div>
  );
}