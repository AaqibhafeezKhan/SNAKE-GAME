# TERMINAL_SNAKE — Protocol V4

A sharp, minimalist Snake game built with vanilla HTML5 Canvas, CSS3, and JavaScript. Self-contained in a single file — no build tools, no dependencies — instantly deployable to GitHub Pages.

---

## Features

- **Biome System** — Visual theme shifts every 50 points across 5 biomes: `VOID`, `TECH`, `ACID`, `GOLD`, `MONO`. Each biome changes the snake, grid, food, and background palette. A pulse animation announces each transition.
- **Ghost Trail** — The last 8 head positions render as fading ghost segments behind the snake, giving a motion-blur effect. Drawn directly on canvas; zero impact on collision logic.
- **Combo Multiplier** — Eating food within 5 seconds of the previous food increments a combo (up to ×5). Score is multiplied accordingly. A large fading overlay flashes the active multiplier.
- **Obstacle Pulse Warning** — When food is eaten, obstacles flash rhythmically for 3 seconds before relocating, warning the player to move clear.
- **Portal Walls — WARP MODE** _(new)_ — Unlocks automatically at **150 points**. Walls become portals: hitting any edge teleports the snake to the opposite side. A `⚡ WARP` badge appears in the HUD. The game-over screen records whether WARP was achieved.
- **Web Audio Sound Engine** _(new)_ — Pure synthesized tones via the Web Audio API (no audio files). Distinct sounds for: food eaten, obstacle warning, biome transition chord, warp unlock fanfare, and death sequence. Audio unlocks on first keypress or touch (browser policy compliant).
- **High Score Display** — Persistent best score shown in the HUD (localStorage). Also visible on game-over screen.
- **Mobile D-pad** — Touch-friendly on-screen controls with `touchstart` + `mousedown` support. Auto-hidden on screens ≥ 600px.

---

## Bug Fixes vs Previous Version

- **Critical:** `this.obstacles` was referenced inside `spawnItem()` before being initialised in `init()`, causing a `TypeError` on first load and after each restart. Fixed by moving `this.obstacles = []` before the first `spawnItem()` call.
- Mobile D-pad used `onmousedown` only — now registers `touchstart` events for real touch devices.
- Food blink rate reduced from 50 ms to 200 ms (previous rate was visually aggressive and close to seizure-inducing thresholds).

---

## How to Play

1. Open `index.html` in any modern browser.
2. **Desktop:** Arrow Keys or `WASD` to move.
3. **Mobile:** Tap the on-screen D-pad.
4. Eat food to grow and score points. Avoid walls (until WARP unlocks), obstacles, and your own body.
5. Survive long enough to unlock WARP MODE at 150 points.

---

## Scoring

| Action                   | Points             |
| ------------------------ | ------------------ |
| Eat food                 | 10 × current combo |
| Combo ×2 (eat within 5s) | 20 pts             |
| Combo ×5 (max)           | 50 pts             |

---

## Technologies

`HTML5 Canvas` · `CSS3` · `Vanilla JavaScript (ES6+)` · `Web Audio API` · `Google Fonts (JetBrains Mono)`

---

## Deployment

```bash
git add index.html && git commit -m "deploy" && git push
```

---

## Repository Topics

`snake-game` · `html5-canvas` · `browser-game` · `vanilla-js` · `single-file` · `github-pages` · `web-audio-api` · `mobile-friendly` · `no-dependencies`

## Repository Description

> A retro-terminal Snake game with biome themes, ghost trail, combo scoring, portal walls, and synthesized sound effects. Single `index.html`. Zero dependencies.
