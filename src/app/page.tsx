import { ClockIcon, SewingPinIcon } from "@radix-ui/react-icons";

import { getMeetupEvents } from "~/clients/meetup";
import { EventList } from "~/components/event-list";
import { filterLast15Events, mapDate, mapTime, mapVenue } from "~/utils/filters";

export default async function Page() {
  const events = await getMeetupEvents();

  return (
    <main>
      <h1>Hello World</h1>
      <EventList>
        {filterLast15Events(events.data.groupByUrlname.pastEvents.edges.map((edge) => edge.node)).map((event) => (
          <EventList.Card key={event.id} href={event.eventUrl} className="grid grid-cols-12 gap-4">
            <EventList.DateBlock className="col-span-2">
              <EventList.DateDayRow>{mapDate(event.dateTime).day}</EventList.DateDayRow>
              <EventList.DateMonthRow>{mapDate(event.dateTime).month}</EventList.DateMonthRow>
            </EventList.DateBlock>
            <EventList.Content className="col-span-10">
              <EventList.Details className="col-span-4">
                <EventList.IconRow icon={ClockIcon}>
                  {mapTime(event.dateTime).start} - {mapTime(event.dateTime).end}
                </EventList.IconRow>
                <EventList.IconRow icon={SewingPinIcon}>{mapVenue(event.venue)}</EventList.IconRow>
              </EventList.Details>
              <EventList.Details className="col-span-5">
                <EventList.Row className="font-bold">{event.title}</EventList.Row>
                <EventList.Row>{event.going} participants</EventList.Row>
              </EventList.Details>
              <EventList.Arrow className="col-span-1" />
            </EventList.Content>
          </EventList.Card>
        ))}
      </EventList>
    </main>
  );
}
