# Aurelia One: Immersive 3D Product Showcase & Spatial-Audio Landing Page

A cinematic, production-ready product landing page for **Aurelia One**, a fictional spatial-audio instrument. The experience combines an interactive CSS 3D product viewer, an AI-generated sculptural hero render, editorial storytelling, material studies, responsive layouts, and a carefully art-directed Obsidian Halo visual system.

The project is designed as a lightweight, dependency-free web experience that can run locally with Node.js and deploy as a static website.

**Live Website:** https://aurelia3d-t7feupau.manus.space

## 🚀 Key Features

### Interactive 3D Product Study

- Hero product stage with a sculptural obsidian audio capsule render.
- Drag interaction for orbiting the product visual.
- Scroll and zoom controls for changing the product scale.
- Front, Profile, and Rear camera presets.
- Product hotspots for communicating spatial details.
- Responsive behavior for desktop, tablet, and touch devices.

### Sculptural Hero Visual

- Glossy obsidian outer shell.
- Translucent smoky-violet internal chamber.
- Suspended metallic ring.
- Electric-violet core light.
- Cinematic rim lighting and soft product shadowing.
- The hero visual is loaded from managed project storage and integrated into the interactive product stage.

### Unknown Signal Archive

- Fictional field-research section exploring the emotional edge of listening.
- Animated orbital scan lines and signal-core visual.
- Interactive field notes for Threshold, Drift, and Return.
- Copy and visual treatment intentionally frame the research as fictional brand storytelling.

### Product Feature Storytelling

- Immersion section focused on spatial audio.
- Comfort section focused on continuous form and balanced weight.
- Endurance section focused on adaptive silence and listening time.
- Scroll-based reveal choreography and presentation progress indicators.

### Instrument Anatomy Lab

- Interactive layer tabs for Driver, Sensor Array, and Memory Seal.
- CSS 3D product study with layer-specific rotation states.
- Dynamic copy and measurement values for each selected layer.
- Technical callouts for the driver, sensor array, and memory seal.
- Monospaced coordinate labels and engineering-style annotations.

### Material Intelligence Study

- Interactive Graphite finish.
- Interactive Aster finish.
- Interactive Oxide finish.
- Material-specific gradients, lighting, and copy.
- Visual treatment designed to communicate texture, reflection, and surface character.

### Premium Responsive UI/UX

- Obsidian-black editorial layout.
- Electric-violet accent system.
- Spacious offset composition instead of a conventional centered grid.
- Responsive mobile navigation.
- Touch-safe product interactions.
- Keyboard focus states and reduced-motion support.
- Animated reveal states using IntersectionObserver.

## 🏗️ Architecture Workflow

### 🔁 Page Composition & Interaction Flow

The application is organized as a single-page product experience. The page is divided into independent visual chapters, while a shared interaction layer controls product movement, section reveals, camera states, and interactive selectors.

### 1. Hero Stage

The hero introduces the Aurelia One concept and contains:

- Primary and secondary calls to action.
- Product metrics for adaptive silence, spatial audio, and continuous form.
- Interactive product study controls.
- Camera presets and scale controls.
- Product hotspot markers.

### 2. Unknown Signal Chapter

The Unknown Signal section creates a speculative narrative layer:

1. The visual archive renders orbiting signal lines around a luminous core.
2. The visitor selects a field note.
3. The active note updates the explanatory output without reloading the page.
4. The section transitions into the product feature story.

### 3. Feature Presentation

The feature chapter communicates three product ideas:

- **Immersion:** Feel the room around the sound.
- **Comfort:** The shape of staying in.
- **Endurance:** More time inside the moment.

The content is presented with staggered visual blocks and scroll-based reveal motion.

### 4. Instrument Anatomy Lab

The anatomy section exposes the product concept as a layered system:

- The Driver layer presents the sound-generation chamber.
- The Sensor Array layer presents environmental awareness.
- The Memory Seal layer presents the fit and acoustic seal.

When a layer is selected, the interface updates the product yaw, layer index, descriptive copy, and measurement value.

### 5. Material Intelligence Study

The visitor can select one of three finishes:

- **Graphite:** the night side.
- **Aster:** violet afterimage.
- **Oxide:** warm signal.

The selected finish updates the visual field, orb lighting, material index, descriptive copy, and microtexture label.

### 6. Story and Conversion

The final chapters establish the Aurelia concept, its fictional design process, and a clear early-access call to action.

## 🎨 Visual Design System

### Obsidian Halo

The visual language is built around a dark product-gallery environment with controlled electric-violet light.

- **Primary surface:** Obsidian black.
- **Secondary surface:** Graphite and charcoal.
- **Accent:** Electric violet.
- **Highlight:** Pale violet and silver.
- **Typography:** Large editorial sans-serif headlines with compact monospaced interface labels.
- **Motion:** Slow, purposeful, spatial, and reduced-motion aware.

### Brand Personality

- Precise
- Atmospheric
- Assured

### Brand Voice

Short, sensory, and technically grounded.

Example lines:

- “Sound, shaped around you.”
- “A quieter kind of power.”
- “Some frequencies have no name.”

## 🧩 Project Structure

```text
.
├── index.html              # Complete landing-page markup and section structure
├── styles.css              # Design tokens, responsive layouts, CSS 3D visuals, and motion
├── app.js                  # Product controls and all interactive section behavior
├── server.js               # Lightweight Node.js static server
├── public/
│   └── manus-routes.json   # Managed route manifest
├── logo.svg                # Aurelia halo brand mark
├── app.config.ts           # Project logo and metadata configuration
├── package.json            # Minimal project manifest
├── plan.md                 # Product, design, and implementation plan
├── TODO.md                 # Completed project outcomes
└── README.md               # Project documentation
```

## 🛠️ Technology Stack

### Frontend

- HTML5 semantic markup.
- CSS3 custom properties and responsive media queries.
- CSS 3D transforms and perspective.
- Vanilla JavaScript modules.
- IntersectionObserver for reveal behavior.
- Pointer and wheel events for product interaction.
- Managed storage URL for the generated hero render.

### Runtime

- Node.js static server.
- No frontend framework required.
- No database required.
- No authentication required.
- No external runtime API key required.

### Hosting

- Manus Webdev project runtime.
- Static build output in `dist/`.
- Public route manifest at `/manus-routes.json`.
- Published website hosted at the live URL above.

## ⚙️ Project Setup & Installation

### Requirements

- Node.js 18 or newer.
- A modern browser with CSS 3D transform support.

### Install and Run

Clone the repository:

```bash
git clone https://github.com/abishekr19/aurelia3d.git
cd aurelia3d
```

Start the local server:

```bash
node server.js
```

Open the website at:

```text
http://localhost:3000
```

The server listens on `0.0.0.0:3000` by default.

## 📦 Static Build

The project can be prepared as a static build using:

```bash
rm -rf dist
mkdir -p dist
cp index.html styles.css app.js dist/
cp public/manus-routes.json dist/manus-routes.json
```

The resulting `dist/` directory contains the files required for static hosting.

## 🧪 Validation & Diagnostics

The project was validated with the following checks:

### JavaScript Syntax Checks

```bash
node --check app.js
node --check server.js
```

### Endpoint Checks

```bash
curl http://localhost:3000/
curl http://localhost:3000/manus-routes.json
```

Expected route manifest:

```json
{
  "routes": [
    {
      "path": "/",
      "title": "Aurelia — 3D Product Showcase"
    }
  ]
}
```

### Responsive Review

The experience was reviewed at desktop and mobile viewport sizes, including:

- Hero product stage.
- Responsive navigation.
- Unknown Signal archive.
- Feature sections.
- Anatomy lab.
- Material finish selector.
- Story and final conversion sections.

## 🚀 Deployment

The current published version is available at:

https://aurelia3d-t7feupau.manus.space

The project is connected to GitHub at:

https://github.com/abishekr19/aurelia3d

The canonical branch is `main`.

## ⚠️ Product Concept Notice

Aurelia One is a fictional spatial-audio product concept created for a visual product-launch experience. Product specifications, pricing, field notes, and performance descriptions are part of the fictional narrative and are not claims about a real commercial product.

## 📄 License

This is a private portfolio and concept project. The Aurelia name, visual identity, product copy, generated artwork, and interface design are part of the Aurelia concept unless otherwise noted.
