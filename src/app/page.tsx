import AbstractGoldSquares from "./AbstractGoldSquares";
import React from "react";

function Sparkle({ style }: { style: React.CSSProperties }) {
  // SVG de estrela simples dourada
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={style} xmlns="http://www.w3.org/2000/svg">
      <polygon points="9,1 11,7 17,7 12,11 14,17 9,13.5 4,17 6,11 1,7 7,7" fill="#FFD700"/>
    </svg>
  );
}

function SparkleRain() {
  // Quantidade de brilhos
  const sparkles = Array.from({ length: 24 });
  return (
    <div style={{
      pointerEvents: 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 5,
      overflow: 'hidden',
    }}>
      {sparkles.map((_, i) => {
        // Randomização de posição, delay e duração
        const left = Math.random() * 100;
        const size = 12 + Math.random() * 12;
        const duration = 3.5 + Math.random() * 2.5;
        const delay = Math.random() * 3;
        const opacity = 0.7 + Math.random() * 0.3;
        return (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: `${left}vw`,
              top: '-8vh',
              width: size,
              height: size,
              opacity,
              animation: `sparkle-fall ${duration}s linear ${delay}s infinite`,
              filter: 'drop-shadow(0 0 6px #FFD70088)',
            }}
          >
            <Sparkle style={{ width: size, height: size }} />
          </span>
        );
      })}
      <style>{`
        @keyframes sparkle-fall {
          0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(105vh) scale(0.85) rotate(30deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SparkleRain />
      <main className="bg-[#e90082] w-screen h-screen flex flex-col items-center py-5 overflow-hidden justify-between fixed ">
        <AbstractGoldSquares />
        <div className="p-[2px] rounded-md bg-gradient-to-r from-[#FFD700] via-[#FFC300] to-[#FFB300] shadow-md">
          <button className="font-alata bg-[#e90082] text-[#FFD700] px-4 py-2 rounded-md font-dm-serif-display font-semibold w-full h-full">
            Confirmar presença
          </button>
        </div>
      </main>
    </>
  );
}
