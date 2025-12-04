export function StructuredData() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: "Milena's Beauty Bar",
    description:
      "Professional lash extensions, lash lifts, brow lamination, brow waxing & tinting services by a licensed Master Esthetician since 2018.",
    url: "https://milenasbeautybar.com",
    image: "https://milenasbeautybar.com/og-image.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Federal Way",
      addressRegion: "WA",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 47.3223,
      longitude: -122.3126,
    },
    areaServed: {
      "@type": "City",
      name: "Federal Way",
      containedInPlace: {
        "@type": "State",
        name: "Washington",
      },
    },
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [
      "https://www.instagram.com/milenas.beautybar/",
      "https://www.facebook.com/share/1K1kAsUdd9/",
      "https://www.tiktok.com/@milenasbeautybar",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Beauty Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Lash Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Lash Extensions",
                description:
                  "Premium synthetic lash extensions in Half Set,Classic, Wispy, or Volume styles.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Lash Lift",
                description:
                  "Semi-permanent lash lift treatment for naturally lifted, longer-looking lashes.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Lash Tint",
                description:
                  "Professional lash tinting for darker, more defined natural lashes.",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Brow Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Brow Lamination",
                description:
                  "Semi-permanent brow styling for sculpted, fluffy brows lasting 6-8 weeks.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Brow Waxing",
                description:
                  "Gentle waxing service for perfectly defined, shaped brows.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Brow Tinting",
                description:
                  "Professional tinting to add depth and definition to natural brows.",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Facial Waxing",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Facial Waxing",
                description:
                  "Gentle facial waxing for upper lip, chin, sideburns, or full face.",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Packages",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Deluxe Package",
                description:
                  "The ultimate pampering experience including lash lift, lash tint, brow lamination (shape and wax), and aftercare oil.",
              },
              price: "135.00",
              priceCurrency: "USD",
            },
          ],
        },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can I get my lashes or brows wet right after lamination/lifting?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Some modern formulas allow earlier water contact, but it depends on the product and your natural lashes. At Milena's Beauty Bar we use Zola and LashBase, and both recommend leaving the third step 'Enriching Solution' on for 12 hours — therefore please avoid getting lashes or brows wet for 12 hours after treatment.",
        },
      },
      {
        "@type": "Question",
        name: "How long does a lash lift and tint last?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A lash lift typically lasts 6–8 weeks, depending on your natural lash cycle and aftercare. Tinting lasts about 3–4 weeks. Results vary based on lash health/cycles.",
        },
      },
      {
        "@type": "Question",
        name: "Is brow lamination safe, and how long do results last?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Brow lamination is safe when performed by a trained professional. It lasts 6–7 weeks on average. Brows may appear fuller, lifted, and more defined. You should avoid getting them wet for the first 24 hours for best results. Keeping them hydrated and nourished after lamination is important, aftercare oil is encouraged.",
        },
      },
      {
        "@type": "Question",
        name: "How do I establish Long-Term Care for lash lift or extensions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Be gentle when cleansing or applying skincare around your lashes. Protect your lashes from very hot, steamy environments (sauna, very hot showers) when possible. Schedule a touch-up or refill according to your natural hair growth — typically every 6–8 weeks for lash lift and 2-4 weeks for extensions.",
        },
      },
      {
        "@type": "Question",
        name: "Are lash lifts or extensions safe for everyone?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most people are good candidates. You may not be eligible if you have: eye infections, active allergies, recent eye surgery, extremely weak or brittle natural lashes, or skin conditions around the eyes/brows. If you're unsure, feel free to message before booking or book a consultation.",
        },
      },
      {
        "@type": "Question",
        name: "What should I avoid before and after my lash or brow appointment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Before your service, please come with a clean, makeup-free face so I can work on fresh lashes and brows. If you're getting any waxing, pause retinols, acne medications, and strong skincare actives beforehand so your skin stays safe and doesn't lift. After your appointment, follow the specific aftercare for your lift, lamination, or extensions — that usually means being gentle, avoiding oils, and keeping the area dry based on the brand instructions I use. And for extensions, avoid rubbing, sleeping on your face, using waterproof mascara, or using oil-based products.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
