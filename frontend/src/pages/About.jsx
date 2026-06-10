import { Link } from "react-router-dom";
import { GraduationCap, MapPin, Award, Eye } from "lucide-react";
import { IMAGES, SITE } from "../lib/siteData";

const values = [
  {
    icon: GraduationCap,
    title: "Trained, qualified, certified",
    body: "Adelaide-trained qualified glazier with a completed apprenticeship — and a hunger to keep learning every job.",
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
              Welcome to{" "}
              <span className="italic font-normal text-brand-navy">
                NikoVision.
              </span>
            </h1>
            <div className="mt-12 max-w-2xl space-y-6 text-brand-inkMuted leading-relaxed text-base">
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
                customer satisfaction, and dedication to getting the job
                done right the first time. No shortcuts, no compromises —
                just quality craftsmanship you can trust.
              </p>
              <p>
                Thank you for visiting NikoVision. I look forward to
                helping bring your vision to life.
              </p>
            </div>
          </div>
          <div className="md:col-span-5">
            <img
              src={IMAGES.aboutPortrait}
              alt="A recent NikoVision uPVC installation"
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
          <p className="nv-overline mb-5">What we stand for</p>
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
            and Theo will get back to you personally.
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
