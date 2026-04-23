const BRAND = {
  primary: "#2563EB",
  primaryDark: "#1D4ED8",
  primaryLight: "#DBEAFE",
  coral: "#E8594A",
  warm: "#F97316",
  bg: "#F5F5F5",
  white: "#FFFFFF",
  textDark: "#171717",
  textMuted: "#737373",
  border: "#E5E5E5",
};

function layout(content: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${BRAND.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:32px 16px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
  <!-- Header -->
  <tr><td style="background:${BRAND.primaryDark};padding:24px 32px;border-radius:16px 16px 0 0;text-align:center;">
    <span style="font-size:24px;font-weight:800;color:#fff;letter-spacing:-0.5px;">SPARQ</span>
  </td></tr>
  <!-- Body -->
  <tr><td style="background:${BRAND.white};padding:32px;border-left:1px solid ${BRAND.border};border-right:1px solid ${BRAND.border};">
    ${content}
  </td></tr>
  <!-- Footer -->
  <tr><td style="background:${BRAND.white};padding:20px 32px 28px;border-radius:0 0 16px 16px;border:1px solid ${BRAND.border};border-top:none;text-align:center;">
    <p style="margin:0;font-size:12px;color:${BRAND.textMuted};">
      Severn Paediatric Audit, Research &amp; Quality Improvement Network
    </p>
    <p style="margin:6px 0 0;font-size:12px;color:${BRAND.textMuted};">
      <a href="https://www.sparq.org.uk/account" style="color:${BRAND.primary};text-decoration:none;">Manage preferences</a>
      &nbsp;&middot;&nbsp;
      <a href="https://www.sparq.org.uk" style="color:${BRAND.primary};text-decoration:none;">Visit SPARQ</a>
    </p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function button(text: string, href: string) {
  return `<table cellpadding="0" cellspacing="0" style="margin:24px 0 8px;"><tr><td>
    <a href="${href}" style="display:inline-block;padding:12px 28px;background:${BRAND.primary};color:#fff;font-size:14px;font-weight:600;text-decoration:none;border-radius:10px;">
      ${text}
    </a>
  </td></tr></table>`;
}

function badge(text: string, color: string = BRAND.primaryLight, textColor: string = BRAND.primaryDark) {
  return `<span style="display:inline-block;padding:3px 10px;background:${color};color:${textColor};font-size:11px;font-weight:600;border-radius:6px;text-transform:uppercase;">${text}</span>`;
}

export function welcomeEmail(name: string) {
  return {
    subject: "Welcome to SPARQ",
    html: layout(`
      <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:${BRAND.textDark};">
        Welcome, ${name}
      </h1>
      <p style="margin:0 0 16px;font-size:15px;color:${BRAND.textMuted};line-height:1.6;">
        Your SPARQ account is ready. You can now browse projects across the Severn region and set up notifications for the work that matters to you.
      </p>
      <p style="margin:0 0 4px;font-size:15px;color:${BRAND.textDark};line-height:1.6;">
        Here&rsquo;s what you can do:
      </p>
      <ul style="margin:8px 0 0;padding-left:20px;font-size:14px;color:${BRAND.textMuted};line-height:1.8;">
        <li>Browse research, QI, and audit projects</li>
        <li>Set notification preferences for new projects and events</li>
        <li>Filter by site, type, or keyword</li>
      </ul>
      ${button("View Projects", "https://www.sparq.org.uk/projects")}
    `),
  };
}

export function newEventEmail(event: {
  title: string;
  date: string;
  location: string;
  slug: string;
}) {
  return {
    subject: `New Event: ${event.title}`,
    html: layout(`
      <p style="margin:0 0 12px;">${badge("New Event", "#FEF3C7", "#92400E")}</p>
      <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:${BRAND.textDark};">
        ${event.title}
      </h1>
      <table cellpadding="0" cellspacing="0" style="margin:0 0 16px;">
        <tr>
          <td style="padding:4px 0;font-size:14px;color:${BRAND.textMuted};width:80px;">Date</td>
          <td style="padding:4px 0;font-size:14px;color:${BRAND.textDark};font-weight:500;">${event.date}</td>
        </tr>
        <tr>
          <td style="padding:4px 0;font-size:14px;color:${BRAND.textMuted};width:80px;">Location</td>
          <td style="padding:4px 0;font-size:14px;color:${BRAND.textDark};font-weight:500;">${event.location}</td>
        </tr>
      </table>
      ${button("View Event", `https://www.sparq.org.uk/events/${event.slug}`)}
    `),
  };
}

export function newProjectEmail(project: {
  title: string;
  type: string;
  status: string;
  site?: string;
  slug: string;
}) {
  const typeLabel = project.type === "qi" ? "Quality Improvement" : project.type.charAt(0).toUpperCase() + project.type.slice(1);
  return {
    subject: `New Project: ${project.title}`,
    html: layout(`
      <p style="margin:0 0 12px;">
        ${badge("New Project")}
        &nbsp;${badge(typeLabel, "#F0FDF4", "#166534")}
      </p>
      <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:${BRAND.textDark};">
        ${project.title}
      </h1>
      <table cellpadding="0" cellspacing="0" style="margin:0 0 16px;">
        <tr>
          <td style="padding:4px 0;font-size:14px;color:${BRAND.textMuted};width:80px;">Status</td>
          <td style="padding:4px 0;font-size:14px;color:${BRAND.textDark};font-weight:500;">${project.status}</td>
        </tr>
        ${project.site ? `<tr>
          <td style="padding:4px 0;font-size:14px;color:${BRAND.textMuted};width:80px;">Site</td>
          <td style="padding:4px 0;font-size:14px;color:${BRAND.textDark};font-weight:500;">${project.site}</td>
        </tr>` : ""}
      </table>
      ${button("View Project", `https://www.sparq.org.uk/projects/${project.slug}`)}
    `),
  };
}
