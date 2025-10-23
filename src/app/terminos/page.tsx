export const metadata = {
  title: "Términos de servicio | VozActiva",
  description: "Términos de servicio de VozActiva, el micro‑SaaS para recolectar testimonios.",
};

import CloseModalButton from "@/components/CloseModalButton";
import TechBackground from "@/components/TechBackground";

export default function TermsPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fondo tecnológico animado */}
      <TechBackground />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="relative bg-white/10 backdrop-blur-2xl p-8 rounded-2xl border border-white/30 shadow-xl text-white">
          <CloseModalButton href="/" />
          <h1 className="text-3xl font-bold text-white mb-4">
            Términos de servicio
          </h1>
          <p className="text-gray-300 mb-8">Última actualización: 23 de octubre de 2025</p>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Aceptación</h2>
            <p>
              Al crear una cuenta o utilizar VozActiva aceptas estos Términos de servicio y nuestra Política de privacidad.
              Si usas VozActiva en nombre de una organización, confirmas que tienes autoridad para aceptarlos.
            </p>

            <h2 className="text-xl font-semibold">El servicio</h2>
            <p>
              VozActiva permite recolectar, moderar, mejorar con IA y mostrar testimonios. No garantizamos disponibilidad
              ininterrumpida ni ausencia total de errores, pero trabajamos para mantener un nivel de servicio adecuado.
            </p>

            <h2 className="text-xl font-semibold">Tu cuenta y seguridad</h2>
            <ul className="list-disc list-inside text-white/90 space-y-1">
              <li>Eres responsable de la actividad realizada desde tu cuenta.</li>
              <li>Debes proteger tus credenciales y notificarnos ante uso no autorizado.</li>
              <li>Podemos suspender cuentas que vulneren estos Términos o la ley.</li>
            </ul>

            <h2 className="text-xl font-semibold">Contenido</h2>
            <ul className="list-disc list-inside text-white/90 space-y-1">
              <li>Sigues siendo propietario del contenido que subas.</li>
              <li>Nos concedes una licencia limitada para almacenarlo, mostrarlo y procesarlo a fin de operar el servicio.</li>
              <li>Prohibido subir spam, contenido ilícito, difamatorio, o que infrinja derechos de terceros.</li>
            </ul>

            <h2 className="text-xl font-semibold">Uso de IA</h2>
            <p>
              Si utilizas “Mejorar con IA”, procesaremos el texto con proveedores externos (Gemini y/o OpenRouter) bajo
              sus políticas. No garantizamos resultados ni exactitud; revisa siempre los textos antes de publicarlos.
            </p>

            <h2 className="text-xl font-semibold">Planes, pagos y cancelaciones</h2>
            <p>
              VozActiva puede ofrecer planes gratuitos y de pago. Los importes pueden cambiar previa notificación. Puedes
              cancelar en cualquier momento; no hay reembolsos parciales salvo disposición legal aplicable.
            </p>

            <h2 className="text-xl font-semibold">Limitación de responsabilidad</h2>
            <p>
              En la medida permitida por la ley, VozActiva no será responsable por pérdidas indirectas, pérdida de datos u
              otros daños emergentes derivados del uso del servicio.
            </p>

            <h2 className="text-xl font-semibold">Terminación</h2>
            <p>
              Puedes dejar de usar el servicio en cualquier momento. Podemos terminar o suspender el acceso por incumplimiento
              de estos Términos o por razones de seguridad.
            </p>

            <h2 className="text-xl font-semibold">Cambios</h2>
            <p>
              Podemos actualizar estos Términos ocasionalmente. Publicaremos la versión vigente y la fecha de última actualización.
            </p>

            <h2 className="text-xl font-semibold">Contacto</h2>
            <p>
              Escríbenos a <a href="mailto:contacto@vozactiva.app" className="underline">contacto@vozactiva.app</a> para dudas o comentarios.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
