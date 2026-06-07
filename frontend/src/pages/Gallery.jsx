import { Link } from "react-router-dom";
import { useState } from "react";
import { X } from "lucide-react";

// 31 real NikoVision job photos, served from /public/gallery/
const GALLERY = Array.from({ length: 31 }, (_, i) => ({
  src: `/gallery/gallery-${String(i + 1).padStart(2, "0")}.jpeg`,
  alt: `NikoVision uPVC installation ${i + 1}`,
}));

// Varied bento spans — repeats over the set to produce a rhythm of large/small tiles
const SPANS = [
  "md:col-span-7 md:row-span-2 h-[280px] md:h-[560px]",
  "md:col-span-5 h-[280px] md:h-[270px]",
  "md:col-span-5 h-[280px] md:h-[270px]",
  "md:col-span-4 h-[260px] md:h-[340px]",
  "md:col-span-4 h-[260px] md:h-[340px]",
  "md:col-span-4 h-[260px] md:h-[340px]",
  "md:col-span-6 h-[280px] md:h-[400px]",
  "md:col-span-6 h-[280px] md:h-[400px]",
  "md:col-span-5 h-[280px] md:h-[360px]",
  "md:col-span-7 h-[280px] md:h-[360px]",
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div data-testid="page-gallery">
      <section className="nv-section pt-32">
        <div className="nv-container">
          <p className="nv-overline mb-6">Gallery</p>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl leading-[1.02] tracking-tight max-w-4xl">
            Recent work,
            <br />
            <span className="italic font-normal text-brand-navy">
              honestly photographed.
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-brand-inkMuted leading-relaxed">
            A selection of completed installations across Adelaide — uPVC
            windows, doors and renovations photographed on site. Click any
            image to view it full size.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="nv-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {GALLERY.map((it, idx) => (
              <figure
                key={idx}
                data-testid={`gallery-item-${idx}`}
                onClick={() => setLightbox(it)}
                className={`relative overflow-hidden group cursor-pointer bg-brand-surfaceAlt ${SPANS[idx % SPANS.length]}`}
              >
                <img
                  src={it.src}
                  alt={it.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/20 transition-colors duration-500" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          data-testid="gallery-lightbox"
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            data-testid="gallery-lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2"
          >
            <X size={28} />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-w-full max-h-full object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <section className="bg-brand-surfaceAlt py-24">
        <div className="nv-container text-center max-w-3xl mx-auto">
          <p className="nv-overline mb-5">Have a space in mind?</p>
          <h2 className="font-heading text-4xl sm:text-5xl leading-tight">
            Yours could be next.
          </h2>
          <p className="mt-6 text-brand-inkMuted leading-relaxed">
            Send through a few photos and we'll get back with options,
            timeframes and a fair quote.
          </p>
          <Link
            to="/contact"
            data-testid="gallery-cta"
            className="nv-btn-primary mt-10"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
