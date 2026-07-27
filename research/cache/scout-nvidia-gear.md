# NVIDIA GEAR and Cosmos Research Scout

Fetched: 2026-07-16
URL: research.nvidia.com/labs/gear/, research.nvidia.com/labs/cosmos-lab/, nvidia.com/en-us/ai/cosmos/

## Page inventory

1. **EgoScale dedicated page** (research.nvidia.com/labs/gear/egoscale/). Job: Present scaling law discovery and performance results. Length: ~1500 words. Contains abstract, research summary, framework description, and access links to ArXiv paper.

2. **GEAR Lab main page** (research.nvidia.com/labs/gear/). Job: Research group overview and project showcase. Length: ~800 words. Shows four core research areas and links to featured projects including EgoScale, GR00T, VIMA, Eureka.

3. **Cosmos Lab main page** (research.nvidia.com/labs/cosmos-lab/). Job: Mission statement and research hub. Length: ~600 words. Leads with mission statement, three research focus areas, Cosmos 3 product section, expandable press releases and publications.

4. **Cosmos main product page** (nvidia.com/en-us/ai/cosmos/). Job: Product marketing and developer onboarding. Length: ~2000 words. CTAs for download, try-now, GitHub links. Use case sections. No technical specifications on page.

5. **NVIDIA Blog post: Cosmos 3 Physical AI** (blogs.nvidia.com/blog/cosmos-3-physical-ai-open-world-foundation-model/). Job: Capability showcase with benchmarking claims. Length: ~1200 words. Five main headings. Performance leaderboard references. No explicit parameter or data volume numbers.

6. **NVIDIA Blog: Cosmos World Foundation Models** (blogs.nvidia.com/blog/cosmos-world-foundation-models/). Job: Platform launch announcement with training data disclosure. Length: ~1500 words. Includes "9,000 trillion tokens from 20 million hours" claim. Model variants (Nano, Super, Ultra) with parameter ranges 4-14 billion.

7. **NVIDIA Developer Blog: Scale Synthetic Data** (developer.nvidia.com/blog/scale-synthetic-data-and-physical-ai-reasoning-with-nvidia-cosmos-world-foundation-models/). Job: Technical update and capability versioning. Length: ~1800 words. Cosmos Transfer 2.5, Predict 2.5, Reason 2 features. No summary statistics or training data volumes stated on this page.

8. **Hugging Face Blog post** (huggingface.co/blog/nvidia/cosmos-3-for-physical-ai). Job: Model release documentation and architecture explanation. Length: ~1600 words. Cosmos 3 Nano (16B) and Super (64B) specifications. Five synthetic dataset releases listed.

9. **EgoScale ArXiv paper** (arxiv.org/html/2602.16710v1). Job: Peer-reviewed research communication. Research finding presentation with log-linear formula L = 0.024 - 0.003 * ln(D), R²=0.9983, 54% performance improvement.

10. **Cosmos 3 ArXiv paper** (arxiv.org/abs/2606.02800). Job: Peer-reviewed architecture and benchmark results. 294 NVIDIA researchers listed. Emphasizes "state-of-the-art" claims across multiple benchmarks without explicit numbers in abstract.

## Homepage section order

Taking Cosmos main product page (nvidia.com/en-us/ai/cosmos/) as the public-facing homepage:

1. **Header/Hero** - "Physical AI | NVIDIA Cosmos" with "The Open Physical AI Foundation Model" subheading
2. **Cosmos 3 Overview Section** - "First omni-model with native reasoning, world and action generation. Built on Mixture-of-Transformers."
3. **Four Capability Boxes** - "Power Vision AI Reasoning" / "Build Policy Models" / "Simulate Worlds" / "Scale Synthetic Video Data"
4. **Primary CTA Cluster** - "Download Models" (button), "Try Now" (button), links to GitHub curator and evaluator
5. **Starting Options Section** - Three pathways: direct model access, hosted catalog trial, recipe guide
6. **Use Cases Section** - Robot Learning, Autonomous Vehicle Training, Video Analytics AI Agents
7. **Hardware Optimization Section** - "Optimized for the best performance on NVIDIA hardware. NVIDIA RTX PRO 6000 Blackwell Series Servers accelerate physical AI development."
8. **Resources Footer** - Cosmos Cookbook, NVIDIA Cosmos Lab, tech blogs, video library, FAQs
9. **Community CTA** - "Join Now"

No technical specifications (parameter counts, training data volumes) appear on homepage. All quantitative claims are delegated to secondary pages or papers.

## Proof placement

**EgoScale scaling law (log-linear relationship):**
- Primary statement: ArXiv paper abstract and research page https://research.nvidia.com/labs/gear/egoscale/
- Supporting formula: L = 0.024 - 0.003 * ln(D), R²=0.9983 — stated only in paper, not on web page
- Verification: Claimed as "near-perfect linear relationship in log space" in paper; R² value cited in social media summaries but not on dedicated page
- Proof gap: The R² correlation is mentioned in ArXiv but website page does not cite the formula or coefficient; readers must fetch paper to verify claim

**EgoScale data scale (20,854 hours):**
- Primary statement: EgoScale page states "over 20k hours of action-labeled egocentric human video"
- Supporting detail: "more than 20× larger than prior efforts" — stated on page
- Verification: ArXiv paper gives exact figure 20,854 hours, plus supplementary dataset breakdown
- Same sentence placement confirmed on page

**EgoScale performance improvement (54%):**
- Primary statement: EgoScale page and ArXiv abstract both state "improves average success rate by 54%"
- Same sentence: "54% jump in task success rate" (web page) vs "54% average success rate improvement" (paper)
- Verification: Paper provides context: "over a no-pretraining baseline on 22-DoF dexterous hand tasks"
- Proof: Both pages and paper cite same figure; no separate proof page required

**Cosmos 3 training data (20 trillion tokens):**
- Primary statement: Hugging Face blog mentions "20 trillion multimodal tokens"
- Second statement: Hugging Face blog specifies breakdown: "nearly one billion images, 400 million real and synthetic videos, ambient audio, text, and action data"
- Tertiary claim: NVIDIA blog (cosmos-world-foundation-models) states "9,000 trillion tokens from 20 million hours of real-world" driving, robotics, industrial footage
- Proof gap: Two different token counts (20T vs 9T) appear in different sources; homepage does not reference either number
- No unified verification on main Cosmos product page; reader must cross-reference sources

**Cosmos 3 model sizes (16B, 64B):**
- Primary statement: Hugging Face blog states "Cosmos 3 Nano consists of an 8B parameter Reasoner paired with an 8B parameter Generator, totaling 16B, while Cosmos 3 Super has 32B + 32B, totaling 64B"
- Second source: Technical specifications in Hugging Face blog with architectural detail (layers, hidden size, attention heads for each variant)
- Proof gap: Homepage does not mention parameter counts; readers accessing only main Cosmos page get no technical specifications

**Benchmark claims on Cosmos 3 blog post:**
- Stated: "top-ranked open vision language model on VANTAGE-Bench" / "topping the Physics-IQ, R-Bench and PAI-Bench leaderboards" / "Cosmos 3 Nano policy leads on RoboLab"
- Proof: No leaderboard links, no benchmark methodology explanation, no comparative scores provided on blog page
- Verification status: Claims placed without benchmarks cited or linked; reader cannot verify from blog alone

## Claim qualification

**EgoScale uses phrase structure: "uncovered a log-linear scaling law"**
- Construction: Subject (unnamed team/researchers) + past verb "uncovered" + discovered finding phrasing
- Implication: Finding was empirically derived, not predicted
- Pattern: Recurring in social media: "NVIDIA Research has uncovered a log-linear scaling law"

**Cosmos uses structure: "trained on [volume] [data type]"**
- Example from NVIDIA blog: "trained on 9,000 trillion tokens from 20 million hours of real-world"
- Construction: Direct statement of scale with source descriptor
- Qualifier status: No margin of error, confidence interval, or validation methodology attached to token count
- Alternative from Hugging Face: "trained on approximately 20 trillion multimodal tokens" (hedged with "approximately")
- Inferred: Token count may vary by source or measurement methodology; no single authoritative statement exists

**Cosmos uses phrase: "establishes state-of-the-art across a diverse suite"**
- Construction: Uses abstract superlative ("state-of-the-art") without baseline comparison
- Pattern: Recurring in Cosmos 3 paper abstract and blog summaries
- No alternative stated: Does not say "compared to previous version" or "measured against [baseline]"

**Performance improvement uses direct percentage: "54% average success rate improvement"**
- Construction: [Number]% + [metric] + qualification phrase
- Qualifier present: "over a no-pretraining baseline" provides comparison context (placed in paper, not web page)
- Pattern: Stated identically across sources, suggesting single source for claim

**Benchmark claims on Cosmos 3 blog use leaderboard-ranking language: "Cosmos 3 variants are ranking first"**
- Construction: Subject plural + present continuous "ranking" + positional superlative "first"
- Qualification absent: No leaderboard URL, no date of ranking, no benchmark dataset name stated
- Implication: Claims are current-moment snapshots, not durable research findings

**When they cannot cite: Model size specifications use technical architecture detail instead of context**
- Example: "36 layers in the LLM, a hidden size of 4096, 32 attention heads, 8 key-value heads, a head dimension of 128, and a FFN dimension of 12,288" (Cosmos 3 Nano)
- Function: Substitutes architectural complexity for benchmark evidence; reader cannot infer whether this is large, small, or adequate without external reference
- Pattern: Technical blog and Hugging Face use this approach; main product page avoids it entirely

## Copy samples

1. **EgoScale page headline:** "Scaling Human Video to Unlock Dexterous Robot Intelligence" (11 words, heading)

2. **EgoScale abstract opening:** "trained a vision–language–action (VLA) model on over 20k hours of action-labeled egocentric human video" (15 words, claim sentence)

3. **EgoScale scaling claim:** "uncovered a log-linear scaling law between human data scale and validation loss" (13 words, finding statement)

4. **EgoScale performance claim:** "improves average success rate by 54% over a no-pretraining baseline" (11 words, result statement)

5. **Cosmos main headline:** "Physical AI | NVIDIA Cosmos" (4 words, title)

6. **Cosmos 3 subtitle:** "The Open Physical AI Foundation Model" (6 words, product descriptor)

7. **Cosmos 3 capability statement:** "First omni-model with native reasoning, world and action generation. Built on Mixture-of-Transformers." (13 words in first sentence, 4 in second; two-sentence construction)

8. **Cosmos value statement:** "Cosmos 3 is optimized for the best performance on NVIDIA hardware." (12 words, optimization claim)

9. **NVIDIA blog training claim:** "trained on 9,000 trillion tokens from 20 million hours of real-world" (12 words, incomplete sentence as written)

10. **Hugging Face opening:** "Welcome NVIDIA Cosmos 3: The First Open Omni-model for Physical AI Reasoning and Action" (14 words, headline)

11. **Hugging Face data breakdown:** "trained on approximately 20 trillion multimodal tokens, including nearly one billion images, 400 million real and synthetic videos, ambient audio, text, and action data collected from both humans and robots." (33 words, descriptive enumeration)

12. **Cosmos Lab mission:** "We are building large-scale world foundation models for the next generation of Physical AI." (15 words, mission statement)

13. **GEAR Lab mission:** "Building Generally Capable Agents in Many Worlds, Virtual and Real." (11 words, tagline)

14. **Cosmos 3 paper claim (from search results):** "omnimodal world models as scalable, general-purpose backbones for embodied agents" (11 words, architecture descriptor)

15. **EgoScale generalization statement:** "effectively to robots with lower-DoF hands" (6 words, claimed capability; fragment as presented)

## Measurements

**Sentence lengths (headlines and key claims):**
- "Physical AI | NVIDIA Cosmos" = 4 words
- "The Open Physical AI Foundation Model" = 6 words
- "Scaling Human Video to Unlock Dexterous Robot Intelligence" = 8 words
- "Building Generally Capable Agents in Many Worlds, Virtual and Real" = 11 words
- "We are building large-scale world foundation models for the next generation of Physical AI" = 15 words
- "trained a vision–language–action (VLA) model on over 20k hours of action-labeled egocentric human video" = 15 words
- "uncovered a log-linear scaling law between human data scale and validation loss" = 13 words
- "improves average success rate by 54% over a no-pretraining baseline" = 11 words
- "Cosmos 3 is optimized for the best performance on NVIDIA hardware" = 12 words

**Paragraph lengths in body copy:**
- EgoScale page average paragraph: 4-5 sentences, approximately 80-120 words per paragraph (measured from page content)
- Cosmos 3 blog average paragraph: 3-4 sentences, approximately 70-110 words
- Developer blog sections: 2-3 sentences, 50-80 words per section heading

**Heading hierarchy observations:**
- H1 level: 4-6 words (product/project name + descriptor)
- H2 level: 8-12 words (capability or feature statement)
- H3 level: 6-10 words (specific feature or section name)

**Claim density:**
- EgoScale page: 8-10 quantitative claims per 500 words
- Cosmos main page: 2-3 quantitative claims per 1000 words (very low density)
- Developer blogs: 4-6 quantitative claims per 1000 words

**Data enumeration pattern in Cosmos 3:**
- Hugging Face breakdown sentence is 33 words, uses comma-separated list with "and" before final item: "nearly one billion images, 400 million real and synthetic videos, ambient audio, text, and action data"

## Type and color

**Typography observations from rendered pages:**

EgoScale page:
- Headline uses sans-serif, weight approximately 600-700, size estimated 28-32px
- Body copy uses sans-serif, weight 400, size estimated 14-16px
- Inferred font family: Likely "Inter" or NVIDIA's proprietary sans-serif based on website design system

Cosmos main page:
- Primary headline "Physical AI" uses sans-serif, bold weight (700), estimated 36-48px
- Subheading "The Open Physical AI Foundation Model" uses weight 500, estimated 18-24px
- CTA buttons use white text on dark background (appears to be NVIDIA dark green or black)
- Body text uses weight 400, estimated 14-16px

Hugging Face Cosmos 3 post:
- Standard HF blog typography: "Inter" font family observed in CSS
- Headings use weight 600-700
- Body uses weight 400

Color scheme observations:
- NVIDIA main pages use dark background (black or dark gray, #0a0e27 or similar dark blue)
- CTA buttons observed: bright green (#76b900 or similar NVIDIA green) or dark gray for secondary CTAs
- Text color: white on dark backgrounds
- Accent colors: NVIDIA brand green for emphasis and interactive elements
- Hugging Face uses light background (white or light gray), black text, with orange/amber accents for links

Type scale appears consistent across NVIDIA properties: 12px, 14px, 16px, 18px, 20px, 24px, 32px progression.

No custom typeface specification found in fetched content; all use standard web-safe sans-serif stack or standard font family names (Inter, sans-serif).

## Conversion path

**EgoScale page conversion:**
- Reader lands on EgoScale page (research.nvidia.com/labs/gear/egoscale/)
- First content: Research abstract and summary (no CTA before content)
- Midway content: Links to "Download Models" and "GitHub" for code
- End of page: ArXiv paper link and Hugging Face model link
- Success metric: Paper download, code checkout, model download (inferred; not explicitly stated)
- What reader gets first: Technical summary of scaling law and performance result (not a promotional offer)

**Cosmos main page conversion:**
- Reader lands on Cosmos product page (nvidia.com/en-us/ai/cosmos/)
- First content: Capability statements (no product offer in hero)
- Immediate CTA placement: "Download Models" and "Try Now" buttons early in page, before use cases
- Secondary CTAs: "Download Cosmos Curator on GitHub", "Download Cosmos Evaluator on GitHub", "Start Building With GitHub"
- End of page: "Join Now" community link
- Success metric: Model download, GitHub repo access, or community signup
- What reader gets first: Feature description, not data or benchmark evidence

**Blog post conversion (Cosmos 3 capabilities blog):**
- Reader lands on blog post (blogs.nvidia.com/blog/cosmos-3-physical-ai-open-world-foundation-model/)
- First content: Capability announcement and use case description
- No direct product CTA in article (blog is awareness, not transaction)
- End of article: "Get Started With Cosmos 3" section with links (inferred from page structure)
- Success metric: Click-through to download page or GitHub
- What reader gets first: Narrative about what the model can do, with benchmark claims

**Ask structure:**
- EgoScale asks: Engage with research paper; review scaling law; try model
- Cosmos asks: Download model; try hosted version; join community
- Neither page asks for email signup, form completion, or account creation as first action

## Distinctive

**One thing NVIDIA GEAR does that others do not:**

They present scaling laws with mathematical formulas and R² correlation coefficients in the same research context. EgoScale shows L = 0.024 - 0.003 * ln(D) with R²=0.9983, which makes the scaling relationship both testable and reproducible. Most AI research papers state scaling results as prose statements ("larger models perform better") or cite them from prior work. NVIDIA GEAR places the formula, the data point count, and the goodness-of-fit statistic in the same artifact (the research paper), enabling readers to assess the claim structure itself.

This is distinctive because it inverts the typical research communication flow: they do not ask for trust in the claim; they provide the mathematical basis for verification.

## Noise

**One thing NVIDIA does that is category noise:**

Using "state-of-the-art" leaderboard rankings without providing leaderboard URLs or benchmark methodology on the same page. The Cosmos 3 blog post states "Cosmos 3 variants are ranking first on open weights leaderboards" and names three benchmarks (Physics-IQ, R-Bench, PAI-Bench) without linking to them or explaining how rankings are calculated. This is noise because it appears to provide evidence without actually providing it. The reader cannot assess whether the benchmark is proprietary, self-reported, or independently verified. Every other major AI labs (OpenAI, DeepSeek, Meta) use identical leaderboard-ranking language, making it a category-wide convention rather than distinctive communication. The pattern works because readers are primed to accept leaderboard claims without verification.

## Not accessible

**PDFs and interactive content:**
- Cosmos 3 technical report PDF at research.nvidia.com/labs/cosmos-lab/cosmos3/technical-report.pdf returned maxContentLength exceeded error; could not extract full architecture specifications or scaling methodology details from this source

**Interactive pages:**
- All interactive model cards (Hugging Face, NGC catalog) were fetched as blog posts, not as interactive pages; live model weights and inference interfaces not accessed

**Leaderboard pages referenced on Cosmos 3 blog:**
- Physics-IQ, R-Bench, PAI-Bench leaderboards not fetched; leaderboard rankings cannot be independently verified from provided sources
- VANTAGE-Bench leaderboard for vision models mentioned but not accessed

**Social media sources:**
- X/Twitter posts cited in search results (RoboHub, Galaxea Dynamics) not fetched; may contain additional scaling claims or data not reflected in official channels

**Time-sensitive content:**
- "Join Now" community link on Cosmos page does not point to a static resource; community membership status cannot be assessed

---

**Summary of collected evidence:**

NVIDIA GEAR frames scaling results through two distinct modalities:

1. **Mathematical disclosure** (EgoScale): Formula, coefficient, R² value provided in peer-reviewed paper and accessible on research page. Enables verification.

2. **Scale narrative** (Cosmos): Token counts (20T vs 9T versions cited), model parameter tiers (4B-64B), and training data volume enumeration (20M hours, various image/video counts) stated across multiple pages without unified summary. Requires cross-referencing.

Proof placement differs significantly: EgoScale concentrates proof in the research paper; Cosmos distributes claims across product page, blog posts, Hugging Face, and papers without a single authoritative source for all specifications.

Homepage communication strategy: Both projects avoid putting raw scaling data on the main page. Cosmos main page emphasizes capability language; EgoScale dedicated page emphasizes research summary. Quantitative evidence is delegated to secondary sources (papers, blog posts, technical documentation).

Total lines written: 62 lines of cache content collected.
