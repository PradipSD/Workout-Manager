# Iron Log — Personal Training Tracker

A simple, static HTML/CSS/JS website for tracking a 4-week progressive overload
muscle-gain program: workout plan, diet plan, and a bodyweight/measurements log
with a chart. No backend, no build step — everything runs in the browser and
data is saved locally via `localStorage`.

## What's inside

```
fitness-tracker/
├── index.html          # all pages/tabs live in this one file
├── css/
│   └── style.css       # design system + layout
├── js/
│   ├── data.js         # workout weeks + diet plan content (edit this to update your plan)
│   └── app.js          # tab navigation, logging, chart logic
└── README.md
```

- **Dashboard** — quick overview: current week, sessions logged, streak, latest weigh-in.
- **Workout** — 4-week plan (Push/Pull/Legs, 6 days/week), with per-exercise weight
  fields and a "mark session complete" button. Week 4 is a deload.
- **Diet** — your current meal plan, macro breakdown, and notes on what's working /
  what to improve.
- **Progress** — log date, weight, chest/waist/arm measurements, and notes. Includes
  a line chart of bodyweight over time (via Chart.js from a CDN).
- **Notes** — free-form scratchpad, auto-saved as you type.

All logged data (sessions, weights, body log, notes) is stored **only in your
own browser** using `localStorage`. Nothing is sent anywhere. This also means:
- Data is per-browser/per-device — it won't sync between your phone and laptop.
- Clearing your browser data/cache will erase your logs.
- If you want backup, you can add an export/import feature later, or just note
  down key numbers elsewhere occasionally.

## How to host this on GitHub Pages (free)

1. **Create a new repository** on GitHub (e.g. `iron-log`). Keep it public if
   you're using a free GitHub account (GitHub Pages needs a public repo unless
   you're on GitHub Pro/Team/Enterprise).
2. **Upload these files** to the repository:
   - Easiest way: on the repo page, click **"Add file" → "Upload files"**, then
     drag in `index.html`, the `css` folder, and the `js` folder (keep the same
     folder structure).
   - Or, if you use git locally:
     ```bash
     cd iron-log
     git init
     git remote add origin https://github.com/<your-username>/iron-log.git
     git add .
     git commit -m "Initial commit — Iron Log tracker"
     git branch -M main
     git push -u origin main
     ```
3. **Enable GitHub Pages**:
   - Go to your repo → **Settings** → **Pages** (left sidebar).
   - Under "Build and deployment", set **Source** to `Deploy from a branch`.
   - Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
4. Wait a minute or two — GitHub will give you a live URL, usually:
   ```
   https://<your-username>.github.io/iron-log/
   ```
5. Open that URL on your phone or laptop and start logging. You can add it to
   your phone's home screen for quick access (Share → "Add to Home Screen" on
   iOS, or the browser menu → "Add to Home screen" on Android).

## Updating your plan later

To change exercises, sets/reps, RPE targets, or diet items for a new training
cycle, just edit the plain JavaScript objects in `js/data.js` — no other code
needs to change. Re-upload that one file (or `git push`) and the site updates.

## Notes

- Fonts (Oswald, Inter) and the charting library (Chart.js) are loaded from
  public CDNs, so an internet connection is needed the first time a page loads
  (they get cached by the browser after that).
- This is a personal tool, not medical or nutrition software — the diet notes
  and training guidance are the same recommendations discussed in your
  planning conversation, not a substitute for professional advice.
