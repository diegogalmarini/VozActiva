import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { text } = await request.json().catch(() => ({ text: undefined }));

  if (!text || typeof text !== "string") {
    return NextResponse.json(
      { error: "Text is required" },
      { status: 400 }
    );
  }

  const prompt = `Eres un experto en comunicación y copywriting. Tu tarea es tomar el siguiente testimonio de un cliente y mejorarlo. No inventes información, solo pule el texto existente para que sea más claro, conciso y potente. Corrige cualquier error gramatical u ortográfico. Mantén el tono original del autor. Devuelve únicamente el texto mejorado, sin añadir introducciones ni despedidas.

Texto a mejorar:
---
${text}
---`;

  // 1) Intentar con Gemini si hay API key
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    try {
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const improvedText = response.text();
      if (improvedText && improvedText.trim().length > 0) {
        return NextResponse.json({ improvedText });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      const isRateLimit = msg.includes('RATE_LIMIT_EXCEEDED') || msg.includes('429');
      // Si no es límite o preferimos fallback, seguimos con OpenRouter
      if (!process.env.OPENROUTER_API_KEY && isRateLimit) {
        return NextResponse.json(
          { error: "Límite de API alcanzado temporalmente. Por favor intenta en unos minutos o configura OPENROUTER_API_KEY para usar un fallback." },
          { status: 429 }
        );
      }
    }
  }

  // 2) Fallback a OpenRouter si hay API key
  const orKey = process.env.OPENROUTER_API_KEY;
  if (orKey) {
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${orKey}`,
          'Content-Type': 'application/json',
          // Recomendado por OpenRouter para trazabilidad
          'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
          'X-Title': 'VozActiva',
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini',
          messages: [
            { role: 'system', content: 'Eres un experto en comunicación; devuelve solo el texto mejorado, sin saludos ni añadidos.' },
            { role: 'user', content: prompt },
          ],
          temperature: 0.3,
        }),
      });
      const data = await res.json();
      const improvedText = data?.choices?.[0]?.message?.content?.trim();
      if (typeof improvedText === 'string' && improvedText.length > 0) {
        return NextResponse.json({ improvedText });
      }
      return NextResponse.json(
        { error: 'El proveedor OpenRouter no devolvió contenido utilizable.' },
        { status: 502 }
      );
    } catch (err) {
      console.error('OpenRouter error:', err);
      return NextResponse.json(
        { error: 'Fallo al usar el proveedor OpenRouter.' },
        { status: 502 }
      );
    }
  }

  // 3) Si no hay proveedores disponibles
  return NextResponse.json(
    { error: 'No hay proveedor de IA disponible. Configura GEMINI_API_KEY u OPENROUTER_API_KEY.' },
    { status: 500 }
  );
}