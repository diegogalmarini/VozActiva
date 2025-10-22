import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ projectId: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function EmbedPage({ params, searchParams }: PageProps) {
  const { projectId } = await params;
  const sp = (await (searchParams || Promise.resolve({}))) as Record<string, string | string[] | undefined>;
  const minRating = typeof sp.minRating === 'string' ? parseInt(sp.minRating, 10) : undefined;
  const theme = sp.theme === 'dark' ? 'dark' : 'light';
  const hideTitle = sp.hideTitle === 'true';

  // Obtener testimonios aprobados del proyecto
  const { data: testimonials, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("project_id", projectId)
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching testimonials:", error);
    notFound();
  }

  const Star = ({ filled }: { filled: boolean }) => (
    <svg className={`w-4 h-4 ${filled ? 'text-yellow-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10.5 13.347a1 1 0 00-1.175 0L6.615 16.28c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
    </svg>
  );

  const filtered = Array.isArray(testimonials)
    ? testimonials.filter((t: { rating?: number | null }) => (typeof minRating === 'number' ? (t.rating ?? 0) >= minRating : true))
    : [];

  const bgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const textClass = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const cardBgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const cardTextClass = theme === 'dark' ? 'text-gray-200' : 'text-gray-700';
  const borderClass = theme === 'dark' ? 'border-blue-400' : 'border-blue-500';

  return (
    <div className={`p-6 ${bgClass} min-h-screen`}>
      <div className="max-w-4xl mx-auto">
        {!hideTitle && (
          <h2 className={`text-2xl font-bold ${textClass} mb-6 text-center`}>
            Lo que dicen nuestros clientes
          </h2>
        )}
        
        {filtered && filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((testimonial: { 
              id: string;
              content: string;
              author_name?: string | null;
              rating?: number | null;
              created_at: string;
            }) => (
              <div
                key={testimonial.id}
                className={`${cardBgClass} p-6 rounded-lg shadow-md border-l-4 ${borderClass}`}
              >
                <blockquote className={`${cardTextClass} mb-4 italic`}>
                  &quot;{testimonial.content}&quot;
                </blockquote>
                {typeof testimonial.rating === 'number' && testimonial.rating > 0 && (
                  <div className="flex items-center gap-1 mb-2 justify-start" aria-label={`${testimonial.rating} estrellas`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} filled={i < (testimonial.rating ?? 0)} />
                    ))}
                  </div>
                )}
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.author_name 
                      ? testimonial.author_name.charAt(0).toUpperCase()
                      : "A"
                    }
                  </div>
                  <div className="ml-3">
                    <p className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                      {testimonial.author_name || "Cliente verificado"}
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {new Date(testimonial.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className={`w-16 h-16 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <svg className={`w-8 h-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
              Aún no hay testimonios disponibles.
            </p>
          </div>
        )}
        
        <div className="text-center mt-8">
          <p className="text-xs text-gray-400">
            Powered by VozActiva
          </p>
        </div>
      </div>
    </div>
  );
}