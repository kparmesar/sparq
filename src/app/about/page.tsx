"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const team = [
  { name: "TBC", role: "Chair", specialty: "" },
  { name: "TBC", role: "Vice-Chair", specialty: "" },
  { name: "TBC", role: "QI Lead", specialty: "" },
  { name: "TBC", role: "Research Lead", specialty: "" },
  { name: "TBC", role: "Education Lead", specialty: "" },
  { name: "TBC", role: "Communications", specialty: "" },
];

const aims = [
  "Be an accessible gateway into research for paediatric trainees across the Severn region",
  "Share and publish high-quality research, audit and quality improvement work",
  "Collaborate with other regional and national networks",
  "Signpost educational and training opportunities in research",
  "Organise study days for paediatric trainees to build research skills and knowledge",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-dark to-primary pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-white/5 blur-2xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold text-white"
          >
            About SPARQ
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-blue-200 max-w-2xl mx-auto"
          >
            Severn Paediatric Audit, Research &amp; Quality Improvement Network
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Our Mission</h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              We are a group of academic medical and allied health professionals
              which aims to promote collaboration across disciplines and
              specialties to improve the care of children and young people in the
              Severn region and beyond.
            </p>
            <p className="mt-4 text-neutral-600 leading-relaxed text-lg">
              We bring together paediatric trainees across the South West to lead
              and collaborate on projects that make a difference to child health.
              We work with multidisciplinary colleagues regionally and nationally
              to support trainees to lead regional research projects and develop
              their skills as paediatric researchers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Aims */}
      <section className="py-16 bg-neutral-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-2xl font-bold text-neutral-900 mb-8"
          >
            Our Aims
          </motion.h2>
          <div className="space-y-4">
            {aims.map((aim, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 bg-white rounded-xl p-5 border border-neutral-200"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                <p className="text-neutral-700 leading-relaxed">{aim}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl font-bold text-neutral-900">The Committee</h2>
            <p className="mt-2 text-neutral-600">
              Our trainee-led committee drives SPARQ forward.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-neutral-200 p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary-light to-primary/20 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </div>
                <h3 className="font-bold text-neutral-400 italic">{member.name}</h3>
                <p className="text-sm font-medium text-primary">{member.role}</p>
                {member.specialty && <p className="text-sm text-neutral-500 mt-1">{member.specialty}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 bg-neutral-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">What We Work On</h2>
            <p className="text-neutral-600 leading-relaxed">
              We work together on projects which address issues relevant to child
              health, paediatric medical education and/or paediatric training.
              Our projects may be multi-centre audit or Quality Improvement
              projects, or formal research. We collaborate with other regional and
              national networks including PENTRAIN (Peninsula Trainees Research,
              Audit and Innovation Network) and national trainee research
              networks.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
