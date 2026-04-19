# Universal Frontend Skills.md for Modern UI Engineering v3.0
## Enhanced with LLM Anti-Hallucination Framework and Memory-Efficient Frontend Reference Architecture

> CRITICAL AI INSTRUCTION: This document defines explicit frontend constraints and file contracts. Before generating UI code, validate against the Frontend Reference Map and Theme File Contract below. Do not invent visual decisions that are not defined by tokens, theme files, and accessibility rules.

---

## Part 0 - LLM Anti-Hallucination Framework (READ FIRST)

### 0.1 Frontend Reference Map [MEMORY-EFFICIENT GRAPH]
```yaml
frontend_project_structure:
  design_system:
    path: "src/design-system/"
    stability: HIGHEST
    contents:
      tokens:
        path: "tokens/"
        files:
          - "core.tokens.json"
          - "semantic.tokens.json"
          - "typography.tokens.json"
          - "spacing.tokens.json"
          - "radius.tokens.json"
          - "elevation.tokens.json"
          - "motion.tokens.json"
          - "z-index.tokens.json"
      themes:
        path: "themes/"
        required_files:
          - "theme.contract.json"
          - "light.theme.css"
          - "dark.theme.css"
          - "high-contrast.theme.css"
          - "brand-override.theme.css"
          - "motion-safe.theme.css"
          - "motion-reduced.theme.css"
        validation:
          - "all semantic tokens must exist in every required theme file"
          - "components must consume semantic tokens only"
          - "no hardcoded theme attributes in component styles"
      components:
        path: "components/"
        required_for_each_component:
          - "ComponentName.tsx"
          - "ComponentName.module.css"
          - "ComponentName.test.tsx"
          - "ComponentName.stories.tsx"
          - "ComponentName.a11y.spec.tsx"
      patterns:
        path: "patterns/"
        description: "compositions for common product sections"
  ui:
    path: "src/ui/"
    stability: MEDIUM
    contents:
      layouts: "page-level structures"
      navigation: "global and local navigation systems"
      surfaces: "cards, panels, drawers, modals, sheets"
      states: "loading, empty, error, offline"
  features:
    path: "src/features/"
    stability: LOW
    description: "feature-specific views, state, and interactions"
  styles:
    path: "src/styles/"
    files:
      - "globals.css"
      - "reset.css"
      - "utilities.css"
      - "layers.css"
  accessibility:
    path: "src/accessibility/"
    files:
      - "focus-manager.ts"
      - "announcer.ts"
      - "keyboard-map.ts"
      - "skip-links.ts"
  animations:
    path: "src/animations/"
    files:
      - "micro-interactions.ts"
      - "page-transitions.ts"
      - "scroll-reveal.ts"
      - "loading-transitions.ts"
      - "reduced-motion.ts"
  observability:
    path: "src/observability/"
    files:
      - "web-vitals.ts"
      - "ui-errors.ts"
      - "interaction-metrics.ts"
```

### 0.2 Frontend Constraints Matrix [VALIDATION CHECKPOINTS]
```json
{
  "frontend_constraints": {
    "theme_policy": {
      "required_theme_files": [
        "theme.contract.json",
        "light.theme.css",
        "dark.theme.css",
        "high-contrast.theme.css",
        "brand-override.theme.css"
      ],
      "rules": [
        "No hardcoded theme values in component styles.",
        "All themes must map the same semantic token keys.",
        "Themes must include focus, surface, border, text, and status semantics.",
        "Theme switching must not cause unreadable states.",
        "Theme output must support keyboard and reduced-motion contexts."
      ]
    },
    "token_policy": {
      "required_groups": [
        "surface",
        "text",
        "border",
        "interactive",
        "status",
        "typography",
        "spacing",
        "radius",
        "elevation",
        "motion"
      ],
      "rules": [
        "Use semantic tokens in component styles.",
        "No random spacing values outside defined scale.",
        "No custom motion curves outside token set.",
        "No one-off radius and shadow values in production components."
      ]
    },
    "accessibility_policy": {
      "requirements": [
        "Keyboard-only flow for critical tasks.",
        "Visible focus indicators for all interactive elements.",
        "Accessible names for controls.",
        "State communication beyond color alone.",
        "AA contrast minimum for text and controls."
      ]
    },
    "performance_policy": {
      "requirements": [
        "Declare route-level rendering strategy.",
        "Define budgets for JS, CSS, and media assets.",
        "Control layout shift through reserved dimensions.",
        "Use GPU-friendly animation properties."
      ]
    }
  }
}
```

### 0.3 AI Response Format Protocol for Frontend
```xml
<FrontendResponseProtocol>
  <Requirement>Every AI response proposing UI code MUST include:</Requirement>
  <Section name="Assumptions">
    <Description>Explicit assumptions with confidence level.</Description>
  </Section>
  <Section name="ValidationAgainstReferenceMap">
    <Description>Explain alignment with frontend structure and theme file contracts.</Description>
  </Section>
  <Section name="ThemeFilesUsed">
    <Description>List required theme files and where semantic tokens are consumed.</Description>
  </Section>
  <Section name="TokenUsage">
    <Description>Identify token groups used by the proposal.</Description>
  </Section>
  <Section name="InteractionAndMotion">
    <Description>Define hover, focus, active, loading, and reduced-motion behavior.</Description>
  </Section>
  <Section name="AccessibilityPlan">
    <Description>Keyboard support, ARIA guidance, and focus management details.</Description>
  </Section>
  <Section name="ResponsivePlan">
    <Description>Behavior at narrow, medium, and wide container sizes.</Description>
  </Section>
  <Section name="PerformancePlan">
    <Description>Bundle, rendering, and animation impact notes.</Description>
  </Section>
  <Section name="RollbackPlan">
    <Description>How to disable the change safely with feature flags or scoped revert.</Description>
  </Section>
</FrontendResponseProtocol>
```

---

## Part 1 - Foundations and Decision Frameworks

## Purpose
- This file is frontend-specific and project-agnostic.
- It enforces consistent theme architecture through required theme files.
- It standardizes UI quality across design, accessibility, performance, and maintainability.
- It is optimized for human teams and LLM workflows.

## How To Use With LLMs
- Step 1: Share the relevant part and constraints before asking for UI work.
- Step 2: Include product type, audience, brand tone, and device priorities.
- Step 3: Require alignment with theme files and semantic tokens.
- Step 4: Require accessibility behavior for keyboard, touch, and screen readers.
- Step 5: Require responsive and reduced-motion behavior before approval.
- Step 6: Require performance and rollback notes in every substantial UI change.
- Step 7: Keep card format consistent so outputs stay repeatable every time.

## Senior Frontend Defaults
- Default 01: Token-first, never value-first.
- Default 02: Semantic theme tokens over raw style constants.
- Default 03: All visual states are explicit: default, hover, focus, active, disabled, loading.
- Default 04: Every interactive component has keyboard support.
- Default 05: Every dynamic component has empty, loading, and error handling.
- Default 06: Layout rules use grid for macro, flex for micro alignment.
- Default 07: Prefer container queries for reusable component behavior.
- Default 08: Avoid one-off style values in production components.
- Default 09: Use accessible semantic elements before ARIA patches.
- Default 10: Respect reduced-motion users by default.
- Default 11: Ensure focus order follows reading order.
- Default 12: Never hide focus without replacement.
- Default 13: Frontend performance is a product feature.
- Default 14: Reserve dimensions to prevent layout shifts.
- Default 15: Use image strategy intentionally per route.
- Default 16: Use progressive enhancement where feasible.
- Default 17: Avoid library bloat for simple interactions.
- Default 18: Enforce CSS cascade control via layers.
- Default 19: Keep typography scale consistent across components.
- Default 20: Keep spacing scale consistent across all surfaces.
- Default 21: Build systemized icon usage, not ad hoc imports.
- Default 22: Use component composition over duplication.
- Default 23: Keep route-level code splitting intentional.
- Default 24: Validate forms with clear inline guidance.
- Default 25: Keep chart and data visuals token-driven and readable.
- Default 26: Use feature flags for risky frontend changes.
- Default 27: Document design rationale, not only styles.
- Default 28: Treat dark mode and high contrast as first-class.
- Default 29: Avoid visual regressions with automated checks.
- Default 30: Keep edge cases visible in stories and tests.
- Default 31: Treat empty states as product guidance opportunities.
- Default 32: Keep error states recoverable and actionable.
- Default 33: Keep motion purposeful, not decorative noise.
- Default 34: Keep theme switching fast and stable.
- Default 35: Keep system predictable under slow network conditions.
- Default 36: Ensure touch targets are usable on small screens.
- Default 37: Ensure component APIs remain ergonomic and strict.
- Default 38: Prioritize clarity over visual novelty in critical flows.
- Default 39: Maintain a stable structure so outputs are repeatable every time.
- Default 40: Quality is complete only when UX, accessibility, and performance align.

## Decision Algorithm (Use In Complex Frontend Scenarios)
- Phase 01: Define user task and success metric.
- Phase 02: Define required product tone and interaction density.
- Phase 03: Identify critical states (normal, loading, empty, error, offline).
- Phase 04: Map required theme files and token groups.
- Phase 05: Choose layout primitives and responsive strategy.
- Phase 06: Choose interaction model (form, browse, compare, configure).
- Phase 07: Define component boundaries and reuse opportunities.
- Phase 08: Define accessibility requirements per interaction.
- Phase 09: Define motion and reduced-motion pair.
- Phase 10: Create minimal implementation slice.
- Phase 11: Add tests for behavior and a11y.
- Phase 12: Add stories for variants and edge states.
- Phase 13: Add performance measurement hooks.
- Phase 14: Validate on mobile, tablet, desktop.
- Phase 15: Validate keyboard-only critical path.
- Phase 16: Validate theme switching and contrast.
- Phase 17: Ship behind controlled rollout.
- Phase 18: Monitor vitals, errors, and completion rates.
- Phase 19: Fix regressions quickly using rollback boundaries.
- Phase 20: Document decisions for future consistency.

## Frontend Excellence Guardrails
- Guardrail 01: Theme files are required and versioned.
- Guardrail 02: Components consume semantic tokens only.
- Guardrail 03: No hardcoded theme-specific style values in components.
- Guardrail 04: No missing interaction states on clickable elements.
- Guardrail 05: No inaccessible custom controls.
- Guardrail 06: No animation without reduced-motion alternative.
- Guardrail 07: No overflow traps on narrow containers.
- Guardrail 08: No content shifts from late-loading media.
- Guardrail 09: No unbounded third-party scripts in critical routes.
- Guardrail 10: No unknown visual hierarchy for key actions.
- Guardrail 11: No unreadable states in dark/high-contrast themes.
- Guardrail 12: No hidden error details for recoverable failures.
- Guardrail 13: No ambiguous success feedback after form submit.
- Guardrail 14: No brittle component APIs requiring style overrides.
- Guardrail 15: No one-off shadows, radii, or spacing values.
- Guardrail 16: No typography scale drift between pages.
- Guardrail 17: No inaccessible modal focus behavior.
- Guardrail 18: No untested keyboard navigation in menus and dialogs.
- Guardrail 19: No degraded UX without fallback on unsupported features.
- Guardrail 20: No production release without visual regression checks.

## Competency Matrix
### Competency: Theme Architecture
- Foundational: maps semantic tokens to required theme files consistently.
- Intermediate: ships reliable theme switching and stable fallback behavior.
- Advanced: scales theme architecture across products without drift.
- Principal: defines governance and migration paths for theme evolution.
- Growth signal: can explain token contracts clearly to design and engineering.
- Risk signal: hardcoded values keep returning in component styles.

### Competency: Component Systems
- Foundational: builds reusable components with clear props and states.
- Intermediate: composes patterns instead of duplicating page-specific UI.
- Advanced: creates extensible components with minimal override pressure.
- Principal: defines and enforces component lifecycle governance.
- Growth signal: component APIs stay stable while features evolve.
- Risk signal: repeated variants implemented as copy-pasted components.

### Competency: Accessibility Engineering
- Foundational: delivers keyboard-friendly controls and focus visibility.
- Intermediate: manages complex widgets with semantic/ARIA correctness.
- Advanced: leads accessibility audits and closes systemic gaps.
- Principal: makes accessibility a default quality gate.
- Growth signal: accessibility issues are caught before QA.
- Risk signal: accessibility fixes appear only after incidents.

### Competency: Motion and Interaction
- Foundational: uses motion tokens for state clarity.
- Intermediate: coordinates interaction and reduced-motion alternatives.
- Advanced: designs motion systems that improve cognition at scale.
- Principal: defines motion governance with measurable outcomes.
- Growth signal: transitions improve task confidence.
- Risk signal: motion feels inconsistent or distracting.

### Competency: Responsive Systems
- Foundational: builds mobile-first layouts with predictable behavior.
- Intermediate: uses container-driven adaptation for reusable components.
- Advanced: manages complex responsive shells without breakage.
- Principal: sets adaptive strategy standards across teams.
- Growth signal: components work in any placement context.
- Risk signal: component behavior tied to page-specific assumptions.

### Competency: Performance Thinking
- Foundational: tracks core vitals and avoids obvious regressions.
- Intermediate: optimizes route payload and render cost by design.
- Advanced: balances UX richness with strict budgets.
- Principal: runs performance governance and release standards.
- Growth signal: performance is discussed in design and implementation.
- Risk signal: performance work is postponed until post-release.

### Competency: Frontend Testing
- Foundational: writes behavior-focused unit/component tests.
- Intermediate: integrates visual regression and a11y checks.
- Advanced: creates resilient test strategy with low flake rate.
- Principal: drives test architecture aligned to risk.
- Growth signal: defects are prevented by tests, not detected late.
- Risk signal: tests assert implementation details over behavior.

### Competency: Frontend Observability
- Foundational: captures UI errors and core vitals.
- Intermediate: maps user interaction events to product outcomes.
- Advanced: correlates UI health with business metrics.
- Principal: builds observability standards and incident response loops.
- Growth signal: dashboards drive improvements.
- Risk signal: metrics exist but do not drive decisions.

## Reusable Checklists
### Theme Contract Review
- Check 01: `theme.contract.json` is present and current.
- Check 02: required theme files exist and load correctly.
- Check 03: semantic token keys match across all theme files.
- Check 04: focus and status token keys are present in all themes.
- Check 05: no missing token fallback in critical components.
- Check 06: no component hardcoding of theme values.
- Check 07: theme switch does not cause unreadable states.
- Check 08: high-contrast theme is validated.
- Check 09: reduced-motion theme behavior is validated.
- Check 10: theme files are versioned and documented.

### Component Review
- Check 01: component API is minimal and explicit.
- Check 02: all states are supported and tested.
- Check 03: component consumes semantic tokens only.
- Check 04: keyboard and screen reader behavior is verified.
- Check 05: stories include edge and failure states.
- Check 06: component includes no dead style branches.
- Check 07: responsive behavior is container-safe.
- Check 08: loading and error states are meaningful.
- Check 09: visual hierarchy supports user task priority.
- Check 10: documentation explains intent and tradeoffs.

### Release Readiness
- Check 01: feature flag is configured for risky changes.
- Check 02: regression tests pass for critical routes.
- Check 03: visual diff checks are reviewed.
- Check 04: a11y checks pass for key workflows.
- Check 05: performance budgets are within limits.
- Check 06: telemetry hooks are live.
- Check 07: rollback boundaries are defined.
- Check 08: on-call owner for UI incidents is assigned.
- Check 09: known risks and mitigations are documented.
- Check 10: post-release monitoring windows are planned.

---

## Part 2 - Frontend Domain Skill Cards

### Skill Card F001: Semantic Token Governance
```yaml
skill_id: F001
domain: Design System
intent: "Keep UI consistent and editable from token sources only."
use_when: "Any new component or page implementation."
avoid_when: "Never in production UI."
signals: "One-off style values, token drift, visual inconsistency."
preferred_approach: "Use semantic token references for every visual attribute."
optimization_lever: "Faster redesigns and lower regression risk."
validation_check: "Can major visual updates be done from token files only?"
common_failure: "Mixing semantic tokens and hardcoded values."
senior_question: "Which token layer should own this decision: core or semantic?"
llm_prompt_starter: "Create a token-only style strategy for a reusable component set."
output_format_request: "Provide token mapping and component consumption rules."
reference_map_alignment: "src/design-system/tokens/"
```

### Skill Card F002: Theme File Contract Enforcement
```yaml
skill_id: F002
domain: Theming
intent: "Guarantee predictable theme behavior through required files."
use_when: "Theme creation, expansion, or migration."
avoid_when: "Never skip contract checks in shipping work."
signals: "Missing keys across themes, broken theme switch."
preferred_approach: "Validate every theme file against theme.contract.json."
optimization_lever: "Prevents runtime style breaks."
validation_check: "Do all required theme files satisfy the same key contract?"
common_failure: "Adding new semantic token keys to one theme only."
senior_question: "How do we enforce contract checks in CI?"
llm_prompt_starter: "Define a strict validation process for frontend theme files."
output_format_request: "Provide CI-friendly validation rules and failure cases."
reference_map_alignment: "src/design-system/themes/"
```

### Skill Card F003: Theme Switching Architecture
```yaml
skill_id: F003
domain: Theming
intent: "Support stable runtime theme switching."
use_when: "Products with light, dark, or accessibility themes."
avoid_when: "Static brand sites with single immutable theme."
signals: "Flash during theme change, unreadable intermediate states."
preferred_approach: "Apply theme at root and switch semantic layers atomically."
optimization_lever: "Lower repaint instability."
validation_check: "Is switch behavior instant and readable across key surfaces?"
common_failure: "Theme switch updates only partial token groups."
senior_question: "How is persisted theme preference restored safely on first paint?"
llm_prompt_starter: "Design a theme switch flow with stable first-paint behavior."
output_format_request: "Provide state flow, fallback logic, and failure handling."
reference_map_alignment: "src/design-system/themes/ and src/styles/globals.css"
```

### Skill Card F004: Typography System Engineering
```yaml
skill_id: F004
domain: Typography
intent: "Create readable hierarchy with system-wide consistency."
use_when: "All interfaces with text content."
avoid_when: "Never avoid in production interfaces."
signals: "Inconsistent heading rhythm and weak information hierarchy."
preferred_approach: "Define type tokens and map roles to components."
optimization_lever: "Faster readability and reduced style entropy."
validation_check: "Can users scan key information quickly without visual strain?"
common_failure: "Too many ad hoc type sizes and weights."
senior_question: "How does type scale adapt across narrow and wide containers?"
llm_prompt_starter: "Create a typography token map for product UI roles."
output_format_request: "Provide role-based type token definitions and usage notes."
reference_map_alignment: "typography.tokens.json and component styles"
```

### Skill Card F005: Spacing and Layout Rhythm
```yaml
skill_id: F005
domain: Layout
intent: "Keep rhythm predictable across pages and components."
use_when: "Any structured UI surface."
avoid_when: "Never skip spacing scale in reusable components."
signals: "Misaligned blocks and inconsistent white space."
preferred_approach: "Use scale-based spacing tokens and layout primitives."
optimization_lever: "Cleaner layouts with fewer visual corrections."
validation_check: "Do spacing decisions follow the approved scale only?"
common_failure: "Single-use spacing values introduced under delivery pressure."
senior_question: "Which spacing tokens should be component-level vs layout-level?"
llm_prompt_starter: "Design a spacing strategy for dense and relaxed page modes."
output_format_request: "Provide token mapping and layout usage rules."
reference_map_alignment: "spacing.tokens.json and src/ui/layouts/"
```

### Skill Card F006: Elevation and Surface Semantics
```yaml
skill_id: F006
domain: Visual System
intent: "Express layering and focus through consistent surface semantics."
use_when: "Cards, overlays, drawers, dialogs, sticky surfaces."
avoid_when: "Flat one-layer content pages."
signals: "Visual hierarchy confusion in stacked UI."
preferred_approach: "Use elevation tokens by semantic layer purpose."
optimization_lever: "Reduces ambiguity in depth relationships."
validation_check: "Can users identify primary surface and active layer quickly?"
common_failure: "Random shadow and border combinations."
senior_question: "How does elevation change in high-contrast theme?"
llm_prompt_starter: "Define elevation roles for app shell, cards, and overlays."
output_format_request: "Provide semantic elevation mapping table."
reference_map_alignment: "elevation.tokens.json and theme files"
```

### Skill Card F007: Interaction State Completeness
```yaml
skill_id: F007
domain: UX Interaction
intent: "Ensure every interactive element communicates state clearly."
use_when: "Buttons, links, inputs, toggles, list items."
avoid_when: "Never avoid in interactive interfaces."
signals: "No focus indicator, unclear disabled behavior."
preferred_approach: "Define all interaction states in component contract."
optimization_lever: "Lower error rate and better user confidence."
validation_check: "Are all states visible and test-covered?"
common_failure: "Only hover state implemented."
senior_question: "What is the equivalent state feedback on touch devices?"
llm_prompt_starter: "Specify full interaction state matrix for common controls."
output_format_request: "Provide state table with visual and semantic behavior."
reference_map_alignment: "src/design-system/components/"
```

### Skill Card F008: Accessibility-First Component Patterns
```yaml
skill_id: F008
domain: Accessibility
intent: "Make default components usable for keyboard and assistive tech."
use_when: "All custom UI controls."
avoid_when: "Never."
signals: "Non-semantic controls and inconsistent keyboard behavior."
preferred_approach: "Start with semantic HTML and add ARIA only as needed."
optimization_lever: "Lower rework and fewer accessibility regressions."
validation_check: "Can core tasks be completed without a mouse?"
common_failure: "ARIA roles used without keyboard handling."
senior_question: "Where are live region announcements required?"
llm_prompt_starter: "Create an accessibility contract for reusable controls."
output_format_request: "Provide keyboard map, ARIA notes, and testing checklist."
reference_map_alignment: "src/accessibility/ and component specs"
```

### Skill Card F009: Form UX and Validation Architecture
```yaml
skill_id: F009
domain: Forms
intent: "Reduce friction and improve successful form completion."
use_when: "Signup, checkout, profile, workflow forms."
avoid_when: "Read-only pages."
signals: "Generic errors and late failure feedback."
preferred_approach: "Validate progressively and provide field-level guidance."
optimization_lever: "Higher completion rates and lower abandonment."
validation_check: "Are error messages specific, recoverable, and timely?"
common_failure: "Validation only on submit with weak error guidance."
senior_question: "How is server validation merged with client feedback?"
llm_prompt_starter: "Design a robust form state and validation strategy."
output_format_request: "Provide state model and error presentation rules."
reference_map_alignment: "src/features/*/forms and design-system/Form"
```

### Skill Card F010: Navigation Clarity and IA
```yaml
skill_id: F010
domain: Navigation
intent: "Make route hierarchy and user location obvious."
use_when: "Any multi-route product."
avoid_when: "Single-task one-page experiences."
signals: "Users lose orientation after route changes."
preferred_approach: "Use clear current-state cues and predictable nav patterns."
optimization_lever: "Lower navigation error and task completion time."
validation_check: "Can users identify current location in one glance?"
common_failure: "Inconsistent active-state treatment across nav components."
senior_question: "How do navigation patterns adapt between desktop and mobile?"
llm_prompt_starter: "Create a navigation architecture for complex route trees."
output_format_request: "Provide IA map and responsive nav behavior."
reference_map_alignment: "src/ui/navigation/"
```

### Skill Card F011: Data Table Usability
```yaml
skill_id: F011
domain: Data UX
intent: "Support scanning, filtering, sorting, and selection at scale."
use_when: "Admin and analytics interfaces."
avoid_when: "Small static content lists."
signals: "Table overwhelm and poor action discoverability."
preferred_approach: "Use sticky headers, clear controls, and progressive detail."
optimization_lever: "Faster task execution in dense workflows."
validation_check: "Can users complete common table actions quickly?"
common_failure: "Overloading each row with too many inline actions."
senior_question: "What actions are primary vs contextual?"
llm_prompt_starter: "Design a high-usability data table interaction model."
output_format_request: "Provide behavior states for sort/filter/select/paginate."
reference_map_alignment: "src/features/*/tables and design-system/Table"
```

### Skill Card F012: Loading State Strategy
```yaml
skill_id: F012
domain: Async UX
intent: "Reduce uncertainty while data or views load."
use_when: "Any delayed network or computation flow."
avoid_when: "Instant render-only screens."
signals: "Blank screens or spinner-only waiting patterns."
preferred_approach: "Use context-shaped skeletons and progressive hydration."
optimization_lever: "Improved perceived performance."
validation_check: "Do users understand what is loading and why?"
common_failure: "Skeleton shape does not match final content structure."
senior_question: "What loading state best preserves layout stability?"
llm_prompt_starter: "Define loading strategies for list, detail, and dashboard views."
output_format_request: "Provide state map and component treatment guide."
reference_map_alignment: "src/animations/loading-transitions.ts"
```

### Skill Card F013: Empty State Design
```yaml
skill_id: F013
domain: UX States
intent: "Turn zero-data moments into guided next steps."
use_when: "Filters, dashboards, lists, and first-run flows."
avoid_when: "None."
signals: "Empty screens with no recovery action."
preferred_approach: "Offer explanation, action path, and confidence-building copy."
optimization_lever: "Lower user drop-off in first-use scenarios."
validation_check: "Does empty state guide users toward meaningful progress?"
common_failure: "Vague messaging with no obvious next action."
senior_question: "Is this empty state expected, temporary, or error-like?"
llm_prompt_starter: "Create structured empty state patterns by scenario type."
output_format_request: "Provide copy strategy and CTA rules."
reference_map_alignment: "src/ui/states/empty/"
```

### Skill Card F014: Error Recovery UX
```yaml
skill_id: F014
domain: UX States
intent: "Help users recover from failure quickly and safely."
use_when: "Network, validation, and permission errors."
avoid_when: "Never ignore recoverable error flows."
signals: "Dead-end messages and unclear retry behavior."
preferred_approach: "Provide cause hint, retry path, fallback path, and support path."
optimization_lever: "Improved trust and reduced support burden."
validation_check: "Can users recover without leaving the workflow?"
common_failure: "Technical error text without user action guidance."
senior_question: "Which errors require escalation vs inline recovery?"
llm_prompt_starter: "Design error messaging and recovery for async operations."
output_format_request: "Provide severity matrix and action guidance."
reference_map_alignment: "src/ui/states/error/"
```

### Skill Card F015: Motion System Orchestration
```yaml
skill_id: F015
domain: Motion
intent: "Use motion to reinforce hierarchy and state change."
use_when: "Route transitions, overlays, and dynamic content entry."
avoid_when: "High-density flows where motion harms scan speed."
signals: "Abrupt transitions and cognitive disconnect."
preferred_approach: "Define shared motion tokens and context-specific patterns."
optimization_lever: "Higher interaction clarity with lower user effort."
validation_check: "Does motion add clarity without delaying tasks?"
common_failure: "Same easing and timing used for all interactions."
senior_question: "What motion is essential vs decorative?"
llm_prompt_starter: "Define a motion grammar for common product interactions."
output_format_request: "Provide timing/easing matrix by interaction type."
reference_map_alignment: "motion.tokens.json and src/animations/"
```

### Skill Card F016: Reduced Motion Compliance
```yaml
skill_id: F016
domain: Accessibility
intent: "Respect motion sensitivity while retaining clarity."
use_when: "Any animated UI."
avoid_when: "Never."
signals: "No reduced-motion adaptation for transitions."
preferred_approach: "Provide alternate transitions with minimal displacement."
optimization_lever: "Inclusive UX with fewer accessibility complaints."
validation_check: "Is all essential content usable with reduced-motion enabled?"
common_failure: "Disabling animation without preserving state clarity."
senior_question: "Which animations are essential semantic transitions?"
llm_prompt_starter: "Create reduced-motion alternatives for a motion-rich flow."
output_format_request: "Provide normal and reduced behavior mapping."
reference_map_alignment: "motion-reduced.theme.css and reduced-motion.ts"
```

### Skill Card F017: Container Query Responsiveness
```yaml
skill_id: F017
domain: Responsive
intent: "Make components adapt to context, not only viewport."
use_when: "Reusable cards, panels, and composite blocks."
avoid_when: "Single-placement components."
signals: "Component breaks when moved between layouts."
preferred_approach: "Set container context and adapt internal layout by width bands."
optimization_lever: "Greater component portability."
validation_check: "Does component remain usable across container sizes?"
common_failure: "Viewport media queries only."
senior_question: "What is the minimum viable width for this component?"
llm_prompt_starter: "Design a container-responsive component strategy."
output_format_request: "Provide adaptation rules and fallback notes."
reference_map_alignment: "src/design-system/components/*.module.css"
```

### Skill Card F018: Information Hierarchy for Scan Speed
```yaml
skill_id: F018
domain: UX
intent: "Help users find priority information quickly."
use_when: "Dashboards, pricing, workflow-heavy screens."
avoid_when: "Minimal single-message pages."
signals: "Users miss important actions or data."
preferred_approach: "Use hierarchy via layout, typography, and spacing roles."
optimization_lever: "Reduced cognitive load and faster task completion."
validation_check: "Can primary action and key context be found in seconds?"
common_failure: "Equal visual weight assigned to all content blocks."
senior_question: "What must users notice first, second, third?"
llm_prompt_starter: "Create hierarchy rules for a dense workflow screen."
output_format_request: "Provide priority map and structural layout guidance."
reference_map_alignment: "src/ui/layouts and patterns"
```

### Skill Card F019: Icon System Consistency
```yaml
skill_id: F019
domain: Visual Language
intent: "Use iconography as a consistent semantic aid."
use_when: "Action controls, status indicators, navigation."
avoid_when: "Decorative overuse that hurts clarity."
signals: "Mixed stroke styles and ambiguous meaning."
preferred_approach: "Use a controlled icon wrapper with strict size/weight rules."
optimization_lever: "Improves scan speed and UI consistency."
validation_check: "Do icons convey meaning clearly at standard sizes?"
common_failure: "Direct ad hoc icon imports without system controls."
senior_question: "Which icons are decorative vs informational?"
llm_prompt_starter: "Define icon usage standards for product UI."
output_format_request: "Provide icon sizing and accessibility rules."
reference_map_alignment: "src/design-system/components/Icon"
```

### Skill Card F020: Chart Readability Standards
```yaml
skill_id: F020
domain: Data Visualization
intent: "Ensure charts remain readable across themes and densities."
use_when: "Any KPI or trend visualization."
avoid_when: "Text-only reporting pages."
signals: "Unreadable axes, weak contrast, or confusing encodings."
preferred_approach: "Use token-bound chart roles and clear annotation hierarchy."
optimization_lever: "Higher comprehension with lower interpretation errors."
validation_check: "Can users answer key chart questions quickly?"
common_failure: "Over-complex chart types for simple comparisons."
senior_question: "What decision should this chart accelerate?"
llm_prompt_starter: "Define chart style and semantics using frontend tokens."
output_format_request: "Provide chart role map and accessibility notes."
reference_map_alignment: "src/features/*/charts and token files"
```

### Skill Card F021: Image and Media Pipeline
```yaml
skill_id: F021
domain: Performance
intent: "Deliver media quickly without layout instability."
use_when: "Any image-rich or media-assisted UI."
avoid_when: "Text-only products."
signals: "Late reflow and heavy route payloads."
preferred_approach: "Use responsive media, reserved dimensions, and priority mapping."
optimization_lever: "Improved LCP and reduced CLS."
validation_check: "Are key media assets optimized by route priority?"
common_failure: "Single oversized source for all viewport conditions."
senior_question: "Which media is critical for first meaningful paint?"
llm_prompt_starter: "Create a media loading strategy for mixed content screens."
output_format_request: "Provide priority and fallback matrix."
reference_map_alignment: "src/lib/media and component media wrappers"
```

### Skill Card F022: Route-Level Performance Budgeting
```yaml
skill_id: F022
domain: Performance
intent: "Control route cost and protect interaction latency."
use_when: "All production routes."
avoid_when: "Never."
signals: "Slow initial load and delayed interaction readiness."
preferred_approach: "Assign route budgets and track compliance in CI."
optimization_lever: "Prevents silent payload growth."
validation_check: "Are route budgets defined and enforced?"
common_failure: "No ownership of route payload drift."
senior_question: "What budget guardrails should block merges?"
llm_prompt_starter: "Define performance budgets by route type."
output_format_request: "Provide thresholds and enforcement strategy."
reference_map_alignment: "build config and observability/web-vitals.ts"
```

### Skill Card F023: Code Splitting and Progressive Hydration
```yaml
skill_id: F023
domain: Performance
intent: "Load only what users need when they need it."
use_when: "Complex apps with many routes and features."
avoid_when: "Tiny apps where splitting overhead outweighs gains."
signals: "Large boot payload and delayed first interaction."
preferred_approach: "Split by route and defer non-critical feature bundles."
optimization_lever: "Faster time-to-interactive."
validation_check: "Do critical interactions become ready quickly on slow devices?"
common_failure: "Over-splitting causing excessive network chatter."
senior_question: "Which modules are always-needed vs conditional?"
llm_prompt_starter: "Design code-splitting plan for multi-feature frontend."
output_format_request: "Provide split map and preload strategy."
reference_map_alignment: "routing and feature module boundaries"
```

### Skill Card F024: Frontend Caching and Revalidation
```yaml
skill_id: F024
domain: Data Fetching
intent: "Keep data fresh while maintaining responsive UX."
use_when: "Data-driven routes with repeat visits."
avoid_when: "Strictly real-time-only views."
signals: "Frequent refetch jank and stale critical data."
preferred_approach: "Define stale windows and predictable revalidation triggers."
optimization_lever: "Lower network cost and smoother interactions."
validation_check: "Do users see reliable data without constant loading flicker?"
common_failure: "Aggressive revalidation causing noisy UI."
senior_question: "Which data must be live vs eventually consistent?"
llm_prompt_starter: "Design caching and revalidation rules for dashboard data."
output_format_request: "Provide freshness policy and UI state behavior."
reference_map_alignment: "src/lib/data and feature query hooks"
```

### Skill Card F025: Storybook-Driven UI Validation
```yaml
skill_id: F025
domain: Workflow
intent: "Validate component behavior in isolation early."
use_when: "Any shared or reusable component work."
avoid_when: "Throwaway internal spikes."
signals: "Behavior issues discovered late in integration."
preferred_approach: "Use stories for states, variants, and edge cases."
optimization_lever: "Faster review cycles and fewer regressions."
validation_check: "Does each component have state-complete stories?"
common_failure: "Stories include only happy path."
senior_question: "Which edge state is most likely to regress?"
llm_prompt_starter: "Create story coverage strategy for a shared component library."
output_format_request: "Provide story matrix by state and viewport."
reference_map_alignment: "design-system/components/*.stories.tsx"
```

### Skill Card F026: Visual Regression Governance
```yaml
skill_id: F026
domain: Quality
intent: "Catch unintended UI changes before release."
use_when: "Any component or layout change."
avoid_when: "Never on high-impact surfaces."
signals: "Unexpected diffs discovered after deployment."
preferred_approach: "Baseline critical views and gate risky diffs."
optimization_lever: "Reduced production UI incidents."
validation_check: "Are critical route snapshots protected and reviewed?"
common_failure: "Ignoring non-trivial visual diffs as noise."
senior_question: "Which pages need strict diff thresholds?"
llm_prompt_starter: "Define visual regression policy for frontend releases."
output_format_request: "Provide priority tiers and gate rules."
reference_map_alignment: "CI config and story/test setup"
```

### Skill Card F027: Frontend Error Boundaries and Recovery
```yaml
skill_id: F027
domain: Reliability
intent: "Prevent full-screen crashes from local component failures."
use_when: "Complex feature surfaces and third-party integrations."
avoid_when: "None."
signals: "Single component crash breaks entire route."
preferred_approach: "Use scoped boundaries with contextual recovery actions."
optimization_lever: "Reduced user-impact blast radius."
validation_check: "Can users continue key tasks after local failures?"
common_failure: "Global fallback only with no localized recovery."
senior_question: "Where should boundaries be placed by risk?"
llm_prompt_starter: "Design boundary strategy for complex frontend routes."
output_format_request: "Provide boundary map and recovery behavior."
reference_map_alignment: "src/ui/surfaces and feature shells"
```

### Skill Card F028: Telemetry and UX Signals
```yaml
skill_id: F028
domain: Observability
intent: "Measure UI health and user outcome impact."
use_when: "Any production release."
avoid_when: "Never skip telemetry on critical flows."
signals: "No visibility into interaction success/failure."
preferred_approach: "Track vitals, errors, retries, and completion funnels."
optimization_lever: "Data-driven prioritization of UI improvements."
validation_check: "Can we detect regressions within hours of release?"
common_failure: "Metrics tracked without actionable ownership."
senior_question: "Which event directly maps to user value?"
llm_prompt_starter: "Define telemetry model for a multi-step user journey."
output_format_request: "Provide event list, naming, and dashboard linkage."
reference_map_alignment: "src/observability/"
```

### Skill Card F029: Internationalization-Ready UI
```yaml
skill_id: F029
domain: Localization
intent: "Ensure UI supports text expansion and alternate directions."
use_when: "Products with multilingual roadmap."
avoid_when: "Single-language prototypes with no expansion plans."
signals: "Broken layouts on longer localized strings."
preferred_approach: "Use flexible layouts, tokenized spacing, and safe text containers."
optimization_lever: "Fewer rework cycles during localization rollout."
validation_check: "Do key routes hold up under expanded labels?"
common_failure: "Fixed-width controls with truncated critical labels."
senior_question: "Which flows must support bidirectional layouts first?"
llm_prompt_starter: "Create i18n-resilient UI layout rules."
output_format_request: "Provide layout and text overflow strategy."
reference_map_alignment: "component layout rules and string system"
```

### Skill Card F030: Frontend Rollout and Rollback Strategy
```yaml
skill_id: F030
domain: Release Management
intent: "Ship safely and recover quickly if regressions appear."
use_when: "High-impact UI changes."
avoid_when: "Never skip for critical workflows."
signals: "No practical rollback path for frontend changes."
preferred_approach: "Use feature flags, scoped rollouts, and revert boundaries."
optimization_lever: "Reduced incident impact and faster stabilization."
validation_check: "Can risky UI features be disabled without full redeploy?"
common_failure: "Coupling multiple risky changes behind one flag."
senior_question: "What rollback trigger thresholds should be pre-defined?"
llm_prompt_starter: "Define rollout and rollback plan for a major frontend update."
output_format_request: "Provide phased rollout, monitors, and rollback triggers."
reference_map_alignment: "release config, feature flags, and observability"
```

### Skill Cards F031 through F090 (same structure and fields)
```yaml
skill_card_index:
  - { id: F031, title: "CSS Layering Governance" }
  - { id: F032, title: "Design Token Migration Playbook" }
  - { id: F033, title: "Composable Layout Regions" }
  - { id: F034, title: "Advanced Form Accessibility" }
  - { id: F035, title: "Search and Filter UX" }
  - { id: F036, title: "Dense Mobile Data Patterns" }
  - { id: F037, title: "Command Palette Interaction Model" }
  - { id: F038, title: "Inline Edit UX Safeguards" }
  - { id: F039, title: "Multi-Step Workflow Design" }
  - { id: F040, title: "Notification and Toast Semantics" }
  - { id: F041, title: "Dialog and Drawer Interaction Rules" }
  - { id: F042, title: "Feature Discovery and Onboarding UX" }
  - { id: F043, title: "Permission-aware UI States" }
  - { id: F044, title: "Offline-first UI Patterns" }
  - { id: F045, title: "Draft and Autosave Interactions" }
  - { id: F046, title: "Selection and Bulk Action UX" }
  - { id: F047, title: "Card System Semantics" }
  - { id: F048, title: "Empty Search Recovery UX" }
  - { id: F049, title: "Pagination vs Infinite Scroll Rules" }
  - { id: F050, title: "Contextual Help Placement" }
  - { id: F051, title: "Input Masking and Formatting" }
  - { id: F052, title: "Secure Frontend Data Handling" }
  - { id: F053, title: "Client-side Permission Boundaries" }
  - { id: F054, title: "Audit-friendly UI Flows" }
  - { id: F055, title: "Animation Performance Profiling" }
  - { id: F056, title: "Route Transition System Design" }
  - { id: F057, title: "Event Naming Taxonomy for UX" }
  - { id: F058, title: "Skeleton Personalization Patterns" }
  - { id: F059, title: "Micro-copy Consistency Rules" }
  - { id: F060, title: "Validation Severity Mapping" }
  - { id: F061, title: "Role-based Dashboard Composition" }
  - { id: F062, title: "Trust Signals in Conversion UI" }
  - { id: F063, title: "Checkout Friction Reduction" }
  - { id: F064, title: "Portfolio and Case Study UI Patterns" }
  - { id: F065, title: "Settings IA and Preference UX" }
  - { id: F066, title: "Accessibility Regression Prevention" }
  - { id: F067, title: "Visual Debt Reduction Playbook" }
  - { id: F068, title: "Token Drift Monitoring" }
  - { id: F069, title: "Brand Override Governance" }
  - { id: F070, title: "Motion Budget Governance" }
  - { id: F071, title: "Layout Stability Playbook" }
  - { id: F072, title: "Front-end Incident Response UX" }
  - { id: F073, title: "Runtime Feature Flag UX Handling" }
  - { id: F074, title: "Progressive Disclosure Patterns" }
  - { id: F075, title: "AI-assisted Interface Safety Rules" }
  - { id: F076, title: "Frontend Release Notes Standards" }
  - { id: F077, title: "Component Deprecation Lifecycle" }
  - { id: F078, title: "Cross-platform Design Parity" }
  - { id: F079, title: "Adaptive Density Modes" }
  - { id: F080, title: "Theme Audit Automation" }
  - { id: F081, title: "Dashboard Narrative Flow" }
  - { id: F082, title: "Task-focused Landing UX" }
  - { id: F083, title: "Enterprise Table Ergonomics" }
  - { id: F084, title: "Frontend Security Header UX Impact" }
  - { id: F085, title: "Visual Accessibility at Scale" }
  - { id: F086, title: "Design Review Calibration" }
  - { id: F087, title: "Cross-team Frontend Governance" }
  - { id: F088, title: "Theme Migration Rollout" }
  - { id: F089, title: "Token Naming Standards" }
  - { id: F090, title: "Long-term Frontend Maintainability" }
```

---

## Part 3 - Advanced Playbooks, Prompts, and Continuous Improvement

### Advanced Scenario Playbooks (Enhanced with AI Constraints)
```json
{
  "frontend_playbooks": [
    {
      "id": "FPB-001",
      "title": "High-conversion product landing",
      "objective": "Improve conversion while preserving clarity and trust.",
      "inputs": ["Audience profile", "Value proposition", "Theme contract", "Content hierarchy"],
      "execution": "Ship hero, proof, pricing, and FAQ in measurable slices.",
      "verification": "Track CTA rate, scroll depth, and form completion.",
      "ai_constraint": "Use semantic tokens and required theme files only."
    },
    {
      "id": "FPB-002",
      "title": "Enterprise analytics dashboard",
      "objective": "Increase scan speed and action confidence in dense data surfaces.",
      "inputs": ["Primary KPIs", "User role matrix", "Theme contract", "Latency profile"],
      "execution": "Implement prioritized KPI row, filters, table, and detail drilldowns.",
      "verification": "Measure time-to-insight and task completion rate.",
      "ai_constraint": "No visual ambiguity between information priority levels."
    },
    {
      "id": "FPB-003",
      "title": "Workflow-heavy form modernization",
      "objective": "Reduce completion friction and recoverable error rate.",
      "inputs": ["Field inventory", "Validation policy", "Accessibility requirements"],
      "execution": "Roll out field groups, inline guidance, and staged validation.",
      "verification": "Track abandonment points and validation retries.",
      "ai_constraint": "All fields must expose keyboard and assistive feedback."
    },
    {
      "id": "FPB-004",
      "title": "Theme migration for existing product",
      "objective": "Adopt strict theme contract without breaking current UI.",
      "inputs": ["Current token map", "Legacy style usage report", "Theme file plan"],
      "execution": "Migrate by component tier and enforce CI theme checks.",
      "verification": "Measure visual diff stability and escaped hardcoded value count.",
      "ai_constraint": "No component-level hardcoded theme values allowed after migration."
    },
    {
      "id": "FPB-005",
      "title": "Accessibility hardening sprint",
      "objective": "Raise frontend accessibility maturity quickly.",
      "inputs": ["Audit findings", "Critical user flows", "Assistive tech matrix"],
      "execution": "Fix semantic structures, keyboard traps, and focus consistency first.",
      "verification": "Track critical flow completion for keyboard-only testing.",
      "ai_constraint": "No release if high-severity accessibility issues remain."
    }
  ]
}
```

### LLM Collaboration Prompts (Machine-Readable)
```xml
<PromptFamilies>
  <Family name="ThemeContract">
    <Prompt id="1">Validate this UI plan against required theme files and token groups.</Prompt>
    <Prompt id="2">List all semantic token dependencies before generating component code.</Prompt>
    <Prompt id="3">Provide migration-safe fallback behavior for unsupported themes.</Prompt>
  </Family>
  <Family name="ComponentDesign">
    <Prompt id="1">Propose 3 component API options with tradeoffs.</Prompt>
    <Prompt id="2">Include full state model: default, hover, focus, active, disabled, loading, error.</Prompt>
    <Prompt id="3">Show accessibility and keyboard behavior before code output.</Prompt>
  </Family>
  <Family name="ResponsiveUX">
    <Prompt id="1">Define container-based behavior at narrow, medium, and wide sizes.</Prompt>
    <Prompt id="2">List risks for overflow and truncation in localized content.</Prompt>
    <Prompt id="3">Provide fallback behavior for constrained environments.</Prompt>
  </Family>
  <Family name="Performance">
    <Prompt id="1">Estimate route impact and propose budget-compliant implementation.</Prompt>
    <Prompt id="2">List render, bundle, and media optimizations with expected effect.</Prompt>
    <Prompt id="3">Provide guardrails to prevent regressions in future changes.</Prompt>
  </Family>
  <Family name="QualityGate">
    <Prompt id="1">Generate release checklist for this frontend change.</Prompt>
    <Prompt id="2">Map tests to risk areas and critical workflows.</Prompt>
    <Prompt id="3">Define rollback triggers and monitoring windows.</Prompt>
  </Family>
</PromptFamilies>
```

### Anti-Patterns To Avoid (Categorized for Frontend LLMs)
```json
{
  "anti_patterns": [
    { "id": "FAP-001", "name": "Hardcoded theme values in components", "detection": "Raw style values repeated in component files" },
    { "id": "FAP-002", "name": "Missing theme keys between files", "detection": "Theme contract validation fails" },
    { "id": "FAP-003", "name": "Token bypass via inline styles", "detection": "Theme-sensitive inline style attributes in JSX" },
    { "id": "FAP-004", "name": "State-incomplete controls", "detection": "No focus/disabled/loading definitions" },
    { "id": "FAP-005", "name": "Mouse-only interaction model", "detection": "Keyboard flow cannot complete task" },
    { "id": "FAP-006", "name": "Spinner-only loading UX", "detection": "No contextual skeletons or progress clues" },
    { "id": "FAP-007", "name": "Dead-end error states", "detection": "No retry or fallback actions" },
    { "id": "FAP-008", "name": "Container-unaware components", "detection": "Breaks when moved to narrow surfaces" },
    { "id": "FAP-009", "name": "Typography drift across pages", "detection": "Inconsistent text role mapping" },
    { "id": "FAP-010", "name": "Spacing scale violations", "detection": "Ad hoc spacing values in component styles" },
    { "id": "FAP-011", "name": "Unbounded animation usage", "detection": "Frequent long transitions across UI" },
    { "id": "FAP-012", "name": "No reduced-motion path", "detection": "Animations ignore reduced motion preferences" },
    { "id": "FAP-013", "name": "Poor route payload hygiene", "detection": "Bundle size growth without budgets" },
    { "id": "FAP-014", "name": "Unstable theme switching", "detection": "Theme change causes unreadable transient states" },
    { "id": "FAP-015", "name": "Visual regression blind spots", "detection": "Critical views not covered by snapshot strategy" },
    { "id": "FAP-016", "name": "Non-semantic custom controls", "detection": "Div-based controls with missing roles/handlers" },
    { "id": "FAP-017", "name": "Inconsistent icon language", "detection": "Mixed icon families and stroke styles" },
    { "id": "FAP-018", "name": "No route-level fallback states", "detection": "Unhandled network and permission failures" },
    { "id": "FAP-019", "name": "Feature rollout without guardrails", "detection": "No flagging and no rollback plan" },
    { "id": "FAP-020", "name": "Documentation gap", "detection": "No rationale for UI decisions and tradeoffs" }
  ]
}
```

### Interview-Grade Self Checks
```json
{
  "self_checks": [
    { "id": "FSC-01", "question": "Can this UI be re-themed by editing only required theme files?" },
    { "id": "FSC-02", "question": "Can users complete the primary workflow using keyboard only?" },
    { "id": "FSC-03", "question": "Can this change be rolled back quickly without redeploying everything?" },
    { "id": "FSC-04", "question": "Can this component adapt cleanly to narrow containers?" },
    { "id": "FSC-05", "question": "Can this route load and interact smoothly on slower devices?" },
    { "id": "FSC-06", "question": "Can users recover from each error state without confusion?" },
    { "id": "FSC-07", "question": "Can we detect UI regression from telemetry within hours?" },
    { "id": "FSC-08", "question": "Can this component be understood and reused by another engineer quickly?" },
    { "id": "FSC-09", "question": "Can this motion be understood as meaningful, not decorative?" },
    { "id": "FSC-10", "question": "Can this design remain clear under high-contrast and reduced-motion settings?" }
  ]
}
```

## Appendix: Continuous Frontend Growth Loop
```yaml
continuous_growth_loop:
  - step: 1
    action: "Collect recurring UI defects and user friction points."
  - step: 2
    action: "Convert repeated issues into explicit frontend standards."
  - step: 3
    action: "Automate standards in linting, tests, and CI checks."
  - step: 4
    action: "Document examples in component stories and playbooks."
  - step: 5
    action: "Measure outcome metrics per release cycle."
  - step: 6
    action: "Remove standards that do not improve user outcomes."
  - step: 7
    action: "Upgrade theme contract and token governance quarterly."
  - step: 8
    action: "Run focused review sessions for accessibility and performance."

reflection_prompts:
  - id: "FRP-0001"
    text: "Which part of the UI is hardest to maintain and why?"
  - id: "FRP-0002"
    text: "Which user flow has the highest friction right now?"
  - id: "FRP-0003"
    text: "Where is theme consistency most likely to break next?"
  - id: "FRP-0004"
    text: "Which UI decision created the most hidden complexity?"
  - id: "FRP-0005"
    text: "Which one quality gate, if strengthened, would reduce the most regressions?"
```

---

**END OF UNIVERSAL FRONTEND SKILLS.MD v3.0**
*This document is structured to stay consistent every time: fixed sections, fixed card schema, required theme files, and explicit anti-hallucination constraints.*
