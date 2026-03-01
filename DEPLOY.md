# Deploy to Cloudflare Pages

This project is configured for deployment on Cloudflare Pages using `@cloudflare/next-on-pages`.

## Prerequisites

1.  **Node.js**: Ensure you have Node.js installed (v18+ recommended).
2.  **Cloudflare Account**: You need a Cloudflare account.
3.  **Wrangler**: Ensure you are logged in to Cloudflare locally:
    ```bash
    npx wrangler login
    ```

## Installation

Because of dependency requirements, use `--legacy-peer-deps` if you encounter issues:

```bash
npm install --legacy-peer-deps
```

## Local Preview

To preview the production build locally:

```bash
npm run preview
```

This will build the project using `@cloudflare/next-on-pages` and serve it with `wrangler pages dev`.

## Deployment

### Option 1: CLI Deployment (Recommended for manual deploys)

Run the deploy script:

```bash
npm run deploy
```

This will build the project and deploy it to Cloudflare Pages. It will ask you to create a new project if one doesn't exist.

### Option 2: Git Integration (Cloudflare Dashboard)

1.  Push your code to a GitHub/GitLab repository.
2.  Log in to the Cloudflare Dashboard.
3.  Go to **Workers & Pages** -> **Create Application** -> **Pages** -> **Connect to Git**.
4.  Select your repository.
5.  Configure the build settings:
    *   **Framework Preset**: Next.js
    *   **Build command**: `npx @cloudflare/next-on-pages`
    *   **Build output directory**: `.vercel/output/static`
    *   **Node.js Compatibility**: Ensure `nodejs_compat` flag is enabled (Settings -> Functions -> Compatibility Flags).

## Configuration Notes

-   **Image Optimization**: Since Cloudflare Pages doesn't support Next.js Image Optimization by default, `unoptimized: true` has been added to `next.config.js`. If you need optimization, consider using Cloudflare Images or a third-party loader.
-   **Environment Variables**: Set any required environment variables (like `NEXT_PUBLIC_SITE_URL`) in the Cloudflare Dashboard under **Settings** -> **Environment variables**.
