import type { Metadata } from "next";
import Link from "next/link";

import { ContentPage, ContentSection } from "@/components/ContentPage";
import { LEGAL_LAST_UPDATED, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookieverklaring - EthaDose",
  description:
    "Cookieverklaring van EthaDose. EthaDose gebruikt geen tracking-, analyse- of advertentiecookies, dus cookietoestemming is niet nodig.",
  alternates: { canonical: `${SITE_URL}/cookies/` },
};

export default function CookiesPage() {
  return (
    <ContentPage
      title="Cookieverklaring"
      intro={`EthaDose plaatst geen tracking-cookies. Laatst bijgewerkt: ${LEGAL_LAST_UPDATED}.`}
    >
      <ContentSection title="Geen tracking-cookies">
        <p>
          EthaDose gebruikt geen cookies voor tracking, analyse of advertenties en
          plaatst geen cookies van derden. Daarom is er geen cookiebanner of
          cookietoestemming nodig.
        </p>
      </ContentSection>

      <ContentSection title="Functionele opslag">
        <p>
          De app slaat je invoer alleen tijdelijk in het geheugen van je browser
          op om de berekening te tonen. Er worden geen gegevens bewaard nadat je
          het tabblad sluit en er wordt niets naar een server gestuurd.
        </p>
      </ContentSection>

      <ContentSection title="Meer informatie">
        <p>
          Zie de{" "}
          <Link
            href="/privacy/"
            className="text-primary underline-offset-4 hover:underline"
          >
            privacyverklaring
          </Link>{" "}
          voor hoe EthaDose met gegevens omgaat.
        </p>
      </ContentSection>
    </ContentPage>
  );
}
