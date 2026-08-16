import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { EnhancedFooterComponent } from '../../components/enhanced-footer/enhanced-footer';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [UpperCasePipe, EnhancedFooterComponent],
  templateUrl: './resume.html',
  styleUrls: ['./resume.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeComponent {
  protected isDownloaded = signal(false);
  protected isLoading = signal(false);
  protected menuOpen = signal(false);

  protected handleDownload(event: Event) {
    event.preventDefault();
    this.isLoading.set(true);
    
    setTimeout(() => {
      this.isLoading.set(false);
      this.isDownloaded.set(true);
      
      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.download = 'Ansh_Shah_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        this.isDownloaded.set(false);
      }, 2500);
    }, 800);
  }

  protected readonly skills = [
    { label: 'Languages', items: ['Java', 'Python', 'Go', 'C', 'C#', 'C++', 'JavaScript', 'TypeScript', 'HTML/CSS', 'SQL'] },
    { label: 'Tools', items: ['VS Code', 'Eclipse', 'Android Studio', 'Git', 'Docker', 'Kubernetes', 'Scikit-learn', 'PyTorch', 'TensorFlow'] },
    { label: 'Technology', items: ['AI', 'ML', 'Spring Boot', 'React', 'Next.js', 'Node.js', '.NET', 'Linux', 'GitHub', 'Deep Learning', 'LLMs'] },
  ];

  protected readonly projects = [
    {
      title: "Link File Sharing",
      type: "Web Application",
      tech: "React, Tailwind CSS",
      date: "November 2025",
      link: "https://l.nowhile.com",
      icon: "globe",
      description: "A lightweight, frontend-only file sharing solution using React and Tailwind CSS.",
      bullets: [
        "Architected a lightweight, frontend-only file sharing solution using React and Tailwind CSS, completely eliminating the need for backend infrastructure or external databases.",
        "Implemented secure client-side logic to handle file processing and link generation, ensuring user data privacy and instant performance without server latency.",
        "Designed a minimalist, highly responsive user interface that focuses on speed and accessibility across all device types."
      ],
      tags: ['React', 'Tailwind CSS']
    },
    {
      title: "Resume Generator",
      type: "Web Application",
      tech: "TypeScript, Shadcn, ReactJS",
      date: "January 2025",
      link: "https://resume.nowhile.com",
      icon: "layout",
      description: "A responsive resume generator web application using React, TypeScript, and Tailwind CSS.",
      bullets: [
        "Developed a responsive resume generator web application using React, TypeScript, and Tailwind CSS to enable users to create professional resumes with an intuitive interface and real-time preview functionality.",
        "Implemented dynamic form validation and state management to ensure data integrity while allowing users to customize resume sections, formatting, and styling options seamlessly.",
        "Designed a component-based architecture with reusable UI elements and modular TypeScript interfaces to maintain code scalability and type safety throughout the application.",
        "Deployed the application on Vercel with optimized build configuration and responsive design principles, ensuring cross-device compatibility and fast loading times for enhanced user experience."
      ],
      tags: ['TypeScript', 'Shadcn', 'ReactJS']
    },
    {
      title: "P2P File Transfer app",
      type: "Web Application",
      tech: "HTML, CSS, Javascript",
      date: "January 2025",
      link: "https://file.nowhile.com",
      icon: "server",
      description: "A peer-to-peer file transfer application using vanilla JavaScript.",
      bullets: [
        "Developed a peer-to-peer file transfer application using vanilla JavaScript that enables secure file sharing between users after establishing a direct connection.",
        "Implemented real-time chat functionality alongside file transfer capabilities, allowing users to communicate seamlessly during the file sharing process.",
        "Built connection management system with vanilla JavaScript to handle peer-to-peer networking and ensure reliable data transmission between connected users."
      ],
      tags: ['HTML', 'CSS', 'Javascript']
    },
    {
      title: "QR Code Generator",
      type: "Web Application",
      tech: "React, Typescript, Tailwind CSS",
      date: "March 2025",
      link: "https://qr.nowhile.com",
      icon: "smartphone",
      description: "A versatile QR code generator using React, TypeScript, and Tailwind CSS.",
      bullets: [
        "Built a versatile QR code generator using React, TypeScript, and Tailwind CSS supporting multiple data types including URLs, text, location coordinates, dates, and business contact information.",
        "Implemented 10+ types of dynamic QR code generation with real-time preview functionality, allowing users to instantly visualize and customize QR codes for various use cases.",
        "Designed responsive user interface with input validation and error handling to ensure seamless QR code creation across different devices and screen sizes."
      ],
      tags: ['React', 'Typescript', 'Tailwind CSS']
    }
  ];
}
