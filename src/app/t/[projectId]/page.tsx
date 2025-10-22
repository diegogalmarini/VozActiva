import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import TestimonialForm from "./TestimonialForm";

interface PageProps {
  params: Promise<{ projectId: string }>;
}

export default async function TestimonialPage({ params }: PageProps) {
  const { projectId } = await params;

  // Obtener información del proyecto
  const { data: project, error } = await supabase
    .from("projects")
    .select("name")
    .eq("id", projectId)
    .single();

  if (error || !project) {
    notFound();
  }

  const projectData = project as { name: string };

  return (
    <TestimonialForm 
      projectId={projectId} 
      projectName={projectData.name} 
    />
  );
}