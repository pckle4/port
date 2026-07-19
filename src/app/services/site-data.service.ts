import { Injectable, signal } from '@angular/core';
import { SiteData } from '../types/site-data.types';

@Injectable({
  providedIn: 'root'
})
export class SiteDataService {
  private _data = signal<SiteData>({
    hero: {
      name: 'Ansh Shah',
      dynamicWords: ["Full Stack Developer", "UI/UX Designer", "Problem Solver", "Creative Thinker"],
      socials: [
        { icon: 'github', href: "https://github.com/theanshshah", color: "text-foreground/70 hover:text-primary dark:text-foreground/70 dark:hover:text-primary transition-colors duration-300", label: "GitHub Profile" },
        { icon: 'linkedin', href: "https://linkedin.com/in/anshshahh", color: "text-foreground/70 hover:text-accent dark:text-foreground/70 dark:hover:text-accent transition-colors duration-300", label: "LinkedIn Profile" },
        { icon: 'mail', href: "mailto:theanshshah@gmail.com", color: "text-[hsl(var(--light-coral))] hover:text-accent dark:text-[hsl(var(--light-coral))] dark:hover:text-accent transition-colors duration-300", label: "Send Email" }
      ]
    },
    skillCategories: [
      {
        title: 'Frontend Development',
        description: 'Architecting pixel-perfect, responsive user interfaces.',
        skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Three.js', 'Android'],
        icon: '🎨',
      },
      {
        title: 'Backend Architecture',
        description: 'Building scalable, high-performance server-side logic.',
        skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'C#', '.NET', 'Spring Boot', 'Java'],
        icon: '⚙️',
      },
      {
        title: 'DevOps & Infrastructure',
        description: 'Streamlining deployment and ensuring reliability.',
        skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux'],
        icon: '☁️',
      },
      {
        title: 'Design & UX Strategy',
        description: 'Crafting intuitive digital experiences that convert.',
        skills: ['Figma', 'UI/UX', 'Prototyping', 'Wireframing'],
        icon: '🪄',
      },
      {
        title: 'AI & Machine Learning',
        description: 'Implementing intelligent models, Deep Learning, and LLMs.',
        skills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning', 'LLMs', 'Scikit-learn'],
        icon: '🧠',
      }
    ],
    cloudIcons: [
      'typescript', 'javascript', 'react', 'nodedotjs', 'postgresql', 
      'mongodb', 'tailwindcss', 'docker', 'git', 'github', 
      'python', 'html5', 'css', 'nextdotjs', 'vercel', 
      'vite', 'figma', 'apachekafka', 'nginx', 'graphql', 
      'redis', 'dotnet', 'kubernetes', 'linux', 'android',
      'springboot', 'spring', 'tensorflow', 'pytorch', 'scikitlearn', 'huggingface'
    ]
  });

  get data() {
    return this._data.asReadonly();
  }
}
