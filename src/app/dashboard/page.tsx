import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

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
      {/* Fondo animado con gradientes */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-blue-100 to-pink-100"></div>
        <div className="absolute top-1/5 left-1/6 w-[720px] h-[720px] bg-purple-300/60 rounded-full mix-blend-normal filter blur-3xl animate-blob-wide"></div>
  <div className="absolute top-1/3 right-1/5 w-[680px] h-[680px] bg-yellow-300/60 rounded-full mix-blend-normal filter blur-3xl animate-blob-wide animation-delay-2000"></div>
        <div className="absolute bottom-1/5 left-1/3 w-[760px] h-[760px] bg-pink-300/60 rounded-full mix-blend-normal filter blur-3xl animate-blob-wide animation-delay-4000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-[700px] h-[700px] bg-blue-300/55 rounded-full mix-blend-normal filter blur-3xl animate-blob-wide animation-delay-6000"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-indigo-300/55 rounded-full mix-blend-normal filter blur-3xl animate-blob-wide animation-delay-3000"></div>
        <div className="absolute inset-0 bg-white/10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-[30px] flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Mis Proyectos</h1>
            <p className="mt-2 text-gray-600">
              Gestiona tus proyectos de recolección de testimonios
            </p>
          </div>
          <UserButton />
        </div>

        {/* Formulario para crear nuevo proyecto */}
        <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/50 mb-[30px]">
          <h2 className="text-xl font-semibold mb-4">Crear Nuevo Proyecto</h2>
          <form action={createProject} className="flex gap-4">
            <input
              type="text"
              name="name"
              placeholder="Nombre del proyecto"
              className="flex-1 px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition-all"
            >
              Crear Proyecto
            </button>
          </form>
        </div>

        {/* Lista de proyectos */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects?.map((project: { id: string; name: string; created_at: string }) => (
            <div key={project.id} className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-xl font-bold mb-2 text-gray-900">{project.name}</h3>
              <p className="text-gray-600 mb-4">
                Creado el {new Date(project.created_at).toLocaleDateString()}
              </p>
              <Link
                href={`/dashboard/project/${project.id}`}
                className="inline-block px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-xl hover:from-gray-800 hover:to-gray-600 transition-all shadow-md"
              >
                Ver Proyecto
              </Link>
            </div>
          ))}
          
          {(!projects || projects.length === 0) && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">
                No tienes proyectos aún. Crea tu primer proyecto arriba.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}