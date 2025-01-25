import { type ReactNode } from "react";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "~/utils/filters";

function EventList({ children, className }: { children: ReactNode; className?: string }) {
  return <ul className={cn("grid gap-2", className)}>{children}</ul>;
}

function Card({ children, href, className }: { children: ReactNode; href: string; className?: string }) {
  return (
    <li className="rounded-xl border hover:bg-gray-50 shadow-sm">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <div className={cn("p-4", className)}>{children}</div>
      </a>
    </li>
  );
}

function DateBlock({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("border-r flex flex-col items-center justify-center -ml-4", className)}>{children}</div>;
}

function DateDayRow({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("text-2xl font-bold", className)}>{children}</div>;
}

function DateMonthRow({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("text-sm font-bold", className)}>{children}</div>;
}

function Content({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("grid grid-cols-10 gap-4", className)}>{children}</div>;
}

function Details({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

function Row({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("truncate", className)}>{children}</div>;
}

function IconRow({
  icon: Icon,
  children,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="truncate">{children}</span>
    </div>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <DoubleArrowRightIcon className="w-4 h-4 flex-shrink-0 text-gray-200" />
    </div>
  );
}

EventList.Card = Card;
EventList.DateBlock = DateBlock;
EventList.DateDayRow = DateDayRow;
EventList.DateMonthRow = DateMonthRow;
EventList.Content = Content;
EventList.Details = Details;
EventList.Row = Row;
EventList.Arrow = Arrow;
EventList.IconRow = IconRow;

export { EventList };
