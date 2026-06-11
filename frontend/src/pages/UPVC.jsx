import { Link } from "react-router-dom";
import {
  Thermometer,
  Volume2,
  Hourglass,
  Sparkles,
  Zap,
  Lock,
  ArrowUpRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { IMAGES, UPVC_BENEFITS, DECEUNINCK_FEATURES, FAQS } from "../lib/siteData";
import WindowRange from "../components/WindowRange";

const iconMap = { Thermometer, Volume2, Hourglass, Sparkles, Zap, Lock };

export default function UPVC() {
  return (
    <div data-testid="page-upvc">
      {/* Intro */}
      <section className="nv-section pt-32">
        <div className="nv-container grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-7">
            <p className="nv-overline mb-6">uPVC Legend 80</p>
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl leading-[1.02] tracking-tight">
              A quieter,
              <br />
              <span className="italic font-normal text-brand-navy">
                warmer, calmer
              </span>{" "}
              home.
            </h1>
            <div className="mt-10 space-y-6 text-brand-inkMuted leading-relaxed text-base max-w-2xl">
              <p>
                uPVC — unplasticised polyvinyl chloride — is a rigid, weather-
                proof, low-maintenance material used to extrude the frames of
                modern energy-efficient windows and doors. Unlike timber it
                won't rot. Unlike aluminium it doesn't conduct heat or cold.
                It just performs — quietly, for decades.
              </p>
              <p>
                Across Europe, uPVC has been the standard for 40 years.
                Australia is catching up fast — and with our climate
                extremes, it's a serious upgrade for any home.
              </p>
            </div>
          </div>
          <div className="md:col-span-5">
            <img
              src={IMAGES.upvcHero}
              alt="NikoVision uPVC Legend 80 installation"
              data-testid="upvc-hero-image"
              className="w-full h-[520px] object-cover shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-brand-surfaceAlt nv-section">
        <div className="nv-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-5">
              <p className="nv-overline mb-5">Benefits</p>
              <h2 className="font-heading text-4xl sm:text-5xl leading-tight">
                Six reasons your next windows should be uPVC.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 text-brand-inkMuted leading-relaxed">
              <p>
                Every benefit below comes standard with the Deceuninck Legend
                system we install — no upgrades required.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-line">
            {UPVC_BENEFITS.map((b, idx) => {
              const Icon = iconMap[b.icon] || Sparkles;
              return (
                <div
                  key={b.title}
                  data-testid={`benefit-${idx}`}
                  className="bg-brand-surfaceAlt p-10 hover:bg-white transition-colors duration-500"
                >
                  <Icon size={28} strokeWidth={1.4} className="text-brand-navy mb-8" />
                  <h3 className="font-heading text-xl">{b.title}</h3>
                  <p className="mt-4 text-sm text-brand-inkMuted leading-relaxed">
                    {b.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Window & Door Range */}
      <WindowRange />

      {/* Deceuninck Legend */}
      <section className="nv-section bg-brand-ink text-white">
        <div className="nv-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center mb-20">
            <div className="md:col-span-6">
              <p className="nv-overline text-brand-sand mb-6">
                Deceuninck  ·  Legend 80
              </p>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl leading-tight text-white">
                The frame system we trust with our name.
              </h2>
              <div className="mt-10 space-y-5 text-white/75 leading-relaxed text-base max-w-xl">
                <p>
                  Deceuninck have been engineering uPVC profiles in Belgium
                  since 1937. The Legend 80 system is their premium
                  residential platform — engineered around acoustic comfort,
                  thermal performance and longevity in demanding climates.
                </p>
                <p>
                  Every NikoVision installation uses Legend 80 extrusions,
                  paired with quality double-glazing units, multi-point
                  hardware and marine-grade seals.
                </p>
              </div>
            </div>
            <div className="md:col-span-6">
              <div className="bg-white p-8 md:p-12 flex items-center justify-center h-[520px]">
                <img
                  src="/products/legend-80-profile.jpeg"
                  alt="Deceuninck Legend 80 uPVC frame profile cross-section"
                  data-testid="legend-detail-image"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {DECEUNINCK_FEATURES.map((f) => (
              <div
                key={f.label}
                data-testid={`legend-spec-${f.label.toLowerCase().replace(/[^a-z]/g, "-")}`}
                className="bg-brand-ink p-8 md:p-10"
              >
                <p className="font-heading text-5xl sm:text-6xl text-brand-sand">
                  {f.spec}
                </p>
                <p className="mt-4 nv-overline text-white/60">{f.label}</p>
                <p className="mt-4 text-sm text-white/70 leading-relaxed">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="nv-section">
        <div className="nv-container grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          <div className="md:col-span-5">
            <p className="nv-overline mb-5">FAQ</p>
            <h2 className="font-heading text-4xl sm:text-5xl leading-tight">
              Common questions, answered.
            </h2>
            <p className="mt-8 text-brand-inkMuted leading-relaxed">
              Can't see your question? Get in touch — Theo answers personally.
            </p>
            <Link
              to="/contact"
              data-testid="upvc-faq-cta"
              className="nv-btn-secondary mt-10"
            >
              Ask a question <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f, idx) => (
                <AccordionItem
                  key={f.q}
                  value={`item-${idx}`}
                  className="border-b border-brand-line"
                  data-testid={`faq-${idx}`}
                >
                  <AccordionTrigger className="text-left font-heading text-xl py-6 hover:no-underline hover:text-brand-navy">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-brand-inkMuted leading-relaxed text-base pb-6">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}
