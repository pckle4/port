import {
  siTypescript,
  siJavascript,
  siReact,
  siNodedotjs,
  siPostgresql,
  siMongodb,
  siTailwindcss,
  siDocker,
  siGit,
  siGithub,
  siPython,
  siHtml5,
  siCss,
  siNextdotjs,
  siVercel,
  siVite,
  siFigma,
  siApachekafka,
  siNginx,
  siGraphql,
  siRedis,
  siDotnet,
  siKubernetes,
  siLinux,
  siAndroid
} from 'simple-icons';

export type SimpleIcon = { title: string; slug: string; hex: string; path: string; };

export const slugToIcon: Record<string, SimpleIcon> = {
  typescript: siTypescript as any,
  javascript: siJavascript as any,
  react: siReact as any,
  nodedotjs: siNodedotjs as any,
  postgresql: siPostgresql as any,
  mongodb: siMongodb as any,
  tailwindcss: siTailwindcss as any,
  docker: siDocker as any,
  git: siGit as any,
  github: siGithub as any,
  python: siPython as any,
  html5: siHtml5 as any,
  css3: siCss as any,
  nextdotjs: siNextdotjs as any,
  vercel: siVercel as any,
  vite: siVite as any,
  figma: siFigma as any,
  apachekafka: siApachekafka as any,
  nginx: siNginx as any,
  graphql: siGraphql as any,
  redis: siRedis as any,
  dotnet: siDotnet as any,
  kubernetes: siKubernetes as any,
  linux: siLinux as any,
  android: siAndroid as any,
};

export function hexToRgb(hex: string): [number, number, number] {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  const n = parseInt(hex, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function luminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function contrastRatio(hex1: string, hex2: string): number {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  const l1 = luminance(r1, g1, b1);
  const l2 = luminance(r2, g2, b2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const renderCache = new Map<string, { src: string; title: string }>();

export function renderIconDataUri(icon: SimpleIcon, theme: string): { src: string; title: string } {
  const cacheKey = `${icon.slug}-${theme}`;
  if (renderCache.has(cacheKey)) {
    return renderCache.get(cacheKey)!;
  }

  const bgHex = theme === 'light' ? '#f6efe6' : '#181310';
  const fallbackHex = theme === 'light' ? '#5d7486' : '#f3ece2';
  const minContrastRatio = theme === 'dark' ? 2 : 1.2;
  const originalHex = '#' + icon.hex;
  const isAccessible = contrastRatio(bgHex, originalHex) > minContrastRatio;
  
  const [r, g, b] = hexToRgb(isAccessible ? originalHex : fallbackHex);
  const size = 40;
  
  const src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" style="fill: rgb(${r}, ${g}, ${b});" viewBox="0 0 24 24" height="${size}px" width="${size}px"><title>${encodeURIComponent(icon.title)}</title><path d="${icon.path}"></path></svg>`;
  
  const result = { src, title: icon.title };
  renderCache.set(cacheKey, result);
  return result;
}