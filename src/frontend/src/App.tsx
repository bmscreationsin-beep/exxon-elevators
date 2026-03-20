import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { useSubmitInquiry } from "./hooks/useQueries";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Product {
  name: string;
  description: string;
  image: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    name: "Home Elevators",
    description:
      "Elegant residential elevators designed for modern homes, combining style with silent operation and compact footprints.",
    image: "/assets/generated/product-home-elevator.dim_600x400.jpg",
  },
  {
    name: "Passenger Elevator",
    description:
      "High-capacity passenger lifts for commercial buildings, engineered for smooth rides and maximum throughput efficiency.",
    image: "/assets/generated/product-passenger-elevator.dim_600x400.jpg",
  },
  {
    name: "Goods Elevator",
    description:
      "Heavy-duty freight elevators built to handle industrial loads with reinforced cabin walls and robust drive systems.",
    image: "/assets/generated/product-goods-elevator.dim_600x400.jpg",
  },
  {
    name: "Hydraulic Elevator",
    description:
      "Smooth and energy-efficient hydraulic lifts ideal for low-to-mid rise buildings, offering quiet operation.",
    image: "/assets/generated/product-hydraulic-elevator.dim_600x400.jpg",
  },
  {
    name: "Hospital Elevator",
    description:
      "Specialized medical-grade elevators with anti-bacterial surfaces, stretcher capacity and emergency failsafe systems.",
    image: "/assets/generated/product-hospital-elevator.dim_600x400.jpg",
  },
  {
    name: "MRL Elevators",
    description:
      "Machine Room Less elevators that maximize usable space while delivering superior performance and energy savings.",
    image: "/assets/generated/product-mrl-elevator.dim_600x400.jpg",
  },
];

const STATS = [
  { value: "500+", label: "Projects Completed" },
  { value: "15+", label: "Years of Excellence" },
  { value: "6", label: "Product Lines" },
  { value: "24/7", label: "Support Available" },
];

const FEATURES = [
  {
    iconPath:
      "M16 3L4 9v7c0 7.18 5.15 13.9 12 15.5C23.85 29.9 29 23.18 29 16V9L16 3z",
    checkPath: "M11 16l3.5 3.5L21 13",
    label: "Safety First",
    title: "Safety First",
    desc: "All elevators comply with the latest national and international safety standards with triple redundancy systems.",
  },
  {
    iconPath:
      "M16 4l2.47 7.6H27l-6.88 5 2.47 7.6L16 19.2l-6.59 5L11.88 16.6 5 11.6h8.53L16 4z",
    checkPath: null,
    label: "Premium Quality",
    title: "Premium Quality",
    desc: "We use only certified components and premium materials to ensure a lifetime of reliable, luxurious performance.",
  },
  {
    iconPath: null,
    checkPath: null,
    label: "Expert Team",
    title: "Expert Team",
    desc: "Our certified engineers bring decades of expertise in design, installation, maintenance and modernization.",
  },
  {
    iconPath: null,
    checkPath: null,
    label: "Nationwide Service",
    title: "Nationwide Service",
    desc: "With service centers across the country, we guarantee rapid response times and comprehensive after-sales support.",
  },
];

// ─── Icon Components ──────────────────────────────────────────────────────────
function SafetyIcon() {
  return (
    <svg
      role="img"
      aria-label="Safety"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
    >
      <title>Safety</title>
      <path
        d="M16 3L4 9v7c0 7.18 5.15 13.9 12 15.5C23.85 29.9 29 23.18 29 16V9L16 3z"
        stroke="#D8C39A"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M11 16l3.5 3.5L21 13"
        stroke="#D8C39A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function QualityIcon() {
  return (
    <svg
      role="img"
      aria-label="Quality"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
    >
      <title>Quality</title>
      <path
        d="M16 4l2.47 7.6H27l-6.88 5 2.47 7.6L16 19.2l-6.59 5L11.88 16.6 5 11.6h8.53L16 4z"
        stroke="#D8C39A"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg
      role="img"
      aria-label="Team"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
    >
      <title>Team</title>
      <circle cx="12" cy="10" r="5" stroke="#D8C39A" strokeWidth="2" />
      <circle cx="22" cy="12" r="4" stroke="#D8C39A" strokeWidth="2" />
      <path
        d="M3 26c0-4.97 4.03-9 9-9h2c4.97 0 9 4.03 9 9"
        stroke="#D8C39A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M22 20c2.76 0 5 2.24 5 5"
        stroke="#D8C39A"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ServiceIcon() {
  return (
    <svg
      role="img"
      aria-label="Service"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
    >
      <title>Service</title>
      <circle cx="16" cy="16" r="12" stroke="#D8C39A" strokeWidth="2" />
      <path
        d="M16 4v12l6 4"
        stroke="#D8C39A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const FEATURE_ITEMS = [
  {
    icon: <SafetyIcon />,
    title: "Safety First",
    desc: "All elevators comply with the latest national and international safety standards with triple redundancy systems.",
  },
  {
    icon: <QualityIcon />,
    title: "Premium Quality",
    desc: "We use only certified components and premium materials to ensure a lifetime of reliable, luxurious performance.",
  },
  {
    icon: <TeamIcon />,
    title: "Expert Team",
    desc: "Our certified engineers bring decades of expertise in design, installation, maintenance and modernization.",
  },
  {
    icon: <ServiceIcon />,
    title: "Nationwide Service",
    desc: "With service centers across the country, we guarantee rapid response times and comprehensive after-sales support.",
  },
];

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1 },
    );
    const elements = document.querySelectorAll(".reveal");
    for (const el of elements) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
}

// ─── Shield SVG ───────────────────────────────────────────────────────────────
function ShieldIcon() {
  return (
    <svg
      role="img"
      aria-label="Exxon Elevators Shield"
      width="28"
      height="32"
      viewBox="0 0 28 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Exxon Elevators Shield</title>
      <path
        d="M14 1L2 6.5V15C2 22.73 7.45 29.97 14 31.5C20.55 29.97 26 22.73 26 15V6.5L14 1Z"
        fill="url(#shieldGrad)"
        stroke="#B79C6B"
        strokeWidth="1.5"
      />
      <path
        d="M9 16l3.5 3.5L19 12"
        stroke="#0F1418"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="shieldGrad"
          x1="2"
          y1="1"
          x2="26"
          y2="31.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D8C39A" />
          <stop offset="1" stopColor="#B79C6B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "background 0.3s, box-shadow 0.3s",
        background: scrolled ? "rgba(15,20,24,0.97)" : "rgba(15,20,24,0.5)",
        backdropFilter: "blur(12px)",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.5)" : "none",
        borderBottom: scrolled ? "1px solid #2E3840" : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <button
          type="button"
          data-ocid="nav.link"
          onClick={() => {
            scrollTo("home");
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <ShieldIcon />
          <span
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 900,
              fontSize: 18,
              letterSpacing: "0.12em",
              color: "#E6E8EA",
              lineHeight: 1.1,
            }}
          >
            EXXON
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #D8C39A, #B79C6B)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontSize: 13,
                letterSpacing: "0.18em",
              }}
            >
              ELEVATORS
            </span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", gap: 36 }} className="hidden md:flex">
          {["Home", "Products", "About", "Contact"].map((item) => (
            <button
              type="button"
              key={item}
              data-ocid="nav.link"
              onClick={() => {
                scrollTo(item.toLowerCase());
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.1em",
                color: "#C8CDD1",
                textTransform: "uppercase",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#D8C39A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#C8CDD1";
              }}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button
          type="button"
          data-ocid="header.primary_button"
          onClick={() => {
            scrollTo("contact");
          }}
          style={{
            background: "linear-gradient(135deg, #D8C39A, #B79C6B)",
            color: "#0F1418",
            border: "none",
            padding: "10px 22px",
            borderRadius: 4,
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "opacity 0.2s, transform 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.85";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.transform = "translateY(0)";
          }}
          className="hidden md:block"
        >
          Get a Quote
        </button>

        {/* Mobile Hamburger */}
        <button
          type="button"
          data-ocid="nav.toggle"
          onClick={() => {
            setMobileOpen((v) => !v);
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: 5,
            padding: 4,
          }}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 24,
                height: 2,
                background: "#D8C39A",
                borderRadius: 2,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "#0F1418",
              borderTop: "1px solid #2E3840",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "16px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {["Home", "Products", "About", "Contact"].map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => {
                    scrollTo(item.toLowerCase());
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    letterSpacing: "0.1em",
                    color: "#C8CDD1",
                    textTransform: "uppercase",
                    textAlign: "left",
                    padding: "10px 0",
                    borderBottom: "1px solid #1B2329",
                  }}
                >
                  {item}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  scrollTo("contact");
                }}
                style={{
                  background: "linear-gradient(135deg, #D8C39A, #B79C6B)",
                  color: "#0F1418",
                  border: "none",
                  padding: "12px 22px",
                  borderRadius: 4,
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  marginTop: 8,
                }}
              >
                Get a Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url('/assets/generated/hero-elevator.dim_1600x900.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(15,20,24,0.92) 0%, rgba(15,20,24,0.6) 60%, rgba(15,20,24,0.4) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1280,
          margin: "0 auto",
          padding: "120px 24px 80px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "0.3em",
              color: "#B79C6B",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Precision Engineering · Premium Elevators
          </p>
          <h1
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(42px, 7vw, 96px)",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: "#E6E8EA",
              marginBottom: 32,
              maxWidth: 800,
            }}
          >
            LIFTING YOUR
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #D8C39A, #B79C6B)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              TRUST
            </span>{" "}
            TO
            <br />
            NEW HEIGHTS
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: 18,
              color: "#C8CDD1",
              maxWidth: 520,
              lineHeight: 1.7,
              marginBottom: 44,
            }}
          >
            Exxon Elevators delivers world-class vertical transportation
            solutions — engineered for safety, designed for luxury, built to
            last.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button
              type="button"
              data-ocid="hero.primary_button"
              onClick={() => {
                scrollTo("contact");
              }}
              style={{
                background: "linear-gradient(135deg, #D8C39A, #B79C6B)",
                color: "#0F1418",
                border: "none",
                padding: "16px 36px",
                borderRadius: 4,
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(183,156,107,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Get a Free Quote
            </button>
            <button
              type="button"
              data-ocid="hero.secondary_button"
              onClick={() => {
                scrollTo("products");
              }}
              style={{
                background: "transparent",
                color: "#E6E8EA",
                border: "2px solid #39444C",
                padding: "14px 36px",
                borderRadius: 4,
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#B79C6B";
                e.currentTarget.style.color = "#D8C39A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#39444C";
                e.currentTarget.style.color = "#E6E8EA";
              }}
            >
              Explore Products
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{
            position: "absolute",
            bottom: 40,
            left: 24,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.6,
              ease: "easeInOut",
            }}
            style={{
              width: 2,
              height: 40,
              background: "linear-gradient(to bottom, #D8C39A, transparent)",
              borderRadius: 1,
            }}
          />
          <span
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: 11,
              letterSpacing: "0.2em",
              color: "#8F9AA3",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Metal Divider ────────────────────────────────────────────────────────────
function MetalDivider() {
  return (
    <div
      style={{
        position: "relative",
        height: 12,
        background:
          "linear-gradient(90deg, #1B2329, #2A343B 30%, #39444C 50%, #2A343B 70%, #1B2329)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.3,
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 120px, rgba(183,156,107,0.4) 120px, rgba(183,156,107,0.4) 122px)",
        }}
      />
    </div>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar() {
  return (
    <section
      style={{
        background: "linear-gradient(90deg, #1B2329, #242D34, #1B2329)",
        borderTop: "1px solid #2E3840",
        borderBottom: "1px solid #2E3840",
        padding: "48px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 32,
          textAlign: "center",
        }}
      >
        {STATS.map((stat) => (
          <div key={stat.value} className="reveal reveal-delay-1">
            <div
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(36px, 5vw, 56px)",
                background: "linear-gradient(135deg, #D8C39A, #B79C6B)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: 8,
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: "0.2em",
                color: "#8F9AA3",
                textTransform: "uppercase",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Products ─────────────────────────────────────────────────────────────────
function ProductsSection() {
  return (
    <section
      id="products"
      style={{ background: "#0F1418", padding: "100px 24px" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          className="reveal"
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <p
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: "0.4em",
              color: "#B79C6B",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            What We Offer
          </p>
          <h2
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(32px, 5vw, 56px)",
              color: "#E6E8EA",
              letterSpacing: "-0.02em",
              marginBottom: 20,
            }}
          >
            OUR PRODUCTS
          </h2>
          <div
            style={{
              width: 60,
              height: 3,
              background: "linear-gradient(135deg, #D8C39A, #B79C6B)",
              margin: "0 auto",
              borderRadius: 2,
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 28,
          }}
        >
          {PRODUCTS.map((product, i) => (
            <article
              key={product.name}
              data-ocid={`products.item.${i + 1}`}
              className={`brass-border-glow reveal reveal-delay-${(i % 3) + 1}`}
              style={{
                background: "#151B20",
                border: "1px solid #2E3840",
                borderRadius: 8,
                overflow: "hidden",
                transition:
                  "transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.35s",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  position: "relative",
                  paddingTop: "62%",
                  overflow: "hidden",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(15,20,24,0.7) 0%, transparent 50%)",
                  }}
                />
              </div>
              <div style={{ padding: "24px 28px" }}>
                <h3
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 800,
                    fontSize: 18,
                    color: "#E6E8EA",
                    marginBottom: 10,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {product.name}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    color: "#8F9AA3",
                    lineHeight: 1.7,
                  }}
                >
                  {product.description}
                </p>
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: "#B79C6B",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 600,
                    fontSize: 12,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  <span>Learn More</span>
                  <svg
                    role="img"
                    aria-label="arrow"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <title>Arrow</title>
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="#B79C6B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────
function WhyChooseUs() {
  return (
    <section
      id="about"
      style={{
        background: "#0D1115",
        padding: "100px 24px",
        borderTop: "1px solid #1B2329",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
          gap: 64,
          alignItems: "center",
        }}
      >
        <div>
          <div className="reveal">
            <p
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: "0.4em",
                color: "#B79C6B",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Why Exxon
            </p>
            <h2
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(28px, 4vw, 48px)",
                color: "#E6E8EA",
                letterSpacing: "-0.02em",
                marginBottom: 16,
              }}
            >
              BUILT ON TRUST.
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #D8C39A, #B79C6B)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ENGINEERED
              </span>{" "}
              FOR LIFE.
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 15,
                color: "#8F9AA3",
                lineHeight: 1.75,
                marginBottom: 48,
              }}
            >
              With over 15 years of excellence in vertical transportation, Exxon
              Elevators stands as a symbol of quality and reliability across
              India.
            </p>
          </div>

          <div style={{ display: "grid", gap: 32 }}>
            {FEATURE_ITEMS.map((feature, idx) => (
              <div
                key={feature.title}
                className={`reveal reveal-delay-${idx + 1}`}
                style={{ display: "flex", gap: 20, alignItems: "flex-start" }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 56,
                    height: 56,
                    background: "#1B2329",
                    border: "1px solid #2E3840",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 800,
                      fontSize: 16,
                      color: "#E6E8EA",
                      marginBottom: 6,
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 14,
                      color: "#8F9AA3",
                      lineHeight: 1.7,
                    }}
                  >
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal" style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: -12,
              background:
                "linear-gradient(135deg, rgba(216,195,154,0.12), transparent)",
              borderRadius: 12,
              zIndex: 0,
            }}
          />
          <img
            src="/assets/uploads/WhatsApp-Image-2026-03-20-at-1.04.56-PM-1.jpeg"
            alt="Exxon Elevators Company Brochure"
            style={{
              width: "100%",
              borderRadius: 8,
              border: "1px solid #2E3840",
              position: "relative",
              zIndex: 1,
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: 24,
              right: 24,
              background: "rgba(15,20,24,0.85)",
              backdropFilter: "blur(8px)",
              borderRadius: 8,
              padding: "16px 20px",
              border: "1px solid #2E3840",
              zIndex: 2,
            }}
          >
            <p
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: "#D8C39A",
                marginBottom: 4,
              }}
            >
              K. Hemanth Sai
            </p>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                color: "#8F9AA3",
                letterSpacing: "0.05em",
              }}
            >
              Proprietor, Exxon Elevators
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const { mutate: submitInquiry, isPending, isSuccess } = useSubmitInquiry();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitInquiry(form, {
      onSuccess: () => {
        toast.success(
          "Your inquiry has been submitted! We'll contact you soon.",
        );
        setForm({ name: "", email: "", phone: "", message: "" });
      },
      onError: () => {
        toast.error("Failed to send inquiry. Please try again.");
      },
    });
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#1B2329",
    border: "1px solid #2E3840",
    borderRadius: 4,
    padding: "14px 16px",
    fontFamily: "Inter, sans-serif",
    fontSize: 14,
    color: "#E6E8EA",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 600,
    fontSize: 11,
    letterSpacing: "0.15em",
    color: "#8F9AA3",
    textTransform: "uppercase",
    marginBottom: 8,
  };

  return (
    <section
      id="contact"
      style={{
        background: "#0A0E11",
        padding: "100px 24px",
        borderTop: "1px solid #1B2329",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          className="reveal"
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <p
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: "0.4em",
              color: "#B79C6B",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Get In Touch
          </p>
          <h2
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(32px, 5vw, 56px)",
              color: "#E6E8EA",
              letterSpacing: "-0.02em",
              marginBottom: 20,
            }}
          >
            CONTACT US
          </h2>
          <div
            style={{
              width: 60,
              height: 3,
              background: "linear-gradient(135deg, #D8C39A, #B79C6B)",
              margin: "0 auto",
              borderRadius: 2,
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 56,
            alignItems: "start",
          }}
        >
          {/* Left: Contact Info */}
          <div className="reveal">
            <h3
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 800,
                fontSize: 22,
                color: "#E6E8EA",
                marginBottom: 12,
              }}
            >
              We're here to help
            </h3>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 15,
                color: "#8F9AA3",
                lineHeight: 1.75,
                marginBottom: 40,
              }}
            >
              Whether you need a new elevator installation, maintenance service,
              or a complete modernization — our team is ready to assist.
            </p>

            {[
              {
                svgPath:
                  "M6.6 10.8C7.8 13.2 9.8 15.2 12.2 16.4l1.8-1.8c.2-.2.5-.3.8-.1 1 .3 2 .5 3.2.5.5 0 .9.4.9.9v3.1c0 .5-.4.9-.9.9C9.4 20.9 3.1 14.6 3.1 6.9c0-.5.4-.9.9-.9H7.1c.5 0 .9.4.9.9 0 1.2.2 2.2.5 3.2.1.3 0 .6-.2.8L6.6 10.8z",
                iconLabel: "Phone",
                label: "Phone",
                value: "+91 9490579301",
                href: "tel:+919490579301",
              },
              {
                svgPath:
                  "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z",
                svgPath2: "M22,6 12,13 2,6",
                iconLabel: "Email",
                label: "Email",
                value: "exxonelevators@gmail.com",
                href: "mailto:exxonelevators@gmail.com",
              },
              {
                svgPath: "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z",
                svgPath2: "circle:12,10,3",
                iconLabel: "Address",
                label: "Address",
                value: "Andhra Pradesh, India",
                href: undefined,
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{ display: "flex", gap: 20, marginBottom: 32 }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 48,
                    height: 48,
                    background: "#1B2329",
                    border: "1px solid #2E3840",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    role="img"
                    aria-label={item.iconLabel}
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <title>{item.iconLabel}</title>
                    <path
                      d={item.svgPath}
                      stroke="#D8C39A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: 12,
                      letterSpacing: "0.15em",
                      color: "#8F9AA3",
                      textTransform: "uppercase",
                      marginBottom: 4,
                    }}
                  >
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 15,
                        color: "#C8CDD1",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#D8C39A";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#C8CDD1";
                      }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 15,
                        color: "#C8CDD1",
                      }}
                    >
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Form */}
          <div className="reveal reveal-delay-2">
            <form
              data-ocid="contact.modal"
              onSubmit={handleSubmit}
              style={{
                background: "#151B20",
                border: "1px solid #2E3840",
                borderRadius: 8,
                padding: "40px",
              }}
            >
              <h3
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 800,
                  fontSize: 20,
                  color: "#E6E8EA",
                  marginBottom: 28,
                }}
              >
                Send an Inquiry
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 16,
                }}
              >
                <div>
                  <label htmlFor="contact-name" style={labelStyle}>
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    data-ocid="contact.input"
                    type="text"
                    required
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => {
                      setForm((p) => ({ ...p, name: e.target.value }));
                    }}
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#B79C6B";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#2E3840";
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" style={labelStyle}>
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    data-ocid="contact.input"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => {
                      setForm((p) => ({ ...p, email: e.target.value }));
                    }}
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#B79C6B";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#2E3840";
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label htmlFor="contact-phone" style={labelStyle}>
                  Phone
                </label>
                <input
                  id="contact-phone"
                  data-ocid="contact.input"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={form.phone}
                  onChange={(e) => {
                    setForm((p) => ({ ...p, phone: e.target.value }));
                  }}
                  style={inputStyle}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#B79C6B";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#2E3840";
                  }}
                />
              </div>

              <div style={{ marginBottom: 28 }}>
                <label htmlFor="contact-message" style={labelStyle}>
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  data-ocid="contact.textarea"
                  required
                  rows={5}
                  placeholder="Tell us about your elevator requirements..."
                  value={form.message}
                  onChange={(e) => {
                    setForm((p) => ({ ...p, message: e.target.value }));
                  }}
                  style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#B79C6B";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#2E3840";
                  }}
                />
              </div>

              <button
                data-ocid="contact.submit_button"
                type="submit"
                disabled={isPending}
                style={{
                  width: "100%",
                  background: isPending
                    ? "#6b6050"
                    : "linear-gradient(135deg, #D8C39A, #B79C6B)",
                  color: "#0F1418",
                  border: "none",
                  padding: "16px",
                  borderRadius: 4,
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 800,
                  fontSize: 13,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: isPending ? "not-allowed" : "pointer",
                  transition: "opacity 0.2s",
                }}
              >
                {isPending
                  ? "Sending..."
                  : isSuccess
                    ? "Inquiry Sent ✓"
                    : "Send Inquiry"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const currentYear = new Date().getFullYear();
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: "#080C0F", borderTop: "1px solid #1B2329" }}>
      <div
        style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px 32px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 48,
            marginBottom: 56,
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 20,
              }}
            >
              <ShieldIcon />
              <span
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 900,
                  fontSize: 16,
                  letterSpacing: "0.1em",
                  color: "#E6E8EA",
                }}
              >
                EXXON
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #D8C39A, #B79C6B)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                  }}
                >
                  ELEVATORS
                </span>
              </span>
            </div>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                color: "#8F9AA3",
                lineHeight: 1.7,
                marginBottom: 24,
              }}
            >
              Premium elevator solutions for residential, commercial, and
              industrial applications. Trusted by 500+ clients across India.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                {
                  label: "Facebook",
                  path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
                },
                {
                  label: "Instagram",
                  path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z",
                },
                {
                  label: "WhatsApp",
                  path: "M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.3-.345.45-.523.151-.18.2-.301.3-.5.099-.196.05-.371-.025-.521-.075-.148-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.295-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345z",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href="https://wa.me/919490579301"
                  style={{
                    width: 36,
                    height: 36,
                    background: "#1B2329",
                    border: "1px solid #2E3840",
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "#2A343B";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "#B79C6B";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "#1B2329";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "#2E3840";
                  }}
                  aria-label={social.label}
                >
                  <svg
                    role="img"
                    aria-label={social.label}
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <title>{social.label}</title>
                    <path
                      d={social.path}
                      stroke="#8F9AA3"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: "0.2em",
                color: "#E6E8EA",
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              Quick Links
            </h4>
            <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Home", "Products", "About", "Contact"].map((item) => (
                <button
                  type="button"
                  key={item}
                  data-ocid="nav.link"
                  onClick={() => {
                    scrollTo(item.toLowerCase());
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    color: "#8F9AA3",
                    textAlign: "left",
                    padding: 0,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#D8C39A";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#8F9AA3";
                  }}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          {/* Products */}
          <div>
            <h4
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: "0.2em",
                color: "#E6E8EA",
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              Products
            </h4>
            <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {PRODUCTS.map((p) => (
                <button
                  type="button"
                  key={p.name}
                  onClick={() => {
                    scrollTo("products");
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    color: "#8F9AA3",
                    textAlign: "left",
                    padding: 0,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#D8C39A";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#8F9AA3";
                  }}
                >
                  {p.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: "0.2em",
                color: "#E6E8EA",
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              Contact
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                    color: "#8F9AA3",
                    marginBottom: 4,
                  }}
                >
                  Proprietor
                </p>
                <p
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#C8CDD1",
                  }}
                >
                  K. Hemanth Sai
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                    color: "#8F9AA3",
                    marginBottom: 4,
                  }}
                >
                  Phone
                </p>
                <a
                  href="tel:+919490579301"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    color: "#C8CDD1",
                    textDecoration: "none",
                  }}
                >
                  +91 9490579301
                </a>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                    color: "#8F9AA3",
                    marginBottom: 4,
                  }}
                >
                  Email
                </p>
                <a
                  href="mailto:exxonelevators@gmail.com"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    color: "#C8CDD1",
                    textDecoration: "none",
                    wordBreak: "break-all",
                  }}
                >
                  exxonelevators@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            borderTop: "1px solid #1B2329",
            paddingTop: 32,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              color: "#8F9AA3",
            }}
          >
            © {currentYear} Exxon Elevators. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              color: "#8F9AA3",
            }}
          >
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#B79C6B", textDecoration: "none" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  useScrollReveal();

  return (
    <div style={{ minHeight: "100vh", background: "#0F1418" }}>
      <Toaster position="top-right" richColors />
      <Header />
      <main>
        <Hero />
        <MetalDivider />
        <StatsBar />
        <MetalDivider />
        <ProductsSection />
        <WhyChooseUs />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

// suppress unused import warning
void FEATURES;
