import Link from "next/link";
import { Paragraph } from "~/components/typography";
import { ArrowLeftIcon, ClockIcon, SewingPinIcon } from "@radix-ui/react-icons";
import { getMeetupEvents } from "~/clients/meetup";
import { EventList } from "~/components/event-list";
import { formatTime, mapDate, mapVenue } from "~/utils/filters";

export default async function Page() {
  const events = await getMeetupEvents();

  const upcomingEvents = events.data.groupByUrlname.upcomingEvents.edges.map((edge) => edge.node);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Paragraph as="h1" className="!text-2xl">
        Not what you were looking for?
      </Paragraph>

      <Link href="/" className="flex items-center gap-2 mt-4">
        <ArrowLeftIcon className="w-4 h-4" />
        <p>Go back to our home page</p>
      </Link>

      <p className="mb-4 mt-4">Or join one of our upcoming events</p>

      {upcomingEvents && upcomingEvents.length > 0 && (
        <div className="mt-4">
          <EventList>
            {upcomingEvents.map((event) => (
              <EventList.Card
                key={event.id}
                href={event.eventUrl}
                className="grid grid-cols-12 gap-4 bg-background hover:bg-eu-blue hover:text-background hover:border-foreground"
              >
                <EventList.DateBlock className="col-span-2">
                  <EventList.DateDayRow>{mapDate(event.dateTime).day}</EventList.DateDayRow>
                  <EventList.DateMonthRow>{mapDate(event.dateTime).month}</EventList.DateMonthRow>
                </EventList.DateBlock>
                <EventList.Content className="col-span-10">
                  <EventList.Details className="col-span-4 hidden lg:block">
                    <EventList.IconRow icon={ClockIcon}>
                      {formatTime(event.dateTime)} - {formatTime(event.endTime)}
                    </EventList.IconRow>
                    <EventList.IconRow icon={SewingPinIcon}>{mapVenue(event.venue)}</EventList.IconRow>
                  </EventList.Details>
                  <EventList.Details className="col-span-9 lg:col-span-5">
                    <EventList.Row className="font-bold">
                      <h4 className="truncate">{event.title}</h4>
                    </EventList.Row>
                    <EventList.Row>{event.going} participants</EventList.Row>
                  </EventList.Details>
                  <EventList.Arrow className="col-span-1 text-gray-200" />
                </EventList.Content>
              </EventList.Card>
            ))}
          </EventList>
        </div>
      )}
    </div>
  );
}
