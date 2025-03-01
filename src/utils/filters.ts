import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { type MeetupEvent } from "~/clients/meetup";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Map the venue to a string.
 *
 * @param venue - The venue to map.
 *
 * @returns The mapped venue to a string containing the name and address.
 */
export function mapVenue(venue: MeetupEvent["venue"]): string {
  if (!venue) {
    return "Maastricht";
  }

  if (venue.name && venue.address) {
    return `${venue.name}, ${venue.address}`;
  }

  return venue.name || venue.address || "Maastricht";
}

/**
 * Map the date to an object containing the day and month.
 *
 * @param date - The date to map.
 *
 * @returns The mapped date to an object containing the day and month.
 */
export function mapDate(date: MeetupEvent["dateTime"]): { day: string; month: string } {
  const dateObject = new Date(date);

  return {
    day: dateObject.getDate().toString(),
    month: dateObject.toLocaleDateString("nl-NL", { month: "short" }),
  };
}

/**
 * Format the time to a string.
 *
 * @param time - The time to format.
 *
 * @returns The formatted time to nl-NL locale, HH:MM format.
 */
export function formatTime(time: string): string {
  const dateObject = new Date(time);
  return dateObject.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
}
