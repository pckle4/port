export interface SocialLink {
  icon: string;
  href: string;
  color: string;
  label: string;
}

export interface HeroData {
  name: string;
  dynamicWords: string[];
  socials: SocialLink[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
  icon: string;
}

export interface SiteData {
  hero: HeroData;
  skillCategories: SkillCategory[];
  cloudIcons: string[];
}
