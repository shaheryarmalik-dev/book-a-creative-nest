## Stripe Payments (USD hourly)

Development setup:

1. Install deps:
   - `npm i @stripe/stripe-js stripe express cors dotenv`
   - `npm i -D tsx concurrently`
2. Configure environment:
   - Create `.env` with:
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_... # optional for local until webhook configured
SUCCESS_URL=http://localhost:8080
CANCEL_URL=http://localhost:8080
PORT=5174
```
3. Run both dev servers:
   - `npm run dev:full`
   - Vite runs on http://localhost:8080 and proxies `/api/*` to the Stripe server on 5174.

Webhook (optional in dev):
   - `stripe listen --forward-to localhost:5174/api/stripe-webhook`

In the app, the booking form posts to `/api/create-checkout-session` and redirects to Stripe Checkout in USD, pricing by hours × hourly rate.

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/b58e77d0-af05-4594-8d94-b1fa6d8db852

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/b58e77d0-af05-4594-8d94-b1fa6d8db852) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/b58e77d0-af05-4594-8d94-b1fa6d8db852) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
