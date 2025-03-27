# EU Tech Meetup Website

This is the official website for the EU Tech Meetup in Maastricht. We are a community where developers, entrepreneurs, and creatives come together to share knowledge, exchange ideas, and build meaningful connections.

We are committed to using, supporting, and contributing to open source software and other tech communities around us. Our meetup provides a platform for local talent and innovation while creating a third place for collaboration within the tech community.

## Project structure

This Next.js project is organized as follows:

- **`app/page.tsx`**: The homepage of the website that combines static content with dynamic data displaying upcoming and past events from the Meetup API. This is where users can find information about our community, upcoming talks, and past events.

- **`app/api/revalidate/route.ts`**: A small API route that allows us to revalidate the cache on demand, ensuring that the latest event data is always available to visitors. Otherwise the cache revalidation is set for 24 hours. Read more about [Next.js' cache revalidation strategies](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration).

- **`src/clients/`**: Contains our very small Meetup API client that we built to fetch event data directly from Meetup's platform.

- **`src/components/`**: A collection of reusable React components we've developed specifically for this website, including the event list, typography elements, and SVG icons.

## Running locally

You can run this project locally.

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the site

Read more about [running and setting up Next.js locally](https://nextjs.org/docs/app/getting-started/installation). 

## Stack

This project is built with the following technologies:

- **[Next.js](https://nextjs.org/)**: React framework for server-rendered applications
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[GSAP](https://gsap.com/)**: Animation library (for the wrappy background)
- **[Meetup API](https://www.meetup.com/api/)**: For fetching event data

## Deployment

This website is deployed on [Vercel](https://vercel.com/), the platform built by the creators of Next.js.

## Contributing

We welcome contributions from the community! If you're interested in helping improve our website, please feel free to submit a pull request or open an issue.

## License

This project is open source and available under the [MIT License](LICENSE).