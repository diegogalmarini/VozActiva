'use client';

import { SignIn, SignUp } from '@clerk/nextjs';
import { useEffect } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'sign-in' | 'sign-up';
  onModeChange: (mode: 'sign-in' | 'sign-up') => void;
}

export default function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;
      return (
    <div 
      className="fixed inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="max-w-full bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden text-white"
        style={{
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)',
        }}
        onClick={(e) => {
          e.stopPropagation();
          
          // Interceptar clics en enlaces del footer
          const target = e.target as HTMLElement;
          const link = target.closest('a');
          
          if (link) {
            const href = link.getAttribute('href');
            const text = link.textContent?.toLowerCase() || '';
            
            // Detectar enlaces de registro o inicio de sesión
            if (href?.includes('/sign-up') || text.includes('regístrese') || text.includes('registrarse')) {
              e.preventDefault();
              e.stopPropagation();
              onModeChange('sign-up');
            } else if (href?.includes('/sign-in') || text.includes('iniciar sesión') || text.includes('iniciar')) {
              e.preventDefault();
              e.stopPropagation();
              onModeChange('sign-in');
            }
          }
        }}
      >
        {mode === 'sign-in' ? (
          <SignIn 
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'bg-transparent shadow-none',
                headerTitle: 'text-2xl font-bold text-white',
                headerSubtitle: 'text-white/70 mt-2',
                socialButtonsBlockButton: 'bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white font-medium transition-all duration-300 rounded-xl shadow-lg',
                socialButtonsBlockButton__google: 'bg-white/10 backdrop-blur-sm hover:bg-white/20',
                formButtonPrimary: 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300',
                formFieldInput: 'bg-white/10 backdrop-blur-sm border-white/30 focus:border-emerald-400/40 focus:ring-emerald-400/40 text-white placeholder-white/60 rounded-xl transition-all duration-300',
                identityPreviewText: 'text-white/80',
                identityPreviewEditButton: 'text-cyan-300 hover:text-cyan-200',
                formFieldLabel: 'text-white font-medium',
                dividerLine: 'bg-gradient-to-r from-transparent via-white/20 to-transparent',
                dividerText: 'text-white/60',
                footer: 'bg-white/5 backdrop-blur-sm rounded-b-3xl',
                footerActionLink: 'text-cyan-300 hover:text-cyan-200 font-medium',
              },
            }}
            routing="virtual"
            signUpUrl="/"
            redirectUrl="/dashboard"
          />
        ) : (
          <SignUp 
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'bg-transparent shadow-none',
                headerTitle: 'text-2xl font-bold text-white',
                headerSubtitle: 'text-white/70 mt-2',
                socialButtonsBlockButton: 'bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white font-medium transition-all duration-300 rounded-xl shadow-lg',
                socialButtonsBlockButton__google: 'bg-white/10 backdrop-blur-sm hover:bg-white/20',
                formButtonPrimary: 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300',
                formFieldInput: 'bg-white/10 backdrop-blur-sm border-white/30 focus:border-emerald-400/40 focus:ring-emerald-400/40 text-white placeholder-white/60 rounded-xl transition-all duration-300',
                identityPreviewText: 'text-white/80',
                identityPreviewEditButton: 'text-cyan-300 hover:text-cyan-200',
                formFieldLabel: 'text-white font-medium',
                dividerLine: 'bg-gradient-to-r from-transparent via-white/20 to-transparent',
                dividerText: 'text-white/60',
                footer: 'bg-white/5 backdrop-blur-sm rounded-b-3xl',
                footerActionLink: 'text-cyan-300 hover:text-cyan-200 font-medium',
              },
            }}
            routing="virtual"
            signInUrl="/"
            redirectUrl="/dashboard"
          />
        )}
      </div>
    </div>
  );
}
