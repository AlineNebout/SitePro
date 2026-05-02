const localBusinessData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.alinenebout-osteopathe.fr",
  name: "Aline Nebout — Ostéopathe D.O.",
  description:
    "Ostéopathe D.O. spécialisée en ostéopathie douce, réflexes archaïques, femme enceinte, nourrisson et sportif. Cabinet au Pôle Santé de Rochetaillée-sur-Saône.",
  url: "https://www.alinenebout-osteopathe.fr",
  telephone: "04 78 25 28 62",
  priceRange: "65€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "324 quai Pierre Dupont",
    addressLocality: "Rochetaillée-sur-Saône",
    postalCode: "69270",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.8167,
    longitude: 4.85,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "19:00",
  },
  sameAs: [
    "https://www.linkedin.com/in/aline-nebout-8a53936b",
    "https://www.instagram.com/alinenebout_osteo/",
    "https://www.facebook.com/alinenebout.osteo",
  ],
};

export default function LocalBusinessJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
    />
  );
}
