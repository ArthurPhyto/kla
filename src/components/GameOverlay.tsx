import React from 'react';

interface GameOverlayProps {
  isGameOver: boolean;
  score: number;
  onStart: () => void;
}

export function GameOverlay({ isGameOver, score, onStart }: GameOverlayProps) {
  if (!isGameOver) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-8 rounded-xl text-center">
        <h1 className="text-3xl font-bold mb-4 text-pink-600">
          {score > 0 ? 'Game Over!' : 'Défonce la petite'}
        </h1>
        {score > 0 && (
          <p className="text-xl mb-4">Final Score: {score}</p>
        )}
        <button
          onClick={onStart}
          className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
        >
          {score > 0 ? 'Play Again' : 'Commencer la partie'}
        </button>
      </div>
    </div>
  );
}