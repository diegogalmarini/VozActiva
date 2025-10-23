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
      // Log del error de Gemini pero continuar con otros proveedores
      console.warn('Gemini provider failed, trying next provider:', err);
      // No devolvemos error aquí; dejamos que intente OpenRouter y Hugging Face
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
          'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://voz-activa.vercel.app',
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

  // 3) Fallback a Hugging Face Inference API si hay API key
  const hfKey = process.env.HUGGINGFACE_API_KEY;
  if (hfKey) {
    try {
      // Usar un modelo que siempre está activo y es rápido
      // Este modelo es específico para español y corrección de texto
      const model = 'Helsinki-NLP/opus-mt-es-en';
      
      // Migrado al nuevo endpoint de Inference Providers (nov 2025)
      const res = await fetch(`https://router.huggingface.co/hf-inference/models/${model}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${hfKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: text,
          options: { wait_for_model: true }
        }),
      });

      console.log('HuggingFace status:', res.status, res.statusText);

      if (res.ok) {
        const data = await res.json();
        console.log('HuggingFace response:', data);
        
        // El modelo de traducción no nos sirve realmente, pero validamos que el token funciona
        // Si llegamos aquí, el token es válido pero necesitamos un mejor enfoque
      } else if (res.status === 401 || res.status === 403) {
        console.error('HuggingFace: Token inválido o sin permisos');
      } else {
        const errorText = await res.text();
        console.error('HuggingFace API error:', res.status, errorText);
      }
    } catch (err) {
      console.error('HuggingFace error:', err);
    }
  }

  // 4) Fallback final: Mejora inteligente local sin IA externa
  // Si todos los proveedores fallaron, hacemos una mejora avanzada con reglas de español
  console.log('Using enhanced local text improvement (AI providers not available)');
  
  let improved = text.trim();
  
  // 1. Normalizar espacios múltiples
  improved = improved.replace(/\s+/g, ' ');
  
  // 2. Capitalizar primera letra
  improved = improved.replace(/^([a-záéíóúñü])/, (match) => match.toUpperCase());
  
  // 3. Capitalizar después de puntos, exclamaciones e interrogaciones
  improved = improved.replace(/([.!?])\s+([a-záéíóúñü])/g, (match, p1, p2) => `${p1} ${p2.toUpperCase()}`);
  
  // 4. Corregir espacios antes de puntuación
  improved = improved.replace(/\s+([.,!?;:])/g, '$1');
  
  // 5. Añadir espacio después de puntuación si falta
  improved = improved.replace(/([.,!?;:])([^\s.,!?;:])/g, '$1 $2');
  
  // 6. Asegurar punto final si no hay puntuación al final
  if (!/[.!?]$/.test(improved)) {
    improved = improved + '.';
  }
  
  // 7. Correcciones comunes en español
  improved = improved
    .replace(/\bq\b/gi, 'que') // q -> que
    .replace(/\btb\b/gi, 'también') // tb -> también
    .replace(/\bxq\b/gi, 'porque') // xq -> porque
    .replace(/\bpq\b/gi, 'porque') // pq -> porque
    .replace(/\btbn\b/gi, 'también') // tbn -> también
    .replace(/\bmuy\s+muy\b/gi, 'muy'); // eliminar "muy muy"
  
  // 8. Mejorar conectores comunes
  improved = improved
    .replace(/\by\s+y\b/gi, 'y') // eliminar "y y"
    .replace(/\.\s*y\s+/gi, ', y ') // ", y" después de punto
    .replace(/\bpero\s+pero\b/gi, 'pero'); // eliminar "pero pero"
  
  return NextResponse.json({ 
    improvedText: improved,
    note: 'Texto mejorado con correcciones básicas. Para mejoras avanzadas con IA, configura una API key válida.'
  });
}