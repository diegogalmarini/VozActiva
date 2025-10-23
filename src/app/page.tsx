'use client';

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useState } from 'react';
import AuthModal from '@/components/AuthModal';
import TypewriterText from '@/components/TypewriterText';
import TechBackground from '@/components/TechBackground';

export default function Home() {
  const { userId } = useAuth();
  const [authModal, setAuthModal] = useState<'sign-in' | 'sign-up' | null>(null);

  return (
    <div className="relative overflow-hidden flex-1 flex flex-col min-h-0">
      {/* Fondo tecnológico animado */}
      <TechBackground />

  <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 scale-[0.86]">
        <div className="text-center">
          <h1 className="text-8xl font-bold mb-1 text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.4)] [text-shadow:_0_0_60px_rgb(255_255_255_/_50%),_0_0_30px_rgb(59_130_246_/_40%),_0_2px_4px_rgb(0_0_0_/_30%)]">
            VozActiva
          </h1>
          <TypewriterText />
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center my-3">
            {userId ? (
              <Link href="/dashboard" className="va-btn va-btn-primary text-base px-8 py-3">
                Ir al Dashboard
              </Link>
            ) : (
              <>
                <button 
                  onClick={() => setAuthModal('sign-up')}
                  className="va-btn va-btn-primary text-base px-8 py-3"
                >
                  Comenzar gratis
                </button>
                <button 
                  onClick={() => setAuthModal('sign-in')}
                  className="va-btn va-btn-outline text-base px-8 py-3"
                >
                  Iniciar sesión
                </button>
              </>
            )}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-4 mb-0">
            <div className="group relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-2xl border border-white/30 p-4 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_8px_48px_0_rgba(59,130,246,0.4)] transition-all duration-500 hover:scale-[1.03] overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:rounded-3xl after:bg-gradient-to-br after:from-blue-500/10 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-[0_8px_20px_rgba(59,130,246,0.5)] group-hover:shadow-[0_12px_28px_rgba(59,130,246,0.6)] transition-all duration-500 group-hover:scale-110">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-1 text-white">Recolecta Fácilmente</h3>
                <p className="text-gray-300 text-xs leading-relaxed">Comparte un enlace simple con tus clientes para que dejen sus testimonios</p>
              </div>
            </div>
            <div className="group relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-2xl border border-white/30 p-4 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_8px_48px_0_rgba(236,72,153,0.4)] transition-all duration-500 hover:scale-[1.03] overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:rounded-3xl after:bg-gradient-to-br after:from-pink-500/10 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500">
              <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-[0_8px_20px_rgba(236,72,153,0.5)] group-hover:shadow-[0_12px_28px_rgba(236,72,153,0.6)] transition-all duration-500 group-hover:scale-110">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-1 text-white">Mejora con IA</h3>
                <p className="text-gray-300 text-xs leading-relaxed">Utiliza inteligencia artificial para mejorar y pulir los testimonios</p>
              </div>
            </div>
            <div className="group relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-2xl border border-white/30 p-4 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_8px_48px_0_rgba(20,184,166,0.4)] transition-all duration-500 hover:scale-[1.03] overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:rounded-3xl after:bg-gradient-to-br after:from-teal-500/10 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500">
              <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-[0_8px_20px_rgba(20,184,166,0.5)] group-hover:shadow-[0_12px_28px_rgba(20,184,166,0.6)] transition-all duration-500 group-hover:scale-110">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-1 text-white">Embebe en tu Web</h3>
                <p className="text-gray-300 text-xs leading-relaxed">Muestra los testimonios directamente en tu sitio web con nuestro widget</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de autenticación */}
      <AuthModal 
        isOpen={authModal !== null}
        onClose={() => setAuthModal(null)}
        mode={authModal || 'sign-in'}
        onModeChange={(mode) => setAuthModal(mode)}
      />
    </div>
  );
}
