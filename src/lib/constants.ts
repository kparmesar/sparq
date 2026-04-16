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

export const STATS = [
  { label: "Active Projects", value: 24 },
  { label: "Network Members", value: 85 },
  { label: "Publications", value: 18 },
  { label: "Partner Trusts", value: 7 },
] as const;
