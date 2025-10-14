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
  
  const { error } = await supabase
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mis Proyectos</h1>
            <p className="mt-2 text-gray-600">
              Gestiona tus proyectos de recolección de testimonios
            </p>
          </div>
          <UserButton />
        </div>

        {/* Formulario para crear nuevo proyecto */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Crear Nuevo Proyecto</h2>
          <form action={createProject} className="flex gap-4">
            <input
              type="text"
              name="name"
              placeholder="Nombre del proyecto"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Crear Proyecto
            </button>
          </form>
        </div>

        {/* Lista de proyectos */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects?.map((project: any) => (
            <div key={project.id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
              <p className="text-gray-600 mb-4">
                Creado el {new Date(project.created_at).toLocaleDateString()}
              </p>
              <Link
                href={`/dashboard/project/${project.id}`}
                className="inline-block px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
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