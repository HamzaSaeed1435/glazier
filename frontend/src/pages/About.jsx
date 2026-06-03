import { Link } from "react-router-dom";
import { GraduationCap, MapPin, Award, Eye } from "lucide-react";
import { IMAGES, SITE } from "../lib/siteData";

const values = [
  {
    icon: GraduationCap,
    title: "Trained, qualified, certified",
    body: "Tonsley TAFE-trained glazier with a completed uPVC apprenticeship — and a hunger to keep learning every job.",
  },
  {
    icon: Eye,
    title: "Eye for the millimetre",
    body: "Reveals, mitres, seals — the details most people never notice are the ones we obsess over.",
  },
  {
    icon: Award,
    title: "Standards held high",
    body: "We don't lower the bar to fit the job. The job is brought up to meet it.",
  },
  {
    icon: MapPin,
    title: "Adelaide born and based",
    body: "Local owner-operator. You get Theo on the tools, and Theo on the phone.",
  },
];

export default function About() {
  return (
    <div data-testid="page-about">
      <section className="nv-section pt-32">
        <div className="nv-container grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          <div className="md:col-span-7">
            <p className="nv-overline mb-6">About</p>
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl leading-[1.02] tracking-tight">
              Hi, I'm Theo.
              <br />
              <span className="italic font-normal text-brand-navy">
                Glazier by trade,
              </span>{" "}
              perfectionist by choice.
            </h1>
            <div className="mt-12 max-w-2xl space-y-6 text-brand-inkMuted leading-relaxed text-base">
              <p>
                Full name's Theofani Tzelepis, but everyone calls me Theo. I'm
                25 years old, I trained at Tonsley TAFE and finished my
                apprenticeship as a uPVC glazier — though I'm comfortable
                across all aspects of glass and glazing.
              </p>
              <p>
                I started NikoVision because I was never content working for
                others. I saw too much of the dedication, craftsmanship and
                enthusiasm being lost from a trade that used to take real
                pride in itself. That bothered me. I want to be one of the
                future's leading uPVC suppliers and installers in South
                Australia — and the way to get there is one well-finished job
                at a time.
              </p>
              <p>
                When I quote a job, I quote it honestly. When I install, I
                install like it's my own home. And when I leave site, I leave
                it clean.
              </p>
            </div>
          </div>
          <div className="md:col-span-5">
            <img
              src={IMAGES.glazierWorking}
              alt="Theo working on a uPVC window"
              data-testid="about-portrait"
              className="w-full h-[560px] object-cover shadow-md"
            />
            <div className="mt-6 grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="nv-overline mb-1">Based</p>
                <p className="font-medium text-brand-ink">{SITE.serviceArea}</p>
              </div>
              <div>
                <p className="nv-overline mb-1">Trade</p>
                <p className="font-medium text-brand-ink">
                  Qualified uPVC Glazier
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-surfaceAlt nv-section">
        <div className="nv-container">
          <p className="nv-overline mb-5">What I stand for</p>
          <h2 className="font-heading text-4xl sm:text-5xl max-w-3xl leading-tight">
            Four principles. Every single job.
          </h2>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-line">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-brand-surfaceAlt p-10 md:p-12"
                data-testid={`value-${v.title.toLowerCase().replace(/[^a-z]/g, "-")}`}
              >
                <v.icon
                  size={28}
                  strokeWidth={1.4}
                  className="text-brand-navy mb-8"
                />
                <h3 className="font-heading text-2xl">{v.title}</h3>
                <p className="mt-4 text-brand-inkMuted text-sm leading-relaxed">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="nv-section">
        <div className="nv-container text-center max-w-3xl mx-auto">
          <p className="nv-overline mb-5">Next step</p>
          <h2 className="font-heading text-4xl sm:text-5xl leading-tight">
            Got a project in mind?
          </h2>
          <p className="mt-6 text-brand-inkMuted leading-relaxed">
            Whether it's one window or the whole house, drop your details in
            and I'll get back to you personally.
          </p>
          <Link
            to="/contact"
            data-testid="about-cta-contact"
            className="nv-btn-primary mt-10"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
