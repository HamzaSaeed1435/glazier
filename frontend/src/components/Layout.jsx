import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { SITE } from "../lib/siteData";

const SERVICES_SUB = [
  { to: "/services#emergency-glass", label: "Emergency glass replacements" },
  { to: "/services#pet-doors", label: "Pet doors" },
  { to: "/services#broken-glass", label: "Broken glass repairs" },
  { to: "/services#shower-screens", label: "Shower screens" },
  { to: "/services#mirrors", label: "Mirrors" },
  { to: "/services#splashbacks", label: "Splashbacks" },
];

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services", children: SERVICES_SUB },
  { to: "/upvc", label: "uPVC Legend 80" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(null); // desktop hover dropdown
  const [mobileSub, setMobileSub] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobileSub(null);
    setDropdown(null);
    if (!location.hash) window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, location.hash]);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-brand-line/70"
          : "bg-transparent"
      }`}
    >
      <div className="nv-container flex items-center justify-between h-20">
        <Link
          to="/"
          data-testid="nav-logo"
          className="flex items-baseline gap-2 group"
        >
          <span className="font-heading text-2xl tracking-tight text-brand-ink group-hover:text-brand-navy transition-colors">
            NikoVision
          </span>
          <span className="hidden sm:inline text-[10px] tracking-[0.25em] uppercase text-brand-inkMuted">
            Adelaide
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {navItems.map((item) => (
            <div
              key={item.to}
              className="relative"
              onMouseEnter={() => item.children && setDropdown(item.label)}
              onMouseLeave={() => item.children && setDropdown(null)}
            >
              <NavLink
                to={item.to}
                data-testid={`nav-link-${item.label.toLowerCase().replace(/[^a-z]/g, "")}`}
                className={({ isActive }) =>
                  `nv-link relative py-2 inline-flex items-center gap-1 ${
                    isActive ? "text-brand-navy" : ""
                  } after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-brand-navy after:transition-all after:duration-300 ${
                    isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
                  }`
                }
              >
                {item.label}
                {item.children && <ChevronDown size={14} strokeWidth={1.6} />}
              </NavLink>

              {item.children && dropdown === item.label && (
                <div
                  data-testid="nav-dropdown-services"
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-3 min-w-[300px]"
                >
                  <ul className="bg-white border border-brand-line/80 shadow-lg py-2">
                    {item.children.map((c) => (
                      <li key={c.to}>
                        <Link
                          to={c.to}
                          data-testid={`nav-sub-${c.to.split("#")[1]}`}
                          className="block px-6 py-3 text-sm text-brand-ink hover:bg-brand-surfaceAlt hover:text-brand-navy transition-colors"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <Link
          to="/contact"
          data-testid="nav-cta-quote"
          className="hidden lg:inline-flex nv-btn-primary py-3 px-6"
        >
          Request a Quote
        </Link>

        <button
          type="button"
          data-testid="mobile-menu-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="lg:hidden p-2 text-brand-ink"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-brand-line max-h-[80vh] overflow-y-auto">
          <div className="nv-container py-6 flex flex-col gap-1">
            {navItems.map((item) => (
              <div key={item.to} className="border-b border-brand-line/70">
                <div className="flex items-center justify-between">
                  <NavLink
                    to={item.to}
                    data-testid={`mobile-nav-link-${item.label.toLowerCase().replace(/[^a-z]/g, "")}`}
                    className={({ isActive }) =>
                      `flex-1 py-3 ${
                        isActive ? "text-brand-navy" : "text-brand-ink"
                      } text-base font-medium`
                    }
                  >
                    {item.label}
                  </NavLink>
                  {item.children && (
                    <button
                      type="button"
                      onClick={() =>
                        setMobileSub((v) => (v === item.label ? null : item.label))
                      }
                      data-testid="mobile-services-toggle"
                      className="p-3"
                      aria-label="Toggle submenu"
                    >
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${
                          mobileSub === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
                {item.children && mobileSub === item.label && (
                  <ul className="pb-3 pl-3 space-y-1">
                    {item.children.map((c) => (
                      <li key={c.to}>
                        <Link
                          to={c.to}
                          data-testid={`mobile-nav-sub-${c.to.split("#")[1]}`}
                          className="block py-2 text-sm text-brand-inkMuted hover:text-brand-navy"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <Link
              to="/contact"
              data-testid="mobile-nav-cta-quote"
              className="nv-btn-primary mt-6 w-full"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export const Footer = () => {
  const footerLinks = navItems.map((n) => ({ to: n.to, label: n.label }));
  return (
    <footer data-testid="site-footer" className="bg-brand-ink text-white/80">
      <div className="nv-container py-20 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <h3 className="font-heading text-3xl text-white tracking-tight">
            NikoVision
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/70 max-w-md">
            uPVC windows & doors, supplied and installed across Adelaide.
            Independent. Detail-obsessed. Built to outlast trends.
          </p>
          <p className="mt-8 nv-overline text-white/60">By Theo</p>
        </div>

        <div className="md:col-span-3">
          <p className="nv-overline text-white/60 mb-5">Explore</p>
          <ul className="space-y-3 text-sm">
            {footerLinks.map((n) => (
              <li key={n.to}>
                <Link
                  data-testid={`footer-link-${n.label.toLowerCase().replace(/[^a-z]/g, "")}`}
                  to={n.to}
                  className="hover:text-white transition-colors"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="nv-overline text-white/60 mb-5">Contact</p>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <Phone size={16} className="mt-0.5 text-brand-sand" />
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                data-testid="footer-phone"
                className="hover:text-white"
              >
                {SITE.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={16} className="mt-0.5 text-brand-sand" />
              <a
                href={`mailto:${SITE.email}`}
                data-testid="footer-email"
                className="hover:text-white"
              >
                {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 text-brand-sand" />
              <span data-testid="footer-area">{SITE.serviceArea}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="nv-container py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} NikoVision. All rights reserved.</p>
          <p data-testid="footer-abn">ABN {SITE.abn}</p>
          <p>Crafted for Adelaide homes.</p>
        </div>
      </div>
    </footer>
  );
};

export const PageShell = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-brand-bg text-brand-ink">
    <Navbar />
    <main className="flex-1 pt-20">{children}</main>
    <Footer />
  </div>
);
