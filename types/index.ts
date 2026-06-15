export interface Experience {
  id: number;
  jobTitle: string;
  company: string;
  duration: string;
  status: "Currently Working" | "Internship" | "Full-time" | "Part-time";
  description: string;
  responsibilities: string[];
  technologies: string[];
  icon: string;
  location?: string;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  duration: string;
  fieldOfStudy: string;
  description: string;
  icon: string;
  status: "Currently Studying" | "Completed";
  courses?: string[];
  highlights: string[];
}

export interface Project {
  title: string;
  tags: string[];
  color: string;
  icon: string;
  github: string;
  live: string;
  image: string;
  description: string;
}

export interface Skill {
  title: string;
  category: "Frontend" | "Backend" | "Programming" | "Tools" | "Design" | "Media";
  iconName: string; // we'll map to icons in component
}

export interface ContactLink {
  id: number;
  name: string;
  url: string;
  color: string;
  description: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}