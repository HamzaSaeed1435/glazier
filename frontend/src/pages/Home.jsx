import { Link } from "react-router-dom";
import { ArrowUpRight, Wrench, Home as HomeIcon, Layers, ShieldCheck } from "lucide-react";
import { IMAGES, SERVICES, SITE } from "../lib/siteData";
import Reviews from "../components/Reviews";

const iconMap = { Wrench, Home: HomeIcon, Layers, ShieldCheck };

export default function Home() {
  return (
    <div data-testid="page-home">
      {/* HERO */}
      <section className="relative h-[92vh] min-h-[640px] -mt-20 flex items-end overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
          style={{ backgroundImage: `url(${IMAGES.heroRapidBay})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        <div className="relative z-10 nv-container pb-20 md:pb-28 text-white animate-fade-up">
          <p
            data-testid="hero-overline"
            className="nv-overline text-white/80 mb-6"
          >
            NikoVision  ·  Adelaide, South Australia
          </p>
          <h1
            data-testid="hero-title"
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.02] tracking-tight max-w-4xl"
          >
            uPVC glazing,
            <br />
            <span className="italic font-normal text-brand-sand">crafted</span>{" "}
            with care.
          </h1>
          <p
            data-testid="hero-subtitle"
            className="mt-8 max-w-xl text-base md:text-lg text-white/85 leading-relaxed"
          >
            Premium uPVC windows and doors — supplied, installed and finished
            to a standard the trade has been missing. From repairs to
            full-home renovations.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              data-testid="hero-cta-quote"
              className="nv-btn-white"
            >
              Request a Quote <ArrowUpRight size={16} />
            </Link>
            <Link
              to="/services"
              data-testid="hero-cta-services"
              className="inline-flex items-center gap-2 text-white text-sm tracking-wide font-medium border-b border-white/40 hover:border-white pb-1 transition-colors"
            >
              Explore our services
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 z-10 hidden md:flex flex-col items-end text-white/70 text-[11px] tracking-[0.2em] uppercase">
          <span>Rapid Bay  /  SA</span>
        </div>
      </section>

      {/* WELCOME */}
      <section className="nv-section">
        <div className="nv-container grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-start">
          <div className="md:col-span-5">
            <img
              src={IMAGES.glazierWorking}
              alt="A recent NikoVision uPVC installation"
              data-testid="philosophy-image"
              className="w-full h-[560px] object-cover shadow-md"
            />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="nv-overline mb-5">Welcome</p>
            <h2 className="font-heading text-4xl sm:text-5xl leading-tight">
              Welcome to NikoVision.
            </h2>
            <div className="mt-8 space-y-5 text-brand-inkMuted leading-relaxed text-base">
              <p>
                My name is Theo, and I'm a qualified glazier born and raised
                in Adelaide. After completing my apprenticeship in the
                glazing industry, I quickly noticed a decline in the
                enthusiasm, craftsmanship, and attention to detail being
                delivered across many projects. It was at that moment I
                decided I wanted to raise the standard and provide customers
                with the quality workmanship they deserve.
              </p>
              <p>
                At NikoVision, quality isn't just a goal — it's the
                foundation of everything we do. I specialise in uPVC windows
                and doors, offering durable, energy-efficient solutions that
                enhance both the comfort and appearance of your home or
                business. Beyond uPVC installations, we cater to all aspects
                of glass and glazing, delivering expert workmanship and
                reliable service on every project.
              </p>
              <p>
                We take pride in our attention to detail, commitment to
                customer satisfaction, and dedication to getting the job done
                right the first time. No shortcuts, no compromises — just
                quality craftsmanship you can trust.
              </p>
              <p>
                Thank you for visiting NikoVision. I look forward to helping
                bring your vision to life.
              </p>
            </div>
            <Link
              to="/about"
              data-testid="philosophy-cta"
              className="mt-10 inline-flex items-center gap-2 text-brand-navy text-sm tracking-wide font-medium border-b border-brand-navy/30 hover:border-brand-navy pb-1 transition-colors"
            >
              More about NikoVision
            </Link>
          </div>
        </div>
      </section>

      <div className="nv-container">
        <div className="nv-hairline" />
      </div>

      {/* SERVICES */}
      <section className="nv-section">
        <div className="nv-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-5">
              <p className="nv-overline mb-5">Services</p>
              <h2 className="font-heading text-4xl sm:text-5xl leading-tight">
                Four trades, one craftsman.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p className="text-brand-inkMuted leading-relaxed text-base">
                Whether you've got a sticking door, a draughty window, or
                you're ready to renovate the whole home — NikoVision handles
                the full scope, end-to-end.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-line">
            {SERVICES.map((s, idx) => {
              const Icon = iconMap[s.icon] || Layers;
              return (
                <div
                  key={s.id}
                  data-testid={`service-card-${s.id}`}
                  className="bg-brand-bg p-10 group hover:bg-white transition-colors duration-500"
                >
                  <Icon
                    size={28}
                    className="text-brand-navy mb-8 group-hover:text-brand-sand transition-colors"
                    strokeWidth={1.4}
                  />
                  <p className="text-xs text-brand-inkMuted mb-2">
                    0{idx + 1}
                  </p>
                  <h3 className="font-heading text-2xl leading-snug">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-sm text-brand-inkMuted leading-relaxed">
                    {s.blurb}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-12">
            <Link
              to="/services"
              data-testid="services-cta"
              className="nv-btn-secondary"
            >
              See all services <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* DECEUNINCK FEATURE */}
      <section className="bg-brand-ink text-white py-24 md:py-32">
        <div className="nv-container grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          <div className="md:col-span-5">
            <p className="nv-overline text-brand-sand">
              uPVC Legend 80
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl text-white mt-5 leading-tight">
              The frame system we put our name to.
            </h2>
            <p className="mt-8 text-white/70 leading-relaxed text-base">
              Belgian-engineered uPVC profiles, designed for Australian
              conditions. Six-chamber sashes, 80mm frame depth, and a
              decade-long manufacturer warranty.
            </p>
            <Link
              to="/upvc"
              data-testid="legend-cta"
              className="mt-10 inline-flex items-center gap-2 text-brand-sand text-sm tracking-wide font-medium border-b border-brand-sand/40 hover:border-brand-sand pb-1 transition-colors"
            >
              Learn more about Legend 80
            </Link>
          </div>
          <div className="md:col-span-7">
            <img
              src={IMAGES.windowFrameDetail}
              alt="uPVC Legend 80 window installation"
              data-testid="legend-image"
              className="w-full h-[480px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* GALLERY TEASER */}
      <section className="nv-section">
        <div className="nv-container">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <p className="nv-overline mb-5">Recent work</p>
              <h2 className="font-heading text-4xl sm:text-5xl leading-tight">
                A glance at the workshop floor.
              </h2>
            </div>
            <Link
              to="/gallery"
              data-testid="gallery-teaser-cta"
              className="inline-flex items-center gap-2 text-brand-navy text-sm tracking-wide font-medium border-b border-brand-navy/30 hover:border-brand-navy pb-1 transition-colors"
            >
              View the full gallery <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            <img
              src="/gallery/gallery-01.jpeg"
              alt="NikoVision uPVC installation"
              className="md:col-span-7 h-72 md:h-[420px] w-full object-cover"
            />
            <img
              src="/gallery/gallery-05.jpeg"
              alt="NikoVision uPVC installation"
              className="md:col-span-5 h-72 md:h-[420px] w-full object-cover"
            />
            <img
              src="/gallery/gallery-12.jpeg"
              alt="NikoVision uPVC installation"
              className="md:col-span-5 h-72 md:h-[360px] w-full object-cover"
            />
            <img
              src="/gallery/gallery-20.jpeg"
              alt="NikoVision uPVC installation"
              className="md:col-span-7 h-72 md:h-[360px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <Reviews />

      {/* CONTACT BANNER */}
      <section
        className="relative py-24 md:py-32 bg-cover bg-center"
        style={{ backgroundImage: `url(${IMAGES.heroFallback})` }}
      >
        <div className="absolute inset-0 bg-brand-navy/85" />
        <div className="relative z-10 nv-container text-center text-white">
          <p className="nv-overline text-brand-sand">Ready when you are</p>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl mt-5 max-w-3xl mx-auto leading-tight">
            Let's talk about your windows.
          </h2>
          <p className="mt-6 text-white/80 max-w-xl mx-auto text-base">
            Free, no-obligation quotes across {SITE.serviceArea}. Honest
            advice, even if it's not the answer you wanted.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              data-testid="footer-banner-quote"
              className="nv-btn-white"
            >
              Request a Quote
            </Link>
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              data-testid="footer-banner-call"
              className="inline-flex items-center gap-2 text-white text-sm tracking-wide font-medium border-b border-white/40 hover:border-white pb-1 transition-colors"
            >
              Or call {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
