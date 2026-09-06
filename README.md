# September 7th — A Personal Friendship Archive

A fully interactive, animated website built as a personal gift for a best friend.
Not a template. Built for one specific person, one specific story.

Live at: [https://github.com/NikhilGolla12/Sep7th](https://github.com/NikhilGolla12/Sep7th)

---

## What's inside

- **14 chapters** navigated like a story — swipe or tap the orb to move forward
- **Animated intro card** — "Happy September 7th" splash screen with confetti
- **Character animations** — spinning girl, running hug, forehead kiss (SVG, hand-drawn style)
- **Interactive easter eggs** — blooming red rose, envelope that opens, gift that unwraps, polaroid that develops on shake, fireworks on the September 7 dot
- **Section signature animations** — fairy lights, paper plane, hourglass, film strip, film reels, butterflies, ink drop, paper plane trail
- **Gallery** — 3D tilt-on-hover photos, lightbox with keyboard navigation
- **Videos** — cinematic play button, muted preview
- **Word-by-word text reveal** in the personal message section
- **Reaction capture** — silently records front camera on entry (saved locally, never uploaded)
- **Optional background music** toggle
- Fully responsive — works on mobile, tablet, desktop
- Respects `prefers-reduced-motion`

---

## Quick start

You need [Node.js](https://nodejs.org) 18+.

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

---

## How to make it yours

**Everything personal lives in one file:**

```
src/data/content.ts
```

Replace anything in `[BRACKETS]`. That's it. You never touch a component.

### Photos → `public/photos/`

Reference as `/photos/your-file.jpg` in `content.ts`.
Missing photos show a placeholder box — nothing breaks.

Recommended size: 1600–2000px on the long edge, `.jpg` or `.webp`.

### Videos → `public/videos/`

Reference as `/videos/your-file.mp4`.
The final personal video message goes in `content.forYou.video.src`.

### Audio → `public/audio/`

Reference as `/audio/your-file.mp3` in `content.audio.src`.
Delete the entire `audio: { ... }` block from `content.ts` to hide the toggle.

---

## Sections overview

| # | Section | Signature animation |
|---|---------|-------------------|
| 01 | Opening | Floating petals + spinning girl + starfield |
| 02 | Where it started | Polaroid that develops on shake |
| 03 | Small things | Fairy lights strung across the top |
| 04 | Only we know | Paper plane flies across on entry |
| 05 | When you disappeared | Hourglass draining sand |
| 06 | September 7 | Fireworks on the meeting dot + running hug animation |
| 07 | Everything after | Film strip scrolling at top |
| 08 | Us, now | Blooming rose (auto-triggers) + butterflies + spinning girl |
| 09 | Things I don't say | Word-by-word typewriter reveal + ink drop rings |
| 10 | The archive | Polaroid stack fan-out + 3D tilt photos |
| 11 | Moving memories | Film reels spinning in corners |
| 12 | The letter | Envelope with wax seal — tap to open |
| 13 | For you | Gift box with ribbon — unwrap before video plays |
| 14 | The end | Forehead kiss animation + petal rain on "celebrate" |

---

## Adding / removing / reordering sections

All sections are listed in two places in `src/App.tsx`:

1. The `CHAPTERS` array near the top — controls the nav dots and labels
2. The `chapters` array — the actual rendered components

To **remove** a section: delete its line from both arrays.
To **reorder**: move lines in both arrays together.
To **restyle**: each section file in `src/sections/` is plain React + Tailwind.

---

## Deploying

```bash
npm run build
```

Produces a `dist/` folder — plain HTML/CSS/JS, no server needed.

### Netlify (easiest — free)
1. Run `npm run build`
2. Go to [netlify.com/drop](https://netlify.com/drop)
3. Drag the `dist` folder in
4. Share the link

### Vercel
```bash
npm i -g vercel
vercel
```

### GitHub Pages
Push to GitHub, go to Settings → Pages → deploy from `dist/` branch.

---

## Tech stack

- React 19 + TypeScript
- Vite 8
- Framer Motion 13
- Tailwind CSS 3
- Custom SVG character animations
- Web MediaRecorder API (reaction capture)
- IntersectionObserver (auto-trigger animations)

---

## Notes

- The story navigation is intentional — one chapter at a time, like turning pages
- Swipe left/right on mobile, arrow keys on desktop, or tap the orb on the right
- The reaction recorder requires camera permission — the browser will prompt once
  and show a camera indicator (cannot be hidden, it's a browser privacy feature)
- The recorded reaction saves as `reaction-[timestamp].webm` to her downloads

---

*Built with care. Not a template.*
