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
        className="max-w-full bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
        style={{
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)',
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
                headerTitle: 'text-2xl font-bold text-gray-900',
                headerSubtitle: 'text-gray-600 mt-2',
                socialButtonsBlockButton: 'bg-white/50 backdrop-blur-sm border border-white/60 hover:bg-white/70 text-gray-700 font-medium transition-all duration-300 rounded-xl shadow-lg',
                socialButtonsBlockButton__google: 'bg-white/50 backdrop-blur-sm hover:bg-white/70',
                formButtonPrimary: 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300',
                formFieldInput: 'bg-white/50 backdrop-blur-sm border-white/60 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl transition-all duration-300',
                identityPreviewText: 'text-gray-700',
                identityPreviewEditButton: 'text-indigo-600 hover:text-indigo-700',
                formFieldLabel: 'text-gray-700 font-medium',
                dividerLine: 'bg-gradient-to-r from-transparent via-gray-300 to-transparent',
                dividerText: 'text-gray-500',
                footer: 'bg-white/30 backdrop-blur-sm rounded-b-3xl',
                footerActionLink: 'text-indigo-600 hover:text-indigo-700 font-medium',
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
                headerTitle: 'text-2xl font-bold text-gray-900',
                headerSubtitle: 'text-gray-600 mt-2',
                socialButtonsBlockButton: 'bg-white/50 backdrop-blur-sm border border-white/60 hover:bg-white/70 text-gray-700 font-medium transition-all duration-300 rounded-xl shadow-lg',
                socialButtonsBlockButton__google: 'bg-white/50 backdrop-blur-sm hover:bg-white/70',
                formButtonPrimary: 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300',
                formFieldInput: 'bg-white/50 backdrop-blur-sm border-white/60 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl transition-all duration-300',
                identityPreviewText: 'text-gray-700',
                identityPreviewEditButton: 'text-indigo-600 hover:text-indigo-700',
                formFieldLabel: 'text-gray-700 font-medium',
                dividerLine: 'bg-gradient-to-r from-transparent via-gray-300 to-transparent',
                dividerText: 'text-gray-500',
                footer: 'bg-white/30 backdrop-blur-sm rounded-b-3xl',
                footerActionLink: 'text-indigo-600 hover:text-indigo-700 font-medium',
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
