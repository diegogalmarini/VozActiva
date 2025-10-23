import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import TechBackground from "@/components/TechBackground";

async function createProject(formData: FormData) {
  "use server";
  
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  
  const name = formData.get("name") as string;
  if (!name?.trim()) return;
  
  const { error } = await (supabase as unknown as { 
    from: (table: string) => { 
      insert: (rows: { user_id: string; name: string }[]) => Promise<{ error: unknown }> 
    } 
  })
    .from("projects")
    .insert([{ user_id: userId, name: name.trim() }]);
    
  if (error) {
    console.error("Error creating project:", error);
  } else {
    revalidatePath("/dashboard");
  }
}

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  // Obtener proyectos del usuario
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
  }

  return (
    <div className="min-h-screen relative overflow-hidden py-[30px]">
      {/* Fondo tecnológico animado */}
      <TechBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-[30px] flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">Mis Proyectos</h1>
            <p className="mt-2 text-gray-300">
              Gestiona tus proyectos de recolección de testimonios
            </p>
          </div>
          <UserButton />
        </div>

        {/* Formulario para crear nuevo proyecto */}
        <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-2xl p-6 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] border border-white/30 mb-[30px]">
          <h2 className="text-xl font-semibold mb-4 text-white">Crear Nuevo Proyecto</h2>
          <form action={createProject} className="flex gap-4">
            <input
              type="text"
              name="name"
              placeholder="Nombre del proyecto"
              className="flex-1 px-4 py-3 bg-white/10 text-white placeholder-white/60 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-transparent transition-all"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 shadow-lg transition-all"
            >
              Crear Proyecto
            </button>
          </form>
        </div>

        {/* Lista de proyectos */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects?.map((project: { id: string; name: string; created_at: string }) => (
            <div key={project.id} className="group relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-2xl p-6 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] border border-white/30 hover:shadow-[0_8px_48px_0_rgba(59,130,246,0.35)] transition-all duration-300 hover:scale-[1.02] overflow-hidden">
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
              <h3 className="relative z-10 text-xl font-bold mb-2 text-white">{project.name}</h3>
              <p className="relative z-10 text-gray-300 mb-4">
                Creado el {new Date(project.created_at).toLocaleDateString()}
              </p>
              <Link
                href={`/dashboard/project/${project.id}`}
                className="relative z-10 inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
              >
                Ver Proyecto
              </Link>
            </div>
          ))}
          
          {(!projects || projects.length === 0) && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400">
                No tienes proyectos aún. Crea tu primer proyecto arriba.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}