# Scout-Glass Phase 1 Recon

Fetched: 2026-07-16
Scope: Apple.com, Igloo Inc, Family.co

## Target: Apple.com

### Page Inventory
- Homepage: Product discovery, 16+ sections, estimated 2-3 minutes scroll
- iPhone product page: Deep feature specification, 17+ sections, 3-4 minutes
- iPad, Mac, Watch, Vision: Product-specific pages with similar structure
- Support and Developer documentation: Tertiary navigation

### Homepage Section Order (Top to Bottom)
1. Navigation header with product categories
2. iPhone hero showcase with "Shop iPhone" CTA
3. MacBook Air M5 feature block
4. iPad Air M4 announcement
5. MacBook Pro section
6. AirPods Pro 3 promo
7. Apple Watch Series 11 section
8. iPad Pro display focus
9. Apple Trade-In program block
10. Apple Card financing offer
11. Entertainment gallery: Apple TV+, Arcade, Fitness+, Music
12. Footer navigation and legal links

### Proof Placement
All claims are product-backed: "Designed to Last" uses durability metrics placed same section; "iOS and Apple Intelligence" describes onboard processing in adjacent subsection; camera capabilities shown with gallery samples same page; sustainability claims link to separate Environment section. Trade-in value propositions have standalone calculator section. No off-page evidence required.

### Claim Qualification
Apple uses declarative assertions without qualification markers: "Switch to iPhone." (imperative), "Everything just works." (absolute), "Last phone standing." (superlative without comparative evidence on page). Durability claims cite retention metrics but don't show methodology. Privacy claims state absolute protection without attack scenarios tested.

### Copy Samples (Verbatim, for Measurement)

1. "Switch to iPhone." (Hero heading) - 3 words
2. "Designed to Last" (Section heading) - 3 words
3. "iPhone holds its value longer than other smartphones." (Claim subhead) - 8 words
4. "The personal intelligence system that helps you write, express yourself." (Feature intro) - 11 words
5. "Picture your best photos and videos." (Section heading) - 6 words
6. "Your data. Just where you want it." (Privacy claim, headline) - 7 words
7. "Everything just works." (Feature callout) - 3 words
8. "Out of range. Not out of reach." (Feature callout) - 6 words
9. "New look. Even more magic." (Product intro) - 5 words
10. "Shop iPhone" (Primary CTA) - 2 words
11. "Learn more about trade-in" (Secondary CTA) - 4 words
12. "Watch the film" (Video CTA) - 3 words
13. "Cosmic Orange, Deep Blue, Silver, Sky Blue, Light Gold, Cloud White, Space Black, Lavender, Sage, Mist Blue, Soft Pink" (Color listing) - 11 color names

### Measurements
- Primary headline: 3 words ("Switch to iPhone")
- Section headings average: 3-7 words
- Feature intro copy average: 8-11 words
- Subheadings average: 6-8 words
- CTAs: 2-4 words (maximum brevity)
- Feature callouts: 3-6 words (short, punchy)
- Paragraphs: Not present; Apple uses sentence fragments and feature blocks instead

### Type and Color
Rendered text: white or light neutral over product images (inferred high contrast strategy). No explicit backdrop-filter visible in markup; uses solid semi-transparent overlays instead (rgba estimated 0.2-0.4). Product color names: Cosmic Orange, Deep Blue, Silver, Sky Blue, Light Gold, Cloud White, Space Black, Lavender, Sage, Mist Blue, Soft Pink. Navigation text appears to be sans-serif (likely San Francisco system font). No CSS blur effects in page structure; relies on image composition and solid overlays for legibility.

### Conversion Path
Browse product line (hero section) -> View features (feature blocks) -> Learn migration story (Switch to iPhone section) -> Decide durability priority (Designed to Last) -> Software evaluation (iOS/Intelligence section) -> Purchase decision (Shop buttons on each section) -> Financing option (Apple Card section) -> Post-purchase confirmation (Why Apple Store section)

### Distinctive
Structured conversion path separates emotional hooks (durability, design, simplicity) from rational features (cameras, privacy, ecosystem). Each product gets standalone section rather than comparing across lineup. Heavy use of short, imperative sentence fragments instead of flowing copy.

### Noise
Entertainment gallery (Apple TV+, Arcade, Fitness+, Music) appears on product landing pages where it conflicts with primary conversion goal; mixed-function page architecture tries to sell services alongside hardware.

## Target: Igloo Inc

### Page Inventory
- Landing page: Portfolio showcase, 3 major sections, ~1 minute interactive scroll
- Project-specific pages: Embedded within single-page scrolling experience
- No separate About, Blog, or Support pages

### Homepage Section Order (Top to Bottom)
1. Hero intro animation (procedurally generated ice landscape, real-time Three.js render)
2. Project carousel: Each project encased in unique procedurally-grown ice block
3. Interactive particle simulation: Links reshape volume data based on selection
4. Final CTA or contact information

### Proof Placement
Igloo Inc demonstrates capability through execution rather than claims. Ice block uniqueness is proof of procedural generation. Particle shapes shifting prove shader-driven interaction. Performance smoothness during scroll proves optimization. No written proof statements; visual proof is the proof.

### Claim Qualification
No explicit claims found. Inferred positioning: "We build next-generation web experiences with procedural generation and shader-driven UI." Demonstrated through visual execution, not text assertions.

### Copy Samples (Verbatim, for Measurement)
1. "Igloo Inc." (Page title) - 2 words
2. No additional copy samples available; page is entirely WebGL-rendered with minimal HTML text layer

### Measurements
- Copy present: Minimal; interaction design and visual communication is primary
- Ice block generation: Procedurally unique per session (no measurable copy)
- Particle shapes: Volume data-driven, not text-labeled
- Shader effects: Text glitches, letter scrambles, chromatic aberration, frost dissolves

### Type and Color
All UI rendered via WebGL shaders rather than HTML/CSS. Text implemented as SDF (Signed Distance Fields) texture in shaders. Letter scramble effects swap texture offsets instead of forcing DOM layout. Ice blocks rendered in grayscale/white (frozen appearance). Accent colors: Chromatic aberration (color separation) and frost effects suggest cool color temps. No traditional CSS color values; Three.js material colors for 3D geometry.

### Conversion Path
View intro animation -> Scroll through project gallery -> Interact with ice blocks -> Select portfolio item -> Potentially navigate to project details (path unclear from single-page structure)

### Distinctive
Entire UI rendered in WebGL rather than HTML/DOM. Custom procedural crystal-growth algorithm generates unique ice blocks each session. Particle simulation responds to user interaction by morphing volume data. No visible glassmorphism or blur effects; instead uses real 3D geometry and shader effects. This is glass as refraction and geometry, not CSS backdrop-filter.

### Noise
Three-section structure is minimal; lacks traditional web navigation patterns (About, Services, Contact). Procedural generation prioritizes visual novelty over reproducible brand consistency. WebGL approach excludes users on unsupported browsers without fallback content.

## Target: Family.co

### Page Inventory
- Homepage/Landing: Crypto wallet product showcase, 12+ sections, ~2-3 minutes scroll
- ConnectKit documentation: Developer integration guide (separate site)
- Family SDK docs: Technical reference (separate site)
- Support/FAQ page: Basic Q&A
- No blog or separate feature pages

### Homepage Section Order (Top to Bottom)
1. Navigation header: Logo, ConnectKit, Family, Resources, Login, Get Started
2. Hero: "Your favorite crypto wallet" with download and video CTAs
3. Feature intro: "Explore Ethereum in a whole new way" with four capabilities (Send, Swap, Receive, Purchase)
4. Value grid: Four pillars (Easy, Secure, Fast, Powerful) with emoji carousel background
5. Core functionality tabs: Send/Receive, Swap, NFT Support with WalletConnect, Self-Custody, Privacy
6. Four feature deep-dives: NFT media display, Wallet watching, Transaction history, Security/self-custody
7. Product capabilities: Onboarding, Mission Control, Drag-and-drop management
8. Blog section: Two featured articles on Family Accounts
9. Social proof: 16+ Twitter testimonials praising UI/UX
10. FAQ section: Safety, wallet switching, network support
11. Footer: Developer docs, resources, company info, social links

### Proof Placement
"Self-Custody" claim sits in core functionality section with description of private key access. "Security at every stage" appears in hero with supporting details in FAQ (Asset protection warnings mentioned). "Fewest taps" design claim shown in Send/Receive tab interaction visual. "24/7 trading" stated in feature intro with context to swap section. All major claims have supporting visual or textual evidence same section or adjacent section.

### Claim Qualification
Family uses positive assertions with qualifier context: "Your crypto, your control. Security at every stage." (paired claim + scope). "Easily send tokens and collectibles with the fewest taps." (qualification: "easily," "fewest"). "Relentless protection. Restful ease." (contradiction resolved through contrast: active protection, passive user experience). No claims qualified as "up to" or "estimated"; all are absolute statements.

### Copy Samples (Verbatim, for Measurement)

1. "Your favorite crypto wallet." (Hero headline) - 4 words
2. "Explore Ethereum in a whole new way." (Feature intro) - 7 words
3. "Your crypto, your control. Security at every stage." (Hero subhead) - 8 words
4. "Send, receive, swap. All in one place." (Feature section) - 7 words
5. "The best way to experience NFTs." (Section heading) - 6 words
6. "Watch the wallets you care about." (Feature heading) - 6 words
7. "Wallet activity you can understand." (Feature heading) - 5 words
8. "Relentless protection. Restful ease." (Feature heading) - 4 words
9. "Easily send tokens and collectibles with the fewest taps." (Claim text) - 9 words
10. "Download on iOS" (Primary CTA) - 3 words
11. "Watch the Video" (Secondary CTA) - 3 words
12. "Get Started" (Tertiary CTA) - 2 words
13. "Log In" (Utility CTA) - 2 words
14. "Self-Custody" (Feature label) - 2 words
15. "WalletConnect" (Integration label) - 1 word

### Measurements
- Hero headline: 4 words
- Section headings average: 4-7 words
- Feature intro copy: 7-9 words
- Hero subhead: 8 words (longest written assertion)
- CTAs: 2-3 words
- Feature labels: 1-2 words
- Paragraphs: Absent; uses short sentences and feature blocks throughout
- Paragraph structure: Fragments separated by periods (e.g., "Send. Receive. Swap. All in one place.")

### Type and Color
Typography: Custom 'Family' typeface at 68px hero weight with -0.031em tracking (very tight). Body copy: Inter font with progressive tightening of letter-spacing as text size decreases. Background: Warm off-white canvas (#fbfaf9). Accent colors visible in emoji carousel: Electric orange, grass green, sky blue, bright yellow, sunburst yellow (#ffbb26), ocean blue (#0086fc), spearmint (#00c978), flamingo (#ff58ae), coral red (#ff2b3a error states). Cards: Inset warm-stone border (1px #f2f0ed shadow, no drop shadows). CTA button: Near-black pill (#121212). Text legibility maintained through high contrast on clean white background; no blur or backdrop-filter effects. Emoji illustrations are primary brand identity (wobbly blob creatures with stick legs and expressive faces) rather than color alone.

### Conversion Path
View hero promise ("Your favorite crypto wallet") -> Watch video or skip to learn features -> Browse core capabilities (Send, Swap, Receive, Purchase tabs) -> Deep-dive into feature (NFTs, watching, history, security sections) -> Read social proof (testimonials) -> Resolve concerns (FAQ) -> Download iOS app or contact

### Distinctive
Emoji carousel (auto-scrolling, animated background) as primary visual element rather than static hero image or video. Character-driven brand identity with wobbly blob illustration style distinct from flat-design crypto competitors. Fragment-sentence copy structure creates rhythm and memorability ("Send. Receive. Swap. All in one place."). Warm color palette (off-white, orange, green, blue) contrasts with typical crypto cold/dark UI trends.

### Noise
Blog section on homepage (two featured articles on Family Accounts) interrupts primary conversion flow; crypto wallet purchase path doesn't require educational blog content at point of decision. Testimonial carousel of 16+ Twitter quotes is standard SocialProof pattern, not distinctive to this product.

## Technical Findings: Glass Effects Across Sites

### Backdrop-Filter Usage
- Apple.com: No visible backdrop-filter CSS; uses solid semi-transparent overlays instead (rgba 0.2-0.4)
- Igloo Inc: No backdrop-filter; uses WebGL shaders, three-dimensional geometry, and chromatic aberration (real refraction simulation)
- Family.co: No backdrop-filter; uses high-contrast typography on clean backgrounds

### Text Legibility Over Moving Backgrounds
- Apple: Solid overlay + strategic text placement on non-critical image areas
- Igloo Inc: WebGL-rendered text via SDF shaders; letter scrambles handled by shader offsets, not DOM reflow
- Family.co: Elimination of background complexity; emoji carousel stays behind content layer, text floats on clean off-white

### Frosted-Card-with-White-Border Pattern
Observed in 2026 design trend analysis but NOT used on any target site. This pattern (glassmorphism + 1px white border) appears to be production failure mode: backdrop-filter blur on plain white background renders as slightly off-white rectangle with no visual depth. All three sites avoid this by either: (1) using solid overlays, (2) using WebGL geometry, or (3) eliminating blur entirely in favor of contrast.

## Not Accessible
- Igloo Inc: WebGL content not rendered by fetch tool; page appears as "Igloo Inc." title only. Case study from Awwwards retrieved, but live interactive elements (procedural ice blocks, particle simulation, chromatic aberration, frost effects) cannot be visually verified. Technical stack confirmed but rendering details require direct browser visit.
- Family.co design system (styles.refero.design): Fetch returned header but page requires authentication/login to view full design documentation. Color values inferred from search results about design system, not directly verified from living page.
- Apple product pages: Estimated color values and blur behavior based on visual design practices; CSS source not accessible via fetch to confirm exact backdrop-filter implementation, blur radii, or saturation values.
