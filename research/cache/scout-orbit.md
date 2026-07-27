# Scout Orbit Phase 1: 3D Gallery Mechanics Research

Fetched: 2026-07-16
Focus: Bruno Simon, Active Theory, Lusion, Awwwards 3D SOTD winners
Research scope: WebGL orbit mechanics, damping, touch handling, accessibility

## Page Inventory

**Bruno Simon (bruno-simon.com)**
Single interactive environment. Route: `/` drives car through world. Job: Portfolio/project navigation via physics-based traversal. Time: 2h 30min 15s playtime tracked.

**Active Theory (activetheory.net)**
Spatial navigation portfolio. Route: `/` entry point with AI chat, networked cursor trails visible to live visitors. Job: Work showcase through immersive 3D space. No explicit SOTD award documented for current version (v4 was SOTD Jan 29, 2018).

**Lusion (lusion.co)**
Scroll-driven portfolio. Route: `/` home, `/about` with fluid simulation. Job: 3D storytelling and project discovery via scroll interaction. SOTD award: October 2, 2023. Current iteration (v3) emphasizes scroll-based animations.

**Codrops Scroll-Reactive Gallery (tympanus.net/codrops/2026/03/09/)**
Tutorial implementation. Route: Depth-layered planes along Z-axis. Job: Demonstrating scroll velocity, parallax, and micro-motion. Published March 9, 2026.

## Homepage Section Order

**Bruno Simon:**
1. Welcome message: "Please drive around to learn more about me and discover the many secrets of this world"
2. Options panel (quality toggle, respawn, mute)
3. Controls documentation
4. Achievements unlock system
5. Behind the Scenes (technical stack)
6. Community Whispers feature

**Lusion:**
1. Hero headline: "We create 3D visual storytelling and interactive web experiences that help brands stand out"
2. Featured work grid (10+ projects tagged: web, design, 3D, animation, concept, AR, game design)
3. Call-to-action: "Is Your Big Idea Ready to Go Wild?"
4. Contact information and social links

**Codrops Scroll-Reactive:**
1. Hero establishing gallery concept
2. Scroll handling demo
3. Velocity calculation explanation
4. Plane positioning documentation
5. Motion layers breakdown (parallax, scroll drift, breath)
6. Shader implementation (mood system)
7. Architecture overview (Engine, Gallery, Scroll, Background classes)

## Proof Placement

**Orbit Mechanics:** Found in Three.js documentation (threejs.org) and Codrops tutorial. OrbitControls uses .dampingFactor (0-1 range), .autoRotate, .autoRotateSpeed, .minPolarAngle/.maxPolarAngle for constraints. Bruno Simon portfolio uses custom camera following (not standard OrbitControls); implements easing for smooth movement.

**Damping Values:** Three.js reference shows dampingFactor examples at 0.25; general guidance 0-1 range works best. Codrops scroll gallery documents `velocityDamping` parameter; uses exponential easing where movement starts faster, slows approaching target. No exact values provided in tutorials for this implementation.

**Auto-rotate:** Three.js .autoRotateSpeed default equates to 30 seconds per orbit at 60fps. Codrops scroll gallery implements passive parallax (planes follow scroll direction with lazy return-to-center), not active auto-rotation.

**Touch/Scroll Handling:** Lusion uses scroll-jacking (virtual scroll architecture). Bruno Simon trades "no interface" for mobile usability with on-screen buttons and joystick. Codrops documents wheel event + touch event listeners updating scrollTarget; current frame interpolates toward target via lerp. Canvas scroll eating prevention via event.preventDefault() on wheel/touch events.

**Prefers-reduced-motion:** No explicit implementation documented on portfolio sites. CSS-Tricks guidance recommends setting damping to 1 for instant transitions when prefers-reduced-motion detected. Codrops articles reference media query but no portfolio confirmation.

**Full-canvas Blur Frame Cost:** Single full-screen render pass doubles frame time (noted in Codrops performance guides). Bruno Simon explicitly disabled blur on mobile. Composite rendering consolidates blur steps to single shader to minimize passes.

## Claim Qualification

**Bruno Simon:** "Simple easing to smooth the movement" (documented in Medium case study); "drastically reduce the WebGL calls" via VAO optimization (stated in portfolio documentation); "50% to 70% lighter" model files via Draco compression (specific claim verified in case study).

**Lusion:** "Award-winning 3D and interactive web" (verified: SOTD Oct 2, 2023); "Animations received perfect 10/10 from development jury" (documented on Awwwards case page).

**Active Theory:** "Globally recognized as premier Web design Agency for high-end WebGL" (inferred from agency language, not independently verified). v4 SOTD rating 8.2/10 from Jan 2018 (documented). Colored tubes networked feature "allow you to see other users' movements" (described in search results, not independently verified on live site).

## Copy Samples (Verbatim, Labeled for Measurement)

1. "Please drive around to learn more about me and discover the many secrets of this world" [Bruno Simon hero CTA, 19 words]
2. "And don't break anything!" [Bruno Simon warning, 3 words]
3. "We create 3D visual storytelling and interactive web experiences that help brands stand out" [Lusion hero, 14 words]
4. "We do not chase trends or produce work that looks like everyone else" [Lusion brand positioning, 13 words]
5. "Is Your Big Idea Ready to Go Wild?" [Lusion CTA, 8 words]
6. "Let's work together!" [Lusion CTA, 3 words]
7. "Whispers are messages left by visitors" [Bruno Simon feature explanation, 6 words]
8. "Creative Digital Experiences" [Active Theory tagline, 3 words]
9. "The fourth iteration of our portfolio featuring latest work, experiments, and products" [Active Theory v4 description, 12 words]
10. "Step into a new world and let your imagination run wild" [Lusion brand voice, 11 words]
11. "Scroll adds velocity rather than directly rotating the tube, which gives smooth, controlled motion instead of chaos" [Codrops mechanical principle, 17 words]
12. "Damping smooths the transition between current and target values" [Technical principle, 9 words]

## Measurements

**Bruno Simon hero copy:** 19-word opening statement (long, narrative). No traditional headline; uses inviting instruction format.

**Lusion headline:** "We create..." = 14 words (mid-range). Subheading "We do not chase..." = 13 words. Consistent declarative structure.

**Lusion CTAs:** "Is Your Big Idea Ready to Go Wild?" 8 words; "Let's work together!" 3 words. Short + punchy for final conversion.

**Active Theory v4 copy:** "Creative Digital Experiences" (tagline, 3 words, minimal); "The fourth iteration..." (description, 12 words).

**Codrops scrolling gallery:** Paragraphs averaging 2-4 sentences, focusing on technical mechanism explanation. Parameter documentation uses abbreviations (rAF = requestAnimationFrame; VAO = Vertex Array Object).

**Sentence structure:** Bruno Simon uses imperative ("Please drive around..."). Lusion uses declarative ("We create..."). Active Theory uses minimal descriptive tags.

## Type and Color

**Bruno Simon:** Amatic SC (Google Font, display), Nunito (Google Font, body). Primary color #DF6C4F (coral/rust warm tone). Secondary #ECD06F (golden yellow). Dark background with bright accent highlights. Hero text plain white on dark.

**Lusion v3:** Primary #1a2ffb (vibrant electric blue). Secondary #f0f1fa (light lavender). Clean contrast hierarchy. Typography not explicitly named in documentation.

**Active Theory v4:** Black (#000), Teal (#49c5b6), Coral (#FF9398). Minimal palette with high contrast. Three-color system (neutral + two chromatic accents).

**Codrops scroll-reactive:** Mood system fragment shader: base flat color + two soft blobs via smoothstep() distance functions. Blobs mix at 0.35 opacity. Film grain via random noise. No explicit hex values documented for this implementation.

## Conversion Path

**Bruno Simon:** Free exploration with optional unlock achievements (6 tiers); Discord community link; YouTube devlog subscription; Three.js Journey course promotion; GitHub repository access (MIT open source). No hard sell; engagement through discovery.

**Lusion:** Direct contact CTA ("hello@lusion.co" and "business@lusion.co"). Social links (Twitter/X, Instagram, LinkedIn). Project portfolio serves as case study inventory. No lead capture form documented.

**Active Theory:** AI chat interface with topic prompts ("Show me a fun project", "crypto clients?"). Networked real-time cursor visibility (users see each other). No explicit lead capture; engagement through interactive exploration.

## Distinctive Mechanics

**Bruno Simon:** Physics-based traversal (Cannon.js + Rapier physics engine). Visitor drives red car to navigate; collision detection treats environment as interactive playground. Antenna animation responds to car acceleration (opposite force). Respawn function for stuck players. Unlock achievement system with playtime tracking. Not traditional scroll or orbit--pure 3D navigation game.

**Lusion:** Fluid simulation element (About page). Scroll-velocity-responsive plane tilting and scale pulsing (three independent micro-motion layers: parallax, scroll drift, breath). Mood background system with dynamic blob shader. Trail geometry with Catmull-Rom spline interpolation. Sparkle particle effects at trail head.

**Codrops scroll-reactive:** Exponential damping via lerp with configurable decay duration. Z-axis plane stacking with configurable gap (2.5 world units). Planes drift upward during scroll up, follow during scroll down, lazily float back when stopped. Threshold-based zero reset to eliminate flickering. Separate velocity calculation (frame-to-frame delta) from smoothed output.

## Noise

**Bruno Simon:** "Don't break anything!" warning framed as playful but creates cognitive load for first-time players unsure of destructible vs. navigational elements. Keyboard layout variants (WASD/ZQSD) require documentation rather than auto-detection. Achievement unlock system adds optional complexity; unclear value signal for casual visitors.

**Lusion:** Numerical indicator sequence (0 0 0 0 0 0) appears without context; function/meaning not explained. Scroll-jacking (site captures scroll events) violates expected browser behavior without user consent indicator.

**Active Theory v4:** AI chat requires interpretation of conversational prompts; unclear if it surfaces all work or filters by topic. Networked cursor trails create visual noise when many users present. No explicit accessibility statement or reduced-motion variant documented.

**Codrops scroll-reactive:** Velocity calculation clamping documentation uses abstract terminology (-velocityMax to velocityMax) without concrete reference values. Mood shader uses random noise sampling for film grain; performance impact not quantified. Catmull-Rom interpolation choice not justified against alternatives (linear, cubic).

## Not Accessible

- Bruno Simon portfolio: No explicit prefers-reduced-motion media query documented; blur disabled on mobile but other animations remain. GitHub repository available (code visible) but no on-site technical documentation of orbit/damping parameters (found only via Medium case study).

- Active Theory: Full site content not accessible via WebFetch (minimal text-only extraction); real-time networked cursor feature requires live session to evaluate; three-dimensional spatial navigation cannot be analyzed statically.

- Lusion: Scroll-jacking behavior prevents traditional scroll analysis; fluid simulation performance impact not documented; shader implementation details inferred from asset tags, not from published source.

- Awwwards 3D SOTD archive: Recent July 2026 winners (CoffeeTech, Vectr, 21 Hrs On The Moon) pages fetched with minimal technical documentation. No systematic case study database for 2026 3D category. Mechanical specifications (damping values, auto-rotate speeds, polar angle clamps) not standardized in Awwwards documentation.

- Three.js OrbitControls: Standard values for dampingFactor, autoRotateSpeed documented (default 30 seconds per orbit at 60fps), but production implementations (Bruno Simon, Lusion, Active Theory) use custom camera systems or hidden parameter values not exposed in public marketing materials.

- Prefers-reduced-motion implementation: No portfolio site includes explicit documentation of reduced-motion variant; CSS-Tricks guidance available but portfolio compliance unverified.

---

**Summary:** High-end 3D galleries prioritize visual storytelling over mechanical transparency. Damping and orbit mechanics documented only in library references (Three.js) and educational articles (Codrops), rarely exposed in production site copy. Physics-based interaction (Bruno Simon) and scroll-sync virtual scrolling (Lusion) are category patterns. Touch/scroll eating prevented via event.preventDefault(); no standardized approach across sites. Blur performance cost well-established (doubles frame time) but selectively applied by device capability. Prefers-reduced-motion support absent from visible UX, relying on fallback browser defaults.

