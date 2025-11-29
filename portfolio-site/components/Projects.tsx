"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured online store with cart, checkout, and payment integration.",
    tags: ["Next.js", "Stripe", "Prisma"],
    github: "#",
    demo: "#",
    image: "https://placehold.co/600x400/1e1e1e/FFF?text=E-Commerce",
  },
  {
    title: "Task Management App",
    description: "Real-time collaborative task manager with drag-and-drop functionality.",
    tags: ["React", "Firebase", "Tailwind"],
    github: "#",
    demo: "#",
    image: "https://placehold.co/600x400/1e1e1e/FFF?text=Task+App",
  },
  {
    title: "AI Content Generator",
    description: "SaaS application generating marketing copy using OpenAI API.",
    tags: ["Next.js", "OpenAI", "tRPC"],
    github: "#",
    demo: "#",
    image: "https://placehold.co/600x400/1e1e1e/FFF?text=AI+Gen",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground">Some of my recent work</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  unoptimized // Using placeholder, so unoptimized is fine for now
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> Code
                    </a>
                  </Button>
                  <Button size="sm" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Demo
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
