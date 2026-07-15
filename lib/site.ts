// Site-wide constants. Placeholders are marked; replace before launch.

// PLACEHOLDER: swap for the production domain. Absolute open graph URLs
// resolve against this.
export const SITE_URL = "https://SITE_URL_PLACEHOLDER.vercel.app";

// PLACEHOLDER: swap for the real cal.com booking URL.
export const CAL_COM_LINK = "https://cal.com/CAL_COM_LINK_PLACEHOLDER";

// PLACEHOLDER: swap for the real contact email.
export const CONTACT_EMAIL = "hello@example.com";

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
