// Site-wide constants
export const SITE_NAME = "SPARQ";
export const SITE_DESCRIPTION =
  "Severn Paediatric Audit, Research & Quality Improvement Network";
export const SITE_TAGLINE =
  "Promoting collaboration to improve the care of children and young people";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/events", label: "Events" },
  { href: "/showcase", label: "Showcase" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export const SITE_OPTIONS = [
  "Bristol Royal Hospital for Children",
  "St Michael's Hospital, Bristol",
  "Southmead Hospital, Bristol",
  "Gloucestershire Royal Hospital",
  "Great Western Hospital, Swindon",
  "Royal United Hospital, Bath",
  "Musgrove Park Hospital, Taunton",
  "Yeovil District Hospital",
  "Weston General Hospital",
  "North Devon District Hospital",
] as const;

export const STATS = [
  { label: "Active Projects", value: 24 },
  { label: "Network Members", value: 85 },
  { label: "Publications", value: 18 },
  { label: "Partner Trusts", value: 7 },
] as const;
