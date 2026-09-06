const RainEffect = () => {
  const drops = Array.from({ length: 60 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(-10vh);
              opacity: 0.8;
            }
            100% {
              transform: translateY(110vh);
              opacity: 0.3;
            }
          }
        `}
      </style>
      {drops.map((_, i) => {
        const left = Math.random() * 100;
        const duration = 0.6 + Math.random() * 0.8;
        const delay = Math.random() * 2;
        const height = 15 + Math.random() * 20;

        return (
          <span
            key={i}
            className="absolute top-0 w-[1.5px] bg-white/40 rounded-full"
            style={{
              left: `${left}%`,
              height: `${height}px`,
              animation: `fall ${duration}s linear ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
};

export default RainEffect;