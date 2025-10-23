export const metadata = {
  title: "Política de privacidad | VozActiva",
  description: "Política de privacidad de VozActiva, el micro‑SaaS para recolectar testimonios.",
};

import CloseModalButton from "@/components/CloseModalButton";
import TechBackground from "@/components/TechBackground";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fondo tecnológico animado */}
      <TechBackground />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="relative bg-white/10 backdrop-blur-2xl p-8 rounded-2xl border border-white/30 shadow-xl text-white">
          <CloseModalButton href="/" />
          <h1 className="text-3xl font-bold text-white mb-4">
            Política de privacidad
          </h1>
          <p className="text-gray-300 mb-8">Última actualización: 23 de octubre de 2025</p>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Quiénes somos</h2>
            <p>
              VozActiva es una aplicación web para recolectar, mejorar y mostrar testimonios de clientes.
              Gestionamos cuentas mediante Clerk y almacenamos los datos en Supabase (PostgreSQL).
            </p>

            <h2 className="text-xl font-semibold">Datos que recopilamos</h2>
            <ul className="list-disc list-inside text-white/90 space-y-1">
              <li>Datos de cuenta: correo y datos básicos de tu perfil gestionados por Clerk.</li>
              <li>Datos de testimonios: nombre (opcional), email (opcional), contenido del testimonio y puntuación.</li>
              <li>Metadatos técnicos mínimos: direcciones IP y registros de actividad para seguridad y diagnóstico.</li>
            </ul>

            <h2 className="text-xl font-semibold">Cómo usamos tus datos</h2>
            <ul className="list-disc list-inside text-white/90 space-y-1">
              <li>Para operar el servicio y mostrar los testimonios recolectados.</li>
              <li>Para moderación y prevención de abusos.</li>
              <li>Para mejorar el contenido de los testimonios mediante IA, si utilizas la función “Mejorar con IA”.</li>
            </ul>

            <h2 className="text-xl font-semibold">Mejorar con IA</h2>
            <p>
              Cuando solicitas “Mejorar con IA”, enviamos el texto del testimonio a proveedores externos de IA
              para obtener una versión mejorada. El orden típico es: Google Gemini (si hay clave disponible),
              OpenRouter (p. ej., gpt‑4o‑mini) y, como alternativa open‑source, la Inference API de Hugging Face
              (p. ej., Mistral 7B Instruct). No compartimos datos personales adicionales salvo el texto que envías
              para su mejora. No empleamos tu contenido para entrenar nuestros propios modelos.
            </p>

            <h2 className="text-xl font-semibold">Base legal</h2>
            <p>
              Procesamos los datos para ejecutar el contrato del servicio (Art. 6.1.b RGPD) y, en su caso,
              por interés legítimo en mantener la seguridad y mejorar la experiencia (Art. 6.1.f RGPD).
            </p>

            <h2 className="text-xl font-semibold">Conservación</h2>
            <p>
              Conservamos los testimonios mientras el proyecto esté activo o hasta que el propietario los elimine.
              Puedes solicitar la eliminación escribiéndonos.
            </p>

            <h2 className="text-xl font-semibold">Tus derechos</h2>
            <p>
              Tienes derecho a acceder, rectificar y eliminar tus datos, así como a oponerte u obtener una copia portátil.
              Para ejercerlos, contáctanos.
            </p>

            <h2 className="text-xl font-semibold">Subencargados y transferencias</h2>
            <ul className="list-disc list-inside text-white/90 space-y-1">
              <li>Clerk (autenticación y gestión de sesiones).</li>
              <li>Supabase (alojamiento de base de datos y APIs).</li>
              <li>Google Generative AI, OpenRouter y/o Hugging Face Inference API (procesamiento opcional de texto por IA).</li>
            </ul>

            <h2 className="text-xl font-semibold">Seguridad</h2>
            <p>
              Aplicamos medidas razonables de seguridad y cifrado en tránsito (HTTPS). Aun así, ningún servicio es
              100% inmune; recomendamos no incluir datos sensibles en los testimonios.
            </p>

            <h2 className="text-xl font-semibold">Contacto</h2>
            <p>
              Si tienes preguntas sobre esta política o deseas ejercer tus derechos, contáctanos en
              <a href="mailto:contacto@vozactiva.app" className="underline"> contacto@vozactiva.app</a>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
