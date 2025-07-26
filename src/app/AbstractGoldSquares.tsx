import React from "react";
import Image from "next/image";
import line from "../assets/line.svg";

export default function AbstractGoldSquares() {
  return (
    <div
      className="px-2 relative"
      style={{
        animation: 'floatY 4.5s ease-in-out infinite alternate',
        filter: 'drop-shadow(0 0 16px #FFD70088)',
        WebkitFilter: 'drop-shadow(0 0 16px #FFD70088)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <Image src={line} alt="line" className="animate-gold-glow" />
      <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&display=swap');
              @import url('https://fonts.googleapis.com/css2?family=Alata&display=swap');
              @font-face {
                font-family: 'Daydream';
                src: url('../assets/fonts/Daydream.ttf') format('truetype');
                font-weight: normal;
                font-style: normal;
              }
              @keyframes floatY {
                0% { transform: translateY(0); }
              }
              .animate-gold-glow {
                animation: goldGlow 2.2s ease-in-out infinite alternate;
              }
              @keyframes goldGlow {
                0% { filter: drop-shadow(0 0 0px #FFD70088); }
                100% { filter: drop-shadow(0 0 24px #FFD700cc); }
              }
              .font-alex-brush {
                font-family: 'Alex Brush', cursive;
              }
              .font-alata {
                font-family: 'Alata', sans-serif;
              }
              .gold-gradient-text {
                background: linear-gradient(90deg, #FFD700 0%, #FFF8DC 50%, #FFD700 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
                font-size: 80px;
              }
              .gold-gradient-old-text {
                background: linear-gradient(90deg, #FFD700 0%, #FFF8DC 50%, #FFD700 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
                font-size: 45px;
                width: 270px;
                text-align: center;
              }
              .gold-gradient-subtitle {
                background: linear-gradient(90deg, #FFD700 0%, #FFF8DC 50%, #FFD700 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
                font-size: 14px;
                text-align: center;
              }
              .gold-gradient-month {
                background: linear-gradient(90deg, #FFD700 0%, #FFF8DC 50%, #FFD700 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
                font-size: 18px;
                text-align: center;
              }
              .gold-gradient-number {
                background: linear-gradient(90deg, #FFD700 0%, #FFF8DC 50%, #FFD700 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
                font-size: 50px;
                text-align: center;
              }
            `}</style>
      <h1 className="absolute top-36 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-alex-brush text-4xl pointer-events-none select-none gold-gradient-text">
        Alícia
      </h1>
      <span className="font-alex-brush absolute top-48 left-1/2 -translate-x-1/2 -translate-y-1/2 gold-gradient-old-text">15 anos</span>
      <span className="font-alata absolute top-[260px] left-1/2 -translate-x-1/2 -translate-y-1/2 gold-gradient-subtitle text-sm">Você está convidado para celebrar esse dia especial comigo!</span>
      <DataComponent />
    </div>
  );
}


const DataComponent = () => {
  return (
    <div className="fixed top-[370px] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-yellow-400 to-yellow-400 mb-1"></div>
        <span className="font-alata gold-gradient-subtitle text-center">Sábado</span>
        <div className="w-20 h-px bg-gradient-to-l from-transparent via-yellow-400 to-yellow-400 mt-1"></div>
      </div>
      
      <div className="flex flex-col items-center">
        <span className="font-alata gold-gradient-month">SETEMBRO</span>
        <span className="font-alata gold-gradient-number font-bold leading-none">06</span>
        <span className="font-alata gold-gradient-month text-lg mt-2">2025</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-yellow-400 to-yellow-400 mb-1"></div>
        <span className="font-alata gold-gradient-subtitle text-center">Às 19:30</span>
        <div className="w-20 h-px bg-gradient-to-l from-transparent via-yellow-400 to-yellow-400 mt-1"></div>
      </div>
    </div>
  )
}