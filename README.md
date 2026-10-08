# AIBookNest website

React + Vite + Tailwind v4 single-page site, deployed to GitHub Pages at https://aibooknest.com.

## Run locally
    npm install
    npm run dev

## Deploy
Pushing to `main` builds and publishes automatically (`.github/workflows/deploy.yml`).

One-time setup:
1. Repo -> Settings -> Pages -> Source: **GitHub Actions**
2. Same page -> Custom domain: `aibooknest.com` (the `public/CNAME` file keeps it set across deploys)
3. At your domain registrar, add these DNS records:
   - A    @    185.199.108.153
   - A    @    185.199.109.153
   - A    @    185.199.110.153
   - A    @    185.199.111.153
   - CNAME www  <your-github-username>.github.io
4. When GitHub finishes the certificate check, tick **Enforce HTTPS**

## Get form submissions in your email (one-time, 2 minutes)
Every "Book a Demo", pricing and "Let's talk" button opens an inquiry form. Submissions are emailed to you through Web3Forms (free, 250/month).
1. Go to https://web3forms.com, enter the email address where you want inquiries, and verify it.
2. Copy the access key they email you.
3. In `src/App.tsx`, replace `YOUR_WEB3FORMS_ACCESS_KEY` with that key and push to `main`.

Until the key is added, the form falls back to opening the visitor's email app, so add the key before you share the site.

## Other things to edit in `src/App.tsx`
- `BOOKING_URL` is empty by default. Paste a real calendar link (GoHighLevel calendar, Calendly, etc.) to show a "pick a time yourself" link inside the form.
- `DENTAL_DEMO_URL` points at a Replit-hosted demo site. Move that one off Replit too, then update the URL.
- The `aibooknest-chat-widget-mount` div is an empty placeholder. Paste your GoHighLevel chat widget script into `index.html` for the live widget.
