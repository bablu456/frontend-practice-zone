"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    alert("Message sent! (Simulated)");
    reset();
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground">
            Have a project in mind or just want to say hi?
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              id="name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 rounded-md bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-2 rounded-md bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              {...register("message", { required: "Message is required" })}
              className="w-full px-4 py-2 rounded-md bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your message..."
            />
            {errors.message && (
              <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
