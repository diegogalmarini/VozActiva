'use client';

import { useEffect, useMemo, useState } from 'react';
import { useUser } from '@clerk/nextjs';

// Plantillas de mensajes con placeholders: {clientName}, {projectName}, {senderName}, {senderEmail}, {link}
const templates = {
  default:
    '¡Hola {clientName}! Ha sido un placer trabajar contigo en {projectName}. Si tienes un minuto, ¿podrías dejarme tu opinión en el siguiente enlace? ¡Muchas gracias!\n\n{link}',
  formal:
    'Estimado/a {clientName},\n\nEspero que se encuentre bien. Agradecería enormemente si pudiera compartir su experiencia sobre nuestro trabajo conjunto en {projectName} a través del siguiente enlace. Su feedback es muy valioso.\n\n{link}\n\nAtentamente,\n{senderName} ({senderEmail})',
  short:
    'Hola {clientName}, ¿me dejas tu opinión aquí? {link}',
};

type TemplateKey = keyof typeof templates | 'custom';

function fillTemplate(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? '');
}

// El componente recibe el enlace único del testimonio y el nombre del proyecto
export default function RequestForm({
  testimonialLink,
  projectName,
}: {
  testimonialLink: string;
  projectName: string;
}) {
  const { user } = useUser();

  // Datos del cliente
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  // Datos del remitente (prefill desde Clerk)
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');

  // Mensaje
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('default');
  const [subject, setSubject] = useState(`Tu opinión sobre nuestro trabajo en ${projectName}`);
  const [customBody, setCustomBody] = useState(
    'Hola {clientName}, ¿podrías compartir tu experiencia sobre {projectName}? {link}'
  );

  useEffect(() => {
    if (user) {
      const name = user.fullName || [user.firstName, user.lastName].filter(Boolean).join(' ');
      const email = user.primaryEmailAddress?.emailAddress ?? '';
      if (name) setSenderName(name);
      if (email) setSenderEmail(email);
    }
  }, [user]);

  const baseBody = selectedTemplate === 'custom' ? customBody : templates[selectedTemplate];

  const finalBody = useMemo(
    () =>
      fillTemplate(baseBody, {
        clientName,
        projectName,
        senderName,
        senderEmail,
        link: testimonialLink,
      }),
    [baseBody, clientName, projectName, senderName, senderEmail, testimonialLink]
  );

  const mailtoHref = useMemo(() => {
    if (!clientEmail) return '#';
    return `mailto:${clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(finalBody)}`;
  }, [clientEmail, subject, finalBody]);

  const gmailHref = useMemo(() => {
    if (!clientEmail) return '#';
    const base = 'https://mail.google.com/mail/?view=cm&fs=1';
    const params = `&to=${encodeURIComponent(clientEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(finalBody)}`;
    return `${base}${params}`;
  }, [clientEmail, subject, finalBody]);

  const whatsappHref = useMemo(() => {
    const text = encodeURIComponent(finalBody);
    // normalizar número (solo dígitos) si fue ingresado
    const phone = clientPhone.replace(/\D/g, '');
    if (phone.length > 0) {
      return `https://wa.me/${phone}?text=${text}`;
    }
    return `https://wa.me/?text=${text}`;
  }, [clientPhone, finalBody]);

  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(finalBody);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // noop
    }
  };

  const copyLinkToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(testimonialLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 1500);
    } catch {
      // noop
    }
  };

  const ready = clientEmail.trim().length > 3 && subject.trim().length > 0;
  const charCount = finalBody.length;
  const whatsappLimit = 4096;
  const nearLimit = charCount > whatsappLimit * 0.8;

  const inputBase = 'va-input';

  return (
    <section className="w-full max-w-3xl relative bg-white/10 backdrop-blur-2xl border border-white/30 rounded-3xl p-6 mt-8 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
      <h2 className="text-xl font-semibold mb-5 text-white">Solicitar Testimonio por Email</h2>

      {/* Datos del cliente */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="va-label">Nombre del cliente</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className={inputBase}
            placeholder="Ej: Carlos Pérez"
            autoComplete="name"
          />
        </div>
        <div>
          <label className="va-label">Email del cliente</label>
          <input
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className={inputBase}
            placeholder="cliente@ejemplo.com"
            autoComplete="email"
            required
          />
        </div>
        <div>
          <label className="va-label">WhatsApp del cliente (opcional)</label>
          <input
            type="tel"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            className={inputBase}
            placeholder="Ej: 5491122334455"
            autoComplete="tel"
          />
        </div>
      </div>

      {/* Datos del remitente */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="va-label">Tu nombre (remitente)</label>
          <input
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className={inputBase}
            placeholder="Tu nombre"
            autoComplete="name"
          />
        </div>
        <div>
          <label className="va-label">Tu email (remitente)</label>
          <input
            type="email"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            className={inputBase}
            placeholder="tu@email.com"
            autoComplete="email"
          />
        </div>
      </div>

      {/* Mensaje */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="va-label">Asunto</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={inputBase}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="va-label">Plantilla</label>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value as TemplateKey)}
              className="va-select"
            >
              <option value="default">Tono Amistoso</option>
              <option value="formal">Tono Formal</option>
              <option value="short">Corto</option>
              <option value="custom">Personalizada</option>
            </select>
          </div>
          <div>
            <label className="va-label">Marcadores disponibles</label>
            <div className="text-sm text-white/80 border border-white/20 rounded-md p-2 bg-white/5">
              {'{clientName} {projectName} {senderName} {senderEmail} {link}'}
            </div>
          </div>
        </div>

        {selectedTemplate === 'custom' && (
          <div>
            <label className="va-label">Cuerpo (personalizado)</label>
            <textarea
              value={customBody}
              onChange={(e) => setCustomBody(e.target.value)}
              className={`va-textarea`}
            />
          </div>
        )}
      </div>

      {/* Vista previa */}
      <div className="bg-white/5 border border-white/20 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-white">Vista previa</h3>
          <div className="flex items-center gap-2">
            <span className={`text-xs ${nearLimit ? 'text-orange-400 font-medium' : 'text-white/60'}`}>
              {charCount} / {whatsappLimit} caracteres
            </span>
            <button
              type="button"
              onClick={copyLinkToClipboard}
              className="text-xs va-btn va-btn-outline py-1 px-2"
              title="Copiar solo el enlace del testimonio"
            >
              {copiedLink ? '✓ Enlace copiado' : '🔗 Copiar enlace'}
            </button>
          </div>
        </div>
        <pre className="whitespace-pre-wrap text-sm text-white">{finalBody}</pre>
        {nearLimit && (
          <p className="text-xs text-orange-400 mt-2">
            ⚠️ El mensaje es muy largo para WhatsApp. Considera acortarlo.
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-3">
        <a
          href={mailtoHref}
          onClick={(e) => {
            if (!ready) e.preventDefault();
          }}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!ready}
          className={`va-btn va-btn-primary ${!ready ? 'opacity-60 cursor-not-allowed' : ''}`}
          title={!ready ? 'Ingresa al menos el email del cliente y el asunto' : 'Abrir email en tu app predeterminada'}
        >
          Abrir y Enviar Email
        </a>
        <a
          href={gmailHref}
          onClick={(e) => {
            if (!ready) e.preventDefault();
          }}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!ready}
          className={`va-btn va-btn-outline ${!ready ? 'opacity-60 cursor-not-allowed' : ''}`}
          title={!ready ? 'Ingresa al menos el email del cliente y el asunto' : 'Abrir redacción en Gmail'}
        >
          Abrir en Gmail
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="va-btn va-btn-dark"
          title="Abrir WhatsApp con el mensaje listo"
        >
          Enviar por WhatsApp
        </a>
        <button
          type="button"
          onClick={copyToClipboard}
          className="va-btn va-btn-outline"
        >
          {copied ? 'Copiado ✓' : 'Copiar mensaje'}
        </button>
      </div>

      <p className="text-xs text-white/60 mt-3">
        Puedes enviar por Email, Gmail o WhatsApp. Para WhatsApp, si no ingresas número usaremos WhatsApp Web para que elijas el contacto.
      </p>
    </section>
  );
}
