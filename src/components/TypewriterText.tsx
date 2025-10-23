'use client';

import { useState, useEffect } from 'react';

const phrases = [
  "Recolecta y gestiona testimonios de tus clientes de forma sencilla.",
  "Aumenta la confianza en tu negocio con testimonios reales.",
  "Convierte opiniones en ventas con testimonios auténticos.",
  "Construye credibilidad mostrando las voces de tus clientes.",
  "Testimonios que impulsan tu crecimiento y reputación.",
  "Cada testimonio cuenta una historia de éxito.",
  "Transforma experiencias en prueba social poderosa.",
  "Deja que tus clientes hablen por ti.",
  "La mejor publicidad viene de clientes satisfechos.",
  "Testimonios reales para un impacto real en tu negocio.",
  "Automatiza la recolección de opiniones positivas.",
  "Gestiona y muestra testimonios en minutos, no en horas.",
  "Mejora tus testimonios con inteligencia artificial.",
  "Integra testimonios en tu web con un solo clic.",
  "Más testimonios, más confianza, más clientes.",
  "Comparte tu éxito a través de las palabras de tus clientes.",
  "Solicita testimonios por WhatsApp, email o enlace directo.",
  "Filtra y muestra solo los mejores testimonios.",
  "Tu reputación online comienza con testimonios auténticos.",
  "Convierte a tus clientes en embajadores de marca."
];

export default function TypewriterText() {
  const [displayText, setDisplayText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Escribiendo
        if (charIndex < currentPhrase.length) {
          setDisplayText(currentPhrase.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          // Termino de escribir, esperar antes de borrar
          setTimeout(() => setIsDeleting(true), 3000);
        }
      } else {
        // Borrando
        if (charIndex > 0) {
          setDisplayText(currentPhrase.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          // Termino de borrar, cambiar a nueva frase aleatoria
          setIsDeleting(false);
          let newIndex;
          do {
            newIndex = Math.floor(Math.random() * phrases.length);
          } while (newIndex === currentPhraseIndex && phrases.length > 1);
          setCurrentPhraseIndex(newIndex);
        }
      }
    }, isDeleting ? 15 : 50); // Borrar mucho más rápido que escribir

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentPhraseIndex]);

  return (
    <div className="min-h-[60px] flex items-center justify-center">
      <p className="text-xl text-white/90 max-w-3xl mx-auto">
        {displayText}
        <span className="animate-pulse text-cyan-400">|</span>
      </p>
    </div>
  );
}
