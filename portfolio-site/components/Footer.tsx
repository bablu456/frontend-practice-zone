import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary py-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-muted-foreground text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} DevPortfolio. All rights reserved.
        </div>
        
        <div className="flex space-x-6">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
