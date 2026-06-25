import { CalculatorScreen } from "@/features/calculator/CalculatorScreen";
import { FAQ, REFERENCE_CITATION } from "@/features/calculator/content";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "nl-NL",
      medicalAudience: {
        "@type": "MedicalAudience",
        audienceType: "Clinician",
      },
      about: [
        { "@type": "MedicalCondition", name: "Methanolintoxicatie" },
        { "@type": "MedicalCondition", name: "Ethyleenglycolintoxicatie" },
      ],
      mainEntity: { "@id": `${SITE_URL}/#app` },
      citation: REFERENCE_CITATION,
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#app`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      description: SITE_DESCRIPTION,
      applicationCategory: "HealthApplication",
      operatingSystem: "Web",
      isAccessibleForFree: true,
      inLanguage: "nl-NL",
      isPartOf: { "@id": `${SITE_URL}/#webpage` },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      isPartOf: { "@id": `${SITE_URL}/#webpage` },
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CalculatorScreen />
    </>
  );
}
