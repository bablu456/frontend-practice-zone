"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-20 bg-secondary/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          <div className="prose prose-invert mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              I am a passionate Full Stack Developer with a strong foundation in computer science principles. 
              My journey began with a curiosity for how things work on the web, which led me to master 
              HTML, CSS, and JavaScript. Today, I build scalable applications using the modern React ecosystem.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open source, 
              or enjoying a good cup of coffee while reading about the latest tech trends.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
