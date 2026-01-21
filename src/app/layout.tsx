import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Base URL for the website
const siteUrl = "https://www.proptim.in";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0077B5",
};

export const metadata: Metadata = {
  // Basic Meta Tags
  title: {
    default: "PROPTIM | Commercial Real Estate Consultants in Raipur, Chhattisgarh",
    template: "%s | PROPTIM Property Consultants",
  },
  description:
    "PROPTIM is a leading commercial real estate advisory in Raipur, Chhattisgarh. Expert property consulting for offices, retail spaces, restaurants (QSR), and logistics/warehousing across Central India. 250+ successful transactions.",
  keywords: [
    "commercial real estate Raipur",
    "property consultants Chhattisgarh",
    "office space Raipur",
    "retail property Central India",
    "warehouse Chhattisgarh",
    "QSR restaurant space",
    "commercial property advisor",
    "real estate consultant Madhya Pradesh",
    "Bhopal commercial property",
    "Indore real estate",
    "logistics space Raipur",
    "high street retail",
    "property leasing Chhattisgarh",
    "PROPTIM",
  ],
  authors: [{ name: "PROPTIM", url: siteUrl }],
  creator: "PROPTIM Property Consultants",
  publisher: "PROPTIM",

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Canonical URL
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },

  // Open Graph (Facebook, LinkedIn)
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "PROPTIM Property Consultants",
    title: "PROPTIM | Commercial Real Estate Consultants in Raipur",
    description:
      "Expert commercial real estate advisory for offices, retail, F&B, and logistics across Central India. 250+ transactions | Trusted by 50+ brands.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PROPTIM - Optimizing Properties | Commercial Real Estate Consultants",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "PROPTIM | Commercial Real Estate Consultants",
    description:
      "Expert property consulting for offices, retail, F&B & logistics in Central India. 250+ transactions.",
    images: ["/og-image.png"],
    creator: "@proptim",
  },

  // Additional Meta
  category: "Real Estate",
  classification: "Commercial Real Estate Advisory",

  // Verification (add your actual verification codes)
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },

  // App Links
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PROPTIM",
  },

  // Format Detection
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Other
  other: {
    "geo.region": "IN-CT",
    "geo.placename": "Raipur",
    "geo.position": "21.2514;81.6296",
    ICBM: "21.2514, 81.6296",
  },
};

// JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    // Organization Schema
    {
      "@type": "RealEstateAgent",
      "@id": `${siteUrl}/#organization`,
      name: "PROPTIM",
      alternateName: "PROPTIM Property Consultants",
      description:
        "Commercial real estate advisory specializing in offices, retail, F&B, and logistics properties across Central India.",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
        width: 200,
        height: 60,
      },
      image: `${siteUrl}/og-image.png`,
      telephone: ["+91-9165477999", "+91-9755303306"],
      email: "adhish@proptim.in",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1495, Aurvindo Enclave, Pachpedi Naka",
        addressLocality: "Raipur",
        addressRegion: "Chhattisgarh",
        postalCode: "492001",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 21.2514,
        longitude: 81.6296,
      },
      areaServed: [
        {
          "@type": "State",
          name: "Chhattisgarh",
        },
        {
          "@type": "State",
          name: "Madhya Pradesh",
        },
      ],
      serviceArea: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 21.2514,
          longitude: 81.6296,
        },
        geoRadius: "500 km",
      },
      priceRange: "$$",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
      sameAs: [siteUrl],
      foundingDate: "2019",
      slogan: "Optimizing Properties",
      knowsAbout: [
        "Commercial Real Estate",
        "Office Leasing",
        "Retail Property",
        "Warehouse & Logistics",
        "Restaurant Spaces",
        "Property Advisory",
      ],
    },
    // WebSite Schema
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "PROPTIM",
      description: "Commercial Real Estate Consultants in Central India",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/?s={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    // WebPage Schema
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "PROPTIM | Commercial Real Estate Consultants in Raipur",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#organization`,
      },
      description:
        "Expert commercial real estate advisory for offices, retail, F&B, and logistics across Central India.",
      breadcrumb: {
        "@id": `${siteUrl}/#breadcrumb`,
      },
      inLanguage: "en-IN",
      datePublished: "2024-01-01",
      dateModified: new Date().toISOString().split("T")[0],
    },
    // BreadcrumbList Schema
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
      ],
    },
    // LocalBusiness Schema
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#localbusiness`,
      name: "PROPTIM Property Consultants",
      image: `${siteUrl}/og-image.png`,
      telephone: "+91-9165477999",
      email: "adhish@proptim.in",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1495, Aurvindo Enclave, Pachpedi Naka",
        addressLocality: "Raipur",
        addressRegion: "Chhattisgarh",
        postalCode: "492001",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 21.2514,
        longitude: 81.6296,
      },
      url: siteUrl,
      priceRange: "$$",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "50",
      },
    },
    // Service Schema
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service`,
      serviceType: "Commercial Real Estate Advisory",
      provider: {
        "@id": `${siteUrl}/#organization`,
      },
      areaServed: ["Chhattisgarh", "Madhya Pradesh"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Property Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Office Space Leasing",
              description: "Premium office spaces and co-working solutions",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Retail Property Consulting",
              description: "Strategic retail locations on high-traffic streets",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "QSR & Restaurant Spaces",
              description: "High-visibility locations for food service businesses",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Logistics & Warehousing",
              description: "Industrial spaces with excellent connectivity",
            },
          },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" dir="ltr" className="scroll-smooth">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${dmSerifDisplay.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
