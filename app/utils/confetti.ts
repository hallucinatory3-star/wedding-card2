import confetti from "canvas-confetti";

// Confetti burst function with wedding theme colors
export const fireConfetti = () => {
  const duration = 4000;
  const animationEnd = Date.now() + duration;
  const colors = ["#4a90d9", "#7fb3d5", "#9dc8e8", "#d4e8f7", "#ffd700", "#ffffff"];

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: colors,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: colors,
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };

  // Initial big burst from center
  confetti({
    particleCount: 100,
    spread: 100,
    origin: { x: 0.5, y: 0.5 },
    colors: colors,
    startVelocity: 45,
    gravity: 0.8,
    scalar: 1.2,
  });

  // Side bursts
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.6 },
      colors: colors,
    });
  }, 200);

  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.6 },
      colors: colors,
    });
  }, 400);

  // Continuous rain effect
  frame();

  // Final celebration burst
  setTimeout(() => {
    confetti({
      particleCount: 150,
      spread: 180,
      origin: { x: 0.5, y: 0.4 },
      colors: colors,
      startVelocity: 35,
      gravity: 0.6,
      scalar: 1.5,
      shapes: ["circle", "square"],
    });
  }, 2000);
};
