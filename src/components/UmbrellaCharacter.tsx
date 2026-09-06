const UmbrellaCharacter = () => {
  return (
    <div className="absolute bottom-4 right-4 pointer-events-none">
      <style>
        {`
          @keyframes bob {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          @keyframes wobble {
            0%, 100% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
          }
        `}
      </style>
      <div style={{ animation: "bob 2.5s ease-in-out infinite" }}>
        <svg width="70" height="90" viewBox="0 0 70 90">
          {/* Umbrella */}
          <g style={{ transformOrigin: "35px 25px", animation: "wobble 2s ease-in-out infinite" }}>
            <path
              d="M5 30 A30 30 0 0 1 65 30 Z"
              fill="#f87171"
            />
            <rect x="33" y="28" width="4" height="35" fill="#7c2d12" />
            <path d="M33 63 Q30 68 35 68" stroke="#7c2d12" strokeWidth="3" fill="none" />
          </g>
          {/* Character body */}
          <circle cx="35" cy="55" r="10" fill="#fde68a" />
          <ellipse cx="35" cy="78" rx="12" ry="14" fill="#60a5fa" />
          {/* Eyes */}
          <circle cx="32" cy="53" r="1.5" fill="#1f2937" />
          <circle cx="38" cy="53" r="1.5" fill="#1f2937" />
          {/* Smile */}
          <path d="M31 57 Q35 60 39 57" stroke="#1f2937" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
      <p className="text-white text-[10px] text-center mt-1 bg-black/30 rounded-full px-2 py-0.5">
        Rain likely soon
      </p>
    </div>
  );
};

export default UmbrellaCharacter;