"use client";

import { useEffect, useRef, useState } from "react";

// Navigation Component
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#sectors", label: "Sectors" },
    { href: "#coverage", label: "Coverage" },
    { href: "#edge", label: "Why Us" },
    { href: "#clients", label: "Clients" },
    { href: "#contact", label: "Contact" },
    { href: "/propose-property", label: "Propose Property" },
  ];

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav aria-label="Main navigation" className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2" aria-label="PROPTIM - Home">
          <Logo />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors ${
                scrolled
                  ? "text-gray-600 hover:text-[#0077B5]"
                  : "text-gray-700 hover:text-[#0077B5]"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:9165477999"
            className="bg-[#0077B5] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#005a8c] shadow-lg shadow-[#0077B5]/20"
          >
            Call Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-gray-600 hover:text-[#0077B5] py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:9165477999"
              className="block bg-[#0077B5] text-white px-5 py-3 rounded-full text-center font-semibold mt-4"
            >
              Call Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

// Logo Component
function Logo() {
  return (
    <div className="flex items-center">
      <span className="text-2xl font-bold tracking-tight">
        <span className="text-[#0077B5]">PR</span>
        <span className="relative">
          <span className="text-[#0077B5]">O</span>
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-3 h-3 rounded-full bg-[#8ED1FC] opacity-60"></span>
          </span>
        </span>
        <span className="text-[#0077B5]">PTIM</span>
      </span>
    </div>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-[#f8fafb] to-[#E8F4FC]"
    >
      {/* Blueprint Pattern */}
      <div className="absolute inset-0 blueprint-pattern opacity-50"></div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-gradient-to-br from-[#8ED1FC] to-[#E8F4FC] opacity-40 blur-3xl animate-pulse-soft"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-[#0077B5] to-[#8ED1FC] opacity-20 blur-3xl animate-pulse-soft delay-500"></div>

      {/* Geometric Decorations */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-[#0077B5]/10 rounded-full animate-float"></div>
      <div className="absolute bottom-1/3 left-1/5 w-20 h-20 border-2 border-[#8ED1FC]/20 rounded-full animate-float delay-300"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#0077B5]/10 rounded-full px-4 py-2 mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#0077B5] animate-pulse"></span>
            <span className="text-sm font-medium text-gray-600">
              Commercial Real Estate Advisory
            </span>
          </div>
        </div>

        <h1 id="hero-heading" className="text-5xl md:text-7xl lg:text-8xl font-normal mb-6 animate-fade-in-up delay-100">
          <span className="text-[#0077B5]">PR</span>
          <span className="relative inline-block">
            <span className="text-[#0077B5]">O</span>
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#8ED1FC] opacity-50"></span>
            </span>
          </span>
          <span className="text-[#0077B5]">PTIM</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-500 mb-4 animate-fade-in-up delay-200 tracking-wide">
          Property Consultants
        </p>

        <div className="relative inline-block animate-fade-in-up delay-300">
          <div className="absolute -left-4 top-1/2 w-8 h-[2px] bg-[#0077B5]"></div>
          <div className="absolute -right-4 top-1/2 w-8 h-[2px] bg-[#0077B5]"></div>
          <h2 className="text-2xl md:text-3xl italic text-[#0077B5] px-6">
            Optimizing Properties
          </h2>
        </div>

        <p className="max-w-2xl mx-auto text-gray-600 mt-10 text-lg leading-relaxed animate-fade-in-up delay-400">
          Helping occupiers, investors and landlords make smarter, faster &
          better property decisions across Central India.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 animate-fade-in-up delay-500">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-[#0077B5] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#005a8c] shadow-xl shadow-[#0077B5]/25 transition-all hover:scale-105"
          >
            Get in Touch
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <a
            href="/propose-property"
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-full text-lg font-medium border border-gray-200 hover:border-[#0077B5] hover:text-[#0077B5] transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Propose Property
          </a>
        </div>

        {/* Service Pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-16 animate-fade-in-up delay-600">
          {["Retail", "F&B", "Warehouse", "Workspace"].map((service) => (
            <span
              key={service}
              className="px-5 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full text-sm text-gray-600 shadow-sm"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-[#0077B5]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E8F4FC]/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block text-[#0077B5] text-sm font-semibold tracking-widest uppercase mb-4">
              About Us
            </span>
            <h2 id="about-heading" className="text-4xl md:text-5xl mb-6 leading-tight">
              Your Trusted Partner in{" "}
              <span className="text-[#0077B5]">Commercial Real Estate</span>
            </h2>
            <div className="w-20 h-1 bg-[#0077B5] mb-8"></div>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              PROPTIM is a commercial real estate advisory based in Raipur,
              Chhattisgarh, serving clients across Central India with a core
              focus on Chhattisgarh and Madhya Pradesh.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Founded by a seasoned CRE professional, PROPTIM blends
              institutional-grade rigour with founder-led attention to help
              occupiers, investors and landlords make smarter, faster & better
              property decisions.
            </p>

            <div className="mt-10 flex items-center gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#0077B5]">250+</div>
                <div className="text-sm text-gray-500 mt-1">Transactions</div>
              </div>
              <div className="w-px h-16 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#0077B5]">5+</div>
                <div className="text-sm text-gray-500 mt-1">Years</div>
              </div>
              <div className="w-px h-16 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#0077B5]">50+</div>
                <div className="text-sm text-gray-500 mt-1">Brands</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#8ED1FC]/20 rounded-full blur-3xl"></div>
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl shadow-[#0077B5]/10 border border-gray-100">
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
                    title: "Offices",
                    desc: "Workspace Solutions",
                  },
                  {
                    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
                    title: "Retail",
                    desc: "High-street Locations",
                  },
                  {
                    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                    title: "F&B",
                    desc: "Restaurant Spaces",
                  },
                  {
                    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
                    title: "Logistics",
                    desc: "Warehouse Facilities",
                  },
                ].map((item, index) => (
                  <div
                    key={item.title}
                    className="p-6 rounded-2xl bg-gradient-to-br from-[#f8fafb] to-white border border-gray-100 hover:border-[#0077B5]/20 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#0077B5]/10 flex items-center justify-center mb-4 group-hover:bg-[#0077B5] transition-colors">
                      <svg
                        className="w-6 h-6 text-[#0077B5] group-hover:text-white transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d={item.icon}
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Sectors Section
function SectorsSection() {
  const sectors = [
    {
      title: "Offices / Workspace",
      description:
        "Premium office spaces and co-working solutions for businesses of all sizes. From startups to enterprises.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      color: "from-blue-500 to-cyan-400",
    },
    {
      title: "Retail / High-street",
      description:
        "Strategic retail locations on high-traffic streets and premium shopping destinations.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      color: "from-emerald-500 to-teal-400",
    },
    {
      title: "Quick Service Restaurants",
      description:
        "High-visibility locations perfect for QSR chains, cafes, and food service businesses.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "from-orange-500 to-amber-400",
    },
    {
      title: "Logistics & Warehousing",
      description:
        "Industrial spaces and warehouse facilities in strategic locations with excellent connectivity.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      color: "from-purple-500 to-indigo-400",
    },
  ];

  return (
    <section
      id="sectors"
      className="section-padding bg-gradient-to-b from-[#f8fafb] to-white relative overflow-hidden"
    >
      <div className="absolute inset-0 blueprint-pattern-dense opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <span className="inline-block text-[#0077B5] text-sm font-semibold tracking-widest uppercase mb-4">
            Our Expertise
          </span>
          <h2 className="text-4xl md:text-5xl mb-6">
            Sectors We <span className="text-[#0077B5]">Serve</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive commercial real estate solutions across diverse
            sectors
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((sector, index) => (
            <div
              key={sector.title}
              className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-transparent transition-all duration-300 hover:shadow-2xl hover:shadow-[#0077B5]/10"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${sector.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`}
              ></div>
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${sector.color} flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform`}
              >
                {sector.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {sector.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {sector.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Coverage Section
function CoverageSection() {
  const locations = [
    { name: "Raipur-Naya Raipur", type: "HQ" },
    { name: "Durg-Bhilai", type: "Major" },
    { name: "Korba", type: "Major" },
    { name: "Bilaspur", type: "Major" },
    { name: "Bhopal", type: "MP" },
    { name: "Indore", type: "MP" },
    { name: "Jabalpur", type: "MP" },
  ];

  return (
    <section id="coverage" className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 bg-gradient-to-r from-[#E8F4FC] to-transparent rounded-full blur-3xl opacity-60"></div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Map Visualization */}
              <div className="bg-gradient-to-br from-[#E8F4FC] to-white rounded-3xl p-8 border border-[#0077B5]/10">
                <div className="aspect-square relative">
                  {/* Simplified Central India Map */}
                  <svg
                    viewBox="0 0 400 400"
                    className="w-full h-full"
                    fill="none"
                  >
                    {/* Background circle */}
                    <circle
                      cx="200"
                      cy="200"
                      r="180"
                      fill="#0077B5"
                      fillOpacity="0.05"
                    />
                    <circle
                      cx="200"
                      cy="200"
                      r="140"
                      fill="#0077B5"
                      fillOpacity="0.05"
                    />
                    <circle
                      cx="200"
                      cy="200"
                      r="100"
                      fill="#0077B5"
                      fillOpacity="0.05"
                    />

                    {/* Connection lines */}
                    <g stroke="#0077B5" strokeWidth="1" strokeOpacity="0.3">
                      <line x1="200" y1="200" x2="120" y2="150" />
                      <line x1="200" y1="200" x2="280" y2="140" />
                      <line x1="200" y1="200" x2="150" y2="280" />
                      <line x1="200" y1="200" x2="300" y2="250" />
                      <line x1="200" y1="200" x2="100" y2="220" />
                      <line x1="200" y1="200" x2="250" y2="320" />
                    </g>

                    {/* Location dots */}
                    {/* Raipur - Center */}
                    <circle cx="200" cy="200" r="12" fill="#0077B5" />
                    <circle
                      cx="200"
                      cy="200"
                      r="20"
                      fill="#0077B5"
                      fillOpacity="0.2"
                    />
                    <text
                      x="200"
                      y="175"
                      textAnchor="middle"
                      fill="#0077B5"
                      fontSize="12"
                      fontWeight="600"
                    >
                      Raipur (HQ)
                    </text>

                    {/* Durg-Bhilai */}
                    <circle cx="150" cy="220" r="8" fill="#0077B5" />
                    <text
                      x="150"
                      y="240"
                      textAnchor="middle"
                      fill="#374151"
                      fontSize="10"
                    >
                      Durg-Bhilai
                    </text>

                    {/* Korba */}
                    <circle cx="280" cy="140" r="8" fill="#0077B5" />
                    <text
                      x="280"
                      y="160"
                      textAnchor="middle"
                      fill="#374151"
                      fontSize="10"
                    >
                      Korba
                    </text>

                    {/* Bilaspur */}
                    <circle cx="260" cy="180" r="8" fill="#0077B5" />
                    <text
                      x="290"
                      y="185"
                      textAnchor="start"
                      fill="#374151"
                      fontSize="10"
                    >
                      Bilaspur
                    </text>

                    {/* Bhopal */}
                    <circle cx="100" cy="150" r="8" fill="#8ED1FC" />
                    <text
                      x="100"
                      y="135"
                      textAnchor="middle"
                      fill="#374151"
                      fontSize="10"
                    >
                      Bhopal
                    </text>

                    {/* Indore */}
                    <circle cx="60" cy="200" r="8" fill="#8ED1FC" />
                    <text
                      x="60"
                      y="220"
                      textAnchor="middle"
                      fill="#374151"
                      fontSize="10"
                    >
                      Indore
                    </text>

                    {/* Jabalpur */}
                    <circle cx="140" cy="120" r="8" fill="#8ED1FC" />
                    <text
                      x="140"
                      y="105"
                      textAnchor="middle"
                      fill="#374151"
                      fontSize="10"
                    >
                      Jabalpur
                    </text>
                  </svg>
                </div>

                <div className="flex justify-center gap-8 mt-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#0077B5]"></span>
                    <span className="text-sm text-gray-600">Chhattisgarh</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#8ED1FC]"></span>
                    <span className="text-sm text-gray-600">Madhya Pradesh</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="inline-block text-[#0077B5] text-sm font-semibold tracking-widest uppercase mb-4">
              Coverage Area
            </span>
            <h2 className="text-4xl md:text-5xl mb-6 leading-tight">
              Across <span className="text-[#0077B5]">Central India</span>
            </h2>
            <div className="w-20 h-1 bg-[#0077B5] mb-8"></div>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Headquartered in Raipur with execution capabilities across Central
              India, including major and emerging corridors in Chhattisgarh and
              Madhya Pradesh, as well as key industrial/warehouse clusters.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {locations.map((loc) => (
                <div
                  key={loc.name}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-[#0077B5]/20 transition-colors"
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      loc.type === "HQ"
                        ? "bg-[#0077B5] ring-4 ring-[#0077B5]/20"
                        : loc.type === "MP"
                        ? "bg-[#8ED1FC]"
                        : "bg-[#0077B5]"
                    }`}
                  ></span>
                  <span className="text-gray-700 font-medium">{loc.name}</span>
                  {loc.type === "HQ" && (
                    <span className="text-xs bg-[#0077B5] text-white px-2 py-0.5 rounded-full">
                      HQ
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Edge Section (Why Choose Us)
function EdgeSection() {
  const edges = [
    {
      title: "Senior Led",
      description:
        "Every engagement is led by the founder to ensure quality and speed",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    },
    {
      title: "Need Analysis",
      description:
        "Curated, customized as per company's requirement & budget",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    },
    {
      title: "Data & Judgment",
      description:
        "We combine market data, on-ground intel and rigorous modelling",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    },
    {
      title: "Transparent Scope",
      description: "Clear deliverables, no surprises, aligned incentives",
      icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
    },
    {
      title: "Confidential & Ethical",
      description: "Strict conflict checks and professional standards",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    },
  ];

  return (
    <section
      id="edge"
      className="section-padding bg-gradient-to-br from-[#0077B5] via-[#005a8c] to-[#1a3a52] relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 blueprint-pattern opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8ED1FC]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <span className="inline-block text-[#8ED1FC] text-sm font-semibold tracking-widest uppercase mb-4">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl mb-6 text-white">
            The PROPTIM Edge
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            What sets us apart in the commercial real estate landscape
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {edges.map((edge, index) => (
            <div
              key={edge.title}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                <svg
                  className="w-7 h-7 text-[#8ED1FC]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d={edge.icon}
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {edge.title}
              </h3>
              <p className="text-white/70 leading-relaxed">{edge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Outcomes & Values Section
function OutcomesValuesSection() {
  const outcomes = [
    "Clear focus on expansion plan with time bound approach",
    "Structured transactions backed by disciplined underwriting and sensitivity analysis",
    "Tailored property solution with defined leasing strategies improving occupancy rate",
    "Faster time-to-decision via clear options, comparables and negotiation road maps",
  ];

  const values = [
    {
      title: "Integrity in Advice",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    },
    {
      title: "Performance over Promises",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
    },
    {
      title: "Client Confidentiality",
      icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    },
    {
      title: "Long-term Partnerships",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Outcomes */}
          <div>
            <span className="inline-block text-[#0077B5] text-sm font-semibold tracking-widest uppercase mb-4">
              What You Get
            </span>
            <h2 className="text-4xl md:text-5xl mb-6 leading-tight">
              Tangible <span className="text-[#0077B5]">Outcomes</span>
            </h2>
            <div className="w-20 h-1 bg-[#0077B5] mb-8"></div>

            <div className="space-y-4">
              {outcomes.map((outcome, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-5 bg-gradient-to-r from-[#f8fafb] to-white rounded-xl border border-gray-100 hover:border-[#0077B5]/20 transition-colors group"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0077B5]/10 flex items-center justify-center group-hover:bg-[#0077B5] transition-colors">
                    <svg
                      className="w-4 h-4 text-[#0077B5] group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{outcome}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div>
            <span className="inline-block text-[#0077B5] text-sm font-semibold tracking-widest uppercase mb-4">
              Our Foundation
            </span>
            <h2 className="text-4xl md:text-5xl mb-6 leading-tight">
              Our <span className="text-[#0077B5]">Values</span>
            </h2>
            <div className="w-20 h-1 bg-[#0077B5] mb-8"></div>

            <div className="grid grid-cols-2 gap-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="p-6 bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-xl hover:shadow-[#0077B5]/10 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0077B5] to-[#005a8c] flex items-center justify-center mb-4 shadow-lg shadow-[#0077B5]/20 group-hover:scale-110 transition-transform">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d={value.icon}
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800">{value.title}</h3>
                </div>
              ))}
            </div>

            {/* Advantage Box */}
            <div className="mt-8 p-6 bg-gradient-to-br from-[#E8F4FC] to-white rounded-2xl border border-[#0077B5]/10">
              <h3 className="text-xl font-semibold text-[#0077B5] mb-3">
                The PROPTIM Advantage
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Led by a commercial real estate professional experienced in
                negotiations, underwriting, site selection, and portfolio
                strategy across office, industrial, retail and land. PROPTIM
                brings hands-on execution and a trusted network of developers,
                landlords, lenders and co-brokers to unlock real opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Clients Section
function ClientsSection() {
  const officeClients = [
    "BHEL",
    "Capri Loans",
    "HDB Financial Services",
    "Bajaj Finserv",
    "Muthoot Finance",
    "PNB Housing",
    "Aditya Birla Capital",
    "L&T Finance",
    "IIFL Finance",
  ];

  const retailClients = [
    "Croma",
    "Tanishq",
    "Bluestone",
    "Max",
    "Pantaloons",
    "Caratlane",
    "Domino's",
    "Helios",
    "Vishal Mega Mart",
    "Mia by Tanishq",
    "McDonald's",
    "Burger King",
    "Adidas",
    "Arvind Store",
    "Zudio",
    "KFC",
    "Kalyan Jewellers",
    "Lenskart",
    "DMart",
  ];

  return (
    <section
      id="clients"
      className="section-padding bg-gradient-to-b from-[#f8fafb] to-white relative overflow-hidden"
    >
      <div className="absolute inset-0 blueprint-pattern opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <span className="inline-block text-[#0077B5] text-sm font-semibold tracking-widest uppercase mb-4">
            Our Clients
          </span>
          <h2 className="text-4xl md:text-5xl mb-6">
            Brands Associated{" "}
            <span className="text-[#0077B5]">With Us</span>
          </h2>
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg shadow-gray-100/50">
            <span className="text-3xl font-bold text-[#0077B5]">250+</span>
            <span className="text-gray-600">Transactions in Past 5 Years</span>
          </div>
        </div>

        {/* Offices / Workspace */}
        <div className="mb-12">
          <h3 className="text-center text-lg font-semibold text-gray-700 mb-6">
            — Offices / Workspace —
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {officeClients.map((client) => (
              <div
                key={client}
                className="px-6 py-3 bg-white rounded-full border border-gray-200 text-gray-700 font-medium hover:border-[#0077B5] hover:text-[#0077B5] transition-colors shadow-sm"
              >
                {client}
              </div>
            ))}
          </div>
        </div>

        {/* Retail & Food */}
        <div>
          <h3 className="text-center text-lg font-semibold text-gray-700 mb-6">
            — Retail & Food —
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {retailClients.map((client) => (
              <div
                key={client}
                className="px-5 py-2.5 bg-white rounded-full border border-gray-200 text-gray-600 hover:border-[#0077B5] hover:text-[#0077B5] transition-colors shadow-sm"
              >
                {client}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  return (
    <section
      id="contact"
      className="section-padding bg-gradient-to-br from-[#0077B5] via-[#005a8c] to-[#1a3a52] relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 blueprint-pattern opacity-10"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#8ED1FC]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block text-[#8ED1FC] text-sm font-semibold tracking-widest uppercase mb-4">
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl mb-6 text-white leading-tight">
              Let&apos;s Find Your{" "}
              <span className="text-[#8ED1FC]">Perfect Space</span>
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-8">
              Ready to optimize your property portfolio? Reach out to us for
              expert guidance on commercial real estate in Central India.
            </p>

            <div className="space-y-6">
              <a
                href="tel:9165477999"
                className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <svg
                    className="w-6 h-6 text-[#8ED1FC]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white/50 text-sm">Call Us</p>
                  <p className="text-white font-semibold">
                    9165477999, 9755303306
                  </p>
                </div>
              </a>

              <a
                href="mailto:adhish@proptim.in"
                className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <svg
                    className="w-6 h-6 text-[#8ED1FC]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white/50 text-sm">Email</p>
                  <p className="text-white font-semibold">adhish@proptim.in</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[#8ED1FC]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white/50 text-sm">Office</p>
                  <p className="text-white font-semibold">
                    1495, Aurvindo Enclave, Pachpedi Naka
                    <br />
                    Raipur - 492001 (C.G.)
                  </p>
                </div>
              </div>

              <a
                href="https://www.proptim.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <svg
                    className="w-6 h-6 text-[#8ED1FC]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white/50 text-sm">Website</p>
                  <p className="text-white font-semibold">www.proptim.in</p>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form / CTA Card */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Request a Consultation
            </h3>
            <p className="text-gray-600 mb-8">
              Tell us about your property requirements and we&apos;ll get back
              to you.
            </p>

            <form className="space-y-5" aria-label="Contact form">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0077B5] focus:ring-2 focus:ring-[#0077B5]/20 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0077B5] focus:ring-2 focus:ring-[#0077B5]/20 outline-none transition-all"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0077B5] focus:ring-2 focus:ring-[#0077B5]/20 outline-none transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <select
                  id="propertyType"
                  name="propertyType"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0077B5] focus:ring-2 focus:ring-[#0077B5]/20 outline-none transition-all bg-white"
                >
                  <option value="office">Office / Workspace</option>
                  <option value="retail">Retail / High-street</option>
                  <option value="qsr">Quick Service Restaurant</option>
                  <option value="logistics">Logistics / Warehouse</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0077B5] focus:ring-2 focus:ring-[#0077B5]/20 outline-none transition-all resize-none"
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#0077B5] text-white py-4 rounded-xl font-semibold hover:bg-[#005a8c] transition-colors shadow-lg shadow-[#0077B5]/25"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer role="contentinfo" aria-label="Site footer" className="bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              <span className="text-[#0077B5]">PR</span>
              <span className="relative">
                <span className="text-[#0077B5]">O</span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-3 h-3 rounded-full bg-[#8ED1FC] opacity-60"></span>
                </span>
              </span>
              <span className="text-[#0077B5]">PTIM</span>
            </span>
            <span className="text-gray-500 text-sm ml-2">
              Property Consultants
            </span>
          </div>

          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} PROPTIM. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="tel:9165477999"
              className="text-gray-400 hover:text-[#0077B5] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
            <a
              href="mailto:adhish@proptim.in"
              className="text-gray-400 hover:text-[#0077B5] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SectorsSection />
      <CoverageSection />
      <EdgeSection />
      <OutcomesValuesSection />
      <ClientsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
