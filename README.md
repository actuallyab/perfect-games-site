# Perfect Games — Studio Website

A single, static legal/marketing website for **Perfect Games**, covering every mobile game the
studio publishes (Perfect Drop today; Perfect Chase and future titles later) — so a new game never
needs its own Privacy Policy, Terms, or Support page.

Plain HTML, CSS, and a small vanilla-JS file. **No framework, no build step, no `npm install`.**
Deployable as-is to GitHub Pages.

This is a **separate, independent repository** — it does not depend on, reference, or modify any
game's own source repository (e.g. the Perfect Drop app repo).

## Folder structure

```
perfect-games-site/
├── index.html            Homepage ("/")
├── privacy/
│   └── index.html        Privacy Policy ("/privacy/")
├── terms/
│   └── index.html        Terms & Conditions ("/terms/")
├── support/
│   └── index.html        Support page ("/support/")
├── css/
│   └── style.css         Shared stylesheet (light + dark mode via CSS variables)
├── js/
│   └── main.js           Mobile nav toggle + active-link highlighting (no dependencies)
├── assets/
│   └── favicon.svg       Placeholder favicon — swap for real studio branding
├── robots.txt
├── sitemap.xml
├── .nojekyll              Tells GitHub Pages not to run Jekyll processing on this static site
└── README.md
```

Each section lives in its own folder with an `index.html` so GitHub Pages serves clean URLs
(`/privacy/`, `/terms/`, `/support/`) with no server config or build step required.

## How to publish using GitHub Pages

1. Create a new **public** GitHub repository (e.g. `perfect-games-site`) and push this folder's
   contents to it as the repo root:
   ```bash
   cd perfect-games-site
   git init
   git add .
   git commit -m "Initial commit: Perfect Games studio website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/perfect-games-site.git
   git push -u origin main
   ```
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Choose branch **`main`**, folder **`/ (root)`**, then **Save**.
5. GitHub will publish the site at:
   `https://<your-username>.github.io/perfect-games-site/`
6. Replace every occurrence of `YOUR_GITHUB_USERNAME` in `index.html`, `privacy/index.html`,
   `terms/index.html`, `support/index.html`, `robots.txt`, and `sitemap.xml` with your actual
   GitHub username (or your custom domain, if you set one up with a `CNAME` file) so canonical
   URLs, Open Graph tags, and the sitemap resolve correctly. A quick way to do this from the repo
   root:
   ```bash
   grep -rl "YOUR_GITHUB_USERNAME" . | xargs sed -i '' 's/YOUR_GITHUB_USERNAME/<your-username>/g'
   ```
   (Drop the `''` after `-i` on Linux; macOS `sed` requires it.)

### Using a custom domain instead

Add a `CNAME` file to the repo root containing just your domain (e.g. `legal.perfectgames.com`),
point your DNS at GitHub Pages per
[GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site),
and update the canonical/OG URLs above to use that domain instead of `github.io`.

## How to change the support email

The contact email (`perfectgames.ab@gmail.com`) appears in three files. Update all three together:

- `privacy/index.html` — Section 11, "Contact Information"
- `terms/index.html` — Section 11, "Contact"
- `support/index.html` — every contact card and the "Still need help?" section

Or run a single find-and-replace from the repo root:

```bash
grep -rl "perfectgames.ab@gmail.com" . | xargs sed -i '' 's/perfectgames.ab@gmail.com/new-email@example.com/g'
```

## How to update the Privacy Policy (and Changelog)

The Privacy Policy (`privacy/index.html`) is written to be **game-agnostic** — it already covers
"any future mobile applications published under the Perfect Games brand," so most new games need
**no changes at all**. You only need to edit it when:

| Trigger | What to update |
|---|---|
| A new game is added to the studio | Add its name to the bullet list at the top of the policy (currently Perfect Drop, Perfect Chase) |
| A new third-party SDK is integrated (e.g. a new analytics/ad/mediation partner) | Add it to Section 1.4 ("Data Collected via Third-Party Services") and Section 3 ("Third-Party Services"), with a link to that provider's own privacy policy |
| A new data type is collected (e.g. location, contacts, camera/mic access) | Add it to Section 1 and remove/adjust the "Currently..." note box if it's no longer accurate |
| A new feature category ships (accounts, leaderboards, cloud saves, multiplayer, friends, cross-platform sync) | Expand Section 9 ("Future Features & Updates to Data Practices") to describe what's now collected and why |
| Any of the above | Bump the **"Last updated"** date at the top of `privacy/index.html`, and add a row to the Changelog table below |

**Always bump the "Last updated" date whenever the policy text changes** — Google Play and Apple
both expect this date to reflect the true last revision.

### Changelog

Keep a running log of material Privacy Policy revisions here, so it's clear at a glance what
changed and why (useful for app store review teams and for your own records):

| Date | Change | Reason |
|---|---|---|
| 2026-07-04 | Initial Privacy Policy published | Studio website launch, covering Perfect Drop |

> When you make a policy change, add a new row above using the same format:
> `| YYYY-MM-DD | Short description of what changed | Why (new game / new SDK / new feature) |`

## How to add new games

1. **Homepage** (`index.html`): move the game from "Coming Soon" to "Current Games" (or add a new
   card) in the relevant `<div class="card-grid">` block.
2. **Privacy Policy** (`privacy/index.html`): add the game's name to the bullet list at the top
   (see the Changelog table above — this alone is usually the *only* required Privacy Policy edit).
3. That's it — Terms & Conditions and the Support page are already written generically and need no
   per-game edits.

## How to customize branding

- **Colors**: edit the CSS variables at the top of `css/style.css` (`:root { --accent: ...; }` for
  light mode, and the `@media (prefers-color-scheme: dark)` block for dark mode).
- **Logo/name**: the `.brand` element (💧 emoji + "Perfect Games" text) appears in the `<header>`
  of every page — replace the emoji with an `<img>` tag pointing at a real logo in `assets/` if
  you'd rather use image branding.
- **Favicon**: `assets/favicon.svg` is a placeholder droplet icon — replace it with your real
  studio icon (keep the filename, or update the `<link rel="icon">` tag in every page's `<head>`).
- **Social preview image**: the Open Graph/Twitter `<meta>` tags reference
  `assets/og-image.png`, which does not exist yet — add a real 1200×630px image at that path for
  link previews on social media/messaging apps to show an image.

## Dark mode

Dark mode is automatic — it follows the visitor's OS/browser `prefers-color-scheme` setting via
CSS media queries in `css/style.css`. There is no manual toggle by design (no extra JS/state
needed); every color is a CSS variable, so re-theming either mode only requires editing
`css/style.css`.

## Notes on legal content

The Privacy Policy and Terms & Conditions in this repo are template legal documents, written to be
broadly compliant with Google Play's Data Safety / User Data policies for casual mobile games
using Firebase, AdMob, and Google Play Billing. They are **not a substitute for legal advice** —
review them with a lawyer before relying on them for a real app store submission, especially if
you plan to operate in the EU/UK (GDPR), California (CCPA/CPRA), or collect any data beyond what's
described here.
