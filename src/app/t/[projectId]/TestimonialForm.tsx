"use client";

import { useState } from "react";

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

  const handleImproveText = async () => {
    if (!formData.content.trim()) return;
    
    setIsImproving(true);
    try {
      const response = await fetch("/api/improve-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: formData.content }),
      });
      
      const data = await response.json();
      if (data.improvedText) {
        setFormData(prev => ({ ...prev, content: data.improvedText }));
      }
    } catch (error) {
      console.error("Error improving text:", error);
    }
    setIsImproving(false);
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Gracias!</h2>
          <p className="text-gray-600">
            Tu testimonio ha sido enviado correctamente. Lo revisaremos pronto.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Deja tu testimonio para {projectName}
          </h1>
          <p className="text-gray-600">
            Tu opinión es muy valiosa para nosotros. Comparte tu experiencia.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre (opcional)
              </label>
              <input
                type="text"
                id="name"
                value={formData.author_name}
                onChange={(e) => setFormData(prev => ({ ...prev, author_name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tu nombre"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email (opcional)
              </label>
              <input
                type="email"
                id="email"
                value={formData.author_email}
                onChange={(e) => setFormData(prev => ({ ...prev, author_email: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Puntuación
            </label>
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => {
                const val = i + 1;
                const active = formData.rating >= val;
                return (
                  <button
                    key={val}
                    type="button"
                    aria-label={`${val} estrellas`}
                    onClick={() => setFormData(prev => ({ ...prev, rating: val }))}
                    className="p-1"
                    title={`${val} estrellas`}
                  >
                    <svg
                      className={`w-6 h-6 ${active ? 'text-yellow-500' : 'text-gray-300'}`}
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
            <label htmlFor="testimonial" className="block text-sm font-medium text-gray-700 mb-2">
              Tu Testimonio *
            </label>
            <textarea
              id="testimonial"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Comparte tu experiencia..."
              required
            />
            
            <button
              type="button"
              onClick={handleImproveText}
              disabled={!formData.content.trim() || isImproving}
              className="mt-3 inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
          </div>

          <button
            type="submit"
            disabled={!formData.content.trim() || isSubmitting}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
  );
}