import React, { useState, useEffect, useCallback } from 'react';
import { gameConfig } from '../config/gameConfig';
import { Target } from './Target';
import { GameHUD } from './GameHUD';
import { GameOverlay } from './GameOverlay';
import { CustomCursor } from './CustomCursor';

interface TargetState {
  id: number;
  x: number;
  y: number;
  scale: number;
  imageIndex: number;
}

export function Game() {
  const [score, setScore] = useState(0);
  const [targets, setTargets] = useState<TargetState[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(gameConfig.gameSettings.duration);

  const spawnTarget = useCallback(() => {
    const newTarget: TargetState = {
      id: Math.random(),
      x: Math.random() * (window.innerWidth - 50),
      y: Math.random() * (window.innerHeight - 50),
      scale: 1 + Math.random(),
      imageIndex: Math.floor(Math.random() * gameConfig.targets.length)
    };
    setTargets(prev => [...prev, newTarget]);
  }, []);

  const hitTarget = (targetId: number) => {
    setScore(prev => prev + gameConfig.gameSettings.scorePerHit);
    setTargets(prev => prev.filter(t => t.id !== targetId));
  };

  useEffect(() => {
    if (!gameStarted) return;

    const spawnInterval = setInterval(spawnTarget, gameConfig.gameSettings.spawnInterval);
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameStarted(false);
          clearInterval(spawnInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(timer);
    };
  }, [gameStarted, spawnTarget]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(gameConfig.gameSettings.duration);
    setTargets([]);
    setGameStarted(true);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 to-red-100 overflow-hidden cursor-none">
      <div className="absolute top-0 left-0 right-0 text-center py-4 bg-white/80 backdrop-blur-sm">
        <h1 className="text-4xl font-bold text-pink-600 animate-pulse">
          🍆 Tabasse Klaris 🍆
        </h1>
      </div>
      
      <CustomCursor />
      <GameHUD score={score} timeLeft={timeLeft} />
      
      {targets.map(target => (
        <Target
          key={target.id}
          id={target.id}
          x={target.x}
          y={target.y}
          scale={target.scale}
          imageUrl={gameConfig.targets[target.imageIndex].url}
          onClick={() => hitTarget(target.id)}
        />
      ))}

      <GameOverlay 
        isGameOver={!gameStarted} 
        score={score} 
        onStart={startGame} 
      />
    </div>
  );
}