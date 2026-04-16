import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { projects, events, showcase, blogPosts } from "../src/lib/db/schema";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. Add it to .env.local or .env");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function seed() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await db.delete(blogPosts);
  await db.delete(showcase);
  await db.delete(events);
  await db.delete(projects);

  // Projects
  await db.insert(projects).values([
    {
      title: "Regional Paediatric Sepsis Pathway Audit",
      slug: "sepsis-pathway-audit",
      description:
        "Multi-centre audit evaluating adherence to the updated NICE sepsis guidelines across all 7 Severn region trusts. Reviewing recognition, escalation, and antibiotic administration times in children presenting to ED with suspected sepsis.",
      type: "audit",
      status: "active",
      specialty: ["Emergency Medicine", "General Paediatrics"],
      tags: ["sepsis", "NICE guidelines", "emergency", "multi-centre"],
      leadAuthors: ["Dr Sarah Chen", "Dr James Okonkwo"],
      startDate: "2026-01-15",
      contactEmail: "sepsis-audit@sparq.org.uk",
    },
    {
      title: "Improving Paediatric Asthma Discharge Planning",
      slug: "asthma-discharge-qi",
      description:
        "Quality improvement project using PDSA cycles to standardise asthma discharge bundles. Aims to reduce 30-day readmission rates by ensuring all families receive personalised asthma action plans, inhaler technique reviews, and follow-up arrangements before discharge.",
      type: "qi",
      status: "active",
      specialty: ["Respiratory", "General Paediatrics"],
      tags: ["asthma", "discharge", "readmissions", "PDSA"],
      leadAuthors: ["Dr Priya Patel"],
      startDate: "2025-09-01",
      contactEmail: "asthma-qi@sparq.org.uk",
    },
    {
      title: "Neonatal Antibiotic Stewardship in the Severn Region",
      slug: "neonatal-abx-stewardship",
      description:
        "Prospective observational study examining antibiotic prescribing patterns in NICUs across the region. Evaluating duration of empirical antibiotics, culture-guided de-escalation rates, and variation between units to develop a regional stewardship framework.",
      type: "research",
      status: "recruiting",
      specialty: ["Neonatology"],
      tags: ["antibiotics", "stewardship", "NICU", "prescribing"],
      leadAuthors: ["Dr Emma Richardson", "Dr Tom Walsh"],
      startDate: "2026-03-01",
      contactEmail: "neonatal-abx@sparq.org.uk",
    },
    {
      title: "Transition of Care for Adolescents with Chronic Conditions",
      slug: "adolescent-transition-study",
      description:
        "Mixed-methods research exploring the experiences of young people aged 14-19 transitioning from paediatric to adult services across the Severn region. Includes patient surveys, semi-structured interviews, and case note reviews to map current pathways.",
      type: "research",
      status: "active",
      specialty: ["General Paediatrics", "Community"],
      tags: ["transition", "adolescent", "chronic disease", "qualitative"],
      leadAuthors: ["Dr Amira Hassan", "Dr Lucy Green"],
      startDate: "2025-06-01",
      contactEmail: "transition@sparq.org.uk",
    },
    {
      title: "Paediatric Safeguarding Documentation Audit",
      slug: "safeguarding-documentation-audit",
      description:
        "Regional audit of safeguarding documentation quality in paediatric ED and assessment units. Assessing completeness of body maps, injury descriptions, safeguarding proformas and referral documentation against RCPCH standards.",
      type: "audit",
      status: "completed",
      specialty: ["Emergency Medicine", "Community"],
      tags: ["safeguarding", "documentation", "ED", "child protection"],
      leadAuthors: ["Dr Fiona Campbell"],
      startDate: "2025-01-01",
      contactEmail: "safeguarding@sparq.org.uk",
    },
    {
      title: "Reducing Unnecessary Blood Tests in Bronchiolitis",
      slug: "bronchiolitis-blood-tests-qi",
      description:
        "QI project targeting over-investigation in bronchiolitis admissions. Implementing a clinical decision support tool and staff education programme to reduce unnecessary blood tests, chest X-rays, and viral swabs in line with NICE guidance.",
      type: "qi",
      status: "completed",
      specialty: ["Respiratory", "General Paediatrics"],
      tags: ["bronchiolitis", "overinvestigation", "choosing wisely"],
      leadAuthors: ["Dr Rahul Sharma", "Dr Kate Williams"],
      startDate: "2025-03-01",
      contactEmail: "bronch-qi@sparq.org.uk",
    },
  ]);
  console.log("  ✅ Projects seeded");

  // Events
  await db.insert(events).values([
    {
      title: "SPARQ Annual Research Symposium 2026",
      slug: "annual-symposium-2026",
      description:
        "Our flagship annual event bringing together paediatric trainees, consultants, and researchers from across the Severn region. Featuring keynote talks, oral presentations, poster sessions, and networking opportunities. Abstract submissions now open.",
      date: "2026-06-14",
      endDate: "2026-06-14",
      location: "Bristol Royal Hospital for Children, Education Centre",
      isVirtual: false,
      registrationUrl: "#",
    },
    {
      title: "Introduction to Quality Improvement for Trainees",
      slug: "qi-workshop-may-2026",
      description:
        "Half-day interactive workshop covering QI methodology including Model for Improvement, PDSA cycles, process mapping, run charts and driver diagrams. Suitable for all stages of training. Counts towards RCPCH QI requirements.",
      date: "2026-05-10",
      location: "Virtual",
      isVirtual: true,
      registrationUrl: "#",
    },
    {
      title: "Research Methods Study Day: Getting Started",
      slug: "research-methods-april-2026",
      description:
        "A deanery study day covering research fundamentals — ethics applications, study design, statistics basics, and how to get involved in trainee-led research. Hear from trainees who have published and learn practical tips.",
      date: "2026-04-26",
      location: "Gloucester Royal Hospital, Lecture Theatre",
      isVirtual: false,
      registrationUrl: "#",
    },
    {
      title: "Journal Club: Paediatric Sepsis Updates",
      slug: "journal-club-sepsis-march-2026",
      description:
        "Monthly journal club discussing recent publications on paediatric sepsis recognition and management. This month: the PERUKI PREDICT study results and implications for UK practice.",
      date: "2026-03-15",
      location: "Virtual",
      isVirtual: true,
    },
  ]);
  console.log("  ✅ Events seeded");

  // Showcase
  await db.insert(showcase).values([
    {
      title:
        "Variation in acute bronchiolitis management across the Severn region: a multi-centre audit",
      slug: "bronchiolitis-audit-paper",
      category: "publication",
      authors: ["Sharma R", "Williams K", "Chen S", "Patel P"],
      description:
        "Published in Archives of Disease in Childhood. Demonstrated significant variation in bronchiolitis investigation rates across 7 trusts, with unnecessary blood tests performed in 42% of typical bronchiolitis admissions.",
      date: "2026-02-01",
      doi: "10.1136/archdischild-2026-000001",
    },
    {
      title: "Improving Asthma Discharge Bundle Compliance: A QI Project",
      slug: "asthma-qi-poster",
      category: "poster",
      authors: ["Patel P", "Okonkwo J"],
      description:
        "Poster presented at RCPCH Conference 2026. Showed improvement in discharge bundle completion from 34% to 89% over 4 PDSA cycles using a standardised proforma and nurse-led inhaler technique assessment.",
      date: "2026-03-15",
    },
    {
      title:
        "Trainee Perspectives on Research Engagement: Barriers and Enablers",
      slug: "trainee-research-perspectives",
      category: "presentation",
      authors: ["Hassan A", "Green L", "Richardson E"],
      description:
        "Oral presentation at the South West Paediatric Society meeting. Survey of 120 paediatric trainees identified protected research time, mentor access, and network support as the top three enablers.",
      date: "2026-01-20",
    },
    {
      title:
        "Reducing ED Wait Times for Paediatric Mental Health Presentations",
      slug: "ed-mental-health-qi",
      category: "qi",
      authors: ["Campbell F", "Walsh T"],
      description:
        "QI project at a single centre reducing average time to CAMHS assessment from 14 hours to 6 hours through introduction of a paediatric mental health pathway and dedicated assessment space.",
      date: "2025-11-10",
    },
    {
      title: "Regional Audit of Paediatric Diabetes Transition Outcomes",
      slug: "diabetes-transition-audit",
      category: "audit",
      authors: ["Green L", "Hassan A"],
      description:
        "Audit of transition outcomes for young people with Type 1 diabetes across 5 centres. Found 28% had no HbA1c recorded in the 6 months following transfer to adult services.",
      date: "2025-09-01",
    },
    {
      title:
        "The Impact of COVID-19 on Paediatric Presentations: A Severn Region Analysis",
      slug: "covid-paediatric-impact",
      category: "publication",
      authors: ["Chen S", "Okonkwo J", "Sharma R", "Campbell F", "Walsh T"],
      description:
        "Published in BMJ Paediatrics Open. Retrospective analysis of paediatric ED attendances showing persistent changes in presentation patterns 3 years post-pandemic.",
      date: "2025-07-01",
      doi: "10.1136/bmjpo-2025-000123",
    },
  ]);
  console.log("  ✅ Showcase seeded");

  // Blog posts
  await db.insert(blogPosts).values([
    {
      title:
        "Welcome to SPARQ — Building a Research Community in the Severn Region",
      slug: "welcome-to-sparq",
      excerpt:
        "We are excited to launch the SPARQ website — a new hub for paediatric trainees in the Severn region interested in research, quality improvement, and audit. Find out what we have planned.",
      author: "SPARQ Committee",
      category: "news",
      publishedAt: "2026-04-16",
      featured: true,
    },
    {
      title:
        "How to Get Involved in Your First Research Project as a Paediatric Trainee",
      slug: "getting-started-research",
      excerpt:
        "Feeling daunted by the idea of research? You are not alone. Here are practical steps to go from interested observer to active contributor, with tips from trainees who have been there.",
      author: "SPARQ Committee",
      category: "training",
      publishedAt: "2026-04-10",
      featured: false,
    },
    {
      title: "Understanding PDSA Cycles: A Practical Guide for Paediatric QI",
      slug: "pdsa-practical-guide",
      excerpt:
        "Plan-Do-Study-Act cycles are the cornerstone of quality improvement. This guide walks you through running your first PDSA cycle with a real paediatric example from the Severn region.",
      author: "SPARQ Committee",
      category: "training",
      publishedAt: "2026-03-20",
      featured: false,
    },
  ]);
  console.log("  ✅ Blog posts seeded");

  console.log("🎉 Database seeded successfully!");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
