export const metadata = {
  title: "Política de privacidad | VozActiva",
  description: "Política de privacidad de VozActiva, el micro‑SaaS para recolectar testimonios.",
};

import CloseModalButton from "@/components/CloseModalButton";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fondo animado suave */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-300/40 rounded-full filter blur-3xl animate-blob-wide" />
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-yellow-300/40 rounded-full filter blur-3xl animate-blob-wide animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-[550px] h-[550px] bg-pink-300/40 rounded-full filter blur-3xl animate-blob-wide animation-delay-4000" />
        <div className="absolute inset-0 bg-white/20"></div>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="relative bg-white/70 backdrop-blur-xl p-8 rounded-2xl border border-white/30 shadow-xl">
          <CloseModalButton href="/" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Política de privacidad
          </h1>
          <p className="text-gray-700 mb-8">Última actualización: 23 de octubre de 2025</p>

          <div className="prose prose-slate max-w-none">
            <h2>Quiénes somos</h2>
            <p>
              VozActiva es una aplicación web para recolectar, mejorar y mostrar testimonios de clientes.
              Gestionamos cuentas mediante Clerk y almacenamos los datos en Supabase (PostgreSQL).
            </p>

            <h2>Datos que recopilamos</h2>
            <ul>
              <li>Datos de cuenta: correo y datos básicos de tu perfil gestionados por Clerk.</li>
              <li>Datos de testimonios: nombre (opcional), email (opcional), contenido del testimonio y puntuación.</li>
              <li>Metadatos técnicos mínimos: direcciones IP y registros de actividad para seguridad y diagnóstico.</li>
            </ul>

            <h2>Cómo usamos tus datos</h2>
            <ul>
              <li>Para operar el servicio y mostrar los testimonios recolectados.</li>
              <li>Para moderación y prevención de abusos.</li>
              <li>Para mejorar el contenido de los testimonios mediante IA, si utilizas la función “Mejorar con IA”.</li>
            </ul>

            <h2>Mejorar con IA</h2>
            <p>
              Cuando solicitas “Mejorar con IA”, enviamos el texto del testimonio a proveedores externos de IA
              para obtener una versión mejorada. Por defecto usamos Google Gemini; si no está disponible, usamos
              OpenRouter (actualmente con el modelo gpt‑4o‑mini). No compartimos datos personales adicionales salvo
              el texto que envías. No empleamos el contenido para entrenar nuestros propios modelos.
            </p>

            <h2>Base legal</h2>
            <p>
              Procesamos los datos para ejecutar el contrato del servicio (Art. 6.1.b RGPD) y, en su caso,
              por interés legítimo en mantener la seguridad y mejorar la experiencia (Art. 6.1.f RGPD).
            </p>

            <h2>Conservación</h2>
            <p>
              Conservamos los testimonios mientras el proyecto esté activo o hasta que el propietario los elimine.
              Puedes solicitar la eliminación escribiéndonos.
            </p>

            <h2>Tus derechos</h2>
            <p>
              Tienes derecho a acceder, rectificar y eliminar tus datos, así como a oponerte u obtener una copia portátil.
              Para ejercerlos, contáctanos.
            </p>

            <h2>Subencargados y transferencias</h2>
            <ul>
              <li>Clerk (autenticación y gestión de sesiones).</li>
              <li>Supabase (alojamiento de base de datos y APIs).</li>
              <li>Google Generative AI y/o OpenRouter (procesamiento opcional de texto por IA).</li>
            </ul>

            <h2>Seguridad</h2>
            <p>
              Aplicamos medidas razonables de seguridad y cifrado en tránsito (HTTPS). Aun así, ningún servicio es
              100% inmune; recomendamos no incluir datos sensibles en los testimonios.
            </p>

            <h2>Contacto</h2>
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
