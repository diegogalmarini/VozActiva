import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    
    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Eres un experto en comunicación y copywriting. Tu tarea es tomar el siguiente testimonio de un cliente y mejorarlo. No inventes información, solo pule el texto existente para que sea más claro, conciso y potente. Corrige cualquier error gramatical u ortográfico. Mantén el tono original del autor. Devuelve únicamente el texto mejorado, sin añadir introducciones ni despedidas.

Texto a mejorar:
---
${text}
---`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const improvedText = response.text();

    return NextResponse.json({ improvedText });
  } catch (error) {
    console.error("Error improving text:", error);
    return NextResponse.json(
      { error: "Failed to improve text" },
      { status: 500 }
    );
  }
}