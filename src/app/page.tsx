import { ArrowRightIcon, ClockIcon, SewingPinIcon, ArrowTopRightIcon } from "@radix-ui/react-icons";

import { EventList } from "~/components/event-list";
import { Paragraph } from "~/components/typography";

import LogoBw from "~/components/svg/logo-bw";
import Logo from "~/components/svg/logo";

import { getMeetupEvents } from "~/clients/meetup";

import { formatTime, mapDate, mapVenue } from "~/utils/filters";

export default async function Page() {
  const events = await getMeetupEvents();

  const upcomingEvents = events.data.groupByUrlname.upcomingEvents.edges.map((edge) => edge.node);
  const pastEvents = events.data.groupByUrlname.pastEvents.edges.map((edge) => edge.node);

  return (
    <main className="relative">
      <div className="py-24">
        <Logo />
        <h1 className="sr-only">EU Tech Meetup Maastricht</h1>
        <Paragraph className="mt-8" as="h2">
          The EU Tech Meetup in Maastricht is a community where developers, entrepreneurs, and creatives come together
          to share knowledge, exchange ideas, and build meaningful connections. Every month, we host engaging talks and
          discussions on diverse topics such as web development, AI, cybersecurity, and startup growth.
        </Paragraph>
        <Paragraph>
          Whether you&apos;re looking to showcase your work, find collaborators, or simply be inspired, our meetup
          provides the perfect space for both learning and networking.
        </Paragraph>
      </div>

      <div className="py-36 bg-eu-blue text-background -mx-[calc(50vw-50%)] px-[calc(50vw-50%)]">
        <h3 className="uppercase text-center mb-8">Upcoming events</h3>
        <EventList>
          {upcomingEvents.map((event) => (
            <EventList.Card
              key={event.id}
              href={event.eventUrl}
              className="grid grid-cols-12 gap-4 hover:text-foreground hover:border-foreground group"
            >
              <EventList.DateBlock className="col-span-2 group-hover:border-foreground">
                <EventList.DateDayRow>{mapDate(event.dateTime).day}</EventList.DateDayRow>
                <EventList.DateMonthRow>{mapDate(event.dateTime).month}</EventList.DateMonthRow>
              </EventList.DateBlock>
              <EventList.Content className="col-span-10">
                <EventList.Details className="col-span-4">
                  <EventList.IconRow icon={ClockIcon}>
                    {formatTime(event.dateTime)} - {formatTime(event.endTime)}
                  </EventList.IconRow>
                  <EventList.IconRow icon={SewingPinIcon}>{mapVenue(event.venue)}</EventList.IconRow>
                </EventList.Details>
                <EventList.Details className="col-span-5">
                  <EventList.Row className="font-bold">
                    <h4 className="truncate">{event.title}</h4>
                  </EventList.Row>
                  <EventList.Row>{event.going} participants</EventList.Row>
                </EventList.Details>
                <EventList.Arrow className="col-span-1 group-hover:text-foreground" />
              </EventList.Content>
            </EventList.Card>
          ))}
        </EventList>
        <a
          href="https://www.meetup.com/messages/?new_convo=true&member_id=210666746&name=Pat%20Scullion"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 mt-8"
        >
          <Paragraph className="text-center text-base m-0">Want to be up next? Contact us</Paragraph>
          <span>
            <ArrowTopRightIcon className="w-4 h-4" />
          </span>
        </a>
      </div>
      <div className="py-24">
        <Paragraph>
          We&apos;re committed to building a cool tech community in our area. We take pride in supporting local talent
          and innovation. Our meetups are open to anyone with an interest in technology—whether you&apos;re a seasoned
          expert, an aspiring entrepreneur, or just curious about the latest trends. Join us at our next event and help
          us built the next tech community in Maastricht!
        </Paragraph>
      </div>
      <div className="py-24 bg-blue-300/15 -mx-[calc(50vw-50%)] px-[calc(50vw-50%)]">
        <h3 className="uppercase text-center mb-8">Past events</h3>
        <EventList>
          {pastEvents.map((event) => (
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
                <EventList.Details className="col-span-4">
                  <EventList.IconRow icon={ClockIcon}>
                    {formatTime(event.dateTime)} - {formatTime(event.endTime)}
                  </EventList.IconRow>
                  <EventList.IconRow icon={SewingPinIcon}>{mapVenue(event.venue)}</EventList.IconRow>
                </EventList.Details>
                <EventList.Details className="col-span-5">
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
        <a
          href="https://www.meetup.com/EuregioTechMeetup"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 mt-8"
        >
          <Paragraph className="text-center text-base m-0">View all past events</Paragraph>
          <span>
            <ArrowRightIcon className="w-4 h-4" />
          </span>
        </a>
      </div>
      <div className="pt-8 pb-16 px-8 bg-eu-blue text-background -mx-[calc(50vw-50%)] flex justify-between">
        <div className="relative flex justify-between items-center w-full">
          <div className="flex-shrink-0">
            <LogoBw className="w-40 invert" />
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-8">
            <div>
              <p className="uppercase">Past events</p>
            </div>
            <div>
              <p className="uppercase">Upcoming events</p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <p className="uppercase">Social media</p>
          </div>
        </div>
      </div>
    </main>
  );
}
