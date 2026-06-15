"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import SocialLinks from "@/components/SocialLinks/SocialLinks";
import Dock from "@/components/Dock/Dock";
import Profile from "@/components/Profile/Profile";
import Education from "@/components/Education/Education";
import Experience from "@/components/Experience/Experience";
import Skills from "@/components/Skills/Skills";
import ProjectsWindow from "@/components/Projects/ProjectsWindow";
import Contact from "@/components/Contact/Contact";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);
  const [isEducationOpen, setIsEducationOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (hasVisited) {
      setIsLoading(false);
    } else {
      sessionStorage.setItem("hasVisited", "true");
    }
  }, []);

  const handleHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!hasMounted) return null;

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <main
        className={`relative min-h-screen transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Header />
        <SocialLinks />
        <Hero onContactClick={() => setIsContactOpen(true)} />
        <Dock
          onHomeClick={handleHome}
          onProfileClick={() => setIsProfileOpen(true)}
          onExperienceClick={() => setIsExperienceOpen(true)}
          onEducationClick={() => setIsEducationOpen(true)}
          onProjectsClick={() => setIsProjectsOpen(true)}
          onSkillsClick={() => setIsSkillsOpen(true)}
          onContactClick={() => setIsContactOpen(true)}
        />

        <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        <Experience isOpen={isExperienceOpen} onClose={() => setIsExperienceOpen(false)} />
        <Education isOpen={isEducationOpen} onClose={() => setIsEducationOpen(false)} />
        <ProjectsWindow isOpen={isProjectsOpen} onClose={() => setIsProjectsOpen(false)} />
        <Skills isOpen={isSkillsOpen} onClose={() => setIsSkillsOpen(false)} />
        <Contact isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </main>
    </>
  );
}