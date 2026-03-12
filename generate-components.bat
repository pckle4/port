@echo off
rmdir /S /Q src\app\components
mkdir src\app\components\ui

call npx ng g c components/ui/button --skip-tests
call npx ng g d components/ui/card --skip-tests
call npx ng g d components/ui/card-header --skip-tests
call npx ng g d components/ui/card-title --skip-tests
call npx ng g d components/ui/card-description --skip-tests
call npx ng g d components/ui/card-content --skip-tests
call npx ng g d components/ui/card-footer --skip-tests

call npx ng g c components/ui/magic-loader --skip-tests
call npx ng g c components/ui/badge --skip-tests
call npx ng g d components/ui/input --skip-tests
call npx ng g d components/ui/textarea --skip-tests
call npx ng g c components/ui/separator --skip-tests
call npx ng g c components/ui/spinner --skip-tests

call npx ng g c components/ui/section-skeleton --skip-tests
call npx ng g c components/ui/bone --skip-tests

call npx ng g c components/ui/toast-item --skip-tests
call npx ng g c components/ui/toast-provider --skip-tests

call npx ng g c components/ui/navbar --skip-tests
call npx ng g c components/ui/nav-body --skip-tests
call npx ng g c components/ui/navbar-logo --skip-tests
call npx ng g c components/ui/mobile-nav --skip-tests
call npx ng g c components/ui/mobile-nav-header --skip-tests
call npx ng g c components/ui/mobile-nav-toggle --skip-tests
call npx ng g c components/ui/mobile-nav-menu --skip-tests

call npx ng g c components/about-section --skip-tests
call npx ng g c components/tech-orbit --skip-tests
call npx ng g c components/enhanced-footer --skip-tests
call npx ng g c components/enhanced-system-info --skip-tests
