"use client";

import { useEffect, useState, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageLightboxProps {
  images: string[];
  startIndex: number;
  open: boolean;
  onClose: () => void;
  onIndexChange?: (i: number) => void;
  alt?: string;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

/**
 * Lightbox a pantalla completa con zoom.
 * El padre debe forzar el remount con `key` al abrir/cambiar imagen inicial,
 * así el estado interno (index, zoom, offset) se reinicia correctamente.
 */
export function ImageLightbox({
  images,
  startIndex,
  open,
  onClose,
  onIndexChange,
  alt = "Imagen",
}: ImageLightboxProps) {
  // El index vive acá para sincronizar navegación con el Quick View (onIndexChange).
  // El zoom vive en el hijo ZoomableImage (con key por imagen) para resetearse solo.
  const [index, setIndex] = useState(startIndex);

  if (!open) return null;

  const goTo = (i: number) => {
    setIndex(i);
    onIndexChange?.(i);
  };
  const goNext = () => goTo((index + 1) % images.length);
  const goPrev = () => goTo((index - 1 + images.length) % images.length);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/95 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Vista ampliada de imagen"
    >
      {/* Cerrar */}
      <button
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Contador */}
      {images.length > 1 && (
        <span className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white backdrop-blur">
          {index + 1} / {images.length}
        </span>
      )}

      {/* Imagen con zoom (se resetea al cambiar de index gracias a la key) */}
      <ZoomableImage
        key={index}
        src={images[index]}
        alt={`${alt} - foto ${index + 1}`}
      />

      {/* Flechas de navegación */}
      {images.length > 1 && (
        <>
          <button
            onClick={goPrev}
            aria-label="Imagen anterior"
            className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-20"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <button
            onClick={goNext}
            aria-label="Imagen siguiente"
            className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-20"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </>
      )}

      {/* Atajos de teclado */}
      <KeyboardHandler onPrev={goPrev} onNext={goNext} onClose={onClose} />

      {/* Miniaturas abajo */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex max-w-[90vw] -translate-x-1/2 gap-2 overflow-x-auto rounded-2xl bg-zinc-950/60 p-2 backdrop-blur scrollbar-thin">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => goTo(i)}
              aria-label={`Ver foto ${i + 1}`}
              className={cn(
                "relative h-14 w-14 flex-none overflow-hidden rounded-lg border-2 transition-all",
                index === i
                  ? "border-primary ring-2 ring-primary/40"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <img
                src={img}
                alt={`Miniatura ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Maneja los atajos de teclado (Escape, flechas). */
function KeyboardHandler({
  onPrev,
  onNext,
  onClose,
}: {
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onPrev, onNext, onClose]);
  return null;
}

/** Imagen con zoom por rueda, botones y arrastre. Su estado se resetea con `key`. */
function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const offsetStart = useRef({ x: 0, y: 0 });

  const zoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)));
  const zoomOut = () =>
    setZoom((z) => {
      const nz = Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2));
      if (nz === 1) setOffset({ x: 0, y: 0 });
      return nz;
    });
  const resetZoom = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
    setZoom((z) => {
      const nz = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, +(z + delta).toFixed(2)));
      if (nz === 1) setOffset({ x: 0, y: 0 });
      return nz;
    });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    offsetStart.current = { ...offset };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setOffset({
      x: offsetStart.current.x + (e.clientX - dragStart.current.x),
      y: offsetStart.current.y + (e.clientY - dragStart.current.y),
    });
  };
  const endDrag = () => setDragging(false);

  const onDoubleClick = () => {
    if (zoom > 1) resetZoom();
    else zoomIn();
  };

  return (
    <>
      {/* Controles de zoom (desktop) */}
      <div className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-2 sm:flex">
        <button
          onClick={zoomIn}
          disabled={zoom >= MAX_ZOOM}
          aria-label="Acercar"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ZoomIn className="h-5 w-5" />
        </button>
        <span className="rounded-full bg-white/10 py-1 text-center text-xs font-medium text-white backdrop-blur">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={zoomOut}
          disabled={zoom <= MIN_ZOOM}
          aria-label="Alejar"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ZoomIn className="h-5 w-5 -scale-x-100" />
        </button>
        <button
          onClick={resetZoom}
          disabled={zoom === 1}
          aria-label="Restablecer zoom"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>

      {/* Contenedor de la imagen (zoom + drag) */}
      <div
        className="relative flex h-full w-full items-center justify-center overflow-hidden"
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
      >
        <img
          src={src}
          alt={alt}
          className={cn(
            "max-h-[90vh] max-w-[92vw] select-none object-contain transition-transform duration-150 ease-out",
            zoom > 1 ? "cursor-grab" : "cursor-zoom-in",
            dragging && "cursor-grabbing"
          )}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
          }}
          onDoubleClick={onDoubleClick}
          draggable={false}
        />

        {/* Hint de zoom */}
        {zoom === 1 && (
          <span className="pointer-events-none absolute bottom-24 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/90 backdrop-blur sm:bottom-20">
            Hacé clic o usá la rueda para acercar · doble clic para reiniciar
          </span>
        )}
      </div>
    </>
  );
}
