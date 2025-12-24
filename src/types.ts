export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image_url: string;
  link: string;
}

export interface Skill {
  name: string;
  category: 'AI' | 'Web' | 'Tools' | 'Core';
  icon_url?: string;
}

export enum SectionId {
  HOME = 'home',
  SKILLS = 'skills',
  PROJECTS = 'projects',
  ABOUT = 'about',
  CONTACT = 'contact'
}