export interface MeetupEvent {
  id: string;
  eventUrl: string;
  title: string;
  dateTime: string;
  endTime: string;
  description: string;
  status: string;
  going: number;
  venue?: {
    name: string;
    address: string;
  };
}

export interface GetMeetupEventsResponse {
  data: {
    groupByUrlname: {
      id: string;
      upcomingEvents: { edges: Array<{ node: MeetupEvent }> };
      pastEvents: { edges: Array<{ node: MeetupEvent }> };
    };
  };
}

export interface GetMeetupEventResponse {
  data: {
    event: MeetupEvent;
  };
}

const EVENT_QUERY = "id eventUrl title dateTime endTime description status going venue { name address }";

export async function getMeetupEvents(): Promise<GetMeetupEventsResponse> {
  const response = await fetch("https://api.meetup.com/gql", {
    headers: { "content-type": "application/json" },
    body: `{ "query":"{ groupByUrlname(urlname: \\"EuregioTechMeetup\\") { id upcomingEvents(input: {first: 3}, sortOrder: ASC) { edges { node { ${EVENT_QUERY} } } } pastEvents(input: {first: 10}, sortOrder: DESC) { edges { node { ${EVENT_QUERY} } } } } }","variables":null }`,
    method: "POST",
  });

  return response.json();
}

export async function getMeetupEvent(id: string): Promise<GetMeetupEventResponse> {
  const response = await fetch("https://api.meetup.com/gql", {
    headers: { "content-type": "application/json" },
    body: `{ "query":"{ event(id: \\"${id}\\") {${EVENT_QUERY} } }","variables":null }`,
    method: "POST",
  });

  return response.json();
}
