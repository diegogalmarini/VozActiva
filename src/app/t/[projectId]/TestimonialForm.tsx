"use client";

import { useState } from "react";
import TechBackground from "@/components/TechBackground";

interface TestimonialFormProps {
  projectId: string;
  projectName: string;
}

export default function TestimonialForm({ projectId, projectName }: TestimonialFormProps) {
  const [formData, setFormData] = useState({
    author_name: "",
    author_email: "",
    content: "",
    rating: 5 as number,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleImproveText = async () => {
    if (!formData.content.trim()) return;
    
    setIsImproving(true);
    setAiError(null);
    try {
      const response = await fetch("/api/improve-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: formData.content }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Mostrar el error devuelto por la API
        setAiError(data.error || "No se pudo mejorar el texto");
      } else if (data.improvedText) {
        setFormData(prev => ({ ...prev, content: data.improvedText }));
        setAiError(null);
      } else {
        setAiError("No se recibió texto mejorado");
      }
    } catch (error) {
      console.error("Error improving text:", error);
      setAiError("Error de conexión. Verifica tu internet e intenta nuevamente.");
    } finally {
      setIsImproving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.content.trim()) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit-testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          author_name: formData.author_name,
          author_email: formData.author_email,
          content: formData.content,
          rating: formData.rating,
        }),
      });
      
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error);
    }
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
  <div className="min-h-[78vh] flex items-start justify-center pt-8 pb-6 px-4 relative">
        {/* Fondo tecnológico animado */}
        <TechBackground />

        <div className="w-full max-w-xl scale-[0.9] relative z-10">
          <div className="bg-white/10 backdrop-blur-2xl p-6 rounded-2xl border border-white/30 shadow-xl w-full text-center text-white">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">¡Gracias!</h2>
            <p className="text-white/80">
              Tu testimonio ha sido enviado correctamente. Lo revisaremos pronto.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-[78vh] flex items-start justify-center pt-8 pb-6 px-4 relative">
      {/* Fondo tecnológico animado */}
      <TechBackground />

      <div className="w-full max-w-4xl scale-[0.88] relative z-10">
        <div className="bg-white/10 backdrop-blur-2xl p-5 rounded-2xl border border-white/30 shadow-xl w-full text-white">
          <div className="text-center mb-5">
            <h1 className="text-3xl font-bold text-white mb-2">
              Deja tu testimonio para {projectName}
            </h1>
            <p className="text-white/80">
              Tu opinión es muy valiosa para nosotros. Comparte tu experiencia.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                Nombre (opcional)
              </label>
              <input
                type="text"
                id="name"
                value={formData.author_name}
                onChange={(e) => setFormData(prev => ({ ...prev, author_name: e.target.value }))}
                className="w-full px-4 py-2.5 bg-white/10 text-white placeholder-white/60 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-transparent transition-all"
                placeholder="Tu nombre"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email (opcional)
              </label>
              <input
                type="email"
                id="email"
                value={formData.author_email}
                onChange={(e) => setFormData(prev => ({ ...prev, author_email: e.target.value }))}
                className="w-full px-4 py-2.5 bg-white/10 text-white placeholder-white/60 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-transparent transition-all"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Puntuación
            </label>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const val = i + 1;
                const active = formData.rating >= val;
                return (
                  <button
                    key={val}
                    type="button"
                    aria-label={`${val} estrellas`}
                    onClick={() => setFormData(prev => ({ ...prev, rating: val }))}
                    className="p-1 transition-transform hover:scale-110"
                    title={`${val} estrellas`}
                  >
                    <svg
                      className={`w-7 h-7 transition-colors ${active ? 'text-yellow-400' : 'text-white/30'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10.5 13.347a1 1 0 00-1.175 0L6.615 16.28c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label htmlFor="testimonial" className="block text-sm font-medium text-white mb-2">
              Tu Testimonio *
            </label>
            <textarea
              id="testimonial"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              rows={5}
              className="w-full px-4 py-3 bg-white/10 text-white placeholder-white/60 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-transparent resize-none transition-all"
              placeholder="Comparte tu experiencia..."
              required
            />
            
            <button
              type="button"
              onClick={handleImproveText}
              disabled={!formData.content.trim() || isImproving}
              className="mt-3 inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all"
            >
              {isImproving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Mejorando...
                </>
              ) : (
                <>
                  <span className="mr-2">✨</span>
                  Mejorar con IA
                </>
              )}
            </button>
            
            {aiError && (
              <p className="mt-2 text-sm text-red-400 bg-red-500/10 border border-red-400/30 px-3 py-2 rounded-lg">
                {aiError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!formData.content.trim() || isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3.5 px-6 rounded-xl font-medium hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Enviando...
              </div>
            ) : (
              "Enviar Testimonio"
            )}
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}