const fs = require('fs');
const { execSync } = require('child_process');

try {
  fs.rmSync('src/app/components', { recursive: true, force: true });
} catch (e) {
  console.error("Failed to remove dir:", e.message);
}

const components = [
  'components/ui/button',
  'components/ui/magic-loader',
  'components/ui/badge',
  'components/ui/separator',
  'components/ui/spinner',
  'components/ui/section-skeleton',
  'components/ui/bone',
  'components/ui/toast-item',
  'components/ui/toast-provider',
  'components/ui/navbar',
  'components/ui/nav-body',
  'components/ui/navbar-logo',
  'components/ui/mobile-nav',
  'components/ui/mobile-nav-header',
  'components/ui/mobile-nav-toggle',
  'components/ui/mobile-nav-menu',
  'components/about-section',
  'components/tech-orbit',
  'components/enhanced-footer',
  'components/enhanced-system-info',
];

const directives = [
  'components/ui/card',
  'components/ui/card-header',
  'components/ui/card-title',
  'components/ui/card-description',
  'components/ui/card-content',
  'components/ui/card-footer',
  'components/ui/input',
  'components/ui/textarea',
];

const opts = { stdio: 'inherit', env: { ...process.env, NG_CLI_ANALYTICS: 'false' } };

for (const c of components) {
  console.log(`Generating ${c}...`);
  execSync(`npm run ng -- g c ${c} --skip-tests`, opts);
}
for (const d of directives) {
  console.log(`Generating directive ${d}...`);
  execSync(`npm run ng -- g d ${d} --skip-tests`, opts);
}
