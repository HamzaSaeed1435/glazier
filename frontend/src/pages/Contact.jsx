import { useState } from "react";
import axios from "axios";
import { Phone, Mail, MapPin, Clock, Check, Loader2 } from "lucide-react";
import { toast, Toaster } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { SITE, JOB_TYPES, IMAGES } from "../lib/siteData";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const initial = {
  name: "",
  email: "",
  phone: "",
  suburb: "",
  job_type: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (k) => (e) =>
    setForm((p) => ({ ...p, [k]: e?.target ? e.target.value : e }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.job_type ||
      !form.message
    ) {
      toast.error("Please complete all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/quotes`, form);
      setSubmitted(true);
      toast.success("Quote request received — Theo will be in touch soon.");
      setForm(initial);
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.detail?.[0]?.msg ||
        err?.response?.data?.detail ||
        "Something went wrong. Please call us instead.";
      toast.error(typeof msg === "string" ? msg : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="page-contact">
      <Toaster richColors position="top-right" />

      <section className="nv-section pt-32 pb-16">
        <div className="nv-container">
          <p className="nv-overline mb-6">Contact</p>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl leading-[1.02] tracking-tight max-w-4xl">
            Let's talk about
            <br />
            <span className="italic font-normal text-brand-navy">
              your windows.
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-brand-inkMuted leading-relaxed">
            Drop your details below and Theo will get back to you personally,
            usually the same day. Or grab the phone — that works too.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="nv-container grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Form */}
          <div className="md:col-span-7 order-2 md:order-1">
            {submitted ? (
              <div
                data-testid="quote-success"
                className="border border-brand-navy/30 bg-white p-10 md:p-14"
              >
                <div className="w-14 h-14 bg-brand-navy text-white flex items-center justify-center">
                  <Check size={26} strokeWidth={1.6} />
                </div>
                <h3 className="font-heading text-3xl mt-8">
                  Thanks — message received.
                </h3>
                <p className="mt-4 text-brand-inkMuted leading-relaxed">
                  Theo will be in touch shortly to discuss your project. If
                  it's urgent, give him a call on{" "}
                  <a
                    href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                    className="text-brand-navy underline underline-offset-4"
                  >
                    {SITE.phone}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  data-testid="quote-reset"
                  className="nv-btn-secondary mt-10"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                data-testid="quote-form"
                className="bg-white border border-brand-line p-8 md:p-12 space-y-6"
              >
                <p className="nv-overline mb-2">Request a quote</p>
                <h2 className="font-heading text-3xl">
                  Tell us about your project
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name *</Label>
                    <Input
                      id="name"
                      data-testid="form-name"
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Your name"
                      className="rounded-none border-brand-line focus-visible:ring-brand-navy focus-visible:border-brand-navy"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      data-testid="form-email"
                      value={form.email}
                      onChange={update("email")}
                      placeholder="you@example.com"
                      className="rounded-none border-brand-line focus-visible:ring-brand-navy focus-visible:border-brand-navy"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      data-testid="form-phone"
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder="04xx xxx xxx"
                      className="rounded-none border-brand-line focus-visible:ring-brand-navy focus-visible:border-brand-navy"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="suburb">Suburb</Label>
                    <Input
                      id="suburb"
                      data-testid="form-suburb"
                      value={form.suburb}
                      onChange={update("suburb")}
                      placeholder="e.g. Glenelg"
                      className="rounded-none border-brand-line focus-visible:ring-brand-navy focus-visible:border-brand-navy"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>What do you need? *</Label>
                  <Select
                    value={form.job_type}
                    onValueChange={(v) => setForm((p) => ({ ...p, job_type: v }))}
                  >
                    <SelectTrigger
                      data-testid="form-jobtype"
                      className="rounded-none border-brand-line focus:ring-brand-navy focus:border-brand-navy h-11"
                    >
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      {JOB_TYPES.map((j) => (
                        <SelectItem
                          key={j}
                          value={j}
                          data-testid={`jobtype-option-${j.toLowerCase().replace(/[^a-z]/g, "-")}`}
                        >
                          {j}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Details *</Label>
                  <Textarea
                    id="message"
                    data-testid="form-message"
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Number of windows, rough timeframe, anything else we should know..."
                    rows={5}
                    className="rounded-none border-brand-line focus-visible:ring-brand-navy focus-visible:border-brand-navy resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  data-testid="form-submit"
                  disabled={submitting}
                  className="nv-btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending...
                    </>
                  ) : (
                    "Send request"
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact details */}
          <aside className="md:col-span-5 order-1 md:order-2 space-y-10">
            <img
              src={IMAGES.windowFrameClose}
              alt="NikoVision contact"
              className="w-full h-64 object-cover shadow-md"
            />

            <div className="space-y-7">
              <div className="flex items-start gap-4">
                <Phone size={18} className="text-brand-navy mt-1" />
                <div>
                  <p className="nv-overline mb-1">Phone</p>
                  <a
                    href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                    data-testid="contact-phone"
                    className="font-heading text-xl text-brand-ink hover:text-brand-navy"
                  >
                    {SITE.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail size={18} className="text-brand-navy mt-1" />
                <div>
                  <p className="nv-overline mb-1">Email</p>
                  <a
                    href={`mailto:${SITE.email}`}
                    data-testid="contact-email"
                    className="font-heading text-xl text-brand-ink hover:text-brand-navy break-all"
                  >
                    {SITE.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin size={18} className="text-brand-navy mt-1" />
                <div>
                  <p className="nv-overline mb-1">Service area</p>
                  <p
                    data-testid="contact-area"
                    className="font-heading text-xl text-brand-ink"
                  >
                    {SITE.serviceArea}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock size={18} className="text-brand-navy mt-1" />
                <div>
                  <p className="nv-overline mb-1">Hours</p>
                  <p
                    data-testid="contact-hours"
                    className="font-heading text-xl text-brand-ink"
                  >
                    {SITE.hours}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-line">
                <p className="nv-overline mb-1">ABN</p>
                <p
                  data-testid="contact-abn"
                  className="font-body text-sm tracking-wider text-brand-inkMuted"
                >
                  {SITE.abn}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
