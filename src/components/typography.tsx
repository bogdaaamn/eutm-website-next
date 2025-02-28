import { Roboto_Slab } from "next/font/google";
import { cn } from "~/utils/filters";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

export function Paragraph({
  children,
  className,
  as = "p",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "h2" | "h3";
}) {
  const classNames = cn("mb-4 tracking-wide text-lg", robotoSlab.className, className);

  if (as === "h2") {
    return <h2 className={classNames}>{children}</h2>;
  } else if (as === "h3") {
    return <h3 className={classNames}>{children}</h3>;
  }

  return <p className={classNames}>{children}</p>;
}
