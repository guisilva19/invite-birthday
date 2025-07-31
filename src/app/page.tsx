"use client";

import AbstractGoldSquares from "./AbstractGoldSquares";
import NameModal from "./NameModal";
import React, { useState, useEffect } from "react";

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
    </div>
  );
}

function EntranceParticles() {
  const particles = Array.from({ length: 15 });
  return (
    <div style={{
      pointerEvents: 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 1,
      overflow: 'hidden',
    }}>
      {particles.map((_, i) => {
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const size = 4 + Math.random() * 8;
        const delay = Math.random() * 2;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              backgroundColor: '#FFD700',
              borderRadius: '50%',
              boxShadow: '0 0 10px #FFD700, 0 0 20px #FFD700',
              animation: `particle-entrance 2s ease-out ${delay}s both`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [hasConfirmedAttendance, setHasConfirmedAttendance] = useState(false);

  // Verificar localStorage ao carregar o componente
  useEffect(() => {
    const confirmed = localStorage.getItem('birthdayAttendanceConfirmed');
    if (confirmed) {
      setHasConfirmedAttendance(true);
    }
  }, []);

  const handleConfirmClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setMessage(null);
  };

  const handleSubmitName = async (name: string) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/save-attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (response.ok) {
        // Salvar no localStorage que a presença foi confirmada
        localStorage.setItem('birthdayAttendanceConfirmed', 'true');
        setHasConfirmedAttendance(true);
        
        setMessage({ type: 'success', text: 'Presença confirmada com sucesso! 🎉' });
        setTimeout(() => {
          setIsModalOpen(false);
          setMessage(null);
        }, 2000);
      } else {
        setMessage({ type: 'error', text: data.error || 'Erro ao confirmar presença' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro de conexão. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationClick = () => {
    // Abrir localização no Google Maps
    const locationUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL;
    window.open(locationUrl, '_blank');
  };

  return (
    <>
      <EntranceParticles />
      <SparkleRain />
      <main className="animate-bg-pulse bg-[#e90082] w-screen h-screen flex flex-col items-center py-5 overflow-hidden fixed gap-4">
        <div className="animate-float-in">
          <AbstractGoldSquares hasConfirmedAttendance={hasConfirmedAttendance} />
        </div>
        
        {hasConfirmedAttendance ? (
          // Botão de localização para quem já confirmou
          <div className="animate-bounce-in p-[3px] rounded-xl bg-gradient-to-r from-[#ff6b6b] via-[#ee5a24] to-[#ff6348] shadow-lg">
            <button 
              onClick={handleLocationClick}
              className="font-alata bg-white text-[#ff6b6b] px-6 py-3 rounded-lg font-dm-serif-display font-bold w-full h-full hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 shadow-inner"
            >
              <span className="text-2xl">📍</span>
              <span>Ver Localização</span>
            </button>
          </div>
        ) : (
          // Botão de confirmar presença para quem ainda não confirmou
          <div className="animate-bounce-in p-[2px] rounded-md bg-gradient-to-r from-[#FFD700] via-[#FFC300] to-[#FFB300] shadow-md">
            <button 
              onClick={handleConfirmClick}
              className="font-alata bg-[#e90082] text-[#FFD700] px-4 py-2 rounded-md font-dm-serif-display font-semibold w-full h-full hover:scale-105 transition-transform duration-200"
            >
              Confirmar presença
            </button>
          </div>
        )}
      </main>

      <NameModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleSubmitName}
        isLoading={isLoading}
      />

      {/* Mensagem de feedback */}
      {message && (
        <div className={`fixed top-4 right-4 z-50 p-6 rounded-2xl shadow-2xl max-w-sm animate-bounce-in ${
          message.type === 'success' 
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-2 border-green-300' 
            : 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-2 border-red-300'
        }`}>
          <div className="flex items-center font-alata">
            <span className="mr-3 text-2xl">
              {message.type === 'success' ? '✨' : '❌'}
            </span>
            <span className="font-alata font-medium">{message.text}</span>
          </div>
        </div>
      )}
    </>
  );
}
