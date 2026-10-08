# Aurelia — 3D Product Showcase Plan

## Scope
Build a responsive 3D product launch landing page for **Aurelia One**, a premium spatial-audio headset. The experience includes a high-impact hero, interactive 3D viewer with rotate and zoom controls, scroll-driven product presentation, concise feature callouts, a speculative “unknown signal” archive, an interactive instrument anatomy lab, a material finish selector, a product story section, final conversion CTA, touch-friendly behavior, motion, loading state, and performance-conscious delivery. The speculative content is explicitly framed as fictional brand research, so the mystery comes from the narrative rather than unsupported claims about human perception.

## Design Direction

- **Design movement:** Obsidian Halo — cinematic black-on-black product-launch editorial with electric violet light and precision engineering cues.
- **Core principles:** sculptural, dramatic, spacious, tactile. Every section gives the product room to breathe; copy stays concise; motion is purposeful and spatial.
- **Color philosophy:** near-black surfaces create a gallery-dark environment; electric violet acts as an ownable energy signal for light, focus, and action; cool graphite and silver provide material contrast without visual noise.
- **Palette:** Obsidian `#0A0A0D`, violet `#7C3AED`, violet glow `#A78BFA`, silver `#D5D2DB`, graphite `#26232E`, white `#F7F5FA`.
- **Layout paradigm:** offset editorial composition. The hero splits copy and the product stage rather than centering everything; proof points travel on a vertical rail; feature blocks alternate left/right around a large, breathing product field.
- **Signature elements:** violet halo behind the product, hairline orbital rings around the 3D stage, and thin numbered section markers with monospaced microcopy.
- **Interaction philosophy:** controls should feel like a camera rig, not a generic carousel. Drag rotates the product, wheel/pinch changes scale, orbit presets reveal intentional angles, and the viewer provides explicit camera status.
- **Animation:** slow floating product idle, soft ambient light pulse, staggered reveal on scroll, springy control feedback, no autoplaying spectacle that competes with the product. Respect reduced-motion preferences.
- **Typography:** Manrope for all brand and editorial type, with compact uppercase microcopy in a monospaced fallback. Large headlines use tight tracking and short line lengths; body copy is calm and readable.
- **Brand essence:** A spatial-audio instrument for people who want their everyday listening to feel considered, immersive, and rare. Personality: **precise, atmospheric, assured**.
- **Brand voice:** short, sensory, technically grounded. Example lines: “Sound, shaped around you.” / “A quieter kind of power.”
- **Wordmark & logo:** a custom wordmark treatment with a broken halo glyph — a thin violet arc interrupted by a bright point — paired with the Aurelia name.
- **Signature brand color:** Electric violet `#7C3AED`.

## Implementation

- Use a lightweight static Node server on port 3000 and plain HTML/CSS/JavaScript for a fast preview and minimal dependency footprint.
- Build the product model from layered DOM elements with CSS 3D transforms, keeping the interaction understandable and avoiding a heavyweight asset download. A pointer/touch drag controls yaw and pitch; camera buttons control three preset angles; wheel and +/- controls adjust scale.
- Build the unknown-signal section as a visual archive with orbiting scan lines and tabbed field notes. Build the anatomy lab from a second CSS 3D product study with layer tabs that rotate the model and update measurements/copy. Build the material lab as a visual finish switcher with Graphite, Aster, and Oxide states.
- Use an IntersectionObserver for reveal motion and scroll progress. CSS custom properties drive the product stage, anatomy yaw, material states, and feature rail.
- Keep all browser-facing paths relative. Serve `public/manus-routes.json` with the single `/` route.
- Keep the page self-contained and image-free: the product is the hero visual, with CSS glow and material treatment supplying atmosphere.

## Project Structure

- `index.html` — semantic page sections, navigation, product viewer markup, feature/story/CTA content.
- `styles.css` — design tokens, responsive layout, CSS 3D product construction, archive/anatomy/material visuals, motion, reduced-motion rules.
- `app.js` — viewer controls, drag/zoom/orbit interactions, scroll presentation, nav state, reveal observer, field-note tabs, anatomy layer controls, material switcher, and loading state.
- `server.js` — static server with SPA-safe fallback and route manifest support.
- `public/manus-routes.json` — route declarations for the preview/runtime.
- `app.config.ts` — project logo metadata.
- `TODO.md` — outcome criteria captured from the confirmed blueprint.

## Serving

The project runs with `node server.js` and listens on `0.0.0.0:3000`. No backend, database, or authentication is required for this static showcase.
