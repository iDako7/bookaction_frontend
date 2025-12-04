This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### CLI Deployment

You can also deploy directly from your terminal using the Vercel CLI (installed locally):

```bash
npx vercel
```

Follow the prompts to log in and link your project.

### Environment Variables

When deploying, ensure you set the following environment variables in the Vercel Project Settings or when prompted by the CLI:

- `NEXT_PUBLIC_API_URL`: URL of your backend API. Copy `.env.example` to `.env.local` and set this value for local development.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Testing

This project uses [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit and integration testing.

### Running Tests

To run the full test suite:

```bash
npm test
```

This runs Vitest in watch mode by default. To run tests once (e.g., for CI):

```bash
npm test -- run
```

Integration tests call the live backend. Set `NEXT_PUBLIC_API_URL` (see `.env.example`) and start the backend with `npm run dev` in `BookAction_BackEnd`. Ensure the `testuser_new@example.com` account from `BookAction_BackEnd/api.automated.rest` exists so the quiz flow test can authenticate.

### Mock Data in Tests

Tests are configured to mock API hooks using `vi.mock`. The testing environment (`jsdom`) and setup files (`vitest.setup.ts`, `lib/test-utils.tsx`) handle the necessary configuration.

When writing new tests, use the `renderWithProviders` utility from `@/lib/test-utils` to wrap components with the necessary providers (QueryClient, Suspense).
