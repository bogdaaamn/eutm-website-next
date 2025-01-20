import { type MeetupEvent } from "~/clients/meetup";

export function filterLast15Events(events: MeetupEvent[]) {
  return events.slice(events.length - 15, events.length);
}
