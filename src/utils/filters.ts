import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { type MeetupEvent } from "~/clients/meetup";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sort events by date.
 *
 * @param events - The list of events to sort.
 *
 * @returns The sorted list of events.
 */
export function sortEventsByDate(events: MeetupEvent[]): MeetupEvent[] {
  return events.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
}

/**
 * Filter the last 15 events from the list of events.
 *
 * @param events - The list of events to filter.
 *
 * @returns The last 15 events from the list.
 */
export function filterLast15Events(events: MeetupEvent[]): MeetupEvent[] {
  return sortEventsByDate(events).slice(0, 15);
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
 * Map the time to an object containing the start and end time.
 *
 * @param time - The time to map.
 *
 * @returns The mapped time to an object containing the start and end time.
 */
export function mapTime(time: MeetupEvent["dateTime"]): { start: string; end: string } {
  const dateObject = new Date(time);

  return {
    start: dateObject.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" }),
    end: dateObject.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" }),
  };
}
