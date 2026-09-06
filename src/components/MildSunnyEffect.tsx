const MildSunnyEffect = () => {
  const particles = Array.from({ length: 25 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>
        {`
          @keyframes soft-glow {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 0.75; transform: scale(1.06); }
          }
          @keyframes float-particle {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            15% { opacity: 0.7; }
            85% { opacity: 0.7; }
            100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
          }
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
          }
        `}
      </style>

      {/* Soft sun glow, top corner */}
      <div
        className="absolute top-6 right-6 w-20 h-20 rounded-full bg-yellow-200"
        style={{ animation: "soft-glow 3s ease-in-out infinite" }}
      />
      <div
        className="absolute top-2 right-2 w-28 h-28 rounded-full bg-yellow-100/30 blur-2xl"
        style={{ animation: "soft-glow 3s ease-in-out infinite" }}
      />

      {/* Floating light particles / pollen drifting up */}
      {particles.map((_, i) => {
        const left = Math.random() * 100;
        const duration = 8 + Math.random() * 6;
        const delay = Math.random() * 8;
        const size = 2 + Math.random() * 3;

        return (
          <div
            key={i}
            className="absolute bottom-0 rounded-full bg-yellow-100"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              animation: `float-particle ${duration}s ease-in-out ${delay}s infinite, twinkle 2s ease-in-out infinite`,
              animationDelay: `${delay}s, ${Math.random() * 2}s`,
            }}
          />
        );
      })}
    </div>
  );
};

export default MildSunnyEffect;