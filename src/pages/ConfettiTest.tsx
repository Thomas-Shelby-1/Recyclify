import React from 'react';
// @ts-ignore
import confetti from 'canvas-confetti';

export default function ConfettiTest() {
  return (
    <div className="flex items-center justify-center h-screen">
      <button
        className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg"
        onClick={() =>
          confetti({
            particleCount: 300,
            spread: 200,
            origin: { y: 0.6 },
            zIndex: 9999
          })
        }
      >
        🎉 Fire Confetti
      </button>
    </div>
  );
}
