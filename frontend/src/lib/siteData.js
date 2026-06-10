// Central source of truth for site copy & assets.
// Contact details are placeholders — Theo can swap in real values later.

export const SITE = {
  brand: "NikoVision",
  tagline: "uPVC Glazing, Crafted in Adelaide",
  ownerShort: "Theo",
  ownerFull: "Theofani Tzelepis",
  phone: "0422 021 020",
  email: "nikovisionglazing@gmail.com",
  abn: "57 648 702 837",
  serviceArea: "Adelaide & Greater South Australia",
  hours: "Mon – Fri  ·  7am – 5pm",
};

export const IMAGES = {
  heroRapidBay:
    "https://images.pexels.com/photos/27565377/pexels-photo-27565377.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600",
  heroFallback:
    "https://images.pexels.com/photos/33191833/pexels-photo-33191833.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600",
  // Real NikoVision uPVC job photos — replacing prior stock imagery
  glazierWorking: "/gallery/gallery-08.jpeg",
  architecturalHouse: "/gallery/gallery-04.jpeg",
  architecturalDetail: "/gallery/gallery-07.jpeg",
  windowFrameDetail: "/gallery/gallery-12.jpeg",
  windowFrameClose: "/gallery/gallery-18.jpeg",
  aboutPortrait: "/gallery/gallery-23.jpeg",
  legendDetail: "/gallery/gallery-22.jpeg",
  upvcHero: "/gallery/gallery-15.jpeg",
  contactSide: "/gallery/gallery-09.jpeg",
};

export const SERVICES = [
  {
    id: "supply-fitment",
    title: "Supply & Fitment",
    blurb:
      "End-to-end supply and installation of uPVC windows, doors and glass — measured, manufactured to spec and fitted with absolute precision.",
    icon: "Layers",
  },
  {
    id: "repairs",
    title: "Repairs & Maintenance",
    blurb:
      "Hardware, seals, hinges, locks, glass replacement — keep your existing uPVC windows and doors operating like the day they were installed.",
    icon: "Wrench",
  },
  {
    id: "renovations",
    title: "Complete Renovations",
    blurb:
      "Full window and door replacements — removal and disposal of old joinery, installation of new uPVC systems, and a tidy site at the end of every day.",
    icon: "Home",
  },
  {
    id: "screens",
    title: "Flyscreens & Security",
    blurb:
      "Every window comes with flyscreens as standard, with optional upgrade to certified security screens for added protection and peace of mind.",
    icon: "ShieldCheck",
  },
];

export const UPVC_BENEFITS = [
  {
    title: "Thermal performance",
    body: "Multi-chamber profiles and quality seals significantly reduce heat transfer — your home stays cooler in summer, warmer in winter.",
    icon: "Thermometer",
  },
  {
    title: "Acoustic comfort",
    body: "Engineered seals and double glazing options dramatically cut external noise — quiet rooms, even on busy streets.",
    icon: "Volume2",
  },
  {
    title: "Built to last",
    body: "uPVC will not rust, warp, rot or fade. Designed to perform for decades in harsh Australian conditions.",
    icon: "Hourglass",
  },
  {
    title: "Low maintenance",
    body: "No painting, no sanding, no sealing. A wipe down with soapy water is all that's needed to keep frames looking new.",
    icon: "Sparkles",
  },
  {
    title: "Energy efficient",
    body: "Reduce reliance on heating and cooling — a smart long-term investment that pays back in lower energy bills.",
    icon: "Zap",
  },
  {
    title: "Secure by design",
    body: "Multi-point locking hardware, reinforced sashes and laminated glass options keep your family safe.",
    icon: "Lock",
  },
];

export const DECEUNINCK_FEATURES = [
  {
    spec: "6-chamber",
    label: "Sash profile",
    body: "A six-chambered sash for superior thermal insulation and structural rigidity.",
  },
  {
    spec: "80 mm",
    label: "Frame depth",
    body: "Generous 80mm frame depth allowing premium glazing units and weather seals.",
  },
  {
    spec: "24–52 mm",
    label: "Glass thickness",
    body: "Accommodates double and triple glazing from 24mm up to 52mm for outstanding acoustic and thermal performance.",
  },
  {
    spec: "10 yr",
    label: "Manufacturer warranty",
    body: "Backed by Deceuninck — a global leader in uPVC extrusion since 1937.",
  },
];

export const FAQS = [
  {
    q: "Are uPVC windows suitable for the Australian climate?",
    a: "Absolutely. The Deceuninck Legend system is engineered for high UV, coastal and bushfire-prone environments and is independently tested to AS 2047 standards.",
  },
  {
    q: "Will replacing my windows make a difference to my energy bills?",
    a: "Yes — significantly. Multi-chamber uPVC frames and double glazing reduce heat transfer by up to 70% compared to single-glazed aluminium, cutting heating and cooling costs year-round.",
  },
  {
    q: "Do you service my area?",
    a: "We service Adelaide metro and most of Greater South Australia. If you're outside that, get in touch — we'll let you know if we can help.",
  },
  {
    q: "How long does an install take?",
    a: "A typical full-home renovation takes 2–5 days on site, depending on the number of openings. Single repairs are usually a few hours.",
  },
];

export const JOB_TYPES = [
  "Window repair / maintenance",
  "Single window or door replacement",
  "Full home window renovation",
  "Flyscreens or security screens",
  "Emergency glass replacement",
  "Pet door installation",
  "Shower screen / mirror / splashback",
  "New build / extension",
  "Not sure — need advice",
];

export const OTHER_SERVICES = [
  {
    id: "emergency-glass",
    title: "Emergency glass replacements",
    icon: "Siren",
    body:
      "Smashed window? We respond fast. Same-day emergency glass replacement across Adelaide metro — securing your home or business against the weather and intruders while we source the right glass.",
  },
  {
    id: "pet-doors",
    title: "Pet doors — supply & install",
    icon: "PawPrint",
    body:
      "Pet door installation in existing doors and windows — including glass panels. Cleanly cut, properly sealed, and sized to suit your pet, from cats to large breeds.",
  },
  {
    id: "broken-glass",
    title: "Broken glass repairs",
    icon: "Hammer",
    body:
      "Cracked, chipped or shattered glass professionally removed and replaced. Float, laminated, toughened and double-glazed units — stocked or available to order to match your existing joinery.",
  },
  {
    id: "shower-screens",
    title: "Shower screens",
    icon: "Droplets",
    body:
      "Frameless and semi-frameless shower screens measured and installed to suit any bathroom. Toughened safety glass as standard, with a clean, modern finish that lasts.",
  },
  {
    id: "mirrors",
    title: "Mirrors",
    icon: "Square",
    body:
      "Wall mirrors, vanity mirrors, full-height feature mirrors — custom-cut and installed to your spec. From simple polished-edge to bevelled and framed finishes.",
  },
  {
    id: "splashbacks",
    title: "Glass splashbacks",
    icon: "Flame",
    body:
      "Toughened glass splashbacks for kitchens and laundries. Available in standard colours or colour-matched to your scheme — heat-resistant, hygienic, and easy to keep clean.",
  },
];
