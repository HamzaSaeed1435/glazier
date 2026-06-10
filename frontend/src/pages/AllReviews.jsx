import Reviews from "../components/Reviews";

export default function AllReviews() {
  return (
    <div data-testid="page-all-reviews">
      <section className="nv-section pt-32 pb-12">
        <div className="nv-container">
          <p className="nv-overline mb-6">Reviews</p>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl leading-[1.02] tracking-tight max-w-4xl">
            From the people we&apos;ve
            <br />
            <span className="italic font-normal text-brand-navy">
              worked for.
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-brand-inkMuted leading-relaxed">
            Real words from Adelaide homeowners and businesses who&apos;ve
            trusted NikoVision with their glazing.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <Reviews mode="all" />
      </section>
    </div>
  );
}
