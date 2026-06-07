const FRAME_COLOURS = [
  { name: "Ash Black", hex: "#0F0F12", ring: "ring-1 ring-brand-line" },
  { name: "White", hex: "#FFFFFF", ring: "ring-1 ring-brand-line" },
  { name: "Cream", hex: "#F1E7D2", ring: "ring-1 ring-brand-line" },
  { name: "Grey", hex: "#A5ADB8", ring: "ring-1 ring-brand-line" },
  { name: "Golden Oak", hex: "#C28B3A", ring: "ring-1 ring-brand-line" },
  { name: "Nut Tree", hex: "#5C3416", ring: "ring-1 ring-brand-line" },
  { name: "Anthracite Blue", hex: "#1F3A5C", ring: "ring-1 ring-brand-line" },
];

// Inline SVGs styled with currentColor (navy) and a subtle sand accent
const stroke = "#1E3A5F";
const accent = "#C19A52";

const IconFixed = (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect x="10" y="10" width="44" height="44" stroke={stroke} strokeWidth="1.8" />
    <line x1="32" y1="10" x2="32" y2="54" stroke={stroke} strokeWidth="1.8" />
    <line x1="10" y1="32" x2="54" y2="32" stroke={stroke} strokeWidth="1.8" />
  </svg>
);

const IconTiltTurn = (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect x="14" y="8" width="36" height="48" stroke={stroke} strokeWidth="1.8" />
    <line x1="14" y1="8" x2="50" y2="20" stroke={accent} strokeWidth="1.8" />
  </svg>
);

const IconAwning = (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect x="10" y="20" width="44" height="36" stroke={stroke} strokeWidth="1.8" />
    <polyline points="10,20 32,8 54,20" stroke={stroke} strokeWidth="1.8" fill="none" />
  </svg>
);

const IconFrenchWindow = (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect x="10" y="8" width="20" height="48" stroke={stroke} strokeWidth="1.8" />
    <rect x="34" y="8" width="20" height="48" stroke={stroke} strokeWidth="1.8" />
    <line x1="32" y1="8" x2="32" y2="56" stroke={stroke} strokeWidth="1.5" strokeDasharray="2 3" />
  </svg>
);

const IconSlidingWindow = (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect x="10" y="14" width="44" height="36" stroke={stroke} strokeWidth="1.8" />
    <line x1="18" y1="32" x2="40" y2="32" stroke={accent} strokeWidth="1.8" strokeDasharray="3 3" />
    <polyline points="36,26 44,32 36,38" stroke={accent} strokeWidth="1.8" fill="none" />
  </svg>
);

const IconSlidingDoor = (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect x="10" y="8" width="22" height="48" stroke={stroke} strokeWidth="1.8" />
    <rect x="32" y="8" width="22" height="48" stroke={stroke} strokeWidth="1.8" />
    <polyline points="26,32 20,32 24,28" stroke={accent} strokeWidth="1.8" fill="none" />
    <line x1="20" y1="32" x2="24" y2="36" stroke={accent} strokeWidth="1.8" />
  </svg>
);

const IconHingedDoor = (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect x="14" y="8" width="36" height="48" stroke={stroke} strokeWidth="1.8" />
    <polyline points="34,28 42,32 34,36" stroke={accent} strokeWidth="1.8" fill="none" />
    <circle cx="42" cy="32" r="1.3" fill={accent} />
  </svg>
);

const IconFrenchDoor = (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect x="10" y="8" width="22" height="48" stroke={stroke} strokeWidth="1.8" />
    <rect x="32" y="8" width="22" height="48" stroke={stroke} strokeWidth="1.8" />
    <line x1="28" y1="32" x2="28" y2="38" stroke={accent} strokeWidth="2" />
    <line x1="36" y1="32" x2="36" y2="38" stroke={accent} strokeWidth="2" />
  </svg>
);

const RANGE = [
  { label: "Fixed Windows", icon: IconFixed },
  { label: "Tilt & Turn", icon: IconTiltTurn },
  { label: "Awning Windows", icon: IconAwning },
  { label: "French Windows", icon: IconFrenchWindow },
  { label: "Sliding Windows", icon: IconSlidingWindow },
  { label: "Sliding Doors", icon: IconSlidingDoor },
  { label: "In/Out Hinged Doors", icon: IconHingedDoor },
  { label: "French Doors", icon: IconFrenchDoor },
];

export default function WindowRange() {
  return (
    <section
      data-testid="section-window-range"
      className="nv-section bg-brand-bg"
    >
      <div className="nv-container">
        {/* Top: heading + frame colours */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          <div className="md:col-span-7">
            <p className="nv-overline text-brand-sand mb-6">
              Window & Door Range
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
              Every Style,{" "}
              <span className="italic font-normal text-brand-sand">
                Every Opening
              </span>
            </h2>
            <div className="mt-10 max-w-xl space-y-5 text-brand-inkMuted leading-relaxed text-base">
              <p>
                Our uPVC range covers the full spectrum of window and door
                configurations — whether you're renovating a heritage home or
                building new, there's a solution for every space.
              </p>
              <p>
                All uPVC products come standard with flyscreens. Security
                screen upgrades are available on request.
              </p>
            </div>
          </div>

          <div className="md:col-span-5">
            <h3 className="font-heading text-2xl sm:text-3xl mb-8 text-brand-ink">
              Available Frame Colours
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-5">
              {FRAME_COLOURS.map((c) => (
                <li
                  key={c.name}
                  data-testid={`frame-colour-${c.name.toLowerCase().replace(/[^a-z]/g, "-")}`}
                  className="flex items-center gap-3"
                >
                  <span
                    className={`inline-block w-5 h-5 rounded-full ${c.ring}`}
                    style={{ backgroundColor: c.hex }}
                    aria-hidden
                  />
                  <span className="text-sm font-medium text-brand-ink">
                    {c.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Product cards grid */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
          {RANGE.map((item) => (
            <div
              key={item.label}
              data-testid={`range-card-${item.label.toLowerCase().replace(/[^a-z]/g, "-")}`}
              className="bg-brand-sandLight aspect-[4/3] flex flex-col items-center justify-center gap-6 p-6 transition-colors duration-500 hover:bg-white border border-transparent hover:border-brand-line"
            >
              <div className="flex items-center justify-center">
                {item.icon}
              </div>
              <p className="font-body text-sm md:text-base font-medium tracking-wide text-brand-ink text-center">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
