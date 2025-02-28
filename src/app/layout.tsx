import type { Metadata } from "next";

import { Roboto_Mono } from "next/font/google";

import GridAnimation from "~/components/grid-animation";

import "~/styles/globals.css";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home – EU Tech Meetup Maastricht",
  description:
    "The EU Tech Meetup in Maastricht is a community where developers, entrepreneurs, and creatives come together to share knowledge, exchange ideas, and build meaningful connections. Every month, we host engaging talks and discussions on diverse topics such as web development, AI, cybersecurity, and startup growth.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={robotoMono.className}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">{children}</div>
        </div>
        <GridAnimation />
      </body>
    </html>
  );
}
