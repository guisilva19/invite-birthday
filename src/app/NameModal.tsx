import React, { useState } from 'react';

interface NameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  isLoading: boolean;
}

export default function NameModal({ isOpen, onClose, onSubmit, isLoading }: NameModalProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md animate-bounce-in relative overflow-hidden shadow-2xl">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD700] via-[#FFC300] to-[#FFB300]"></div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-[#FFD700] to-[#FFB300] rounded-full opacity-20"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-tr from-[#FFD700] to-[#FFB300] rounded-full opacity-20"></div>
        
        <div className="text-center mb-8 relative z-10">
          <h2 className="font-alata text-2xl font-bold text-[#e90082] mb-2">
            Confirmar Presença
          </h2>
          <p className="font-alata text-gray-600 text-sm">
            Digite seu nome para confirmar sua presença
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label htmlFor="name" className="block font-alata text-sm font-medium text-gray-700 mb-3">
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] transition-all duration-200 font-alata text-gray-800 placeholder-gray-400"
              placeholder="Digite seu nome"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-alata font-medium disabled:opacity-50 hover:scale-105"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading || !name.trim()}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#e90082] to-[#ff1493] text-white rounded-lg hover:from-[#d10072] hover:to-[#e01383] transition-all duration-200 font-alata font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  <span className="font-alata">Salvando...</span>
                </div>
              ) : (
                <span className="font-alata">Confirmar</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 