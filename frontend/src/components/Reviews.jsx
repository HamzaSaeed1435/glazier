import { useEffect, useState } from "react";
import axios from "axios";
import { Star, Plus, Loader2, Quote } from "lucide-react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const StarRow = ({ value, onChange, size = 22, interactive = false }) => {
  const [hover, setHover] = useState(0);
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-1.5">
      {stars.map((n) => {
        const filled = (hover || value) >= n;
        return (
          <button
            key={n}
            type="button"
            disabled={!interactive}
            onMouseEnter={() => interactive && setHover(n)}
            onMouseLeave={() => interactive && setHover(0)}
            onClick={() => interactive && onChange?.(n)}
            data-testid={interactive ? `rating-star-${n}` : undefined}
            className={`${interactive ? "cursor-pointer" : "cursor-default"} p-0 bg-transparent border-0`}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
          >
            <Star
              size={size}
              strokeWidth={1.4}
              className={filled ? "text-brand-sand" : "text-brand-line"}
              fill={filled ? "#D8C3A5" : "transparent"}
            />
          </button>
        );
      })}
    </div>
  );
};

const initial = { name: "", suburb: "", rating: 0, text: "" };

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API}/reviews`);
      setReviews(res.data || []);
    } catch (e) {
      console.error("Failed to load reviews", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const update = (k) => (e) =>
    setForm((p) => ({ ...p, [k]: e?.target ? e.target.value : e }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.rating || !form.text || form.text.length < 4) {
      toast.error("Please add your name, a rating and a short review.");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/reviews`, form);
      toast.success("Thanks for the review — much appreciated!");
      setForm(initial);
      setShowForm(false);
      fetchReviews();
    } catch (err) {
      console.error(err);
      toast.error("Couldn't submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      data-testid="section-reviews"
      className="bg-brand-surfaceAlt nv-section"
    >
      <div className="nv-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-7">
            <p className="nv-overline mb-5">Reviews</p>
            <h2 className="font-heading text-4xl sm:text-5xl leading-tight">
              What Adelaide homeowners are saying.
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9 flex md:justify-end md:items-end">
            <button
              type="button"
              onClick={() => setShowForm((v) => !v)}
              data-testid="reviews-toggle-form"
              className="nv-btn-primary"
            >
              <Plus size={16} />
              {showForm ? "Close" : "Leave a review"}
            </button>
          </div>
        </div>

        {showForm && (
          <form
            onSubmit={onSubmit}
            data-testid="review-form"
            className="bg-white border border-brand-line p-8 md:p-10 mb-12 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="rname">Your name *</Label>
                <Input
                  id="rname"
                  data-testid="review-name"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="First name"
                  className="rounded-none border-brand-line focus-visible:ring-brand-navy focus-visible:border-brand-navy"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rsuburb">Suburb (optional)</Label>
                <Input
                  id="rsuburb"
                  data-testid="review-suburb"
                  value={form.suburb}
                  onChange={update("suburb")}
                  placeholder="e.g. Glenelg"
                  className="rounded-none border-brand-line focus-visible:ring-brand-navy focus-visible:border-brand-navy"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Your rating *</Label>
              <StarRow
                value={form.rating}
                onChange={(n) => setForm((p) => ({ ...p, rating: n }))}
                interactive
                size={28}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rtext">Your review *</Label>
              <Textarea
                id="rtext"
                data-testid="review-text"
                value={form.text}
                onChange={update("text")}
                placeholder="What was the job, how did it go, and would you recommend NikoVision?"
                rows={4}
                className="rounded-none border-brand-line focus-visible:ring-brand-navy focus-visible:border-brand-navy resize-none"
              />
            </div>

            <button
              type="submit"
              data-testid="review-submit"
              disabled={submitting}
              className="nv-btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Submitting...
                </>
              ) : (
                "Submit review"
              )}
            </button>
          </form>
        )}

        {loading ? (
          <p className="text-brand-inkMuted">Loading reviews…</p>
        ) : reviews.length === 0 ? (
          <div
            data-testid="reviews-empty"
            className="bg-white border border-dashed border-brand-line p-12 text-center"
          >
            <Quote
              size={32}
              strokeWidth={1.2}
              className="mx-auto text-brand-sand mb-6"
            />
            <h3 className="font-heading text-2xl">No reviews yet — be the first.</h3>
            <p className="mt-3 text-brand-inkMuted text-sm max-w-md mx-auto">
              If we've done a job for you, we'd be grateful for a few honest
              words. It helps other Adelaide homeowners find us.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <article
                key={r.id}
                data-testid={`review-card-${r.id}`}
                className="bg-white border border-brand-line p-8 md:p-10 flex flex-col"
              >
                <StarRow value={r.rating} size={18} />
                <p className="mt-6 text-brand-ink leading-relaxed text-base font-body flex-1">
                  "{r.text}"
                </p>
                <div className="mt-8 pt-6 border-t border-brand-line">
                  <p className="font-heading text-lg text-brand-ink">
                    {r.name}
                  </p>
                  {r.suburb && (
                    <p className="text-xs tracking-[0.15em] uppercase text-brand-inkMuted mt-1">
                      {r.suburb}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
