import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ projectId: string }>;
}

async function updateTestimonialStatus(formData: FormData) {
  "use server";
  
  const testimonialId = formData.get("testimonialId") as string;
  const status = formData.get("status") as string;
  
  const { error } = await supabase
    .from("testimonials")
    .update({ status })
    .eq("id", testimonialId);
    
  if (error) {
    console.error("Error updating testimonial:", error);
  }
}

export default async function ProjectDashboard({ params }: PageProps) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  const { projectId } = await params;

  // Verificar que el proyecto pertenece al usuario
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .eq("user_id", userId)
    .single();

  if (projectError || !project) {
    notFound();
  }

  // Obtener testimonios del proyecto
  const { data: testimonials, error: testimonialsError } = await supabase
    .from("testimonials")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (testimonialsError) {
    console.error("Error fetching testimonials:", testimonialsError);
  }

  const publicUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/t/${projectId}`;
  const embedCode = `<iframe src="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/embed/${projectId}" width="100%" height="600px" frameborder="0"></iframe>`;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
          <p className="mt-2 text-gray-600">
            Gestiona los testimonios de tu proyecto
          </p>
        </div>

        {/* Enlaces y código para embeber */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-3">Enlace Público</h3>
            <p className="text-sm text-gray-600 mb-3">
              Comparte este enlace con tus clientes para que dejen testimonios:
            </p>
            <div className="bg-gray-100 p-3 rounded border">
              <code className="text-sm break-all">{publicUrl}</code>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(publicUrl)}
              className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              Copiar Enlace
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-3">Código para Embeber</h3>
            <p className="text-sm text-gray-600 mb-3">
              Usa este código para mostrar testimonios en tu web:
            </p>
            <div className="bg-gray-100 p-3 rounded border">
              <code className="text-xs break-all">{embedCode}</code>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(embedCode)}
              className="mt-3 px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
            >
              Copiar Código
            </button>
          </div>
        </div>

        {/* Lista de testimonios */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">Testimonios</h2>
          </div>
          
          {testimonials && testimonials.length > 0 ? (
            <div className="divide-y">
              {testimonials.map((testimonial) => (
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
                        <form action={updateTestimonialStatus}>
                          <input type="hidden" name="testimonialId" value={testimonial.id} />
                          <input type="hidden" name="status" value="approved" />
                          <button
                            type="submit"
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                          >
                            Aprobar
                          </button>
                        </form>
                        <form action={updateTestimonialStatus}>
                          <input type="hidden" name="testimonialId" value={testimonial.id} />
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
                No hay testimonios aún. Comparte el enlace público para empezar a recibir testimonios.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}