import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  Layers,
  Wrench,
  Home as HomeIcon,
  ShieldCheck,
  ArrowUpRight,
  Check,
  Siren,
  PawPrint,
  Hammer,
  Droplets,
  Square,
  Flame,
} from "lucide-react";
import { IMAGES, SERVICES, OTHER_SERVICES } from "../lib/siteData";

const iconMap = { Layers, Wrench, Home: HomeIcon, ShieldCheck };
const otherIconMap = { Siren, PawPrint, Hammer, Droplets, Square, Flame };

const detailed = {
  "supply-fitment": [
    "uPVC windows — fixed, awning, sliding, French, tilt-and-turn",
    "uPVC doors — French, sliding, hinged",
    "Custom-measured to your openings",
    "All flashing, sealants and finishing carpentry included",
  ],
  repairs: [
    "Hinges, locks, handles and gearbox replacement",
    "Re-sealing and weatherstrip replacement",
    "Glass replacement (single & double-glazed)",
    "Sticking, dropped or misaligned sashes corrected",
  ],
  renovations: [
    "Survey and quotation of every opening",
    "Removal and disposal of existing windows / doors",
    "Supply and install of new uPVC system",
    "Internal and external finishing — tidy on completion",
  ],
  screens: [
    "Flyscreens supplied with every openable window — standard",
    "Optional upgrade to certified security screens",
    "Powder-coated frames in your choice of finish",
    "Discreet, durable and fully retrofittable",
  ],
};

export default function Services() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          const top = el.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({ top, behavior: "smooth" });
        }, 200);
      }
    }
  }, [hash]);

  return (
    <div data-testid="page-services">
      <section className="nv-section pt-32">
        <div className="nv-container">
          <p className="nv-overline mb-6">Services</p>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl leading-[1.02] tracking-tight max-w-4xl">
            From a stuck sash
            <br />
            <span className="italic font-normal text-brand-navy">to a full</span>{" "}
            renovation.
          </h1>
          <p className="mt-8 max-w-2xl text-brand-inkMuted leading-relaxed text-base">
            NikoVision covers the full scope of uPVC glazing for Adelaide
            homes. One trade, one point of contact — start to finish.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="nv-container space-y-px bg-brand-line">
          {SERVICES.map((s, idx) => {
            const Icon = iconMap[s.icon] || Layers;
            const isOdd = idx % 2 === 1;
            return (
              <div
                key={s.id}
                data-testid={`service-detail-${s.id}`}
                className="bg-brand-bg grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 py-16 md:py-20 px-2 md:px-0 items-center"
              >
                <div className={`md:col-span-5 ${isOdd ? "md:order-2 md:col-start-8" : ""}`}>
                  <img
                    src={
                      [
                        "/featured/service-supply.jpeg",
                        "/featured/service-repairs.jpeg",
                        "/featured/service-renovations.jpeg",
                        "/featured/service-flyscreens.jpeg",
                      ][idx % 4]
                    }
                    alt={s.title}
                    className="w-full h-[360px] md:h-[440px] object-cover shadow-md"
                  />
                </div>
                <div className={`md:col-span-6 ${isOdd ? "md:order-1 md:col-start-1" : "md:col-start-7"}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <Icon size={22} className="text-brand-navy" strokeWidth={1.5} />
                    <span className="nv-overline">0{idx + 1}  /  {SERVICES.length.toString().padStart(2, "0")}</span>
                  </div>
                  <h2 className="font-heading text-4xl sm:text-5xl leading-tight">
                    {s.title}
                  </h2>
                  <p className="mt-6 text-brand-inkMuted leading-relaxed text-base">
                    {s.blurb}
                  </p>
                  <ul className="mt-8 space-y-3">
                    {detailed[s.id].map((d) => (
                      <li key={d} className="flex items-start gap-3 text-sm text-brand-ink">
                        <Check size={16} className="mt-0.5 text-brand-navy flex-shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-brand-surfaceAlt py-24 md:py-32">
        <div className="nv-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-5">
              <p className="nv-overline mb-5">More glass & glazing</p>
              <h2 className="font-heading text-4xl sm:text-5xl leading-tight">
                Beyond windows and doors.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p className="text-brand-inkMuted leading-relaxed text-base">
                NikoVision covers the full breadth of residential glass and
                glazing work. From a broken pane on a Sunday morning to a
                full bathroom shower screen — one trade, one number.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-line">
            {OTHER_SERVICES.map((s) => {
              const Icon = otherIconMap[s.icon] || Layers;
              return (
                <div
                  key={s.id}
                  id={s.id}
                  data-testid={`other-service-${s.id}`}
                  className="bg-brand-surfaceAlt p-10 hover:bg-white transition-colors duration-500 scroll-mt-28"
                >
                  <Icon
                    size={28}
                    strokeWidth={1.4}
                    className="text-brand-navy mb-8"
                  />
                  <h3 className="font-heading text-2xl leading-snug">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-sm text-brand-inkMuted leading-relaxed">
                    {s.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-ink text-white py-24">
        <div className="nv-container flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <p className="nv-overline text-brand-sand mb-5">Curious about uPVC?</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white leading-tight max-w-xl">
              The benefits, explained — and the Legend 80 system.
            </h2>
          </div>
          <Link
            to="/upvc"
            data-testid="services-to-upvc"
            className="nv-btn-white"
          >
            Read more <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
