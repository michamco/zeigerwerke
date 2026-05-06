# Zeigerwerke.com

High-end German watchmaker site — Genf, Manufaktur seit 1894.

## Pages
- `index.html` — Maison (Landing, Hero-Video, Heritage, Featured Collection, Atelier)
- `kollektion.html` — Shop overview, 6 Uhren, Filter (Héritage / Chronomètres / Dame / Pièces uniques) + Sort
- `uhr.html` — Single product detail (Réf. 1894 — L'Origine, Specs, Verwandte Stücke)
- `manufaktur.html` — Geschichte des Hauses, 4 Generationen, Savoir-faire, Presse
- `kontakt.html` — Atelier in Genf, Adresse, vollständiges Kontaktformular

## Tech
- Plain HTML / CSS / JS — keine Build-Tools, kein Framework
- Google Fonts: Cormorant Garamond, Italiana, Inter Tight (über Stylesheet geladen)
- Hero-Video: `assets/hero-video.webm` + `.mp4` Fallback
- In-memory Cart-Drawer (kein Payment integriert — wie gewünscht)
- IntersectionObserver-Reveal-Animationen
- Mobile-first responsive

## Deploy auf GitHub Pages
1. Inhalt des Ordners ins Repo `michamco.github.io/zeigerwerke` legen
2. `git add . && git commit -m "Initial Zeigerwerke site" && git push`
3. In Repo-Settings → Pages → Source: `main` / `(root)`
4. Live unter `https://michamco.github.io/zeigerwerke/`

## Asset-Übersicht
- `assets/logo-full.png` & `logo-icon.png` — Markenzeichen
- `assets/hero-video.mp4/.webm` & `hero-poster.jpg` — Hero-Hintergrund
- `assets/watch-1.svg` – `watch-6.svg` — 6 SVG-Uhren-Illustrationen
- `assets/heritage-scene.svg`, `editorial-scene.svg`, `atelier-scene.svg` — Story-Szenen

## Anpassungen
Alle Texte sind in `*.html` direkt editierbar.
Alle Farben & Spacing als CSS-Custom-Properties oben in `css/styles.css`:
`--ink`, `--ink-2`, `--paper`, `--gold`, `--rose` — einmal ändern, überall anpassbar.
