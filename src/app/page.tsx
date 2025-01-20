import Link from "next/link";
import { getMeetupEvents } from "~/clients/meetup";
import { filterLast15Events } from "~/utils/filters";

export default async function Page() {
  const events = await getMeetupEvents();

  return (
    <main>
      <h1>Hello World</h1>
      <ul>
        {events.data.groupByUrlname.upcomingEvents.edges.map((edge) => (
          <li key={edge.node.id}>
            <Link href={`/event/${edge.node.id}`}>{edge.node.title}</Link>
          </li>
        ))}
      </ul>
      <h2>Past Events</h2>
      <ul>
        {filterLast15Events(events.data.groupByUrlname.pastEvents.edges.map((edge) => edge.node)).map((event) => (
          <li key={event.id}>
            <Link href={`/event/${event.id}`}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
