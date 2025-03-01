import { Roboto_Mono } from "next/font/google";

import GridAnimation from "~/components/grid-animation";

import "~/styles/globals.css";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

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
