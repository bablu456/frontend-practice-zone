"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-primary font-semibold tracking-wide uppercase mb-4">
            Full Stack Developer
          </h2>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Building Digital <br /> Experiences
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-10">
            I craft accessible, pixel-perfect, and performant web applications using modern technologies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="#contact">
                Contact Me <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/resume.pdf" download>
                Download Resume <Download className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
