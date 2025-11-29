"use client";

import { motion } from "framer-motion";

const skills = [
  { name: "JavaScript", icon: "JS" },
  { name: "TypeScript", icon: "TS" },
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "N" },
  { name: "Node.js", icon: "🟢" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Git", icon: "📦" },
];

export default function TechStack() {
  return (
    <section id="skills" className="py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Tech Stack</h2>
          <p className="text-muted-foreground">Technologies I work with</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-card border border-border p-6 rounded-xl flex flex-col items-center justify-center hover:border-primary transition-colors"
            >
              <span className="text-4xl mb-3">{skill.icon}</span>
              <span className="font-medium">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
