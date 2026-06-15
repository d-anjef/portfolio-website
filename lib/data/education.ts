import type { Education } from "@/types";

export const educationData: Education[] = [
  {
    id: 1,
    degree: "Bachelor in Computer Application",
    institution: "Vedas College / Tribhuvan University",
    duration: "2022 - 2027",
    fieldOfStudy: "Computer Science",
    description:
      "Pursuing comprehensive studies in computer applications with focus on software development and web technologies",
    icon: "🎓",
    status: "Currently Studying",
    courses: [
      "Web Development",
      "Database Management",
      "Programming Languages",
      "Software Engineering",
    ],
    highlights: [
      "Focus on full-stack development",
      "Practical coding experience",
      "Industry-relevant curriculum",
    ],
  },
  {
    id: 2,
    degree: "+2 (Higher Secondary)",
    institution: "Kathmandu College of Central State (KCCS)",
    duration: "2020 - 2022",
    fieldOfStudy: "Computer Science",
    description:
      "Advanced secondary education with specialization in computer science",
    icon: "📚",
    status: "Completed",
    highlights: [
      "Strong foundation in programming",
      "Introduced to web technologies",
      "Hands-on lab experience",
    ],
  },
  {
    id: 3,
    degree: "School",
    institution: "New Horizon Academy",
    duration: "Passed: 2020",
    fieldOfStudy: "General Education",
    description: "Primary and secondary education providing foundational knowledge",
    icon: "🏫",
    status: "Completed",
    highlights: [
      "Well-rounded education",
      "Strong academic foundation",
      "Co-curricular activities",
    ],
  },
];