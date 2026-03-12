import { Component, OnInit, OnDestroy, ElementRef, PLATFORM_ID, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { EnhancedFooterComponent } from '../../components/enhanced-footer/enhanced-footer';
import { CardComponent } from '../../components/ui/card/card';
import { CardContentComponent } from '../../components/ui/card-content/card-content';

interface ResumeProject {
  title: string;
  tech: string;
  date: string;
  link: string;
  points: string[];
  icon: string;
}

interface ResumeExperience {
  company: string;
  role: string;
  duration: string;
  location: string;
  points: string[];
}

interface ResumeLeadership {
  title: string;
  role: string;
  org: string;
  date: string;
  points: string[];
}

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, EnhancedFooterComponent, CardComponent, CardContentComponent],
  templateUrl: './resume.html',
  styleUrls: ['./resume.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResumeComponent implements OnInit, OnDestroy {
  isVisible = false;
  downloadState: 'idle' | 'downloading' | 'done' = 'idle';

  resumeData = {
    personalInfo: {
      name: "Ansh Shah",
      email: "ansh@nowhile.com",
      linkedin: "linkedin.com/in/anshshahh",
      github: "github.com/theanshshah",
    },
    education: {
      institution: "Sardar Vallabhbhai Patel Institute of Technology, Vasad",
      degree: "Bachelor of Engineering in Computer Engineering",
      duration: "Sep. 2022 – Jun 2026",
      location: "Vadodara, Gujarat",
    },
    coursework: [
      "Data Structures",
      "Algorithms Analysis",
      "Database Management",
      "OOP",
      "Computer Networks",
      "DBMS",
      "OS",
      "Computer Architecture",
    ],
    experience: [
      {
        company: "MRI Software",
        role: "Software Engineering Intern",
        duration: "Jan 2026 – Present",
        location: "India",
        points: [
          "Developing and maintaining enterprise-grade property management solutions using Java Spring Boot microservices and Angular frontend applications, contributing to scalable payment processing workflows.",
          "Collaborating with cross-functional engineering teams to design RESTful APIs, implement business logic layers, and optimize database queries for high-throughput transaction processing.",
        ],
      },
    ] as ResumeExperience[],
    technicalSkills: {
      languages: "Java, C, C#, HTML/CSS, JavaScript, TypeScript, C++, SQL",
      tools: "VS Code, Eclipse, Android Studio, Git, Docker, Kubernetes",
      technologies: "Linux, GitHub, WordPress, React, Node.js, .NET, Next.js",
    },
    projects: [
      {
        title: "Link File Sharing",
        tech: "React, Tailwind CSS",
        date: "November 2025",
        link: "https://l.nowhile.com",
        icon: "globe",
        points: [
          "Architected a lightweight, frontend-only file sharing solution using React and Tailwind CSS, completely eliminating the need for backend infrastructure or external databases.",
          "Implemented secure client-side logic to handle file processing and link generation, ensuring user data privacy and instant performance without server latency.",
          "Designed a minimalist, highly responsive user interface that focuses on speed and accessibility across all device types.",
        ],
      },
      {
        title: "Resume Generator",
        tech: "TypeScript, Shadcn, ReactJS",
        date: "January 2025",
        link: "https://resume.nowhile.com",
        icon: "layout",
        points: [
          "Developed a responsive resume generator web application using React, TypeScript, and Tailwind CSS to enable users to create professional resumes with an intuitive interface and real-time preview functionality.",
          "Implemented dynamic form validation and state management to ensure data integrity while allowing users to customize resume sections, formatting, and styling options seamlessly.",
          "Designed a component-based architecture with reusable UI elements and modular TypeScript interfaces to maintain code scalability and type safety throughout the application.",
          "Deployed the application on Vercel with optimized build configuration and responsive design principles, ensuring cross-device compatibility and fast loading times for enhanced user experience.",
        ],
      },
      {
        title: "P2P File Transfer app",
        tech: "HTML, CSS, Javascript",
        date: "January 2025",
        link: "https://file.nowhile.com",
        icon: "server",
        points: [
          "Developed a peer-to-peer file transfer application using vanilla JavaScript that enables secure file sharing between users after establishing a direct connection.",
          "Implemented real-time chat functionality alongside file transfer capabilities, allowing users to communicate seamlessly during the file sharing process.",
          "Built connection management system with vanilla JavaScript to handle peer-to-peer networking and ensure reliable data transmission between connected users.",
        ],
      },
      {
        title: "QR Code Generator",
        tech: "React, Typescript, Tailwind CSS",
        date: "March 2025",
        link: "https://qr.nowhile.com",
        icon: "smartphone",
        points: [
          "Built a versatile QR code generator using React, TypeScript, and Tailwind CSS supporting multiple data types including URLs, text, location coordinates, dates, and business contact information.",
          "Implemented 10+ types of dynamic QR code generation with real-time preview functionality, allowing users to instantly visualize and customize QR codes for various use cases.",
          "Designed responsive user interface with input validation and error handling to ensure seamless QR code creation across different devices and screen sizes.",
        ],
      },
    ] as ResumeProject[],
    leadership: [
      {
        title: "MECIA Hacks",
        role: "Technical Head",
        org: "SVIT",
        date: "Sep 2024",
        points: [
          "Served as Tech Head for MECIA Hacks, leading frontend development and overseeing technical implementation of event management systems. Managed Over 250+ Students overall.",
          "Developed QR code-based attendance tracking system with scanner functionality to automatically log participant check-ins and check-outs.",
          "Maintained comprehensive attendance records and participant data through automated QR code scanning integration.",
        ],
      },
    ] as ResumeLeadership[],
  };

  private platformId = inject(PLATFORM_ID);
  private el = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);
  private observer?: IntersectionObserver;

  splitSkills(str: string): string[] {
    return str.split(',').map(s => s.trim());
  }

  splitTechTags(tech: string): string[] {
    return tech.split(',').map(t => t.trim());
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.isVisible = true;
            this.cdr.markForCheck();
            this.observer?.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      this.observer.observe(this.el.nativeElement);
    }
  }

  async handleDownload() {
    if (this.downloadState !== 'idle') return;

    this.downloadState = 'downloading';
    this.cdr.markForCheck();

    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Ansh_Shah_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    await new Promise(resolve => setTimeout(resolve, 800));
    this.downloadState = 'done';
    this.cdr.markForCheck();

    await new Promise(resolve => setTimeout(resolve, 2000));
    this.downloadState = 'idle';
    this.cdr.markForCheck();
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
