'use client';

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useState } from 'react';
import AuthModal from '@/components/AuthModal';
import TypewriterText from '@/components/TypewriterText';

export default function Home() {
  const { userId } = useAuth();
  const [authModal, setAuthModal] = useState<'sign-in' | 'sign-up' | null>(null);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fondo animado con gradientes */}
      <div className="fixed inset-0 -z-10">
        {/* Gradiente base */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"></div>
        
        {/* Orbes animados pasteles con movimiento amplio */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-300/40 rounded-full mix-blend-normal filter blur-3xl animate-blob-wide"></div>
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-yellow-300/40 rounded-full mix-blend-normal filter blur-3xl animate-blob-wide animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-[550px] h-[550px] bg-pink-300/40 rounded-full mix-blend-normal filter blur-3xl animate-blob-wide animation-delay-4000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-[480px] h-[480px] bg-blue-300/40 rounded-full mix-blend-normal filter blur-3xl animate-blob-wide animation-delay-6000"></div>
        <div className="absolute top-1/2 left-1/2 w-[420px] h-[420px] bg-indigo-300/35 rounded-full mix-blend-normal filter blur-3xl animate-blob-wide animation-delay-3000"></div>
        
        {/* Capa de vidrio sutil */}
        <div className="absolute inset-0 bg-white/20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center">
          <h1 className="va-h1 mb-8">
            <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              VozActiva
            </span>
          </h1>
          <TypewriterText />
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center my-[30px]">
            {userId ? (
              <Link href="/dashboard" className="va-btn va-btn-primary text-lg px-10 py-4">
                Ir al Dashboard
              </Link>
            ) : (
              <>
                <button 
                  onClick={() => setAuthModal('sign-up')}
                  className="va-btn va-btn-primary text-lg px-10 py-4"
                >
                  Comenzar gratis
                </button>
                <button 
                  onClick={() => setAuthModal('sign-in')}
                  className="va-btn va-btn-outline text-lg px-10 py-4"
                >
                  Iniciar sesión
                </button>
              </>
            )}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-10 mb-16">
            <div className="va-card p-10">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="va-h3 mb-3">Recolecta Fácilmente</h3>
              <p className="text-gray-600">Comparte un enlace simple con tus clientes para que dejen sus testimonios</p>
            </div>
            <div className="va-card p-10">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="va-h3 mb-3">Mejora con IA</h3>
              <p className="text-gray-600">Utiliza inteligencia artificial para mejorar y pulir los testimonios</p>
            </div>
            <div className="va-card p-10">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="va-h3 mb-3">Embebe en tu Web</h3>
              <p className="text-gray-600">Muestra los testimonios directamente en tu sitio web con nuestro widget</p>
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
