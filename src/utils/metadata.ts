import type { Metadata } from "next";

export function generateMetadata({
  title,
  description,
  siteUrl = "http://localhost:3000",
  canonicalUrl,
}: {
  title: string;
  description: string;
  siteUrl?: string;
  canonicalUrl: string;
}): Metadata {
  const url = siteUrl.startsWith("http") || siteUrl.startsWith("https") ? siteUrl : `https://${siteUrl}`;

  return {
    title,
    description,
    keywords: [
      "Maastricht tech meetup",
      "EU Tech Meetup Maastricht",
      "Maastricht tech",
      "developers Maastricht",
      "software Maastricht",
      "entrepreneurs Maastricht",
      "tech events Maastricht",
      "startup community Maastricht",
      "tech community Maastricht",
      "web development Maastricht",
      "AI Maastricht",
      "cybersecurity Maastricht",
      "startups Maastricht",
      "tech startups Maastricht",
      "tech meetups Maastricht",
      "tech events Maastricht",
    ],
    openGraph: {
      title,
      description,
      url,
      siteName: "EU Tech Meetup Maastricht",
      images: [
        {
          url: `${url}/og.png`,
          width: 1200,
          height: 630,
          alt: "EU Tech Meetup Maastricht Banner",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${url}/og.png`],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    // TODO: Remove this once we setup domain
    robots: {
      index: false,
      follow: false,
    },
  };
}
