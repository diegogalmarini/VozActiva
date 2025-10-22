"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./CopyButton";

interface Props {
  embedSrc: string;
}

export default function IntegrateWidget({ embedSrc }: Props) {
  const [height, setHeight] = useState(400);
  const [width, setWidth] = useState("100%" as string);
  const [title, setTitle] = useState("Opiniones de clientes");
  const [showTitle, setShowTitle] = useState(true);
  const [bg, setBg] = useState("white");
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [minStars, setMinStars] = useState(0);

  const iframeCode = useMemo(() => {
    const params = new URLSearchParams();
    if (minStars > 0) params.set('minRating', minStars.toString());
    if (theme === 'dark') params.set('theme', 'dark');
    if (!showTitle) params.set('hideTitle', 'true');
    const query = params.toString();
    const src = query ? `${embedSrc}?${query}` : embedSrc;
    return `<iframe src="${src}" width="${width}" height="${height}" style="border:0; border-radius:12px; background:${bg}" title="${title}"></iframe>`;
  }, [embedSrc, height, width, title, bg, minStars, theme, showTitle]);

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 p-4 bg-gray-50">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Ajustes rápidos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Alto (px)</label>
            <input
              type="number"
              min={200}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value) || 400)}
              className="w-full px-2 py-1 border rounded"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Ancho</label>
            <input
              type="text"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full px-2 py-1 border rounded"
              placeholder="100% o 800px"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Tema</label>
            <select value={theme} onChange={(e) => setTheme(e.target.value as 'light' | 'dark')} className="w-full px-2 py-1 border rounded">
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Fondo iframe</label>
            <select value={bg} onChange={(e) => setBg(e.target.value)} className="w-full px-2 py-1 border rounded">
              <option value="white">Blanco</option>
              <option value="#f8fafc">Gris claro</option>
              <option value="transparent">Transparente</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Filtro estrellas</label>
            <select value={minStars} onChange={(e) => setMinStars(parseInt(e.target.value, 10))} className="w-full px-2 py-1 border rounded">
              <option value={0}>Todas</option>
              <option value={3}>3+</option>
              <option value={4}>4+</option>
              <option value={5}>Solo 5</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Título</label>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={showTitle}
                onChange={(e) => setShowTitle(e.target.checked)}
                className="w-4 h-4"
              />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 px-2 py-1 border rounded text-xs"
                disabled={!showTitle}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Vista previa del widget</h3>
        <div className="rounded-2xl border border-gray-200 p-4 bg-white shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900">{showTitle ? title : 'Widget sin título'}</h4>
            <span className="text-xs text-gray-500">Iframe Preview</span>
          </div>
          <div className="rounded-xl overflow-hidden border border-gray-100">
            <iframe 
              src={(() => {
                const params = new URLSearchParams();
                if (minStars > 0) params.set('minRating', minStars.toString());
                if (theme === 'dark') params.set('theme', 'dark');
                if (!showTitle) params.set('hideTitle', 'true');
                const query = params.toString();
                return query ? `${embedSrc}?${query}` : embedSrc;
              })()}
              style={{ width, height: height + "px", border: 0, background: bg }} 
              title={title} 
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Código HTML para tu web</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <code className="text-xs break-all block">{iframeCode}</code>
          <CopyButton text={iframeCode} label="Copiar Código" className="mt-3 bg-gray-900" />
        </div>
        <p className="text-xs text-gray-500 mt-2">Pega este código donde quieras mostrar el widget de opiniones.</p>
      </div>
    </div>
  );
}
