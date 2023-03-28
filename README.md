# Emoji of the X

![E2E](https://github.com/jmagrippis/emoji-of-the-x/actions/workflows/playwright.yaml/badge.svg)

The first app to pick and show the emoji of the Day / Week / Month!

## Tech used

This project used to be a React and GraphQL app, and it was pretty cool! Check the Git history!

The current stack is:

- [SvelteKit](https://kit.svelte.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Related video content

Johnny often livestreams development over at [YouTube](https://www.youtube.com/@jmagrippis)

- [🔴 LIVESTREAM: Initial project setup & scraping with Happy DOM](https://www.youtube.com/watch?v=dc5rRLHNPbg)
- [🔴 LIVESTREAM: Setting up ChatGPT 3.5 Turbo 🤖 Generative AI with OpenAI & Supabase](https://www.youtube.com/watch?v=9-U5SByu9e4)
- [🔴 LIVESTREAM: Cached ChatGPT in response to user interactions 👩‍💻 with SvelteKit Forms & Supabase](https://www.youtube.com/watch?v=-hmYEcUaKUw)

## Running locally

To run this project locally, you will need your own `.env` file, filled with the correct environment variables. You can use the `.env.example` file as a template!

If you are running [the Supabase DB locally](https://supabase.com/docs/guides/cli/local-development), you will be able to connect to it at `http://localhost:54321`, which you should keep in your `.env`, and see its GUI and manage it at [http://localhost:54323/project/default/editor](http://localhost:54323/project/default/editor).

To view this app, run the dev server with:

```sh
npm run dev
```

Then visit [http://localhost:5173](http://localhost:5173) 🚀
