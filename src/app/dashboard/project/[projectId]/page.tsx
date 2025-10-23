import { auth } from "@clerk/nextjs/server";
import { createClient } from '@supabase/supabase-js';
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { CopyButton } from "./CopyButton";
import RequestForm from "@/components/RequestForm";
import Tabs from "./Tabs";
import TestimonialsList from "./TestimonialsList";
import IntegrateWidget from "./IntegrateWidget";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import TechBackground from "@/components/TechBackground";

// Cliente Supabase sin tipos estrictos para evitar errores temporalmente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface PageProps {
  params: Promise<{ projectId: string }>;
}

async function updateTestimonialStatus(formData: FormData) {
  "use server";
  
  const testimonialId = formData.get("testimonialId") as string;
  const status = formData.get("status") as string;
  const projectId = formData.get("projectId") as string;
  
  const { error } = await supabase
    .from("testimonials")
    .update({ status })
    .eq("id", testimonialId);
    
  if (error) {
    console.error("Error updating testimonial:", error);
  } else {
    // Revalidar la página para mostrar los cambios
    const { revalidatePath } = await import("next/cache");
    revalidatePath(`/dashboard/project/${projectId}`);
  }
}

export default async function ProjectDashboard({ params }: PageProps) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  const { projectId } = await params;

  // Verificar que el proyecto existe
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (projectError || !project) {
    notFound();
  }

  const projectData = project as { id: string; name: string; user_id: string; created_at: string };

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
  const embedSrc = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/embed/${projectId}`;

  return (
    <div className="min-h-screen relative overflow-hidden py-[30px]">
      {/* Fondo tecnológico animado */}
      <TechBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-[30px] flex justify-between items-center">
          <div>
            <Link href="/dashboard" className="text-cyan-300 hover:text-cyan-200 text-sm mb-2 inline-flex items-center gap-1 font-medium hover:gap-2 transition-all">
              ← Volver al Dashboard
            </Link>
            <h1 className="text-4xl font-bold text-white mt-2">{projectData.name}</h1>
            <p className="mt-2 text-gray-300">
              Gestiona los testimonios de tu proyecto
            </p>
          </div>
          <UserButton />
        </div>
        {/* Pestañas */}
        <div className="mb-[30px]">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/30 rounded-2xl p-4 mb-4 flex items-center justify-between shadow-lg">
            <div>
              <h3 className="text-sm font-medium text-white">Enlace público</h3>
              <code className="text-sm break-all text-gray-200">{publicUrl}</code>
            </div>
            <CopyButton text={publicUrl} label="Copiar Enlace" className="bg-emerald-600 hover:bg-emerald-700" />
          </div>

          <Tabs
            tabs={[
              {
                id: "inicio",
                label: "Inicio",
                content: (
                  <div>
                    <TestimonialsList
                      testimonials={(testimonials as Array<{
                        id: string;
                        content: string;
                        author_name: string | null;
                        author_email: string | null;
                        rating: number | null;
                        status: 'pending' | 'approved' | 'rejected';
                        created_at: string;
                      }>) || []}
                      projectId={projectId}
                      updateAction={updateTestimonialStatus}
                    />
                  </div>
                ),
              },
              {
                id: "solicitar",
                label: "Solicitar testimonios",
                content: <RequestForm testimonialLink={publicUrl} projectName={projectData.name} />,
              },
              {
                id: "integrar",
                label: "Integrar en tu web",
                content: <IntegrateWidget embedSrc={embedSrc} />,
              },
              {
                id: "ajustes",
                label: "Ajustes",
                content: (
                  <div className="text-sm text-gray-400">Próximamente: configuración de proyecto.</div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}