export interface PortfolioAboutProfile {
  readonly eyebrow: string;
  readonly heading: string;
  readonly introduction: string;
  readonly story: string;
  readonly roles: readonly string[];
}

export const PORTFOLIO_ABOUT_PROFILE: PortfolioAboutProfile = {
  eyebrow: '01 / About',
  heading: 'I learn by building things people can actually use.',
  introduction:
    'I’m Ansh Shah, a technical student and software builder. I’m drawn to the space where clear thinking, practical code, and thoughtful interfaces meet.',
  story:
    'I enjoy taking an idea from its early, messy stage and turning it into something useful—solving the technical problem, shaping a smoother user flow, and refining the details that make a product easier to understand.',
  roles: [
    'Technical student',
    'Web product builder',
    'Learning through projects',
    'Open to collaboration',
  ],
};
