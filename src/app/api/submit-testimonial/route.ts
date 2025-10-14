import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { projectId, author_name, author_email, content } = await request.json();
    
    if (!projectId || !content) {
      return NextResponse.json(
        { error: "Project ID and content are required" },
        { status: 400 }
      );
    }

    // Verificar que el proyecto existe
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("id")
      .eq("id", projectId)
      .single();

    if (projectError || !project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Insertar el testimonio
    const { data, error } = await supabase
      .from("testimonials")
      .insert([
        {
          project_id: projectId,
          author_name: author_name || null,
          author_email: author_email || null,
          content: content.trim(),
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error inserting testimonial:", error);
      return NextResponse.json(
        { error: "Failed to save testimonial" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, testimonial: data });
  } catch (error) {
    console.error("Error submitting testimonial:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}