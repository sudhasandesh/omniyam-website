# Omniyam Prop Solutions — Website (Draft v1)

A single-page site built from the company profile deck. Dark charcoal + copper palette,
blueprint corner-bracket motif, tabbed service breakdowns, and a lead-capture enquiry form.

## Files
- `index.html` — all page content
- `styles.css` — design tokens + layout
- `script.js` — nav, tabs, scroll reveal, form handling

No build step, no dependencies — it's plain HTML/CSS/JS.

## Recommendation: Netlify (not Vercel) for this project

Both are free and both work, but **Netlify is the better fit here** because:
- **Built-in form handling.** The enquiry form already has `data-netlify="true"` wired up —
  once deployed on Netlify, submissions land in your Netlify dashboard (and can email you)
  with zero backend code. Vercel has no equivalent for static HTML forms; you'd need to
  wire up a third-party form service (Formspree, etc.) or write a serverless function.
- Vercel's strengths (edge functions, Next.js optimizations) aren't relevant for a static
  marketing site like this.
- Both are equally easy for the private-repo + custom-domain workflow, so it's a wash there.

## Deploy steps

1. **Push to a private GitHub repo**
   ```bash
   cd omniyam-site
   git init
   git add .
   git commit -m "Initial draft site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/omniyam-website.git
   git push -u origin main
   ```
   (Create the repo on GitHub first, set to **Private**.)

2. **Connect to Netlify**
   - Sign up free at netlify.com with your GitHub account.
   - "Add new site" → "Import an existing project" → pick the `omniyam-website` repo.
   - Build command: leave blank. Publish directory: `/` (root).
   - Deploy — you'll get a free `random-name.netlify.app` URL immediately. Share this for review.

3. **Enable the form** (usually automatic)
   - Netlify auto-detects the `data-netlify="true"` form on first deploy.
   - Forms tab in your Netlify dashboard → you'll see submissions appear there.
   - Site settings → Forms → Form notifications → add your email to get notified per submission.

4. **Buy your domain on GoDaddy** whenever ready.

5. **Connect the custom domain**
   - Netlify: Site settings → Domain management → Add a domain → enter your domain.
   - Netlify shows you either:
     - A **CNAME** record (for `www.yourdomain.com`), or
     - Netlify's load-balancer IP for the apex `yourdomain.com` (an A record), or
     - Netlify DNS (if you point your domain's nameservers at Netlify directly — simplest option).
   - In GoDaddy: My Products → DNS → Manage DNS → add the exact records Netlify gave you
     (or change nameservers, if you chose that route).
   - Netlify auto-issues a free SSL certificate once DNS resolves (can take minutes to a few hours).

6. Every future `git push` to `main` auto-redeploys the live site.

## Editing content later
All copy lives directly in `index.html` — service lists, the Vision/Mission text, contact
email, etc. Colors and spacing are all controlled by CSS variables at the top of `styles.css`
under `:root`, so a palette or font change only needs edits in one place.

## Note on visuals
The hero/about graphics are custom line-art SVGs (blueprint/floor-plan style), not photos —
kept that way to avoid using unlicensed stock imagery in a client deliverable. Swap in real
project photography whenever you have it; the `bracket-frame` class will keep the corner
motif consistent on any image you drop in.
