# The Fitting Room

A resume-tailoring tool. Paste a resume and a job posting, get tailored bullet
points, a fit score, and a cover letter draft — powered by GPT-4o-mini.

## How it's built
- `src/` — the React frontend (Vite)
- `api/tailor.js` — a Vercel serverless function that calls OpenAI. Your API
  key lives here, on the server, never in the browser.

## Deploy it (free, ~10 minutes)

1. **Push this folder to GitHub**
   Create a new repo and push this project to it (or use GitHub's
   "upload files" button if you don't want to use git).

2. **Sign up at [vercel.com](https://vercel.com)** with your GitHub account.

3. **Import the repo** — click "Add New Project," pick this repo, and Vercel
   will auto-detect it's a Vite app. No build config changes needed.

4. **Add your OpenAI key as an environment variable**
   In the Vercel project settings → Environment Variables, add:
   - Name: `OPENAI_API_KEY`
   - Value: your key from https://platform.openai.com/api-keys

5. **Deploy.** Vercel gives you a live URL (like `your-app.vercel.app`) in
   about a minute. The `/api/tailor` function and the frontend both deploy
   together automatically.

## Run it locally first (optional but recommended)

```bash
npm install
npm i -g vercel        # Vercel's CLI, so /api routes work locally too
vercel dev              # instead of `npm run dev` — this runs the API route too
```

Create a `.env` file (never commit this) with:
```
OPENAI_API_KEY=sk-...
```

## Cost
Using `gpt-4o-mini`, each "Tailor it" run costs a fraction of a cent
(roughly $0.0005–0.001 depending on resume/posting length). $5 of API credit
covers several thousand runs.

## Adding ads (AdSense)

The layout already has two placeholder ad slots — one under the header, one
at the bottom of the page (`<AdSlot />` in `src/App.jsx`). To activate real
ads:

1. Apply at [adsense.google.com](https://adsense.google.com) with your live
   Vercel URL (a custom domain, see below, helps approval odds).
2. Once approved, add the AdSense loader script to `index.html`, inside
   `<head>`:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
   ```
3. Replace the contents of each `AdSlot` div in `src/App.jsx` with your ad
   unit, e.g.:
   ```jsx
   <ins className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
   ```
   and call `(window.adsbygoogle = window.adsbygoogle || []).push({});` once
   per slot after mount (a small `useEffect` in `App.jsx` handles this).

AdSense generally wants: a real domain, a privacy policy page, and some
actual traffic before approving a brand-new site — a single-tool page with
zero visitors is a common rejection reason. Worth adding a short "How it
works" / "Privacy" page before applying (ask and I'll draft these).

## Custom domain (optional, helps with ad approval + trust)

1. Buy a domain (Namecheap, Porkbun, etc. — ~$10-15/year).
2. In Vercel: Project → Settings → Domains → add your domain, follow the
   DNS instructions Vercel gives you (usually one CNAME or A record).
3. Vercel issues free HTTPS automatically once DNS propagates (~minutes to
   a few hours).

## Getting traffic (the actual bottleneck for ad revenue)

Ad income scales with visitors, not with having ads installed. A brand-new
tool with a handful of testers won't produce meaningful revenue — that
takes real, repeat traffic. A few realistic channels for a tool like this:

- **SEO content**: a blog section ("how to tailor your resume for X role",
  "ATS keyword matching explained") targeting long-tail search terms people
  actually search before/while job hunting.
- **Reddit/communities**: r/jobs, r/resumes, r/careerguidance — share as a
  free tool (not a sales pitch), following each community's self-promo rules.
- **Product Hunt / Indie Hackers**: a launch post for a free tool tends to
  get an initial traffic spike.
- **LinkedIn**: job-search content performs well there, and it's a natural
  audience match.

Expect this to be a slow build — weeks to months to meaningful traffic, not
days.

## Other notes
- The prompt explicitly tells the model not to invent resume details —
  it's instructed to only rephrase/reframe real experience. Still worth a
  human read-through before sending anything out.
- If you want to add a usage cap (so a stranger can't burn through your
  OpenAI credit if this becomes public), the simplest option is adding
  Vercel's built-in rate limiting or a simple IP-based counter in
  `api/tailor.js`.


