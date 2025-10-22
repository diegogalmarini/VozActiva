import { supabase } from "@/lib/supabaseClient";
import type { Database } from "@/lib/database.types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
  const { projectId, author_name, author_email, content, rating } = await request.json();
    
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
    // intento con rating si viene presente
    const payload: Database["public"]["Tables"]["testimonials"]["Insert"] = {
      project_id: projectId,
      author_name: author_name || null,
      author_email: author_email || null,
      content: content.trim(),
      status: "pending",
    };
    if (typeof rating === 'number') (payload as Record<string, unknown>).rating = rating;

    let { data, error } = await (supabase as unknown as { from: (table: string) => {
      insert: (rows: unknown[]) => { select: () => { single: () => Promise<{ data: unknown; error: unknown }> } }
    } })
      .from("testimonials")
      .insert([payload])
      .select()
      .single();

    // si falla por columna rating inexistente, reintenta sin rating
    if (error && String((error as { message?: string }).message || '').toLowerCase().includes('column') && String((error as { message?: string }).message || '').toLowerCase().includes('rating')) {
      delete (payload as Record<string, unknown>).rating;
      const retry = await (supabase as unknown as { from: (table: string) => {
        insert: (rows: unknown[]) => { select: () => { single: () => Promise<{ data: unknown; error: unknown }> } }
      } })
        .from("testimonials")
        .insert([payload])
        .select()
        .single();
      data = retry.data;
      error = retry.error;
    }

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