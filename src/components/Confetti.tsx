import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  size: number;
  rotation: number;
}

interface ConfettiProps {
  isActive: boolean;
  duration?: number;
}

const colors = [
  'hsl(185, 100%, 50%)', // Primary cyan
  'hsl(260, 80%, 60%)',  // Secondary purple
  'hsl(320, 100%, 60%)', // Accent pink
  'hsl(150, 100%, 45%)', // Success green
  'hsl(35, 100%, 50%)',  // Warning amber
];

export const Confetti = ({ isActive, duration = 3000 }: ConfettiProps) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (isActive) {
      const newPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5,
        rotation: Math.random() * 360,
      }));
      setPieces(newPieces);

      const timeout = setTimeout(() => {
        setPieces([]);
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [isActive, duration]);

  return (
    <AnimatePresence>
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{
            opacity: 1,
            x: `${piece.x}vw`,
            y: -20,
            rotate: piece.rotation,
          }}
          animate={{
            opacity: 0,
            y: '100vh',
            rotate: piece.rotation + 720,
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 3 + Math.random() * 2,
            ease: 'easeOut',
          }}
          className="fixed top-0 pointer-events-none z-50"
          style={{
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
          }}
        />
      ))}
    </AnimatePresence>
  );
};
