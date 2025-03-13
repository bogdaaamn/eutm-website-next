import Link from "next/link";

import {
  ArrowRightIcon,
  ClockIcon,
  SewingPinIcon,
  ArrowTopRightIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  InstagramLogoIcon,
} from "@radix-ui/react-icons";

import { EventList } from "~/components/event-list";
import { Paragraph } from "~/components/typography";
import { ExternalLink } from "~/components/link";

import LogoBw from "~/components/svg/logo-bw";
import Logo from "~/components/svg/logo";
import QrMeetup from "~/components/svg/qr-meetup";

import { getMeetupEvents } from "~/clients/meetup";

import { formatTime, mapDate, mapVenue } from "~/utils/filters";
import { generateMetadata } from "~/utils/metadata";
import MeetupLogoIcon from "~/components/svg/meetup-logo";

export const metadata = generateMetadata({
  title: "EU Tech Meetup in Maastricht – Connect with Developers & Entrepreneurs",
  description:
    "Join the EU Tech Meetup in Maastricht, a thriving community for developers, entrepreneurs, and creatives. We host monthly events featuring talks on web development, AI, cybersecurity, and startups. Network, share knowledge, and grow your tech career in Maastricht!",
  siteUrl: process.env.VERCEL_URL,
  canonicalUrl: "https://www.eutm.eu/",
});

export default async function Page() {
  const events = await getMeetupEvents();

  const upcomingEvents = events.data.groupByUrlname.upcomingEvents.edges.map((edge) => edge.node);
  const pastEvents = events.data.groupByUrlname.pastEvents.edges.map((edge) => edge.node);

  return (
    <main className="relative" aria-label="EU Tech Meetup Maastricht main content">
      <section className="py-24" aria-labelledby="hero-heading">
        <Logo />
        <h1 id="hero-heading" className="sr-only">
          EU Tech Meetup Maastricht
        </h1>
        <Paragraph className="mt-8" as="h2">
          The EU Tech Meetup in Maastricht is a community where developers, entrepreneurs, and creatives come together
          to share knowledge, exchange ideas, and build meaningful connections. Every month, we host engaging talks and
          discussions on diverse topics such as web development, AI, cybersecurity, and startup growth.
        </Paragraph>
        <Paragraph>
          Whether you&apos;re looking to showcase your work, find collaborators, or simply be inspired, our meetup
          provides the perfect space for both learning and networking.
        </Paragraph>
        <div className="flex gap-4 mt-16 justify-center text-eu-blue" aria-label="Social media links">
          <ExternalLink href="https://www.meetup.com/euregiotechmeetup" aria-label="Join us on Meetup">
            <MeetupLogoIcon className="w-10 h-10" />
          </ExternalLink>
          <ExternalLink href="https://www.linkedin.com/company/105187082" aria-label="Follow us on LinkedIn">
            <LinkedInLogoIcon className="w-10 h-10" />
          </ExternalLink>
          <ExternalLink href="https://x.com/EuTechMeetup" aria-label="Follow us on Twitter">
            <TwitterLogoIcon className="w-10 h-10" />
          </ExternalLink>
          <ExternalLink href="https://www.instagram.com/eutechmeetup" aria-label="Follow us on Instagram">
            <InstagramLogoIcon className="w-10 h-10" />
          </ExternalLink>
          <ExternalLink href="https://github.com/EuTM" aria-label="View our GitHub">
            <GitHubLogoIcon className="w-10 h-10" />
          </ExternalLink>
        </div>
      </section>

      <section
        className="py-24 lg:py-36 bg-eu-blue text-background -mx-[calc(50vw-50%)] px-[calc(50vw-50%)]"
        aria-labelledby="upcoming-events-heading"
      >
        <h2 id="upcoming-events-heading" className="uppercase text-center mb-8">
          Upcoming tech events in Maastricht
        </h2>
        <EventList>
          {upcomingEvents.map((event) => (
            <EventList.Card
              key={event.id}
              href={event.eventUrl}
              className="grid grid-cols-12 gap-4 hover:text-foreground hover:border-foreground group"
            >
              <EventList.DateBlock className="col-span-3 lg:col-span-2 group-hover:border-foreground">
                <EventList.DateDayRow>{mapDate(event.dateTime).day}</EventList.DateDayRow>
                <EventList.DateMonthRow>{mapDate(event.dateTime).month}</EventList.DateMonthRow>
              </EventList.DateBlock>
              <EventList.Content className="col-span-9 lg:col-span-9">
                <EventList.Details className="hidden lg:block lg:col-span-4">
                  <EventList.IconRow icon={ClockIcon}>
                    {formatTime(event.dateTime)} - {formatTime(event.endTime)}
                  </EventList.IconRow>
                  <EventList.IconRow icon={SewingPinIcon}>{mapVenue(event.venue)}</EventList.IconRow>
                </EventList.Details>
                <EventList.Details className="col-span-10 lg:col-span-6">
                  <EventList.Row className="font-bold">
                    <h3 className="truncate">{event.title}</h3>
                  </EventList.Row>
                  <EventList.Row>{event.going} participants</EventList.Row>
                </EventList.Details>
              </EventList.Content>
              <EventList.Arrow className="hidden lg:flex lg:col-span-1 group-hover:text-foreground" />
            </EventList.Card>
          ))}
        </EventList>
        <ExternalLink
          aria-label="Send Pat a message on Meetup"
          href="https://www.meetup.com/messages/?new_convo=true&member_id=210666746&name=Pat%20Scullion"
          className="flex items-center justify-center gap-1 mt-8"
        >
          <Paragraph className="text-center text-base m-0">Want to be up next? Contact us</Paragraph>
          <span>
            <ArrowTopRightIcon className="w-4 h-4" />
          </span>
        </ExternalLink>
      </section>

      <section className="py-24" aria-labelledby="about-heading">
        <h2 id="about-heading" className="sr-only">
          About EU Tech Meetup
        </h2>
        <Paragraph>
          We&apos;re committed to building a cool tech community in our area. We take pride in supporting local talent
          and innovation. Our meetups are open to anyone with an interest in technology – whether you&apos;re a seasoned
          expert, an aspiring entrepreneur, or just curious about the latest trends.
        </Paragraph>
        <Paragraph>Join us at our next event and help us built the next tech community in Maastricht!</Paragraph>
      </section>

      <section
        className="py-24 bg-blue-300/15 -mx-[calc(50vw-50%)] px-[calc(50vw-50%)]"
        aria-labelledby="past-events-heading"
      >
        <h2 id="past-events-heading" className="uppercase text-center mb-8">
          Past events
        </h2>
        <EventList>
          {pastEvents.map((event) => (
            <EventList.Card
              key={event.id}
              href={event.eventUrl}
              className="grid grid-cols-12 gap-4 bg-background hover:bg-eu-blue hover:text-background hover:border-foreground"
            >
              <EventList.DateBlock className="col-span-3 lg:col-span-2">
                <EventList.DateDayRow>{mapDate(event.dateTime).day}</EventList.DateDayRow>
                <EventList.DateMonthRow>{mapDate(event.dateTime).month}</EventList.DateMonthRow>
              </EventList.DateBlock>
              <EventList.Content className="col-span-9 lg:col-span-9">
                <EventList.Details className="col-span-4 hidden lg:block">
                  <EventList.IconRow icon={ClockIcon}>
                    {formatTime(event.dateTime)} - {formatTime(event.endTime)}
                  </EventList.IconRow>
                  <EventList.IconRow icon={SewingPinIcon}>{mapVenue(event.venue)}</EventList.IconRow>
                </EventList.Details>
                <EventList.Details className="col-span-10 lg:col-span-6">
                  <EventList.Row className="font-bold">
                    <h3 className="truncate">{event.title}</h3>
                  </EventList.Row>
                  <EventList.Row>{event.going} participants</EventList.Row>
                </EventList.Details>
              </EventList.Content>
              <EventList.Arrow className="hidden lg:flex lg:col-span-1 text-gray-200" />
            </EventList.Card>
          ))}
        </EventList>
        <ExternalLink
          aria-label="View all past events on Meetup"
          href="https://www.meetup.com/euregiotechmeetup/events/?type=past"
          className="flex items-center justify-center gap-1 mt-8"
        >
          <Paragraph className="text-center text-base m-0">View all past events</Paragraph>
          <span>
            <ArrowRightIcon className="w-4 h-4" />
          </span>
        </ExternalLink>
      </section>

      <section className="py-24 flex items-center justify-center" aria-labelledby="qr-heading">
        <h2 id="qr-heading" className="sr-only">
          Scan QR code to join us on Meetup
        </h2>
        <ExternalLink href="https://www.meetup.com/EuregioTechMeetup" aria-label="Scan QR code to join us on Meetup">
          <QrMeetup className="border" aria-hidden="true" />
        </ExternalLink>
      </section>

      <footer className="py-16 px-8 bg-eu-blue text-background -mx-[calc(50vw-50%)]">
        <div className="grid grid-cols-1 lg:grid-cols-4 w-full gap-16">
          <div className="text-center lg:text-left" aria-labelledby="past-events-nav">
            <h2 id="past-events-nav" className="uppercase mb-4">
              Past events
            </h2>
            <ul className="flex flex-col gap-2">
              {pastEvents.slice(0, 5).map((event) => (
                <li key={event.id} className="truncate">
                  <ExternalLink
                    href={event.eventUrl}
                    className="truncate text-ellipsis w-full"
                    aria-label={`View ${event.title} on Meetup`}
                  >
                    {event.title}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center lg:text-left" aria-labelledby="upcoming-events-nav">
            <h2 id="upcoming-events-nav" className="uppercase mb-4">
              Upcoming events
            </h2>
            <ul className="flex flex-col gap-2">
              {upcomingEvents.slice(0, 5).map((event) => (
                <li key={event.id} className="truncate">
                  <ExternalLink
                    href={event.eventUrl}
                    className="truncate text-ellipsis w-full"
                    aria-label={`View ${event.title} on Meetup`}
                  >
                    {event.title}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 lg:justify-self-end flex flex-col items-center lg:items-start">
            <h2 className="uppercase mb-4">Social media</h2>
            <div className="flex gap-4" aria-label="Social media links">
              <ExternalLink href="https://github.com/EuTM" aria-label="View our GitHub">
                <GitHubLogoIcon className="w-4 h-4" />
              </ExternalLink>
              <ExternalLink href="https://www.linkedin.com/company/105187082" aria-label="Follow us on LinkedIn">
                <LinkedInLogoIcon className="w-4 h-4" />
              </ExternalLink>
              <ExternalLink href="https://www.instagram.com/eutechmeetup" aria-label="Follow us on Instagram">
                <InstagramLogoIcon className="w-4 h-4" />
              </ExternalLink>
              <ExternalLink href="https://x.com/EuTechMeetup" aria-label="Follow us on Twitter">
                <TwitterLogoIcon className="w-4 h-4" />
              </ExternalLink>
            </div>
            <Link href="/" aria-label="EU Tech Meetup home page" className="mt-16 lg:mt-auto">
              <LogoBw className="w-40 invert" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
