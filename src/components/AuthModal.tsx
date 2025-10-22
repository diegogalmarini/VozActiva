'use client';

import { SignIn, SignUp } from '@clerk/nextjs';
import { useEffect } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'sign-in' | 'sign-up';
}

export default function AuthModal({ isOpen, onClose, mode }: AuthModalProps) {
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
      className="glass-modal-backdrop"
      onClick={onClose}
    >
      <div 
        className="glass-modal flex flex-col items-stretch"
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative', padding: 0 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors rounded-full bg-white/70 backdrop-blur p-1 shadow-md z-20"
          aria-label="Cerrar modal"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex-1 px-8 pb-8 pt-8 overflow-y-auto hide-scrollbar" style={{ maxHeight: '75vh' }}>
          {mode === 'sign-in' ? (
            <SignIn 
              appearance={{
                elements: {
                  formButtonPrimary: 'va-btn va-btn-primary w-full',
                  formButtonReset: 'va-btn va-btn-outline w-full',
                  formFieldInput: 'va-input',
                  card: 'shadow-none border-0 bg-transparent',
                  headerTitle: 'va-h2 mb-4',
                  headerSubtitle: 'text-gray-600 mb-6',
                  socialButtonsBlockButton: 'va-btn va-btn-primary w-full flex items-center justify-center gap-2 text-base mb-3',
                  socialButtonsBlockButton__google: 'va-btn va-btn-primary w-full flex items-center justify-center gap-2 text-base mb-3',
                  socialButtonsBlockButton__apple: 'va-btn va-btn-outline w-full flex items-center justify-center gap-2 text-base mb-3',
                }
              }}
              routing="hash"
            />
          ) : (
            <SignUp 
              appearance={{
                elements: {
                  formButtonPrimary: 'va-btn va-btn-primary w-full',
                  formButtonReset: 'va-btn va-btn-outline w-full',
                  formFieldInput: 'va-input',
                  card: 'shadow-none border-0 bg-transparent',
                  headerTitle: 'va-h2 mb-4',
                  headerSubtitle: 'text-gray-600 mb-6',
                  socialButtonsBlockButton: 'va-btn va-btn-primary w-full flex items-center justify-center gap-2 text-base mb-3',
                  socialButtonsBlockButton__google: 'va-btn va-btn-primary w-full flex items-center justify-center gap-2 text-base mb-3',
                  socialButtonsBlockButton__apple: 'va-btn va-btn-outline w-full flex items-center justify-center gap-2 text-base mb-3',
                }
              }}
              routing="hash"
            />
          )}
        </div>
      </div>
    </div>
  );
}
