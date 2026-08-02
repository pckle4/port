export interface ProjectCard {
  readonly id: string;
  readonly category: string;
  readonly title: string;
  readonly description: string;
  readonly techStack: readonly string[];
  readonly date: string;
  readonly imageAccent: string;
  readonly image?: string;
  readonly liveUrl: string;
  readonly githubUrl: string;
  readonly displayUrl: string;
}

export const PORTFOLIO_PROJECTS: readonly ProjectCard[] = [
  {
    id: 'resume-generator',
    category: 'Web Application',
    title: 'Resume Generator',
    description:
      'A responsive resume generator web application enabling users to create professional resumes with an intuitive interface, real-time preview functionality, and dynamic form validation.',
    techStack: ['TypeScript', 'Shadcn', 'ReactJS'],
    date: 'January 2025',
    imageAccent: '#fffdf5',
    image: '/images/projects/resume.png',
    liveUrl: 'https://resume.nowhile.com',
    githubUrl: 'https://github.com',
    displayUrl: 'resume.nowhile.com',
  },
  {
    id: 'link-file-sharing',
    category: 'Web Application',
    title: 'Link File Sharing',
    description:
      'A lightweight, frontend-only file sharing solution using React and Tailwind CSS. Secure client-side logic handles file processing and ephemeral peer-to-peer download links.',
    techStack: ['React', 'TypeScript', 'Web Crypto API', 'Tailwind CSS'],
    date: 'November 2025',
    imageAccent: '#faf6ff',
    image: '/images/projects/link-file.png',
    liveUrl: 'https://l.nowhile.com',
    githubUrl: 'https://github.com',
    displayUrl: 'l.nowhile.com',
  },
  {
    id: 'p2p-file-transfer',
    category: 'Web Application',
    title: 'P2P File Transfer App',
    description:
      'A peer-to-peer file transfer application using vanilla JavaScript. Enables secure file sharing and real-time chat functionality alongside reliable data transmission between connected users.',
    techStack: ['HTML', 'CSS', 'Javascript'],
    date: 'January 2025',
    imageAccent: '#f5f7ff',
    image: '/images/projects/p2p.png',
    liveUrl: 'https://file.nowhile.com',
    githubUrl: 'https://github.com',
    displayUrl: 'file.nowhile.com',
  },
  {
    id: 'qr-generator',
    category: 'Web Application',
    title: 'QR Code Generator',
    description:
      'Instantly generate customizable QR codes for URLs, text, and contact information. Features high-resolution exports and a clean, responsive interface.',
    techStack: ['React', 'Tailwind', 'Vite'],
    date: 'January 2026',
    imageAccent: '#f4fbe7',
    image: '/images/projects/taskflow.png',
    liveUrl: 'https://qr.nowhile.com',
    githubUrl: 'https://github.com',
    displayUrl: 'qr.nowhile.com',
  },
];
