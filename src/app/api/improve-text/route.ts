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
        { error: "GEMINI_API_KEY no está configurada. Por favor configúrala en las variables de entorno." },
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
  } catch (error: unknown) {
    console.error("Error improving text:", error);
    
    // Manejo específico de error de quota
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('RATE_LIMIT_EXCEEDED') || errorMessage.includes('429')) {
      return NextResponse.json(
        { error: "Límite de API alcanzado temporalmente. Por favor intenta en unos minutos o verifica tu plan de Google AI." },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      { error: "No se pudo mejorar el texto. Intenta nuevamente más tarde." },
      { status: 500 }
    );
  }
}