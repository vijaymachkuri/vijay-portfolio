
import { Project, Skill } from './types';

export const SKILLS: Skill[] = [
  { name: 'Python', category: 'AI' },
  { name: 'TensorFlow', category: 'AI' },
  { name: 'NLP', category: 'AI' },
  { name: 'React.js', category: 'Web' },
  { name: 'Next.js', category: 'Web' },
  { name: 'JavaScript', category: 'Web' },
  { name: 'HTML', category: 'Web' },
  { name: 'CSS', category: 'Web' },
  { name: 'AWS', category: 'Tools' },
  { name: 'Google Cloud', category: 'Tools' },
  { name: 'Figma', category: 'Tools' },
  { name: 'C++', category: 'Core' },
  { name: 'C', category: 'Core' },
  { name: 'Java', category: 'Core' },
  { name: 'DBMS', category: 'Core' },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Emotion Recognition",
    description: "Web application leveraging deep learning techniques to recognize emotions from speech patterns with 96.6% accuracy.",
    tech: ["Deep Learning", "Python", "Web"],
    image_url: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=800&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 2,
    title: "AI Resume Parser",
    description: "Intelligent extraction tool using NLP to parse resume data into structured formats with 78% accuracy.",
    tech: ["NLP", "Python", "AI"],
    image_url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 3,
    title: "QR File Sharing",
    description: "Instantaneous file transfer solution using Python and QR codes, optimized for 90% efficiency across local networks.",
    tech: ["Python", "Networking", "Utility"],
    image_url: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=800&auto=format&fit=crop",
    link: "#"
  }
];

export const EXPERIENCE = [
  {
    role: "AI & ML Virtual Intern",
    company: "GOOGLE",
    period: "07/2024 – 01/2025",
    description: "Completed hands-on modules focusing on machine learning workflows, model training, and deployment."
  },
  {
    role: "Android Developer Virtual Intern",
    company: "GOOGLE",
    period: "01/2023 – 07/2023",
    description: "Gained exposure to essential Android development practices and application lifecycle management."
  },
  {
    role: "Tech Lead",
    company: "DATAZOIDS, CMRTC",
    period: "2023 - 2026",
    description: "Organized hackathons and conducted sessions for 200+ college students on entrepreneurship and cybersecurity."
  }
];

export const EDUCATION = [
  {
    degree: "B.Tech in AI & ML",
    school: "CMR TECHNICAL CAMPUS, HYD",
    period: "09/2022 - 06/2026",
    grade: "CGPA: 7.3"
  },
  {
    degree: "XII (TSBIE)",
    school: "BHARATRATNA JUNIOR COLLEGE",
    period: "2020 – 2022",
    grade: "68.8%"
  }
];

export const CONTACT_INFO = {
  email: "machkurii.vijay@gmail.com",
  phone: "(+91) 8688117488",
  github: "https://github.com/vijaymachkuri",
  linkedin: "https://linkedin.com/in/vijay-machkuri"
};

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#technical-arsenal' },
  { name: 'Projects', href: '#selected-works' },
  { name: 'Contact', href: '#contact' },
];

// Profile Image Source
import profileImage from './assets/p.jpg';
export const PROFILE_IMAGE_URL = profileImage;