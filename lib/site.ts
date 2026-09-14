// Site-wide constants. Placeholders are marked; replace before launch.

// Production domain. Absolute open graph URLs resolve against this.
export const SITE_URL = "https://vallumlabs.com";

// PLACEHOLDER: swap for the real cal.com booking URL.
export const CAL_COM_LINK = "https://cal.com/CAL_COM_LINK_PLACEHOLDER";

// Jaiyen's address, published by him on the research document handed over
// 2026-09-03, so it is a real fact and no longer a placeholder. DormantAsk
// in components/sections/dormant-contact.tsx watches this constant and
// turns the single ask echo into a live mailto now that it resolves.
export const CONTACT_EMAIL = "jaiyen_shetty@berkeley.edu";

// PLACEHOLDER: swap for real profiles.
export const X_URL = "https://x.com/X_PLACEHOLDER";
export const LINKEDIN_URL = "https://www.linkedin.com/company/LINKEDIN_PLACEHOLDER";

export const TAGLINE = "The physical internet for dangerous outdoor work.";

export const SECTION_IDS = {
  problem: "problem",
  data: "data",
  howItWorks: "how-it-works",
  rig: "rig",
  products: "products",
  proof: "proof",
  contact: "contact",
} as const;

export const SECTION_ANCHORS: { id: string; label: string }[] = [
  { id: SECTION_IDS.problem, label: "The problem" },
  { id: SECTION_IDS.data, label: "The data" },
  { id: SECTION_IDS.howItWorks, label: "How it works" },
  { id: SECTION_IDS.rig, label: "The rig" },
  { id: SECTION_IDS.products, label: "Products" },
  { id: SECTION_IDS.contact, label: "Contact" },
];
