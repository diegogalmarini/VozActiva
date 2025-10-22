# VozActiva - Micro-SaaS de Testimonios

VozActiva es un Micro-SaaS para recolectar, mejorar con IA y gestionar testimonios de clientes de forma sencilla. Permite enviar solicitudes por WhatsApp o email, y embeber testimonios en cualquier sitio web.

## 🚀 Características

### Recolección y Envío
- **Enlace único por proyecto**: Genera un link público para que tus clientes dejen testimonios
- **Envío por WhatsApp**: Comparte el enlace directamente por WhatsApp con mensaje prellenado
- **Envío por Email**: Abre Gmail o tu app de correo con plantillas personalizables
- **Copiar enlace directo**: Botón para copiar solo el link y pegarlo donde quieras

### Formulario de Testimonio
- **Sistema de puntuación**: Clientes pueden dejar de 1 a 5 estrellas
- **Mejora con IA**: Google Gemini optimiza automáticamente el texto del testimonio
- **Campos opcionales**: Nombre y email del cliente

### Dashboard y Gestión
- **Sistema de tabs**: Inicio, Solicitar testimonios, Integrar widget, Ajustes
- **Aprobación/Rechazo**: Modera testimonios antes de publicarlos
- **Vista organizada**: Filtra por estado (pendiente, aprobado, rechazado)
- **Contador de caracteres**: Para mensajes de WhatsApp (límite 4096)

### Widget Embebible
- **Personalización completa**:
  - Altura y ancho ajustables
  - Tema claro u oscuro
  - Fondo personalizable (blanco, gris, transparente)
  - Mostrar/ocultar título
  - Filtro por mínimo de estrellas (3+, 4+, solo 5)
- **Preview en vivo**: Ve cómo se verá antes de copiar el código
- **Código listo**: Iframe HTML para copiar y pegar

### Autenticación
- **Modal glassmorphism**: Efecto iOS Glass para login/registro
- **Clerk Auth**: Sign in con Google o email
- **Sin navegación**: Modal popup, no cambia de página

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15 con App Router y TypeScript
- **Estilos**: Tailwind CSS + CSS personalizado (VA design tokens)
- **Base de Datos**: Supabase (PostgreSQL)
- **Autenticación**: Clerk
- **IA**: Google Gemini API
- **Hosting**: Vercel

## 📋 Prerrequisitos

Necesitas configurar estas cuentas/servicios:

1. **Supabase**: 
   - Crea proyecto en [supabase.com](https://supabase.com)
   - Obtén URL y Anon Key
   - Ejecuta el SQL de `supabase/migrations/` para crear tablas

2. **Clerk**:
   - Crea aplicación en [clerk.com](https://clerk.com)
   - Habilita Google OAuth
   - Obtén Publishable Key y Secret Key

3. **Google Gemini**:
   - Activa Gemini API en [aistudio.google.com](https://aistudio.google.com)
   - Genera API Key

4. **Vercel** (opcional para deploy):
   - Conecta tu repo de GitHub

## ⚙️ Configuración

### 1. Clonar e instalar dependencias

```bash
git clone https://github.com/diegogalmarini/VozActiva.git
cd VozActiva
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=tu_clerk_publishable_key
CLERK_SECRET_KEY=tu_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Google Gemini
GEMINI_API_KEY=tu_gemini_api_key

# URL del sitio (para producción)
NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
```

### 3. Crear tablas en Supabase

Ejecuta estos scripts SQL en tu panel de Supabase (SQL Editor):

#### Tabla `projects`
```sql
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Tabla `testimonials`
```sql
CREATE TABLE public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  author_name TEXT,
  author_email TEXT,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Nota**: La columna `rating` es opcional. Si no la agregas, la app funcionará sin sistema de estrellas.

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📖 Uso

### 1. Crear Proyecto
1. Regístrate/Inicia sesión con Clerk
2. En Dashboard, crea un nuevo proyecto (ej: "Mi Consultoría")

### 2. Solicitar Testimonios
1. Ve a la tab "Solicitar testimonios"
2. Ingresa datos del cliente (nombre, email, WhatsApp opcional)
3. Personaliza el mensaje (plantilla amistosa, formal o corta)
4. Elige:
   - **Enviar por WhatsApp**: Abre WhatsApp con mensaje listo
   - **Abrir en Gmail**: Redacta email en Gmail
   - **Copiar enlace**: Solo copia el link para pegarlo manualmente

### 3. Cliente Deja Testimonio
1. Cliente abre el enlace
2. Completa nombre (opcional), email (opcional), y testimonio
3. Elige puntuación (1-5 estrellas)
4. (Opcional) Usa IA para mejorar el texto
5. Envía

### 4. Aprobar/Rechazar
1. En Dashboard > Inicio, ve testimonios pendientes
2. Aprueba o rechaza con un clic

### 5. Embeber Widget
1. Ve a la tab "Integrar en tu web"
2. Ajusta:
   - **Tamaño**: Alto (px) y ancho (% o px)
   - **Tema**: Claro u oscuro
   - **Filtro estrellas**: Todas, 3+, 4+, o solo 5
   - **Título**: Activar/desactivar y personalizar
3. Copia el código HTML generado
4. Pégalo en tu sitio web

#### Ejemplo de código embed:
```html
<iframe 
  src="https://tu-dominio.vercel.app/embed/abc-123?minRating=4&theme=dark&hideTitle=true" 
  width="100%" 
  height="600" 
  style="border:0; border-radius:12px; background:white" 
  title="Opiniones de clientes">
</iframe>
```

#### Parámetros del widget:
- `minRating`: Filtrar por estrellas mínimas (3, 4, 5)
- `theme`: `dark` o `light` (default: light)
- `hideTitle`: `true` para ocultar título (default: false)

## 🏗️ Estructura del Proyecto

```
VozActiva/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── improve-text/    # Endpoint IA para mejorar testimonios
│   │   │   └── submit-testimonial/ # Endpoint para guardar testimonios
│   │   ├── dashboard/
│   │   │   ├── page.tsx         # Lista de proyectos
│   │   │   └── project/[projectId]/
│   │   │       ├── page.tsx     # Dashboard del proyecto con tabs
│   │   │       ├── Tabs.tsx     # Componente de tabs
│   │   │       ├── TestimonialsList.tsx
│   │   │       ├── IntegrateWidget.tsx # Generador de embed
│   │   │       └── CopyButton.tsx
│   │   ├── embed/[projectId]/   # Vista del widget embebible
│   │   ├── t/[projectId]/       # Formulario público de testimonios
│   │   ├── sign-in/             # Página de login (Clerk)
│   │   ├── sign-up/             # Página de registro (Clerk)
│   │   ├── page.tsx             # Landing page
│   │   ├── layout.tsx           # Layout principal
│   │   └── globals.css          # Estilos globales + VA tokens
│   ├── components/
│   │   ├── AuthModal.tsx        # Modal glassmorphism para auth
│   │   └── RequestForm.tsx      # Formulario de solicitud (WhatsApp/Email)
│   ├── lib/
│   │   ├── supabaseClient.ts    # Cliente Supabase
│   │   └── database.types.ts    # Tipos generados de Supabase
│   └── utils/
│       └── supabase/server.ts   # Cliente server-side
├── supabase/
│   └── migrations/
│       └── 20251016_add_rating_to_testimonials.sql
├── .env.local                   # Variables de entorno (no commiteado)
├── package.json
└── README.md
```

## 🚀 Deploy en Vercel

### Opción 1: Deploy desde GitHub

1. Conecta tu repo en [vercel.com/new](https://vercel.com/new)
2. Configura variables de entorno:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `GEMINI_API_KEY`
   - `NEXT_PUBLIC_SITE_URL` (tu dominio de Vercel)
3. Deploy

### Opción 2: CLI de Vercel

```bash
npm i -g vercel
vercel
```

Sigue las instrucciones y añade las variables de entorno en el dashboard.

## 🛡️ Seguridad

- **RLS (Row Level Security)** en Supabase: Configura políticas para que los usuarios solo vean sus proyectos
- **Clerk Middleware**: Protege rutas de dashboard
- **Validación server-side**: Todos los inputs se validan en el backend

### Ejemplo de política RLS para `projects`:

```sql
-- Habilitar RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Política: usuarios solo ven sus proyectos
CREATE POLICY "Users can view own projects" ON public.projects
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own projects" ON public.projects
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);
```

## 📝 Próximas Mejoras

- [ ] Integración directa con WhatsApp Business API
- [ ] Webhooks para notificaciones de nuevos testimonios
- [ ] Analytics de conversión (cuántos clientes dejaron testimonio)
- [ ] Exportar testimonios a PDF/CSV
- [ ] Temas personalizados del widget (colores de marca)
- [ ] Widget con carrusel animado

## 📄 Licencia

MIT License - Ve el archivo LICENSE para más detalles.

## 🤝 Contribuciones

Pull requests son bienvenidos. Para cambios importantes, abre primero un issue para discutir qué te gustaría cambiar.

## 📧 Contacto

Diego Galmarini - [@diegogalmarini](https://linkedin.com/in/diegogalmarini)

Project Link: [https://github.com/diegogalmarini/VozActiva](https://github.com/diegogalmarini/VozActiva)
