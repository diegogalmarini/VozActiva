"use client";

import { useMemo, useState } from "react";

type Testimonial = {
  id: string;
  author_name: string | null;
  author_email: string | null;
  content: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  // rating may not exist in DB yet; keep optional
  rating?: number | null;
};

interface Props {
  testimonials: Testimonial[];
  projectId: string;
  updateAction: (formData: FormData) => Promise<void>;
}

export default function TestimonialsList({ testimonials, projectId, updateAction }: Props) {
  const [stars, setStars] = useState<number | "all">("all");

  const filtered = useMemo(() => {
    if (stars === "all") return testimonials;
    return testimonials.filter((t) => (t.rating ?? 0) === stars);
  }, [stars, testimonials]);

  const Star = ({ filled }: { filled: boolean }) => (
    <svg className={`w-4 h-4 ${filled ? "text-yellow-500" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10.5 13.347a1 1 0 00-1.175 0L6.615 16.28c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
    </svg>
  );

  return (
    <div>
      {/* Filtro por estrellas */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-gray-600">Filtrar por estrellas:</span>
        <select
          value={stars}
          onChange={(e) => setStars(e.target.value === "all" ? "all" : Number(e.target.value))}
          className="px-2 py-1 border rounded-md text-sm"
        >
          <option value="all">Todas</option>
          <option value={5}>5 ★</option>
          <option value={4}>4 ★</option>
          <option value={3}>3 ★</option>
          <option value={2}>2 ★</option>
          <option value={1}>1 ★</option>
        </select>
      </div>

      {filtered.length > 0 ? (
        <div className="divide-y">
          {filtered.map((testimonial) => (
            <div key={testimonial.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">
                      {testimonial.author_name || "Anónimo"}
                    </h4>
                    {testimonial.author_email && (
                      <span className="text-sm text-gray-600">
                        ({testimonial.author_email})
                      </span>
                    )}
                    
                    {/* Mostrar estrellas ANTES del badge de estado */}
                    {testimonial.rating && testimonial.rating > 0 && (
                      <div className="flex items-center gap-0.5" aria-label={`${testimonial.rating} estrellas`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} filled={i < testimonial.rating!} />
                        ))}
                      </div>
                    )}
                    
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        testimonial.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : testimonial.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {testimonial.status === "approved"
                        ? "Aprobado"
                        : testimonial.status === "rejected"
                        ? "Rechazado"
                        : "Pendiente"}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-3">{testimonial.content}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(testimonial.created_at).toLocaleDateString()}
                  </p>
                </div>

                {testimonial.status === "pending" && (
                  <div className="flex gap-2 ml-4">
                    <form action={updateAction}>
                      <input type="hidden" name="testimonialId" value={testimonial.id} />
                      <input type="hidden" name="projectId" value={projectId} />
                      <input type="hidden" name="status" value="approved" />
                      <button
                        type="submit"
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                      >
                        Aprobar
                      </button>
                    </form>
                    <form action={updateAction}>
                      <input type="hidden" name="testimonialId" value={testimonial.id} />
                      <input type="hidden" name="projectId" value={projectId} />
                      <input type="hidden" name="status" value="rejected" />
                      <button
                        type="submit"
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                      >
                        Rechazar
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center">
          <p className="text-gray-500">
            No hay testimonios con ese filtro.
          </p>
        </div>
      )}
    </div>
  );
}
