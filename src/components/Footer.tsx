import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full py-2 text-[10px] text-gray-300 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-1">
          <p className="text-center">
            © VozActiva {year} by <span className="font-medium">Diego Galmarini</span> |{" "}
            <Link href="/privacidad" className="underline hover:text-white">Política de privacidad</Link>
            <span className="mx-2 text-gray-500">·</span>
            <Link href="/terminos" className="underline hover:text-white">Términos de servicio</Link>
          </p>

          <div className="flex items-center gap-2">
            <a
              href="https://www.linkedin.com/in/diegogalmarini/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn de Diego Galmarini"
              className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all"
            >
              {/* LinkedIn */}
              <svg viewBox="0 0 24 24" className="h-3 w-3 text-cyan-400" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.038-1.852-3.038-1.853 0-2.136 1.447-2.136 2.943v5.664H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.368-1.852 3.602 0 4.266 2.371 4.266 5.455v6.288zM5.337 7.433a2.062 2.062 0 110-4.124 2.062 2.062 0 010 4.124zM7.114 20.452H3.561V9h3.553v11.452z"/>
              </svg>
            </a>
            <a
              href="https://github.com/diegogalmarini/VozActiva"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Repositorio en GitHub"
              className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all"
            >
              {/* GitHub */}
              <svg viewBox="0 0 24 24" className="h-3 w-3 text-gray-300" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 .5a11.5 11.5 0 00-3.637 22.415c.575.106.786-.249.786-.555 0-.274-.01-1-.016-1.963-3.2.695-3.876-1.544-3.876-1.544-.523-1.33-1.278-1.685-1.278-1.685-1.044-.714.079-.699.079-.699 1.154.081 1.762 1.185 1.762 1.185 1.026 1.76 2.694 1.252 3.35.958.104-.744.401-1.252.73-1.54-2.554-.291-5.238-1.277-5.238-5.683 0-1.255.45-2.282 1.185-3.086-.119-.29-.513-1.46.112-3.045 0 0 .965-.309 3.162 1.179a10.948 10.948 0 015.754 0c2.196-1.488 3.16-1.179 3.16-1.179.626 1.585.232 2.755.114 3.045.737.804 1.184 1.83 1.184 3.085 0 4.417-2.69 5.389-5.254 5.675.413.357.781 1.062.781 2.142 0 1.546-.014 2.792-.014 3.171 0 .309.207.668.793.554A11.502 11.502 0 0012 .5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
