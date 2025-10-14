# VozActiva - Micro-SaaS de Testimonios

VozActiva es un Micro-SaaS para recolectar y gestionar testimonios de clientes de forma sencilla.

## 🚀 Características

- **Recolección Fácil**: Comparte un enlace simple con tus clientes para que dejen testimonios
- **Mejora con IA**: Utiliza Google Gemini para mejorar y pulir los testimonios automáticamente
- **Widget Embebible**: Muestra testimonios directamente en tu sitio web
- **Gestión Completa**: Aprueba, rechaza y organiza testimonios desde el dashboard

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15 con App Router y TypeScript
- **Estilos**: Tailwind CSS
- **Base de Datos**: Supabase (PostgreSQL)
- **Autenticación**: Clerk
- **IA**: Google Gemini
- **Hosting**: Vercel

## 📋 Prerrequisitos

Antes de comenzar, necesitas configurar:

1. **Supabase**: Crear proyecto y obtener URL + Anon Key
2. **Clerk**: Configurar aplicación de autenticación
3. **Google Gemini**: Obtener API Key
4. **Vercel**: Para deployment (opcional)

## ⚙️ Configuración

### 1. Clonar e instalar dependencias

```bash
git clone https://github.com/diegogalmarini/VozActiva.git
cd VozActiva
npm install
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
