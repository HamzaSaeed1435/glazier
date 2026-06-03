import { Link } from "react-router-dom";
import { IMAGES } from "../lib/siteData";

const items = [
  { src: IMAGES.architecturalHouse, span: "md:col-span-7 md:row-span-2 h-[640px]", caption: "Whole-home renovation  ·  Glenelg" },
  { src: IMAGES.windowFrameClose, span: "md:col-span-5 h-[310px]", caption: "Deceuninck Legend detail" },
  { src: IMAGES.architecturalDetail, span: "md:col-span-5 h-[310px]", caption: "Floor-to-ceiling fixed glazing" },
  { src: IMAGES.windowFrameDetail, span: "md:col-span-6 h-[400px]", caption: "Tilt-and-turn awning, brown frame" },
  { src: IMAGES.galleryA, span: "md:col-span-6 h-[400px]", caption: "Internal finish, master bedroom" },
  { src: IMAGES.galleryB, span: "md:col-span-4 h-[380px]", caption: "Kitchen casement window" },
  { src: IMAGES.galleryC, span: "md:col-span-4 h-[380px]", caption: "Bifold uPVC door system" },
  { src: IMAGES.galleryD, span: "md:col-span-4 h-[380px]", caption: "Living-room double-glazing" },
];

export default function Gallery() {
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
            A selection of installations across Adelaide — from single
            replacements to full home renovations. New work is added as it's
            completed.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="nv-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {items.map((it, idx) => (
              <figure
                key={idx}
                data-testid={`gallery-item-${idx}`}
                className={`relative overflow-hidden group ${it.span}`}
              >
                <img
                  src={it.src}
                  alt={it.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/70 to-transparent text-white text-xs tracking-[0.18em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {it.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

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
