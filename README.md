# Zeigerwerke · Hochwertige Uhren · Berlin

Onepager-Website für **Zeigerwerke** — seriöser Uhrenhändler in Berlin-Charlottenburg. An- und Verkauf hochwertiger Sammleruhren.

## Struktur

```
zeigerwerke/
├── index.html       Onepager (Hero, Über uns, Marken, Ankauf-CTA, Standort, Kontakt)
├── shop.html        Aktueller Bestand (6 Uhren, Filter, Sortierung)
├── ankauf.html      Großes Bewertungsformular (Marke, Ref-Nr, Zustand, Box/Papiere, Foto-Upload …)
├── css/styles.css   Komplettes Design-System
├── js/main.js       Reveal-Animationen, Filter, Form-Handling
└── assets/          Logo, Hero-Video, Watch-SVGs, Szenen-Illustrationen
```

## Was steht wo

### Onepager (`index.html`)
1. **Hero** mit Video, Headline „Sammlerstücke verdienen einen Händler, der zuhört"
2. **Trust-Strip** mit Zahlen (25+ Jahre · 2.400 vermittelte Uhren · 48h · 100%)
3. **Über uns** — Familienbetrieb seit 2003 in Berlin
4. **Marken-Übersicht** — Rolex, Patek, AP, VC, Lange, Omega, IWC, JLC, Breitling, Panerai, Cartier, Tudor, F.P. Journe, Richard Mille, Glashütte Original
5. **Ankauf-CTA** mit 4-Schritte-Prozess
6. **Testimonials** (Dr. Hartmann, T. Krüger, S. Weber)
7. **Standort** Niebuhrstraße 14, 10629 Berlin
8. **Kontaktformular**

### Shop (`shop.html`)
- 6 Beispiel-Uhren: Submariner, Nautilus 5711, Royal Oak Jumbo, Vintage GMT, Speedmaster Pro, Pepsi GMT-Master II
- Filter (Marken-Chips), Sortierung
- „Suchauftrag besprechen" CTA für Wunschmodelle

### Ankauf (`ankauf.html`)
**Das Herzstück.** Detailliertes Bewertungsformular in 5 Sektionen:

- **I. Über die Uhr** — Marke (Dropdown mit 16 Optionen), Modell, Referenznummer, Seriennummer, Baujahr, Gehäusematerial
- **II. Zustand & Zubehör** — Zustand (4 Tiles), Box/Papiere/Service/Anhänger/Rechnung (Checkboxen), letzter Service, Mängel
- **III. Foto-Upload** — Drag-and-Drop-Zone
- **IV. Preisvorstellung** — gewünschter Preis, Eilbedürftigkeit, Hintergrund
- **V. Kontakt** — Name, E-Mail, Telefon, bevorzugter Kontaktweg (Pills), PLZ

Plus FAQ-Sektion mit 6 Antworten und alternative Kontaktwege.

## Geschäftsdaten (frei erfunden, anpassen!)

- **Adresse:** Zeigerwerke GmbH, Niebuhrstraße 14, 10629 Berlin
- **Telefon:** +49 30 887 244 19
- **E-Mail:** kontakt@zeigerwerke.com / ankauf@zeigerwerke.com
- **Öffnungszeiten:** Mo–Fr 10–18 Uhr, Sa 11–15 Uhr (nur nach Vereinbarung)
- **Gegründet:** 2003

## Vorschau

Doppelklick auf `index.html` reicht — alles funktioniert offline ohne Build.

## Deployment auf GitHub Pages

```bash
git clone https://github.com/michamco/michamco.github.io.git
cd michamco.github.io
mkdir -p zeigerwerke
cp -r /pfad/zu/zeigerwerke/* zeigerwerke/
git add . && git commit -m "Zeigerwerke: Dealer-Onepager + Shop + Ankauf"
git push
```

Live unter: `https://michamco.github.io/zeigerwerke/`

## Anpassen

- **Bestand:** `shop.html` → Product-Cards bearbeiten/duplizieren
- **Marken:** `index.html` → `.brand-grid` & `ankauf.html` → `<select id="brand">`
- **Geschäftsdaten:** alle 3 HTML-Files (Telefon, Adresse, E-Mail im Header/Footer/Kontakt)
- **Farben:** `css/styles.css` Sektion 1 — `--ink`, `--paper`, `--gold`
- **Hero-Video:** `assets/hero-video.mp4` und `.webm` ersetzen
