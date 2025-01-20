import { getMeetupEvent } from "~/clients/meetup";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const event = await getMeetupEvent(id);

  return <pre>{JSON.stringify(event.data.event, null, 2)}</pre>;
}
