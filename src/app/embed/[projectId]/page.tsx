import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ projectId: string }>;
}

export default async function EmbedPage({ params }: PageProps) {
  const { projectId } = await params;

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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Lo que dicen nuestros clientes
        </h2>
        
        {testimonials && testimonials.length > 0 ? (
          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500"
              >
                <blockquote className="text-gray-700 mb-4 italic">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.author_name 
                      ? testimonial.author_name.charAt(0).toUpperCase()
                      : "A"
                    }
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">
                      {testimonial.author_name || "Cliente verificado"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(testimonial.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-gray-500">
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