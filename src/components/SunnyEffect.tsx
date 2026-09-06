const SunnyEffect = () => {
  const rays = Array.from({ length: 12 });
  const shimmer = Array.from({ length: 20 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>
        {`
          @keyframes ray-pulse {
            0%, 100% { opacity: 0.15; transform: scaleY(1); }
            50% { opacity: 0.35; transform: scaleY(1.15); }
          }
          @keyframes sun-glow {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 0.9; transform: scale(1.1); }
          }
          @keyframes heat-rise {
            0% { transform: translateY(0) scaleX(1); opacity: 0; }
            20% { opacity: 0.5; }
            80% { opacity: 0.3; }
            100% { transform: translateY(-90vh) scaleX(1.4); opacity: 0; }
          }
        `}
      </style>

      {/* Sun with rotating rays */}
      <div className="absolute top-8 right-8">
        <div
          className="w-16 h-16 rounded-full bg-yellow-300"
          style={{ animation: "sun-glow 2s ease-in-out infinite" }}
        />
        <div
          className="absolute -top-2 -right-2 w-16 h-16 rounded-full bg-orange-400/40 blur-xl"
          style={{ animation: "sun-glow 2s ease-in-out infinite" }}
        />
        {rays.map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-1 h-6 bg-yellow-200/50 origin-bottom rounded-full"
            style={{
              transform: `rotate(${i * 30}deg) translateY(-40px)`,
              animation: `ray-pulse ${1.5 + (i % 3) * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Heat shimmer waves rising from bottom */}
      {shimmer.map((_, i) => {
        const left = Math.random() * 100;
        const duration = 3 + Math.random() * 2;
        const delay = Math.random() * 4;
        const width = 40 + Math.random() * 60;

        return (
          <div
            key={i}
            className="absolute bottom-0 rounded-full bg-orange-200/20 blur-md"
            style={{
              left: `${left}%`,
              width: `${width}px`,
              height: "3px",
              animation: `heat-rise ${duration}s ease-out ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
};

export default SunnyEffect;