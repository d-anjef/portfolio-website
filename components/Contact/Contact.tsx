"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  FileText,
  Send,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import WindowFrame from "@/components/ui/WindowFrame";
import type { ModalProps } from "@/types";

// Custom brand icons (Lucide removed them)
const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const contactLinks = [
  {
    id: 1,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/anjef-dangol-916804369/",
    Icon: LinkedinIcon,
    color: "#0077B5",
    description: "Connect with me on LinkedIn",
  },
  {
    id: 2,
    name: "GitHub",
    url: "https://github.com/d-anjef",
    Icon: GithubIcon,
    color: "#ffffff",
    description: "Check out my projects on GitHub",
  },
  {
    id: 3,
    name: "Email",
    url: "mailto:danjefff1001@gmail.com?subject=Let's Connect",
    Icon: Mail,
    color: "#EA4335",
    description: "Send me an email directly",
  },
];

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact({ isOpen, onClose }: ModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.trim().length < 2)
      newErrors.name = "Name must be at least 2 characters";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus(null), 4000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus(null), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <WindowFrame
      isOpen={isOpen}
      onClose={onClose}
      title="Contact"
      icon="✉️"
      size="lg"
      glowColor="#28c840"
    >
      <div className="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-dark">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-white text-2xl md:text-3xl font-bold font-display mb-4 tracking-tight">
              Contact Me
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
              I&apos;m <strong className="text-white">Anjef Dangol</strong>, a
              dedicated Frontend developer specializing in building dynamic and
              user-centric web applications. Whether you have a project
              proposal, collaboration opportunity, or any inquiries, I welcome
              the chance to connect.
            </p>

            {/* Quick links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {contactLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group relative p-5 rounded-xl bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] border border-white/10 hover:border-white/30 flex flex-col items-center gap-3 text-center transition-all overflow-hidden"
                  style={{ borderColor: `${link.color}30` }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center border transition-all group-hover:scale-110"
                    style={{
                      background: `${link.color}15`,
                      borderColor: `${link.color}40`,
                      color: link.color,
                    }}
                  >
                    <link.Icon size={26} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm md:text-base">
                      {link.name}
                    </h3>
                    <p className="text-white/50 text-xs mt-1">
                      {link.description}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Resume */}
            <a
              href="/assets/Resume.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 border border-gray-600 hover:border-green-500 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-0.5 text-sm"
            >
              <FileText size={16} />
              Download Resume
            </a>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-white text-lg md:text-xl font-semibold font-heading mb-5">
              Send me a Message
            </h3>

            {/* Status Message */}
            {status && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-4 px-4 py-3 rounded-lg border flex items-center gap-2 text-sm font-medium ${
                  status === "success"
                    ? "bg-green-500/15 text-green-400 border-green-400"
                    : "bg-red-500/15 text-red-400 border-red-400"
                }`}
              >
                {status === "success" ? (
                  <>
                    <CheckCircle size={18} /> Message sent successfully!
                  </>
                ) : (
                  <>
                    <XCircle size={18} /> Failed to send message. Please try again.
                  </>
                )}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              {/* Name */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border text-white text-sm placeholder:text-gray-500 outline-none focus:bg-[#222] focus:shadow-md transition-all ${
                    errors.name
                      ? "border-red-500 focus:shadow-red-500/20"
                      : "border-gray-700 focus:border-green-500 focus:shadow-green-500/20"
                  }`}
                />
                {errors.name && (
                  <span className="text-red-400 text-xs mt-1 block">
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border text-white text-sm placeholder:text-gray-500 outline-none focus:bg-[#222] focus:shadow-md transition-all ${
                    errors.email
                      ? "border-red-500 focus:shadow-red-500/20"
                      : "border-gray-700 focus:border-green-500 focus:shadow-green-500/20"
                  }`}
                />
                {errors.email && (
                  <span className="text-red-400 text-xs mt-1 block">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message (minimum 10 characters)"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border text-white text-sm placeholder:text-gray-500 outline-none focus:bg-[#222] focus:shadow-md transition-all resize-y min-h-[100px] ${
                    errors.message
                      ? "border-red-500 focus:shadow-red-500/20"
                      : "border-gray-700 focus:border-green-500 focus:shadow-green-500/20"
                  }`}
                />
                {errors.message && (
                  <span className="text-red-400 text-xs mt-1 block">
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-lg bg-gradient-to-br from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-black font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/40 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </WindowFrame>
  );
}