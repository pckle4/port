```markdown
# Universal Skills.md for Senior Software Development v2.0
## Enhanced with LLM Anti-Hallucination Framework & Memory-Efficient Reference Architecture

> **CRITICAL AI INSTRUCTION**: This document contains explicit constraints and reference maps. Before generating any code or suggestion, you MUST validate against the Codebase Reference Map and Domain Constraints Matrix below. Do NOT hallucinate patterns that contradict this project's explicit architecture decisions. If information is missing, request it from the user instead of inventing defaults. The sections formatted as YAML, JSON, or XML are machine-readable; parse them to extract project-specific rules.

---

## Part 0 - LLM Anti-Hallucination Framework (READ FIRST)

### 0.1 Codebase Reference Map [MEMORY-EFFICIENT GRAPH]
```yaml
# This graph defines the expected structure and constraints of the codebase.
# AI MUST reference this map before proposing any file creation or modification.
# Use this as a single source of truth for project layout.
project_structure:
  domain_core:
    path: "src/domain/"
    stability: HIGHEST
    contents:
      entities:
        description: "Core business objects with identity"
        immutability: "Where possible, use readonly properties"
        contracts: "Defined in ./entities/index.ts"
      value_objects:
        description: "Self-validating types (Email, Money, etc.)"
        validation: "Constructor throws on invalid state"
      aggregates:
        description: "Transaction and consistency boundaries"
        rule: "One aggregate per transaction"
      domain_events:
        description: "Significant occurrences within the domain"
        schema_registry: "src/domain/events/schema-registry.ts"
  application:
    path: "src/application/"
    stability: MEDIUM
    contents:
      commands:
        description: "Write operations"
        idempotency: "REQUIRED - use idempotency keys"
      queries:
        description: "Read operations"
        caching_strategy: "TTL: 60s, invalidation on related command"
      handlers:
        description: "Orchestration logic for use cases"
  infrastructure:
    path: "src/infrastructure/"
    stability: LOWEST
    contents:
      persistence:
        description: "Database adapters"
        schema_version: "v3.2.1"
        migration_tool: "Flyway/Liquibase"
      messaging:
        description: "Event bus implementation"
        retry_policy: "Exponential backoff, max 3 attempts"
      external:
        description: "Third-party API clients"
        timeout_ms: 5000
        circuit_breaker: "Enabled, 50% failure threshold"
  interface:
    path: "src/interface/"
    stability: "CONTRACT"
    contents:
      rest:
        openapi_spec_version: "3.0.3"
        error_shape: "{ code: string, message: string, traceId: string }"
      graphql:
        schema_hash: "sha256:abc123..."
      events:
        schema_registry_url: "https://schema-registry.internal"
  tests:
    path: "tests/"
    pyramid_target:
      unit: "70%"
      integration: "20%"
      contract: "5%"
      e2e: "5% (critical paths only)"
    forbidden_patterns:
      - "E2E tests for non-critical flows"
      - "Mocking across bounded contexts"
```

### 0.2 Domain Constraints Matrix [VALIDATION CHECKPOINTS]
```json
{
  "domain_constraints": [
    {
      "domain": "UserManagement",
      "bounded_context": "Identity",
      "data_ownership": "Team Auth",
      "api_contract_version": "v2.1.0",
      "migration_strategy": "Expand and contract",
      "rollback_sla_minutes": 5
    },
    {
      "domain": "OrderProcessing",
      "bounded_context": "Fulfillment",
      "data_ownership": "Team Checkout",
      "api_contract_version": "v1.4.2",
      "migration_strategy": "Two-phase commit with outbox",
      "rollback_sla_minutes": 10
    },
    {
      "domain": "Catalog",
      "bounded_context": "Product",
      "data_ownership": "Team Merch",
      "api_contract_version": "v3.0.1",
      "migration_strategy": "Blue-green with feature flag",
      "rollback_sla_minutes": 2
    }
  ],
  "cross_cutting_constraints": {
    "authentication": "OAuth2/OIDC with JWT validation at gateway",
    "authorization": "RBAC enforced at service layer, not only gateway",
    "data_retention": "PII deleted after 90 days of account closure",
    "latency_budget_p95_ms": 500,
    "error_budget_monthly": "0.1% of requests"
  }
}
```

### 0.3 AI Response Format Protocol
```xml
<ResponseProtocol>
  <Requirement>Every AI response that proposes code or architecture MUST include:</Requirement>
  <Section name="Assumptions">
    <Description>Explicit list of assumptions made, with confidence level (High/Medium/Low)</Description>
  </Section>
  <Section name="ValidationAgainstReferenceMap">
    <Description>How the proposal aligns with the Codebase Reference Map above</Description>
  </Section>
  <Section name="Tradeoffs">
    <Description>At least two alternative approaches considered with pros/cons</Description>
  </Section>
  <Section name="ImplementationSlice">
    <Description>Smallest shippable unit that delivers value and can be rolled back</Description>
  </Section>
  <Section name="ObservabilitySignals">
    <Description>Metrics, logs, traces to monitor success/failure</Description>
  </Section>
  <Section name="RollbackPlan">
    <Description>Step-by-step rollback procedure, including feature flag toggle</Description>
  </Section>
</ResponseProtocol>
```

---

## Part 1 - Foundations and Decision Frameworks

## Purpose
- This file is project-agnostic and designed for use with any web, backend, data, or platform initiative.
- It captures senior-level decision logic: what to do, when to do it, and what to avoid.
- It is optimized for LLM ingestion: stable headings, repeatable patterns, and explicit tradeoffs.
- Use it as a baseline playbook, then add domain-specific constraints for each new project.

## How To Use With LLMs
- Step 1: Paste relevant section headers before asking for implementation help.
- Step 2: Provide constraints: timeline, budget, scale, compliance, team skill, and risk tolerance.
- Step 3: Ask for options with tradeoff tables, not single-shot answers.
- Step 4: Require an assumption list and a validation plan for every major proposal.
- Step 5: Require tests, monitoring, rollback, and migration plans before calling work done.
- Step 6: Capture decisions in ADR format so later work remains coherent.
- Step 7: Feed the document in chunks if context window is limited (for example ~500 lines per request).

## Senior Engineering Defaults
- Default 01: Optimize for correctness first, then simplicity, then performance.
- Default 02: Design for change: requirements drift faster than code ages.
- Default 03: Prefer boring technology unless clear measurable value exists.
- Default 04: Keep architecture explainable in one whiteboard session.
- Default 05: Delete complexity aggressively; complexity compounds interest.
- Default 06: Observe before optimizing; optimize before scaling.
- Default 07: Use explicit contracts between components and teams.
- Default 08: Fail fast for invalid input, fail safe for uncertain state.
- Default 09: Make invisible quality visible through metrics and alerts.
- Default 10: Automate repetitive risk, not only repetitive effort.
- Default 11: Protect focus by slicing work into reviewable increments.
- Default 12: Move critical decisions earlier, irreversible decisions slower.
- Default 13: Use feature flags for risk management, not permanent branching.
- Default 14: Prefer immutable events for auditability and debugging.
- Default 15: Treat data lifecycle as product behavior, not ops cleanup.
- Default 16: Accessibility is part of quality, not a later enhancement.
- Default 17: Security controls should be built-in and testable.
- Default 18: Testing strategy should mirror risk distribution.
- Default 19: Release strategy should mirror blast radius.
- Default 20: Document why, not only what.
- Default 21: Choose clarity over cleverness in critical paths.
- Default 22: Keep operational readiness part of definition of done.
- Default 23: Reward maintainability, not heroics.
- Default 24: Measure outcomes, not output volume.
- Default 25: Assume incidents will happen; design graceful degradation.
- Default 26: Reduce hidden dependencies before adding new features.
- Default 27: Focus on reversible decisions when uncertainty is high.
- Default 28: Build trust through predictable delivery cadence.
- Default 29: Treat migration strategy as first-class design work.
- Default 30: Keep user trust as a non-negotiable engineering requirement.

## Decision Algorithm (Use In Complex Scenarios)
- Phase 01: Clarify objective in one sentence with a measurable outcome.
- Phase 02: Define non-negotiable constraints (legal, budget, timeline, reliability).
- Phase 03: List stakeholders and what failure means for each stakeholder.
- Phase 04: Map current system boundaries, ownership, and coupling hotspots.
- Phase 05: Estimate impact surface: data, API, UX, infra, security, operations.
- Phase 06: Generate at least three options: conservative, balanced, aggressive.
- Phase 07: For each option, estimate cost, complexity, risk, and reversibility.
- Phase 08: Eliminate options that violate hard constraints.
- Phase 09: Select approach with best risk-adjusted value, not novelty.
- Phase 10: Define implementation slices that ship value early.
- Phase 11: Define observability requirements before coding.
- Phase 12: Define rollback strategy before release.
- Phase 13: Define test plan proportional to risk.
- Phase 14: Run pre-mortem: list top five ways this can fail.
- Phase 15: Add guardrails for each failure mode.
- Phase 16: Execute incrementally with checkpoints.
- Phase 17: Measure outcomes vs baseline and decide continue, adjust, or stop.
- Phase 18: Document decision and learned constraints for future reuse.

## Web Excellence Guardrails
- Guardrail 01: UX latency budget: meaningful response under 1000 ms for common tasks.
- Guardrail 02: Core web vitals budget must be tracked at release and in production.
- Guardrail 03: Rendering strategy should be explicit per route, not accidental.
- Guardrail 04: Form validation should run client side for usability and server side for trust.
- Guardrail 05: API responses must include stable error shapes and trace identifiers.
- Guardrail 06: Auth boundaries should be explicit in route and service layers.
- Guardrail 07: Caching should declare TTL, invalidation trigger, and consistency expectation.
- Guardrail 08: All user-visible async states need loading, empty, error, and retry treatment.
- Guardrail 09: Every critical workflow needs analytics with event naming standards.
- Guardrail 10: Every production error should be observable with context, not only stack trace.
- Guardrail 11: Accessibility checks should run in CI and manual QA for keyboard flow.
- Guardrail 12: No deployment without rollback procedure and ownership assignment.
- Guardrail 13: Critical forms must protect against duplicate submissions.
- Guardrail 14: Content strategy should define skeleton, empty, and stale states.
- Guardrail 15: Image and asset strategy should respect performance budgets.
- Guardrail 16: Internationalization should be designed before component freeze.
- Guardrail 17: Privacy and consent choices should be explicit and reversible.
- Guardrail 18: Route-level authorization should be independently testable.
- Guardrail 19: Audit trails should exist for high-risk user actions.
- Guardrail 20: Error copy should guide user recovery, not just show failure.

## Competency Matrix
### Competency: System Design
- Foundational: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Intermediate: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Advanced: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Principal: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Growth signal: can explain tradeoffs clearly to non-specialists.
- Risk signal: decisions rely on habit without explicit assumptions.

### Competency: Coding Quality
- Foundational: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Intermediate: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Advanced: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Principal: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Growth signal: can explain tradeoffs clearly to non-specialists.
- Risk signal: decisions rely on habit without explicit assumptions.

### Competency: Debugging
- Foundational: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Intermediate: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Advanced: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Principal: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Growth signal: can explain tradeoffs clearly to non-specialists.
- Risk signal: decisions rely on habit without explicit assumptions.

### Competency: Testing Strategy
- Foundational: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Intermediate: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Advanced: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Principal: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Growth signal: can explain tradeoffs clearly to non-specialists.
- Risk signal: decisions rely on habit without explicit assumptions.

### Competency: Security Thinking
- Foundational: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Intermediate: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Advanced: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Principal: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Growth signal: can explain tradeoffs clearly to non-specialists.
- Risk signal: decisions rely on habit without explicit assumptions.

### Competency: Performance Thinking
- Foundational: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Intermediate: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Advanced: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Principal: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Growth signal: can explain tradeoffs clearly to non-specialists.
- Risk signal: decisions rely on habit without explicit assumptions.

### Competency: Operational Maturity
- Foundational: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Intermediate: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Advanced: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Principal: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Growth signal: can explain tradeoffs clearly to non-specialists.
- Risk signal: decisions rely on habit without explicit assumptions.

### Competency: Product Judgment
- Foundational: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Intermediate: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Advanced: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Principal: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Growth signal: can explain tradeoffs clearly to non-specialists.
- Risk signal: decisions rely on habit without explicit assumptions.

### Competency: Communication
- Foundational: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Intermediate: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Advanced: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Principal: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Growth signal: can explain tradeoffs clearly to non-specialists.
- Risk signal: decisions rely on habit without explicit assumptions.

### Competency: Leadership
- Foundational: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Intermediate: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Advanced: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Principal: expected behavior is measurable, repeatable, and reviewable under delivery pressure.
- Growth signal: can explain tradeoffs clearly to non-specialists.
- Risk signal: decisions rely on habit without explicit assumptions.

## Reusable Checklists
### Architecture Review
- Check 01: Clear bounded context definitions
- Check 02: Explicit ownership map
- Check 03: Data consistency model selected
- Check 04: Failure isolation strategy documented
- Check 05: Scalability assumptions tested
- Check 06: Migration path defined
- Check 07: Technical debt impact assessed
- Check 08: Decision recorded in ADR
- Check 09: Cross-team integration risks identified
- Check 10: Rollback boundaries clarified

### Pull Request Review
- Check 01: Problem statement is clear
- Check 02: Behavioral change is tested
- Check 03: Error handling is explicit
- Check 04: Security implications reviewed
- Check 05: Performance implications reviewed
- Check 06: Observability updates included
- Check 07: Docs updated where needed
- Check 08: Rollback path is feasible
- Check 09: Naming and abstractions support readability
- Check 10: Change scope matches declared intent

### Release Readiness
- Check 01: Feature flags configured
- Check 02: Database migrations are reversible
- Check 03: Dashboards and alerts ready
- Check 04: On-call owner assigned
- Check 05: Runbook updated
- Check 06: Canary or phased rollout planned
- Check 07: Communication plan prepared
- Check 08: Success and failure metrics defined
- Check 09: Capacity headroom confirmed
- Check 10: Known risks documented with owners

### Incident Response
- Check 01: Severity assessed quickly
- Check 02: Stakeholder updates scheduled
- Check 03: Temporary mitigation in place
- Check 04: Root cause evidence collected
- Check 05: Customer impact quantified
- Check 06: Permanent fix planned
- Check 07: Postmortem scheduled
- Check 08: Action items assigned with owners
- Check 09: Follow-up checks scheduled
- Check 10: Runbook improvements captured

### Testing Readiness
- Check 01: Critical paths covered
- Check 02: Contract tests for integrations
- Check 03: Regression tests for bug fixes
- Check 04: Load profile evaluated
- Check 05: Security tests applied
- Check 06: Accessibility checks run
- Check 07: Flaky tests addressed
- Check 08: Coverage gaps documented with risk
- Check 09: Test data strategy defined
- Check 10: CI runtime budget reviewed

### Production Hardening
- Check 01: Rate limits verified
- Check 02: Timeouts standardized
- Check 03: Circuit breakers reviewed
- Check 04: Retry strategy documented
- Check 05: Secrets rotation policy active
- Check 06: Access controls audited
- Check 07: Data retention policy enforced
- Check 08: Backups and restore tested
- Check 09: Disaster recovery path validated
- Check 10: Synthetic checks enabled

## Part 2 - Domain Skill Cards

- Format note: each card includes use conditions, anti-pattern warnings, and LLM-ready prompts.
- Skill cards are intentionally repetitive so LLMs can pattern-match quickly under context limits.
- **NEW**: Each card now includes a `reference_map_alignment` field that AI must validate against Part 0.

### Skill Card 001: Bounded Context Mapping
```yaml
skill_id: 001
domain: Architecture
intent: "Shape system boundaries that reduce coupling and future rework."
use_when: "Requirements are evolving, teams are growing, or reliability constraints are increasing."
avoid_when: "Problem is tiny and change frequency is low; avoid over-architecting."
signals: "Frequent cross-module breakage, unclear ownership, hard-to-explain flows."
preferred_approach: "Model domain boundaries, define contracts, record ADRs, and stage migration seams."
optimization_lever: "Minimize cross-boundary chatty calls and hidden shared state."
validation_check: "Can two engineers modify adjacent modules without conflict most of the time?"
common_failure: "Abstract layers with no measurable payoff or ownership."
senior_question: "What part of this design stays stable if product priorities change next quarter?"
llm_prompt_starter: "Propose 3 architecture options with explicit coupling and migration tradeoffs. for topic 'Bounded Context Mapping' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "ALIGN with domain_core/aggregates and bounded context definitions in Codebase Reference Map."
```

### Skill Card 002: Architecture Decision Records
```yaml
skill_id: 002
domain: Architecture
intent: "Shape system boundaries that reduce coupling and future rework."
use_when: "Requirements are evolving, teams are growing, or reliability constraints are increasing."
avoid_when: "Problem is tiny and change frequency is low; avoid over-architecting."
signals: "Frequent cross-module breakage, unclear ownership, hard-to-explain flows."
preferred_approach: "Model domain boundaries, define contracts, record ADRs, and stage migration seams."
optimization_lever: "Minimize cross-boundary chatty calls and hidden shared state."
validation_check: "Can two engineers modify adjacent modules without conflict most of the time?"
common_failure: "Abstract layers with no measurable payoff or ownership."
senior_question: "What part of this design stays stable if product priorities change next quarter?"
llm_prompt_starter: "Propose 3 architecture options with explicit coupling and migration tradeoffs. for topic 'Architecture Decision Records' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Store ADRs in /docs/decisions/ and reference in Codebase Reference Map domain_constraints."
```

### Skill Card 003: API-First Contracts
```yaml
skill_id: 003
domain: Architecture
intent: "Shape system boundaries that reduce coupling and future rework."
use_when: "Requirements are evolving, teams are growing, or reliability constraints are increasing."
avoid_when: "Problem is tiny and change frequency is low; avoid over-architecting."
signals: "Frequent cross-module breakage, unclear ownership, hard-to-explain flows."
preferred_approach: "Model domain boundaries, define contracts, record ADRs, and stage migration seams."
optimization_lever: "Minimize cross-boundary chatty calls and hidden shared state."
validation_check: "Can two engineers modify adjacent modules without conflict most of the time?"
common_failure: "Abstract layers with no measurable payoff or ownership."
senior_question: "What part of this design stays stable if product priorities change next quarter?"
llm_prompt_starter: "Propose 3 architecture options with explicit coupling and migration tradeoffs. for topic 'API-First Contracts' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Define contracts in interface/rest/openapi_spec.yaml, version according to domain_constraints."
```

### Skill Card 004: Event-Driven Boundaries
```yaml
skill_id: 004
domain: Architecture
intent: "Shape system boundaries that reduce coupling and future rework."
use_when: "Requirements are evolving, teams are growing, or reliability constraints are increasing."
avoid_when: "Problem is tiny and change frequency is low; avoid over-architecting."
signals: "Frequent cross-module breakage, unclear ownership, hard-to-explain flows."
preferred_approach: "Model domain boundaries, define contracts, record ADRs, and stage migration seams."
optimization_lever: "Minimize cross-boundary chatty calls and hidden shared state."
validation_check: "Can two engineers modify adjacent modules without conflict most of the time?"
common_failure: "Abstract layers with no measurable payoff or ownership."
senior_question: "What part of this design stays stable if product priorities change next quarter?"
llm_prompt_starter: "Propose 3 architecture options with explicit coupling and migration tradeoffs. for topic 'Event-Driven Boundaries' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Use domain_core/domain_events with schema registry; implement infrastructure/messaging."
```

### Skill Card 005: Modular Monolith Seams
```yaml
skill_id: 005
domain: Architecture
intent: "Shape system boundaries that reduce coupling and future rework."
use_when: "Requirements are evolving, teams are growing, or reliability constraints are increasing."
avoid_when: "Problem is tiny and change frequency is low; avoid over-architecting."
signals: "Frequent cross-module breakage, unclear ownership, hard-to-explain flows."
preferred_approach: "Model domain boundaries, define contracts, record ADRs, and stage migration seams."
optimization_lever: "Minimize cross-boundary chatty calls and hidden shared state."
validation_check: "Can two engineers modify adjacent modules without conflict most of the time?"
common_failure: "Abstract layers with no measurable payoff or ownership."
senior_question: "What part of this design stays stable if product priorities change next quarter?"
llm_prompt_starter: "Propose 3 architecture options with explicit coupling and migration tradeoffs. for topic 'Modular Monolith Seams' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Apply within domain_core/aggregates, isolate modules with application/handlers."
```

### Skill Card 006: Fault Isolation Zones
```yaml
skill_id: 006
domain: Architecture
intent: "Shape system boundaries that reduce coupling and future rework."
use_when: "Requirements are evolving, teams are growing, or reliability constraints are increasing."
avoid_when: "Problem is tiny and change frequency is low; avoid over-architecting."
signals: "Frequent cross-module breakage, unclear ownership, hard-to-explain flows."
preferred_approach: "Model domain boundaries, define contracts, record ADRs, and stage migration seams."
optimization_lever: "Minimize cross-boundary chatty calls and hidden shared state."
validation_check: "Can two engineers modify adjacent modules without conflict most of the time?"
common_failure: "Abstract layers with no measurable payoff or ownership."
senior_question: "What part of this design stays stable if product priorities change next quarter?"
llm_prompt_starter: "Propose 3 architecture options with explicit coupling and migration tradeoffs. for topic 'Fault Isolation Zones' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Use infrastructure/messaging circuit breakers and separate aggregates per zone."
```

### Skill Card 007: Complexity Budgeting
```yaml
skill_id: 007
domain: Architecture
intent: "Shape system boundaries that reduce coupling and future rework."
use_when: "Requirements are evolving, teams are growing, or reliability constraints are increasing."
avoid_when: "Problem is tiny and change frequency is low; avoid over-architecting."
signals: "Frequent cross-module breakage, unclear ownership, hard-to-explain flows."
preferred_approach: "Model domain boundaries, define contracts, record ADRs, and stage migration seams."
optimization_lever: "Minimize cross-boundary chatty calls and hidden shared state."
validation_check: "Can two engineers modify adjacent modules without conflict most of the time?"
common_failure: "Abstract layers with no measurable payoff or ownership."
senior_question: "What part of this design stays stable if product priorities change next quarter?"
llm_prompt_starter: "Propose 3 architecture options with explicit coupling and migration tradeoffs. for topic 'Complexity Budgeting' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Track via tests/pyramid_target and avoid anti-pattern AP-001."
```

### Skill Card 008: Migration Playbooks
```yaml
skill_id: 008
domain: Architecture
intent: "Shape system boundaries that reduce coupling and future rework."
use_when: "Requirements are evolving, teams are growing, or reliability constraints are increasing."
avoid_when: "Problem is tiny and change frequency is low; avoid over-architecting."
signals: "Frequent cross-module breakage, unclear ownership, hard-to-explain flows."
preferred_approach: "Model domain boundaries, define contracts, record ADRs, and stage migration seams."
optimization_lever: "Minimize cross-boundary chatty calls and hidden shared state."
validation_check: "Can two engineers modify adjacent modules without conflict most of the time?"
common_failure: "Abstract layers with no measurable payoff or ownership."
senior_question: "What part of this design stays stable if product priorities change next quarter?"
llm_prompt_starter: "Propose 3 architecture options with explicit coupling and migration tradeoffs. for topic 'Migration Playbooks' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Define migration steps as per domain_constraints migration_strategy."
```

### Skill Card 009: Dependency Direction Rules
```yaml
skill_id: 009
domain: Architecture
intent: "Shape system boundaries that reduce coupling and future rework."
use_when: "Requirements are evolving, teams are growing, or reliability constraints are increasing."
avoid_when: "Problem is tiny and change frequency is low; avoid over-architecting."
signals: "Frequent cross-module breakage, unclear ownership, hard-to-explain flows."
preferred_approach: "Model domain boundaries, define contracts, record ADRs, and stage migration seams."
optimization_lever: "Minimize cross-boundary chatty calls and hidden shared state."
validation_check: "Can two engineers modify adjacent modules without conflict most of the time?"
common_failure: "Abstract layers with no measurable payoff or ownership."
senior_question: "What part of this design stays stable if product priorities change next quarter?"
llm_prompt_starter: "Propose 3 architecture options with explicit coupling and migration tradeoffs. for topic 'Dependency Direction Rules' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Enforce that infrastructure depends on application, application depends on domain_core."
```

### Skill Card 010: Idempotent Command Handlers
```yaml
skill_id: 010
domain: Backend
intent: "Deliver predictable business behavior under load and partial failure."
use_when: "Workflows depend on consistent rules, integrations, and asynchronous processing."
avoid_when: "Simple static content with no critical workflows."
signals: "Duplicate writes, race conditions, retries causing side effects."
preferred_approach: "Enforce invariants, use idempotency keys, design retries safely, and isolate side effects."
optimization_lever: "Reduce synchronous dependencies and tighten transaction scopes."
validation_check: "Can requests be retried safely without corrupting state?"
common_failure: "Hidden coupling between handlers, data layer, and external APIs."
senior_question: "Which operations require exactly-once semantics versus at-least-once tolerance?"
llm_prompt_starter: "Design resilient backend flow with retries, idempotency, and error contracts. for topic 'Idempotent Command Handlers' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Implement as application/commands with idempotency key stored in infrastructure/persistence."
```

### Skill Card 011: Transactional Outbox Pattern
```yaml
skill_id: 011
domain: Backend
intent: "Deliver predictable business behavior under load and partial failure."
use_when: "Workflows depend on consistent rules, integrations, and asynchronous processing."
avoid_when: "Simple static content with no critical workflows."
signals: "Duplicate writes, race conditions, retries causing side effects."
preferred_approach: "Enforce invariants, use idempotency keys, design retries safely, and isolate side effects."
optimization_lever: "Reduce synchronous dependencies and tighten transaction scopes."
validation_check: "Can requests be retried safely without corrupting state?"
common_failure: "Hidden coupling between handlers, data layer, and external APIs."
senior_question: "Which operations require exactly-once semantics versus at-least-once tolerance?"
llm_prompt_starter: "Design resilient backend flow with retries, idempotency, and error contracts. for topic 'Transactional Outbox Pattern' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Use infrastructure/persistence for outbox table; publish via infrastructure/messaging."
```

### Skill Card 012: Retry and Backoff Policy
```yaml
skill_id: 012
domain: Backend
intent: "Deliver predictable business behavior under load and partial failure."
use_when: "Workflows depend on consistent rules, integrations, and asynchronous processing."
avoid_when: "Simple static content with no critical workflows."
signals: "Duplicate writes, race conditions, retries causing side effects."
preferred_approach: "Enforce invariants, use idempotency keys, design retries safely, and isolate side effects."
optimization_lever: "Reduce synchronous dependencies and tighten transaction scopes."
validation_check: "Can requests be retried safely without corrupting state?"
common_failure: "Hidden coupling between handlers, data layer, and external APIs."
senior_question: "Which operations require exactly-once semantics versus at-least-once tolerance?"
llm_prompt_starter: "Design resilient backend flow with retries, idempotency, and error contracts. for topic 'Retry and Backoff Policy' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Configure retry_policy in infrastructure/messaging and external client timeouts."
```

### Skill Card 013: Background Job Design
```yaml
skill_id: 013
domain: Backend
intent: "Deliver predictable business behavior under load and partial failure."
use_when: "Workflows depend on consistent rules, integrations, and asynchronous processing."
avoid_when: "Simple static content with no critical workflows."
signals: "Duplicate writes, race conditions, retries causing side effects."
preferred_approach: "Enforce invariants, use idempotency keys, design retries safely, and isolate side effects."
optimization_lever: "Reduce synchronous dependencies and tighten transaction scopes."
validation_check: "Can requests be retried safely without corrupting state?"
common_failure: "Hidden coupling between handlers, data layer, and external APIs."
senior_question: "Which operations require exactly-once semantics versus at-least-once tolerance?"
llm_prompt_starter: "Design resilient backend flow with retries, idempotency, and error contracts. for topic 'Background Job Design' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Jobs defined in application/handlers, enqueued via infrastructure/messaging."
```

### Skill Card 014: Rate Limiting Strategy
```yaml
skill_id: 014
domain: Backend
intent: "Deliver predictable business behavior under load and partial failure."
use_when: "Workflows depend on consistent rules, integrations, and asynchronous processing."
avoid_when: "Simple static content with no critical workflows."
signals: "Duplicate writes, race conditions, retries causing side effects."
preferred_approach: "Enforce invariants, use idempotency keys, design retries safely, and isolate side effects."
optimization_lever: "Reduce synchronous dependencies and tighten transaction scopes."
validation_check: "Can requests be retried safely without corrupting state?"
common_failure: "Hidden coupling between handlers, data layer, and external APIs."
senior_question: "Which operations require exactly-once semantics versus at-least-once tolerance?"
llm_prompt_starter: "Design resilient backend flow with retries, idempotency, and error contracts. for topic 'Rate Limiting Strategy' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Implement at interface/rest layer; check Production Hardening checklist."
```

### Skill Card 015: Versioned API Lifecycles
```yaml
skill_id: 015
domain: Backend
intent: "Deliver predictable business behavior under load and partial failure."
use_when: "Workflows depend on consistent rules, integrations, and asynchronous processing."
avoid_when: "Simple static content with no critical workflows."
signals: "Duplicate writes, race conditions, retries causing side effects."
preferred_approach: "Enforce invariants, use idempotency keys, design retries safely, and isolate side effects."
optimization_lever: "Reduce synchronous dependencies and tighten transaction scopes."
validation_check: "Can requests be retried safely without corrupting state?"
common_failure: "Hidden coupling between handlers, data layer, and external APIs."
senior_question: "Which operations require exactly-once semantics versus at-least-once tolerance?"
llm_prompt_starter: "Design resilient backend flow with retries, idempotency, and error contracts. for topic 'Versioned API Lifecycles' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Follow domain_constraints api_contract_version for each bounded context."
```

### Skill Card 016: Domain Validation Layers
```yaml
skill_id: 016
domain: Backend
intent: "Deliver predictable business behavior under load and partial failure."
use_when: "Workflows depend on consistent rules, integrations, and asynchronous processing."
avoid_when: "Simple static content with no critical workflows."
signals: "Duplicate writes, race conditions, retries causing side effects."
preferred_approach: "Enforce invariants, use idempotency keys, design retries safely, and isolate side effects."
optimization_lever: "Reduce synchronous dependencies and tighten transaction scopes."
validation_check: "Can requests be retried safely without corrupting state?"
common_failure: "Hidden coupling between handlers, data layer, and external APIs."
senior_question: "Which operations require exactly-once semantics versus at-least-once tolerance?"
llm_prompt_starter: "Design resilient backend flow with retries, idempotency, and error contracts. for topic 'Domain Validation Layers' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Place validation in domain_core/value_objects and aggregates."
```

### Skill Card 017: Saga Orchestration
```yaml
skill_id: 017
domain: Backend
intent: "Deliver predictable business behavior under load and partial failure."
use_when: "Workflows depend on consistent rules, integrations, and asynchronous processing."
avoid_when: "Simple static content with no critical workflows."
signals: "Duplicate writes, race conditions, retries causing side effects."
preferred_approach: "Enforce invariants, use idempotency keys, design retries safely, and isolate side effects."
optimization_lever: "Reduce synchronous dependencies and tighten transaction scopes."
validation_check: "Can requests be retried safely without corrupting state?"
common_failure: "Hidden coupling between handlers, data layer, and external APIs."
senior_question: "Which operations require exactly-once semantics versus at-least-once tolerance?"
llm_prompt_starter: "Design resilient backend flow with retries, idempotency, and error contracts. for topic 'Saga Orchestration' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Orchestrate via application/handlers using compensating commands."
```

### Skill Card 018: Resilient Third-Party Integrations
```yaml
skill_id: 018
domain: Backend
intent: "Deliver predictable business behavior under load and partial failure."
use_when: "Workflows depend on consistent rules, integrations, and asynchronous processing."
avoid_when: "Simple static content with no critical workflows."
signals: "Duplicate writes, race conditions, retries causing side effects."
preferred_approach: "Enforce invariants, use idempotency keys, design retries safely, and isolate side effects."
optimization_lever: "Reduce synchronous dependencies and tighten transaction scopes."
validation_check: "Can requests be retried safely without corrupting state?"
common_failure: "Hidden coupling between handlers, data layer, and external APIs."
senior_question: "Which operations require exactly-once semantics versus at-least-once tolerance?"
llm_prompt_starter: "Design resilient backend flow with retries, idempotency, and error contracts. for topic 'Resilient Third-Party Integrations' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Wrap external calls in infrastructure/external with circuit breaker and timeout."
```

### Skill Card 019: Design Token Systems
```yaml
skill_id: 019
domain: Frontend
intent: "Create fast, accessible, and understandable user journeys."
use_when: "Complex state, multi-step forms, or dynamic content delivery is present."
avoid_when: "A simple static landing page can solve the need."
signals: "Inconsistent UI behavior, poor accessibility, oversized bundles."
preferred_approach: "Define design tokens, enforce accessibility patterns, and align data fetching to route intent."
optimization_lever: "Cut render work, reduce bundle cost, and avoid unnecessary re-renders."
validation_check: "Do common tasks complete quickly with keyboard-only navigation?"
common_failure: "Component sprawl, duplicated state, and unclear data ownership."
senior_question: "What state truly belongs on client, server, or URL?"
llm_prompt_starter: "Propose frontend architecture with state boundaries, accessibility, and performance budgets. for topic 'Design Token Systems' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Place design tokens in src/styles/tokens/ and ensure interface components consume them."
```

### Skill Card 020: Accessibility-First Interaction
```yaml
skill_id: 020
domain: Frontend
intent: "Create fast, accessible, and understandable user journeys."
use_when: "Complex state, multi-step forms, or dynamic content delivery is present."
avoid_when: "A simple static landing page can solve the need."
signals: "Inconsistent UI behavior, poor accessibility, oversized bundles."
preferred_approach: "Define design tokens, enforce accessibility patterns, and align data fetching to route intent."
optimization_lever: "Cut render work, reduce bundle cost, and avoid unnecessary re-renders."
validation_check: "Do common tasks complete quickly with keyboard-only navigation?"
common_failure: "Component sprawl, duplicated state, and unclear data ownership."
senior_question: "What state truly belongs on client, server, or URL?"
llm_prompt_starter: "Propose frontend architecture with state boundaries, accessibility, and performance budgets. for topic 'Accessibility-First Interaction' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Enforce Guardrails 11 and 16; run accessibility checks in tests/."
```

### Skill Card 021: Optimistic UI Flows
```yaml
skill_id: 021
domain: Frontend
intent: "Create fast, accessible, and understandable user journeys."
use_when: "Complex state, multi-step forms, or dynamic content delivery is present."
avoid_when: "A simple static landing page can solve the need."
signals: "Inconsistent UI behavior, poor accessibility, oversized bundles."
preferred_approach: "Define design tokens, enforce accessibility patterns, and align data fetching to route intent."
optimization_lever: "Cut render work, reduce bundle cost, and avoid unnecessary re-renders."
validation_check: "Do common tasks complete quickly with keyboard-only navigation?"
common_failure: "Component sprawl, duplicated state, and unclear data ownership."
senior_question: "What state truly belongs on client, server, or URL?"
llm_prompt_starter: "Propose frontend architecture with state boundaries, accessibility, and performance budgets. for topic 'Optimistic UI Flows' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Pair with idempotent command handlers (Skill 010) for consistency."
```

### Skill Card 022: Route-Level Code Splitting
```yaml
skill_id: 022
domain: Frontend
intent: "Create fast, accessible, and understandable user journeys."
use_when: "Complex state, multi-step forms, or dynamic content delivery is present."
avoid_when: "A simple static landing page can solve the need."
signals: "Inconsistent UI behavior, poor accessibility, oversized bundles."
preferred_approach: "Define design tokens, enforce accessibility patterns, and align data fetching to route intent."
optimization_lever: "Cut render work, reduce bundle cost, and avoid unnecessary re-renders."
validation_check: "Do common tasks complete quickly with keyboard-only navigation?"
common_failure: "Component sprawl, duplicated state, and unclear data ownership."
senior_question: "What state truly belongs on client, server, or URL?"
llm_prompt_starter: "Propose frontend architecture with state boundaries, accessibility, and performance budgets. for topic 'Route-Level Code Splitting' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Implement in interface/ routes; track bundle budget (Guardrail 15)."
```

### Skill Card 023: Client Cache Invalidation
```yaml
skill_id: 023
domain: Frontend
intent: "Create fast, accessible, and understandable user journeys."
use_when: "Complex state, multi-step forms, or dynamic content delivery is present."
avoid_when: "A simple static landing page can solve the need."
signals: "Inconsistent UI behavior, poor accessibility, oversized bundles."
preferred_approach: "Define design tokens, enforce accessibility patterns, and align data fetching to route intent."
optimization_lever: "Cut render work, reduce bundle cost, and avoid unnecessary re-renders."
validation_check: "Do common tasks complete quickly with keyboard-only navigation?"
common_failure: "Component sprawl, duplicated state, and unclear data ownership."
senior_question: "What state truly belongs on client, server, or URL?"
llm_prompt_starter: "Propose frontend architecture with state boundaries, accessibility, and performance budgets. for topic 'Client Cache Invalidation' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Follow caching_strategy defined in application/queries."
```

### Skill Card 024: Form State Architecture
```yaml
skill_id: 024
domain: Frontend
intent: "Create fast, accessible, and understandable user journeys."
use_when: "Complex state, multi-step forms, or dynamic content delivery is present."
avoid_when: "A simple static landing page can solve the need."
signals: "Inconsistent UI behavior, poor accessibility, oversized bundles."
preferred_approach: "Define design tokens, enforce accessibility patterns, and align data fetching to route intent."
optimization_lever: "Cut render work, reduce bundle cost, and avoid unnecessary re-renders."
validation_check: "Do common tasks complete quickly with keyboard-only navigation?"
common_failure: "Component sprawl, duplicated state, and unclear data ownership."
senior_question: "What state truly belongs on client, server, or URL?"
llm_prompt_starter: "Propose frontend architecture with state boundaries, accessibility, and performance budgets. for topic 'Form State Architecture' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Use Guardrail 04 (client+server validation) and Guardrail 13 (duplicate submit)."
```

### Skill Card 025: Composable Component Patterns
```yaml
skill_id: 025
domain: Frontend
intent: "Create fast, accessible, and understandable user journeys."
use_when: "Complex state, multi-step forms, or dynamic content delivery is present."
avoid_when: "A simple static landing page can solve the need."
signals: "Inconsistent UI behavior, poor accessibility, oversized bundles."
preferred_approach: "Define design tokens, enforce accessibility patterns, and align data fetching to route intent."
optimization_lever: "Cut render work, reduce bundle cost, and avoid unnecessary re-renders."
validation_check: "Do common tasks complete quickly with keyboard-only navigation?"
common_failure: "Component sprawl, duplicated state, and unclear data ownership."
senior_question: "What state truly belongs on client, server, or URL?"
llm_prompt_starter: "Propose frontend architecture with state boundaries, accessibility, and performance budgets. for topic 'Composable Component Patterns' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Keep components in interface/; avoid anti-pattern AP-001."
```

### Skill Card 026: Rendering Strategy Selection
```yaml
skill_id: 026
domain: Frontend
intent: "Create fast, accessible, and understandable user journeys."
use_when: "Complex state, multi-step forms, or dynamic content delivery is present."
avoid_when: "A simple static landing page can solve the need."
signals: "Inconsistent UI behavior, poor accessibility, oversized bundles."
preferred_approach: "Define design tokens, enforce accessibility patterns, and align data fetching to route intent."
optimization_lever: "Cut render work, reduce bundle cost, and avoid unnecessary re-renders."
validation_check: "Do common tasks complete quickly with keyboard-only navigation?"
common_failure: "Component sprawl, duplicated state, and unclear data ownership."
senior_question: "What state truly belongs on client, server, or URL?"
llm_prompt_starter: "Propose frontend architecture with state boundaries, accessibility, and performance budgets. for topic 'Rendering Strategy Selection' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Align with Guardrail 03; document per route."
```

### Skill Card 027: Error Boundary Recovery UX
```yaml
skill_id: 027
domain: Frontend
intent: "Create fast, accessible, and understandable user journeys."
use_when: "Complex state, multi-step forms, or dynamic content delivery is present."
avoid_when: "A simple static landing page can solve the need."
signals: "Inconsistent UI behavior, poor accessibility, oversized bundles."
preferred_approach: "Define design tokens, enforce accessibility patterns, and align data fetching to route intent."
optimization_lever: "Cut render work, reduce bundle cost, and avoid unnecessary re-renders."
validation_check: "Do common tasks complete quickly with keyboard-only navigation?"
common_failure: "Component sprawl, duplicated state, and unclear data ownership."
senior_question: "What state truly belongs on client, server, or URL?"
llm_prompt_starter: "Propose frontend architecture with state boundaries, accessibility, and performance budgets. for topic 'Error Boundary Recovery UX' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Use Guardrail 08 (async states) and Guardrail 20 (error copy)."
```

### Skill Card 028: Schema Evolution Tactics
```yaml
skill_id: 028
domain: Data
intent: "Preserve trustworthy data while supporting product evolution."
use_when: "Schema changes, analytics growth, or compliance requirements are expected."
avoid_when: "Throwaway prototype with no persistence obligations."
signals: "Slow queries, inconsistent records, unclear retention ownership."
preferred_approach: "Design schema evolution, indexes, lifecycle policies, and quality checks."
optimization_lever: "Align storage model to query patterns and retention economics."
validation_check: "Can we explain data lineage for critical metrics end to end?"
common_failure: "Ad hoc schema drift and undocumented backfills."
senior_question: "What is the minimal durable model that still supports future analytics?"
llm_prompt_starter: "Create data model evolution plan with indexing, retention, and quality checks. for topic 'Schema Evolution Tactics' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Manage via infrastructure/persistence migrations; follow migration_strategy in domain_constraints."
```

### Skill Card 029: Index Strategy Reviews
```yaml
skill_id: 029
domain: Data
intent: "Preserve trustworthy data while supporting product evolution."
use_when: "Schema changes, analytics growth, or compliance requirements are expected."
avoid_when: "Throwaway prototype with no persistence obligations."
signals: "Slow queries, inconsistent records, unclear retention ownership."
preferred_approach: "Design schema evolution, indexes, lifecycle policies, and quality checks."
optimization_lever: "Align storage model to query patterns and retention economics."
validation_check: "Can we explain data lineage for critical metrics end to end?"
common_failure: "Ad hoc schema drift and undocumented backfills."
senior_question: "What is the minimal durable model that still supports future analytics?"
llm_prompt_starter: "Create data model evolution plan with indexing, retention, and quality checks. for topic 'Index Strategy Reviews' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Analyze query patterns from application/queries; add indexes to infrastructure/persistence."
```

### Skill Card 030: Query Plan Budgeting
```yaml
skill_id: 030
domain: Data
intent: "Preserve trustworthy data while supporting product evolution."
use_when: "Schema changes, analytics growth, or compliance requirements are expected."
avoid_when: "Throwaway prototype with no persistence obligations."
signals: "Slow queries, inconsistent records, unclear retention ownership."
preferred_approach: "Design schema evolution, indexes, lifecycle policies, and quality checks."
optimization_lever: "Align storage model to query patterns and retention economics."
validation_check: "Can we explain data lineage for critical metrics end to end?"
common_failure: "Ad hoc schema drift and undocumented backfills."
senior_question: "What is the minimal durable model that still supports future analytics?"
llm_prompt_starter: "Create data model evolution plan with indexing, retention, and quality checks. for topic 'Query Plan Budgeting' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Set timeout budgets in infrastructure/persistence; monitor with ObservabilitySignals."
```

### Skill Card 031: Data Retention Policies
```yaml
skill_id: 031
domain: Data
intent: "Preserve trustworthy data while supporting product evolution."
use_when: "Schema changes, analytics growth, or compliance requirements are expected."
avoid_when: "Throwaway prototype with no persistence obligations."
signals: "Slow queries, inconsistent records, unclear retention ownership."
preferred_approach: "Design schema evolution, indexes, lifecycle policies, and quality checks."
optimization_lever: "Align storage model to query patterns and retention economics."
validation_check: "Can we explain data lineage for critical metrics end to end?"
common_failure: "Ad hoc schema drift and undocumented backfills."
senior_question: "What is the minimal durable model that still supports future analytics?"
llm_prompt_starter: "Create data model evolution plan with indexing, retention, and quality checks. for topic 'Data Retention Policies' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Implement according to cross_cutting_constraints data_retention."
```

### Skill Card 032: Change Data Capture Pipelines
```yaml
skill_id: 032
domain: Data
intent: "Preserve trustworthy data while supporting product evolution."
use_when: "Schema changes, analytics growth, or compliance requirements are expected."
avoid_when: "Throwaway prototype with no persistence obligations."
signals: "Slow queries, inconsistent records, unclear retention ownership."
preferred_approach: "Design schema evolution, indexes, lifecycle policies, and quality checks."
optimization_lever: "Align storage model to query patterns and retention economics."
validation_check: "Can we explain data lineage for critical metrics end to end?"
common_failure: "Ad hoc schema drift and undocumented backfills."
senior_question: "What is the minimal durable model that still supports future analytics?"
llm_prompt_starter: "Create data model evolution plan with indexing, retention, and quality checks. for topic 'Change Data Capture Pipelines' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Use infrastructure/messaging to publish domain_events from persistence."
```

### Skill Card 033: Materialized View Strategy
```yaml
skill_id: 033
domain: Data
intent: "Preserve trustworthy data while supporting product evolution."
use_when: "Schema changes, analytics growth, or compliance requirements are expected."
avoid_when: "Throwaway prototype with no persistence obligations."
signals: "Slow queries, inconsistent records, unclear retention ownership."
preferred_approach: "Design schema evolution, indexes, lifecycle policies, and quality checks."
optimization_lever: "Align storage model to query patterns and retention economics."
validation_check: "Can we explain data lineage for critical metrics end to end?"
common_failure: "Ad hoc schema drift and undocumented backfills."
senior_question: "What is the minimal durable model that still supports future analytics?"
llm_prompt_starter: "Create data model evolution plan with indexing, retention, and quality checks. for topic 'Materialized View Strategy' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Define in infrastructure/persistence for read-optimized queries."
```

### Skill Card 034: Event Schema Governance
```yaml
skill_id: 034
domain: Data
intent: "Preserve trustworthy data while supporting product evolution."
use_when: "Schema changes, analytics growth, or compliance requirements are expected."
avoid_when: "Throwaway prototype with no persistence obligations."
signals: "Slow queries, inconsistent records, unclear retention ownership."
preferred_approach: "Design schema evolution, indexes, lifecycle policies, and quality checks."
optimization_lever: "Align storage model to query patterns and retention economics."
validation_check: "Can we explain data lineage for critical metrics end to end?"
common_failure: "Ad hoc schema drift and undocumented backfills."
senior_question: "What is the minimal durable model that still supports future analytics?"
llm_prompt_starter: "Create data model evolution plan with indexing, retention, and quality checks. for topic 'Event Schema Governance' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Maintain schema registry in domain_core/domain_events/schema-registry.ts."
```

### Skill Card 035: Data Quality Contracts
```yaml
skill_id: 035
domain: Data
intent: "Preserve trustworthy data while supporting product evolution."
use_when: "Schema changes, analytics growth, or compliance requirements are expected."
avoid_when: "Throwaway prototype with no persistence obligations."
signals: "Slow queries, inconsistent records, unclear retention ownership."
preferred_approach: "Design schema evolution, indexes, lifecycle policies, and quality checks."
optimization_lever: "Align storage model to query patterns and retention economics."
validation_check: "Can we explain data lineage for critical metrics end to end?"
common_failure: "Ad hoc schema drift and undocumented backfills."
senior_question: "What is the minimal durable model that still supports future analytics?"
llm_prompt_starter: "Create data model evolution plan with indexing, retention, and quality checks. for topic 'Data Quality Contracts' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Enforce at domain_core/value_objects and application/commands."
```

### Skill Card 036: Privacy Data Classification
```yaml
skill_id: 036
domain: Data
intent: "Preserve trustworthy data while supporting product evolution."
use_when: "Schema changes, analytics growth, or compliance requirements are expected."
avoid_when: "Throwaway prototype with no persistence obligations."
signals: "Slow queries, inconsistent records, unclear retention ownership."
preferred_approach: "Design schema evolution, indexes, lifecycle policies, and quality checks."
optimization_lever: "Align storage model to query patterns and retention economics."
validation_check: "Can we explain data lineage for critical metrics end to end?"
common_failure: "Ad hoc schema drift and undocumented backfills."
senior_question: "What is the minimal durable model that still supports future analytics?"
llm_prompt_starter: "Create data model evolution plan with indexing, retention, and quality checks. for topic 'Privacy Data Classification' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Tag PII fields in domain_core/entities and infrastructure/persistence schemas."
```

### Skill Card 037: Threat Modeling Cadence
```yaml
skill_id: 037
domain: Security
intent: "Reduce exploitability and contain blast radius when failure occurs."
use_when: "Handling identity, payments, personal data, or privileged operations."
avoid_when: "Never avoid security; only scale depth by risk profile."
signals: "Secrets in code, broad permissions, unvalidated input paths."
preferred_approach: "Threat model early, enforce least privilege, and test controls continuously."
optimization_lever: "Automate detection for common classes and tighten privileged paths."
validation_check: "Can compromise of one component be contained and detected quickly?"
common_failure: "Security added late without ownership or tests."
senior_question: "What is the highest-impact abuse path and how is it blocked?"
llm_prompt_starter: "Build threat model with mitigations, ownership, and verification tests. for topic 'Threat Modeling Cadence' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Review against cross_cutting_constraints authentication/authorization."
```

### Skill Card 038: Authentication vs Authorization
```yaml
skill_id: 038
domain: Security
intent: "Reduce exploitability and contain blast radius when failure occurs."
use_when: "Handling identity, payments, personal data, or privileged operations."
avoid_when: "Never avoid security; only scale depth by risk profile."
signals: "Secrets in code, broad permissions, unvalidated input paths."
preferred_approach: "Threat model early, enforce least privilege, and test controls continuously."
optimization_lever: "Automate detection for common classes and tighten privileged paths."
validation_check: "Can compromise of one component be contained and detected quickly?"
common_failure: "Security added late without ownership or tests."
senior_question: "What is the highest-impact abuse path and how is it blocked?"
llm_prompt_starter: "Build threat model with mitigations, ownership, and verification tests. for topic 'Authentication vs Authorization' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Implement authentication at interface/; authorization at application/ per Guardrail 06 and 18."
```

### Skill Card 039: Secret Rotation Program
```yaml
skill_id: 039
domain: Security
intent: "Reduce exploitability and contain blast radius when failure occurs."
use_when: "Handling identity, payments, personal data, or privileged operations."
avoid_when: "Never avoid security; only scale depth by risk profile."
signals: "Secrets in code, broad permissions, unvalidated input paths."
preferred_approach: "Threat model early, enforce least privilege, and test controls continuously."
optimization_lever: "Automate detection for common classes and tighten privileged paths."
validation_check: "Can compromise of one component be contained and detected quickly?"
common_failure: "Security added late without ownership or tests."
senior_question: "What is the highest-impact abuse path and how is it blocked?"
llm_prompt_starter: "Build threat model with mitigations, ownership, and verification tests. for topic 'Secret Rotation Program' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Check Production Hardening checklist item 05."
```

### Skill Card 040: Input Canonicalization
```yaml
skill_id: 040
domain: Security
intent: "Reduce exploitability and contain blast radius when failure occurs."
use_when: "Handling identity, payments, personal data, or privileged operations."
avoid_when: "Never avoid security; only scale depth by risk profile."
signals: "Secrets in code, broad permissions, unvalidated input paths."
preferred_approach: "Threat model early, enforce least privilege, and test controls continuously."
optimization_lever: "Automate detection for common classes and tighten privileged paths."
validation_check: "Can compromise of one component be contained and detected quickly?"
common_failure: "Security added late without ownership or tests."
senior_question: "What is the highest-impact abuse path and how is it blocked?"
llm_prompt_starter: "Build threat model with mitigations, ownership, and verification tests. for topic 'Input Canonicalization' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Enforce in domain_core/value_objects and interface/ request validation."
```

### Skill Card 041: Dependency Vulnerability Management
```yaml
skill_id: 041
domain: Security
intent: "Reduce exploitability and contain blast radius when failure occurs."
use_when: "Handling identity, payments, personal data, or privileged operations."
avoid_when: "Never avoid security; only scale depth by risk profile."
signals: "Secrets in code, broad permissions, unvalidated input paths."
preferred_approach: "Threat model early, enforce least privilege, and test controls continuously."
optimization_lever: "Automate detection for common classes and tighten privileged paths."
validation_check: "Can compromise of one component be contained and detected quickly?"
common_failure: "Security added late without ownership or tests."
senior_question: "What is the highest-impact abuse path and how is it blocked?"
llm_prompt_starter: "Build threat model with mitigations, ownership, and verification tests. for topic 'Dependency Vulnerability Management' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Scan in CI pipeline; address before release (Release Readiness)."
```

### Skill Card 042: Content Security Policy Hardening
```yaml
skill_id: 042
domain: Security
intent: "Reduce exploitability and contain blast radius when failure occurs."
use_when: "Handling identity, payments, personal data, or privileged operations."
avoid_when: "Never avoid security; only scale depth by risk profile."
signals: "Secrets in code, broad permissions, unvalidated input paths."
preferred_approach: "Threat model early, enforce least privilege, and test controls continuously."
optimization_lever: "Automate detection for common classes and tighten privileged paths."
validation_check: "Can compromise of one component be contained and detected quickly?"
common_failure: "Security added late without ownership or tests."
senior_question: "What is the highest-impact abuse path and how is it blocked?"
llm_prompt_starter: "Build threat model with mitigations, ownership, and verification tests. for topic 'Content Security Policy Hardening' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Configure in interface/rest headers."
```

### Skill Card 043: Secure Session Management
```yaml
skill_id: 043
domain: Security
intent: "Reduce exploitability and contain blast radius when failure occurs."
use_when: "Handling identity, payments, personal data, or privileged operations."
avoid_when: "Never avoid security; only scale depth by risk profile."
signals: "Secrets in code, broad permissions, unvalidated input paths."
preferred_approach: "Threat model early, enforce least privilege, and test controls continuously."
optimization_lever: "Automate detection for common classes and tighten privileged paths."
validation_check: "Can compromise of one component be contained and detected quickly?"
common_failure: "Security added late without ownership or tests."
senior_question: "What is the highest-impact abuse path and how is it blocked?"
llm_prompt_starter: "Build threat model with mitigations, ownership, and verification tests. for topic 'Secure Session Management' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Align with cross_cutting_constraints authentication."
```

### Skill Card 044: Least Privilege Access Design
```yaml
skill_id: 044
domain: Security
intent: "Reduce exploitability and contain blast radius when failure occurs."
use_when: "Handling identity, payments, personal data, or privileged operations."
avoid_when: "Never avoid security; only scale depth by risk profile."
signals: "Secrets in code, broad permissions, unvalidated input paths."
preferred_approach: "Threat model early, enforce least privilege, and test controls continuously."
optimization_lever: "Automate detection for common classes and tighten privileged paths."
validation_check: "Can compromise of one component be contained and detected quickly?"
common_failure: "Security added late without ownership or tests."
senior_question: "What is the highest-impact abuse path and how is it blocked?"
llm_prompt_starter: "Build threat model with mitigations, ownership, and verification tests. for topic 'Least Privilege Access Design' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Apply to infrastructure/persistence and external services."
```

### Skill Card 045: Incident Triage and Containment
```yaml
skill_id: 045
domain: Security
intent: "Reduce exploitability and contain blast radius when failure occurs."
use_when: "Handling identity, payments, personal data, or privileged operations."
avoid_when: "Never avoid security; only scale depth by risk profile."
signals: "Secrets in code, broad permissions, unvalidated input paths."
preferred_approach: "Threat model early, enforce least privilege, and test controls continuously."
optimization_lever: "Automate detection for common classes and tighten privileged paths."
validation_check: "Can compromise of one component be contained and detected quickly?"
common_failure: "Security added late without ownership or tests."
senior_question: "What is the highest-impact abuse path and how is it blocked?"
llm_prompt_starter: "Build threat model with mitigations, ownership, and verification tests. for topic 'Incident Triage and Containment' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Follow Incident Response checklist."
```

### Skill Card 046: Latency Budget Planning
```yaml
skill_id: 046
domain: Performance
intent: "Improve user and system responsiveness within cost constraints."
use_when: "Latency or throughput limits degrade user outcomes or operations."
avoid_when: "No baseline exists; measure first before optimizing."
signals: "Tail latency spikes, queue growth, high cloud spend per transaction."
preferred_approach: "Profile bottlenecks, set budgets, and optimize highest-impact path first."
optimization_lever: "Prioritize p95 and p99 improvements over average-only gains."
validation_check: "Did optimization move business metrics, not only synthetic benchmarks?"
common_failure: "Premature micro-optimizations that increase complexity."
senior_question: "What is the current bottleneck and what proof supports it?"
llm_prompt_starter: "Provide performance plan with baseline, bottlenecks, and staged optimizations. for topic 'Latency Budget Planning' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Set budgets per Guardrail 01 and cross_cutting_constraints latency_budget_p95_ms."
```

### Skill Card 047: Caching Hierarchy Design
```yaml
skill_id: 047
domain: Performance
intent: "Improve user and system responsiveness within cost constraints."
use_when: "Latency or throughput limits degrade user outcomes or operations."
avoid_when: "No baseline exists; measure first before optimizing."
signals: "Tail latency spikes, queue growth, high cloud spend per transaction."
preferred_approach: "Profile bottlenecks, set budgets, and optimize highest-impact path first."
optimization_lever: "Prioritize p95 and p99 improvements over average-only gains."
validation_check: "Did optimization move business metrics, not only synthetic benchmarks?"
common_failure: "Premature micro-optimizations that increase complexity."
senior_question: "What is the current bottleneck and what proof supports it?"
llm_prompt_starter: "Provide performance plan with baseline, bottlenecks, and staged optimizations. for topic 'Caching Hierarchy Design' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Implement per application/queries caching_strategy; respect Guardrail 07."
```

### Skill Card 048: Async Workload Shaping
```yaml
skill_id: 048
domain: Performance
intent: "Improve user and system responsiveness within cost constraints."
use_when: "Latency or throughput limits degrade user outcomes or operations."
avoid_when: "No baseline exists; measure first before optimizing."
signals: "Tail latency spikes, queue growth, high cloud spend per transaction."
preferred_approach: "Profile bottlenecks, set budgets, and optimize highest-impact path first."
optimization_lever: "Prioritize p95 and p99 improvements over average-only gains."
validation_check: "Did optimization move business metrics, not only synthetic benchmarks?"
common_failure: "Premature micro-optimizations that increase complexity."
senior_question: "What is the current bottleneck and what proof supports it?"
llm_prompt_starter: "Provide performance plan with baseline, bottlenecks, and staged optimizations. for topic 'Async Workload Shaping' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Use background job design (Skill 013) to offload work."
```

### Skill Card 049: Bundle Budget Governance
```yaml
skill_id: 049
domain: Performance
intent: "Improve user and system responsiveness within cost constraints."
use_when: "Latency or throughput limits degrade user outcomes or operations."
avoid_when: "No baseline exists; measure first before optimizing."
signals: "Tail latency spikes, queue growth, high cloud spend per transaction."
preferred_approach: "Profile bottlenecks, set budgets, and optimize highest-impact path first."
optimization_lever: "Prioritize p95 and p99 improvements over average-only gains."
validation_check: "Did optimization move business metrics, not only synthetic benchmarks?"
common_failure: "Premature micro-optimizations that increase complexity."
senior_question: "What is the current bottleneck and what proof supports it?"
llm_prompt_starter: "Provide performance plan with baseline, bottlenecks, and staged optimizations. for topic 'Bundle Budget Governance' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Track in CI; align with Guardrail 02 and 15."
```

### Skill Card 050: Database Bottleneck Removal
```yaml
skill_id: 050
domain: Performance
intent: "Improve user and system responsiveness within cost constraints."
use_when: "Latency or throughput limits degrade user outcomes or operations."
avoid_when: "No baseline exists; measure first before optimizing."
signals: "Tail latency spikes, queue growth, high cloud spend per transaction."
preferred_approach: "Profile bottlenecks, set budgets, and optimize highest-impact path first."
optimization_lever: "Prioritize p95 and p99 improvements over average-only gains."
validation_check: "Did optimization move business metrics, not only synthetic benchmarks?"
common_failure: "Premature micro-optimizations that increase complexity."
senior_question: "What is the current bottleneck and what proof supports it?"
llm_prompt_starter: "Provide performance plan with baseline, bottlenecks, and staged optimizations. for topic 'Database Bottleneck Removal' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Use index strategy (Skill 029) and query plan budgeting (Skill 030)."
```

### Skill Card 051: Horizontal Scaling Triggers
```yaml
skill_id: 051
domain: Performance
intent: "Improve user and system responsiveness within cost constraints."
use_when: "Latency or throughput limits degrade user outcomes or operations."
avoid_when: "No baseline exists; measure first before optimizing."
signals: "Tail latency spikes, queue growth, high cloud spend per transaction."
preferred_approach: "Profile bottlenecks, set budgets, and optimize highest-impact path first."
optimization_lever: "Prioritize p95 and p99 improvements over average-only gains."
validation_check: "Did optimization move business metrics, not only synthetic benchmarks?"
common_failure: "Premature micro-optimizations that increase complexity."
senior_question: "What is the current bottleneck and what proof supports it?"
llm_prompt_starter: "Provide performance plan with baseline, bottlenecks, and staged optimizations. for topic 'Horizontal Scaling Triggers' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Define based on infrastructure metrics; ensure stateless design."
```

### Skill Card 052: Load Test Experiment Design
```yaml
skill_id: 052
domain: Performance
intent: "Improve user and system responsiveness within cost constraints."
use_when: "Latency or throughput limits degrade user outcomes or operations."
avoid_when: "No baseline exists; measure first before optimizing."
signals: "Tail latency spikes, queue growth, high cloud spend per transaction."
preferred_approach: "Profile bottlenecks, set budgets, and optimize highest-impact path first."
optimization_lever: "Prioritize p95 and p99 improvements over average-only gains."
validation_check: "Did optimization move business metrics, not only synthetic benchmarks?"
common_failure: "Premature micro-optimizations that increase complexity."
senior_question: "What is the current bottleneck and what proof supports it?"
llm_prompt_starter: "Provide performance plan with baseline, bottlenecks, and staged optimizations. for topic 'Load Test Experiment Design' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Include in Testing Readiness checklist."
```

### Skill Card 053: Memory Profiling Discipline
```yaml
skill_id: 053
domain: Performance
intent: "Improve user and system responsiveness within cost constraints."
use_when: "Latency or throughput limits degrade user outcomes or operations."
avoid_when: "No baseline exists; measure first before optimizing."
signals: "Tail latency spikes, queue growth, high cloud spend per transaction."
preferred_approach: "Profile bottlenecks, set budgets, and optimize highest-impact path first."
optimization_lever: "Prioritize p95 and p99 improvements over average-only gains."
validation_check: "Did optimization move business metrics, not only synthetic benchmarks?"
common_failure: "Premature micro-optimizations that increase complexity."
senior_question: "What is the current bottleneck and what proof supports it?"
llm_prompt_starter: "Provide performance plan with baseline, bottlenecks, and staged optimizations. for topic 'Memory Profiling Discipline' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Use in both backend and frontend contexts to prevent leaks."
```

### Skill Card 054: Tail Latency Mitigation
```yaml
skill_id: 054
domain: Performance
intent: "Improve user and system responsiveness within cost constraints."
use_when: "Latency or throughput limits degrade user outcomes or operations."
avoid_when: "No baseline exists; measure first before optimizing."
signals: "Tail latency spikes, queue growth, high cloud spend per transaction."
preferred_approach: "Profile bottlenecks, set budgets, and optimize highest-impact path first."
optimization_lever: "Prioritize p95 and p99 improvements over average-only gains."
validation_check: "Did optimization move business metrics, not only synthetic benchmarks?"
common_failure: "Premature micro-optimizations that increase complexity."
senior_question: "What is the current bottleneck and what proof supports it?"
llm_prompt_starter: "Provide performance plan with baseline, bottlenecks, and staged optimizations. for topic 'Tail Latency Mitigation' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Monitor p95/p99; use circuit breakers and timeouts from infrastructure/."
```

### Skill Card 055: Test Pyramid Calibration
```yaml
skill_id: 055
domain: Testing
intent: "Detect regressions early and increase delivery confidence."
use_when: "Change velocity is high or failures are costly."
avoid_when: "Never avoid tests; right-size by risk and criticality."
signals: "Frequent regressions, flaky CI, fear of refactoring."
preferred_approach: "Balance unit, integration, contract, and end-to-end tests by risk."
optimization_lever: "Shorten feedback loops and quarantine flaky signals quickly."
validation_check: "Can we release without manual heroics?"
common_failure: "Overreliance on brittle end-to-end tests or under-tested core logic."
senior_question: "Which failure mode is currently untested but business-critical?"
llm_prompt_starter: "Design test strategy mapped to risk, speed, and maintenance cost. for topic 'Test Pyramid Calibration' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Align with tests/pyramid_target in Codebase Reference Map."
```

### Skill Card 056: Consumer Contract Testing
```yaml
skill_id: 056
domain: Testing
intent: "Detect regressions early and increase delivery confidence."
use_when: "Change velocity is high or failures are costly."
avoid_when: "Never avoid tests; right-size by risk and criticality."
signals: "Frequent regressions, flaky CI, fear of refactoring."
preferred_approach: "Balance unit, integration, contract, and end-to-end tests by risk."
optimization_lever: "Shorten feedback loops and quarantine flaky signals quickly."
validation_check: "Can we release without manual heroics?"
common_failure: "Overreliance on brittle end-to-end tests or under-tested core logic."
senior_question: "Which failure mode is currently untested but business-critical?"
llm_prompt_starter: "Design test strategy mapped to risk, speed, and maintenance cost. for topic 'Consumer Contract Testing' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Implement in tests/contract/ for interface/rest and interface/events."
```

### Skill Card 057: Mutation Testing Windows
```yaml
skill_id: 057
domain: Testing
intent: "Detect regressions early and increase delivery confidence."
use_when: "Change velocity is high or failures are costly."
avoid_when: "Never avoid tests; right-size by risk and criticality."
signals: "Frequent regressions, flaky CI, fear of refactoring."
preferred_approach: "Balance unit, integration, contract, and end-to-end tests by risk."
optimization_lever: "Shorten feedback loops and quarantine flaky signals quickly."
validation_check: "Can we release without manual heroics?"
common_failure: "Overreliance on brittle end-to-end tests or under-tested core logic."
senior_question: "Which failure mode is currently untested but business-critical?"
llm_prompt_starter: "Design test strategy mapped to risk, speed, and maintenance cost. for topic 'Mutation Testing Windows' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Run periodically on domain_core/ and application/ critical paths."
```

### Skill Card 058: Flaky Test Governance
```yaml
skill_id: 058
domain: Testing
intent: "Detect regressions early and increase delivery confidence."
use_when: "Change velocity is high or failures are costly."
avoid_when: "Never avoid tests; right-size by risk and criticality."
signals: "Frequent regressions, flaky CI, fear of refactoring."
preferred_approach: "Balance unit, integration, contract, and end-to-end tests by risk."
optimization_lever: "Shorten feedback loops and quarantine flaky signals quickly."
validation_check: "Can we release without manual heroics?"
common_failure: "Overreliance on brittle end-to-end tests or under-tested core logic."
senior_question: "Which failure mode is currently untested but business-critical?"
llm_prompt_starter: "Design test strategy mapped to risk, speed, and maintenance cost. for topic 'Flaky Test Governance' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Check Testing Readiness item 07; anti-pattern AP-014."
```

### Skill Card 059: Integration Data Factories
```yaml
skill_id: 059
domain: Testing
intent: "Detect regressions early and increase delivery confidence."
use_when: "Change velocity is high or failures are costly."
avoid_when: "Never avoid tests; right-size by risk and criticality."
signals: "Frequent regressions, flaky CI, fear of refactoring."
preferred_approach: "Balance unit, integration, contract, and end-to-end tests by risk."
optimization_lever: "Shorten feedback loops and quarantine flaky signals quickly."
validation_check: "Can we release without manual heroics?"
common_failure: "Overreliance on brittle end-to-end tests or under-tested core logic."
senior_question: "Which failure mode is currently untested but business-critical?"
llm_prompt_starter: "Design test strategy mapped to risk, speed, and maintenance cost. for topic 'Integration Data Factories' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Place in tests/integration/factories/ to create test data."
```

### Skill Card 060: Snapshot Discipline Rules
```yaml
skill_id: 060
domain: Testing
intent: "Detect regressions early and increase delivery confidence."
use_when: "Change velocity is high or failures are costly."
avoid_when: "Never avoid tests; right-size by risk and criticality."
signals: "Frequent regressions, flaky CI, fear of refactoring."
preferred_approach: "Balance unit, integration, contract, and end-to-end tests by risk."
optimization_lever: "Shorten feedback loops and quarantine flaky signals quickly."
validation_check: "Can we release without manual heroics?"
common_failure: "Overreliance on brittle end-to-end tests or under-tested core logic."
senior_question: "Which failure mode is currently untested but business-critical?"
llm_prompt_starter: "Design test strategy mapped to risk, speed, and maintenance cost. for topic 'Snapshot Discipline Rules' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Use sparingly; only for stable output, not dynamic content."
```

### Skill Card 061: Chaos Testing Scenarios
```yaml
skill_id: 061
domain: Testing
intent: "Detect regressions early and increase delivery confidence."
use_when: "Change velocity is high or failures are costly."
avoid_when: "Never avoid tests; right-size by risk and criticality."
signals: "Frequent regressions, flaky CI, fear of refactoring."
preferred_approach: "Balance unit, integration, contract, and end-to-end tests by risk."
optimization_lever: "Shorten feedback loops and quarantine flaky signals quickly."
validation_check: "Can we release without manual heroics?"
common_failure: "Overreliance on brittle end-to-end tests or under-tested core logic."
senior_question: "Which failure mode is currently untested but business-critical?"
llm_prompt_starter: "Design test strategy mapped to risk, speed, and maintenance cost. for topic 'Chaos Testing Scenarios' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Run in staging; target infrastructure/messaging and external dependencies."
```

### Skill Card 062: Canary Validation Strategy
```yaml
skill_id: 062
domain: Testing
intent: "Detect regressions early and increase delivery confidence."
use_when: "Change velocity is high or failures are costly."
avoid_when: "Never avoid tests; right-size by risk and criticality."
signals: "Frequent regressions, flaky CI, fear of refactoring."
preferred_approach: "Balance unit, integration, contract, and end-to-end tests by risk."
optimization_lever: "Shorten feedback loops and quarantine flaky signals quickly."
validation_check: "Can we release without manual heroics?"
common_failure: "Overreliance on brittle end-to-end tests or under-tested core logic."
senior_question: "Which failure mode is currently untested but business-critical?"
llm_prompt_starter: "Design test strategy mapped to risk, speed, and maintenance cost. for topic 'Canary Validation Strategy' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Part of Release Readiness checklist."
```

### Skill Card 063: Regression Triage Workflow
```yaml
skill_id: 063
domain: Testing
intent: "Detect regressions early and increase delivery confidence."
use_when: "Change velocity is high or failures are costly."
avoid_when: "Never avoid tests; right-size by risk and criticality."
signals: "Frequent regressions, flaky CI, fear of refactoring."
preferred_approach: "Balance unit, integration, contract, and end-to-end tests by risk."
optimization_lever: "Shorten feedback loops and quarantine flaky signals quickly."
validation_check: "Can we release without manual heroics?"
common_failure: "Overreliance on brittle end-to-end tests or under-tested core logic."
senior_question: "Which failure mode is currently untested but business-critical?"
llm_prompt_starter: "Design test strategy mapped to risk, speed, and maintenance cost. for topic 'Regression Triage Workflow' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Use incident response playbook for critical regressions."
```

### Skill Card 064: Trunk-Based Development
```yaml
skill_id: 064
domain: DevOps
intent: "Deliver changes safely and repeatedly with operational confidence."
use_when: "Multiple contributors, frequent releases, or uptime commitments exist."
avoid_when: "Single-user prototype with no availability expectations."
signals: "Manual release steps, long MTTR, inconsistent environments."
preferred_approach: "Automate CI/CD, enforce environment parity, and codify runbooks."
optimization_lever: "Reduce lead time and mean time to recovery simultaneously."
validation_check: "Can rollback be executed in minutes with clear ownership?"
common_failure: "Pipeline complexity without reliability gain."
senior_question: "What release risk remains manual and why?"
llm_prompt_starter: "Create DevOps plan for CI/CD, observability, rollback, and on-call readiness. for topic 'Trunk-Based Development' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Enable feature flags (Skill 069) to avoid long-lived branches."
```

### Skill Card 065: CI Pipeline Parallelization
```yaml
skill_id: 065
domain: DevOps
intent: "Deliver changes safely and repeatedly with operational confidence."
use_when: "Multiple contributors, frequent releases, or uptime commitments exist."
avoid_when: "Single-user prototype with no availability expectations."
signals: "Manual release steps, long MTTR, inconsistent environments."
preferred_approach: "Automate CI/CD, enforce environment parity, and codify runbooks."
optimization_lever: "Reduce lead time and mean time to recovery simultaneously."
validation_check: "Can rollback be executed in minutes with clear ownership?"
common_failure: "Pipeline complexity without reliability gain."
senior_question: "What release risk remains manual and why?"
llm_prompt_starter: "Create DevOps plan for CI/CD, observability, rollback, and on-call readiness. for topic 'CI Pipeline Parallelization' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Optimize per Testing Readiness item 10 (CI runtime budget)."
```

### Skill Card 066: Infrastructure as Code Policy
```yaml
skill_id: 066
domain: DevOps
intent: "Deliver changes safely and repeatedly with operational confidence."
use_when: "Multiple contributors, frequent releases, or uptime commitments exist."
avoid_when: "Single-user prototype with no availability expectations."
signals: "Manual release steps, long MTTR, inconsistent environments."
preferred_approach: "Automate CI/CD, enforce environment parity, and codify runbooks."
optimization_lever: "Reduce lead time and mean time to recovery simultaneously."
validation_check: "Can rollback be executed in minutes with clear ownership?"
common_failure: "Pipeline complexity without reliability gain."
senior_question: "What release risk remains manual and why?"
llm_prompt_starter: "Create DevOps plan for CI/CD, observability, rollback, and on-call readiness. for topic 'Infrastructure as Code Policy' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Define infrastructure in code; version alongside application."
```

### Skill Card 067: Environment Parity Control
```yaml
skill_id: 067
domain: DevOps
intent: "Deliver changes safely and repeatedly with operational confidence."
use_when: "Multiple contributors, frequent releases, or uptime commitments exist."
avoid_when: "Single-user prototype with no availability expectations."
signals: "Manual release steps, long MTTR, inconsistent environments."
preferred_approach: "Automate CI/CD, enforce environment parity, and codify runbooks."
optimization_lever: "Reduce lead time and mean time to recovery simultaneously."
validation_check: "Can rollback be executed in minutes with clear ownership?"
common_failure: "Pipeline complexity without reliability gain."
senior_question: "What release risk remains manual and why?"
llm_prompt_starter: "Create DevOps plan for CI/CD, observability, rollback, and on-call readiness. for topic 'Environment Parity Control' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Use same infrastructure/persistence schema_version across envs."
```

### Skill Card 068: Blue-Green Deployment Strategy
```yaml
skill_id: 068
domain: DevOps
intent: "Deliver changes safely and repeatedly with operational confidence."
use_when: "Multiple contributors, frequent releases, or uptime commitments exist."
avoid_when: "Single-user prototype with no availability expectations."
signals: "Manual release steps, long MTTR, inconsistent environments."
preferred_approach: "Automate CI/CD, enforce environment parity, and codify runbooks."
optimization_lever: "Reduce lead time and mean time to recovery simultaneously."
validation_check: "Can rollback be executed in minutes with clear ownership?"
common_failure: "Pipeline complexity without reliability gain."
senior_question: "What release risk remains manual and why?"
llm_prompt_starter: "Create DevOps plan for CI/CD, observability, rollback, and on-call readiness. for topic 'Blue-Green Deployment Strategy' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Ideal for stateless services; coordinate with database migrations."
```

### Skill Card 069: Feature Flag Operations
```yaml
skill_id: 069
domain: DevOps
intent: "Deliver changes safely and repeatedly with operational confidence."
use_when: "Multiple contributors, frequent releases, or uptime commitments exist."
avoid_when: "Single-user prototype with no availability expectations."
signals: "Manual release steps, long MTTR, inconsistent environments."
preferred_approach: "Automate CI/CD, enforce environment parity, and codify runbooks."
optimization_lever: "Reduce lead time and mean time to recovery simultaneously."
validation_check: "Can rollback be executed in minutes with clear ownership?"
common_failure: "Pipeline complexity without reliability gain."
senior_question: "What release risk remains manual and why?"
llm_prompt_starter: "Create DevOps plan for CI/CD, observability, rollback, and on-call readiness. for topic 'Feature Flag Operations' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Use for risk management (Default 13); check Release Readiness item 01."
```

### Skill Card 070: SLO and Error Budgeting
```yaml
skill_id: 070
domain: DevOps
intent: "Deliver changes safely and repeatedly with operational confidence."
use_when: "Multiple contributors, frequent releases, or uptime commitments exist."
avoid_when: "Single-user prototype with no availability expectations."
signals: "Manual release steps, long MTTR, inconsistent environments."
preferred_approach: "Automate CI/CD, enforce environment parity, and codify runbooks."
optimization_lever: "Reduce lead time and mean time to recovery simultaneously."
validation_check: "Can rollback be executed in minutes with clear ownership?"
common_failure: "Pipeline complexity without reliability gain."
senior_question: "What release risk remains manual and why?"
llm_prompt_starter: "Create DevOps plan for CI/CD, observability, rollback, and on-call readiness. for topic 'SLO and Error Budgeting' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Define based on cross_cutting_constraints error_budget_monthly."
```

### Skill Card 071: Rollback Automation
```yaml
skill_id: 071
domain: DevOps
intent: "Deliver changes safely and repeatedly with operational confidence."
use_when: "Multiple contributors, frequent releases, or uptime commitments exist."
avoid_when: "Single-user prototype with no availability expectations."
signals: "Manual release steps, long MTTR, inconsistent environments."
preferred_approach: "Automate CI/CD, enforce environment parity, and codify runbooks."
optimization_lever: "Reduce lead time and mean time to recovery simultaneously."
validation_check: "Can rollback be executed in minutes with clear ownership?"
common_failure: "Pipeline complexity without reliability gain."
senior_question: "What release risk remains manual and why?"
llm_prompt_starter: "Create DevOps plan for CI/CD, observability, rollback, and on-call readiness. for topic 'Rollback Automation' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Required by Guardrail 12; define RollbackPlan in every proposal."
```

### Skill Card 072: Operational Runbook Design
```yaml
skill_id: 072
domain: DevOps
intent: "Deliver changes safely and repeatedly with operational confidence."
use_when: "Multiple contributors, frequent releases, or uptime commitments exist."
avoid_when: "Single-user prototype with no availability expectations."
signals: "Manual release steps, long MTTR, inconsistent environments."
preferred_approach: "Automate CI/CD, enforce environment parity, and codify runbooks."
optimization_lever: "Reduce lead time and mean time to recovery simultaneously."
validation_check: "Can rollback be executed in minutes with clear ownership?"
common_failure: "Pipeline complexity without reliability gain."
senior_question: "What release risk remains manual and why?"
llm_prompt_starter: "Create DevOps plan for CI/CD, observability, rollback, and on-call readiness. for topic 'Operational Runbook Design' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Include in Release Readiness (item 05) and Incident Response (item 10)."
```

### Skill Card 073: Outcome-Driven Roadmapping
```yaml
skill_id: 073
domain: Product
intent: "Maximize outcome impact by prioritizing the right work."
use_when: "Competing roadmap demands and limited capacity require decisions."
avoid_when: "Avoid solution-first planning without measurable outcomes."
signals: "Busy teams with weak business movement, unclear priorities."
preferred_approach: "Define metric tree, hypothesis, and smallest valuable increment."
optimization_lever: "Cut scope before cutting quality on critical workflows."
validation_check: "Did shipped work move target metrics with acceptable tradeoffs?"
common_failure: "Feature output disconnected from user and business outcomes."
senior_question: "If we can ship one slice this sprint, which slice changes behavior most?"
llm_prompt_starter: "Propose roadmap slice options ranked by impact, risk, and effort. for topic 'Outcome-Driven Roadmapping' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Align with Default 24: Measure outcomes, not output volume."
```

### Skill Card 074: Metric Tree Ownership
```yaml
skill_id: 074
domain: Product
intent: "Maximize outcome impact by prioritizing the right work."
use_when: "Competing roadmap demands and limited capacity require decisions."
avoid_when: "Avoid solution-first planning without measurable outcomes."
signals: "Busy teams with weak business movement, unclear priorities."
preferred_approach: "Define metric tree, hypothesis, and smallest valuable increment."
optimization_lever: "Cut scope before cutting quality on critical workflows."
validation_check: "Did shipped work move target metrics with acceptable tradeoffs?"
common_failure: "Feature output disconnected from user and business outcomes."
senior_question: "If we can ship one slice this sprint, which slice changes behavior most?"
llm_prompt_starter: "Propose roadmap slice options ranked by impact, risk, and effort. for topic 'Metric Tree Ownership' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Define clear metrics in ObservabilitySignals section."
```

### Skill Card 075: Experiment Design Framework
```yaml
skill_id: 075
domain: Product
intent: "Maximize outcome impact by prioritizing the right work."
use_when: "Competing roadmap demands and limited capacity require decisions."
avoid_when: "Avoid solution-first planning without measurable outcomes."
signals: "Busy teams with weak business movement, unclear priorities."
preferred_approach: "Define metric tree, hypothesis, and smallest valuable increment."
optimization_lever: "Cut scope before cutting quality on critical workflows."
validation_check: "Did shipped work move target metrics with acceptable tradeoffs?"
common_failure: "Feature output disconnected from user and business outcomes."
senior_question: "If we can ship one slice this sprint, which slice changes behavior most?"
llm_prompt_starter: "Propose roadmap slice options ranked by impact, risk, and effort. for topic 'Experiment Design Framework' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Use feature flags (Skill 069) for A/B testing."
```

### Skill Card 076: User Journey Mapping
```yaml
skill_id: 076
domain: Product
intent: "Maximize outcome impact by prioritizing the right work."
use_when: "Competing roadmap demands and limited capacity require decisions."
avoid_when: "Avoid solution-first planning without measurable outcomes."
signals: "Busy teams with weak business movement, unclear priorities."
preferred_approach: "Define metric tree, hypothesis, and smallest valuable increment."
optimization_lever: "Cut scope before cutting quality on critical workflows."
validation_check: "Did shipped work move target metrics with acceptable tradeoffs?"
common_failure: "Feature output disconnected from user and business outcomes."
senior_question: "If we can ship one slice this sprint, which slice changes behavior most?"
llm_prompt_starter: "Propose roadmap slice options ranked by impact, risk, and effort. for topic 'User Journey Mapping' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Inform frontend design and critical workflows (Guardrail 09)."
```

### Skill Card 077: Backlog Vertical Slicing
```yaml
skill_id: 077
domain: Product
intent: "Maximize outcome impact by prioritizing the right work."
use_when: "Competing roadmap demands and limited capacity require decisions."
avoid_when: "Avoid solution-first planning without measurable outcomes."
signals: "Busy teams with weak business movement, unclear priorities."
preferred_approach: "Define metric tree, hypothesis, and smallest valuable increment."
optimization_lever: "Cut scope before cutting quality on critical workflows."
validation_check: "Did shipped work move target metrics with acceptable tradeoffs?"
common_failure: "Feature output disconnected from user and business outcomes."
senior_question: "If we can ship one slice this sprint, which slice changes behavior most?"
llm_prompt_starter: "Propose roadmap slice options ranked by impact, risk, and effort. for topic 'Backlog Vertical Slicing' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Ensure ImplementationSlice is smallest shippable unit (Default 11)."
```

### Skill Card 078: Risk-First Planning
```yaml
skill_id: 078
domain: Product
intent: "Maximize outcome impact by prioritizing the right work."
use_when: "Competing roadmap demands and limited capacity require decisions."
avoid_when: "Avoid solution-first planning without measurable outcomes."
signals: "Busy teams with weak business movement, unclear priorities."
preferred_approach: "Define metric tree, hypothesis, and smallest valuable increment."
optimization_lever: "Cut scope before cutting quality on critical workflows."
validation_check: "Did shipped work move target metrics with acceptable tradeoffs?"
common_failure: "Feature output disconnected from user and business outcomes."
senior_question: "If we can ship one slice this sprint, which slice changes behavior most?"
llm_prompt_starter: "Propose roadmap slice options ranked by impact, risk, and effort. for topic 'Risk-First Planning' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Use Decision Algorithm Phase 14 (pre-mortem)."
```

### Skill Card 079: Decision Log Hygiene
```yaml
skill_id: 079
domain: Product
intent: "Maximize outcome impact by prioritizing the right work."
use_when: "Competing roadmap demands and limited capacity require decisions."
avoid_when: "Avoid solution-first planning without measurable outcomes."
signals: "Busy teams with weak business movement, unclear priorities."
preferred_approach: "Define metric tree, hypothesis, and smallest valuable increment."
optimization_lever: "Cut scope before cutting quality on critical workflows."
validation_check: "Did shipped work move target metrics with acceptable tradeoffs?"
common_failure: "Feature output disconnected from user and business outcomes."
senior_question: "If we can ship one slice this sprint, which slice changes behavior most?"
llm_prompt_starter: "Propose roadmap slice options ranked by impact, risk, and effort. for topic 'Decision Log Hygiene' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Record decisions as ADRs (Skill 002)."
```

### Skill Card 080: Stakeholder Alignment Cadence
```yaml
skill_id: 080
domain: Product
intent: "Maximize outcome impact by prioritizing the right work."
use_when: "Competing roadmap demands and limited capacity require decisions."
avoid_when: "Avoid solution-first planning without measurable outcomes."
signals: "Busy teams with weak business movement, unclear priorities."
preferred_approach: "Define metric tree, hypothesis, and smallest valuable increment."
optimization_lever: "Cut scope before cutting quality on critical workflows."
validation_check: "Did shipped work move target metrics with acceptable tradeoffs?"
common_failure: "Feature output disconnected from user and business outcomes."
senior_question: "If we can ship one slice this sprint, which slice changes behavior most?"
llm_prompt_starter: "Propose roadmap slice options ranked by impact, risk, and effort. for topic 'Stakeholder Alignment Cadence' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Communicate via Release Readiness checklist item 07."
```

### Skill Card 081: Post-Launch Learning Loops
```yaml
skill_id: 081
domain: Product
intent: "Maximize outcome impact by prioritizing the right work."
use_when: "Competing roadmap demands and limited capacity require decisions."
avoid_when: "Avoid solution-first planning without measurable outcomes."
signals: "Busy teams with weak business movement, unclear priorities."
preferred_approach: "Define metric tree, hypothesis, and smallest valuable increment."
optimization_lever: "Cut scope before cutting quality on critical workflows."
validation_check: "Did shipped work move target metrics with acceptable tradeoffs?"
common_failure: "Feature output disconnected from user and business outcomes."
senior_question: "If we can ship one slice this sprint, which slice changes behavior most?"
llm_prompt_starter: "Propose roadmap slice options ranked by impact, risk, and effort. for topic 'Post-Launch Learning Loops' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Embed in Continuous Growth Loop appendix."
```

### Skill Card 082: Mentorship Systems Design
```yaml
skill_id: 082
domain: Leadership
intent: "Increase team effectiveness, decision quality, and sustainable pace."
use_when: "System and team complexity both increase."
avoid_when: "Avoid hero culture and single points of decision failure."
signals: "Repeated ambiguity, poor handoffs, and avoidable escalations."
preferred_approach: "Clarify ownership, coach through tradeoffs, and institutionalize learning loops."
optimization_lever: "Build systems where quality emerges from process, not heroics."
validation_check: "Can the team deliver consistently even when key people are unavailable?"
common_failure: "Knowledge silos and undocumented decision rationale."
senior_question: "What should be codified so team quality does not depend on memory?"
llm_prompt_starter: "Outline leadership operating model for ownership, quality, and continuous improvement. for topic 'Mentorship Systems Design' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Institutionalize via Code Review Quality Bar and Architecture Governance."
```

### Skill Card 083: Code Review Quality Bar
```yaml
skill_id: 083
domain: Leadership
intent: "Increase team effectiveness, decision quality, and sustainable pace."
use_when: "System and team complexity both increase."
avoid_when: "Avoid hero culture and single points of decision failure."
signals: "Repeated ambiguity, poor handoffs, and avoidable escalations."
preferred_approach: "Clarify ownership, coach through tradeoffs, and institutionalize learning loops."
optimization_lever: "Build systems where quality emerges from process, not heroics."
validation_check: "Can the team deliver consistently even when key people are unavailable?"
common_failure: "Knowledge silos and undocumented decision rationale."
senior_question: "What should be codified so team quality does not depend on memory?"
llm_prompt_starter: "Outline leadership operating model for ownership, quality, and continuous improvement. for topic 'Code Review Quality Bar' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Use Pull Request Review checklist as baseline."
```

### Skill Card 084: Escalation Frameworks
```yaml
skill_id: 084
domain: Leadership
intent: "Increase team effectiveness, decision quality, and sustainable pace."
use_when: "System and team complexity both increase."
avoid_when: "Avoid hero culture and single points of decision failure."
signals: "Repeated ambiguity, poor handoffs, and avoidable escalations."
preferred_approach: "Clarify ownership, coach through tradeoffs, and institutionalize learning loops."
optimization_lever: "Build systems where quality emerges from process, not heroics."
validation_check: "Can the team deliver consistently even when key people are unavailable?"
common_failure: "Knowledge silos and undocumented decision rationale."
senior_question: "What should be codified so team quality does not depend on memory?"
llm_prompt_starter: "Outline leadership operating model for ownership, quality, and continuous improvement. for topic 'Escalation Frameworks' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Define clear on-call ownership (Release Readiness item 04)."
```

### Skill Card 085: Delegation Matrix Planning
```yaml
skill_id: 085
domain: Leadership
intent: "Increase team effectiveness, decision quality, and sustainable pace."
use_when: "System and team complexity both increase."
avoid_when: "Avoid hero culture and single points of decision failure."
signals: "Repeated ambiguity, poor handoffs, and avoidable escalations."
preferred_approach: "Clarify ownership, coach through tradeoffs, and institutionalize learning loops."
optimization_lever: "Build systems where quality emerges from process, not heroics."
validation_check: "Can the team deliver consistently even when key people are unavailable?"
common_failure: "Knowledge silos and undocumented decision rationale."
senior_question: "What should be codified so team quality does not depend on memory?"
llm_prompt_starter: "Outline leadership operating model for ownership, quality, and continuous improvement. for topic 'Delegation Matrix Planning' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Assign clear ownership for each bounded context in domain_constraints."
```

### Skill Card 086: Hiring Signal Calibration
```yaml
skill_id: 086
domain: Leadership
intent: "Increase team effectiveness, decision quality, and sustainable pace."
use_when: "System and team complexity both increase."
avoid_when: "Avoid hero culture and single points of decision failure."
signals: "Repeated ambiguity, poor handoffs, and avoidable escalations."
preferred_approach: "Clarify ownership, coach through tradeoffs, and institutionalize learning loops."
optimization_lever: "Build systems where quality emerges from process, not heroics."
validation_check: "Can the team deliver consistently even when key people are unavailable?"
common_failure: "Knowledge silos and undocumented decision rationale."
senior_question: "What should be codified so team quality does not depend on memory?"
llm_prompt_starter: "Outline leadership operating model for ownership, quality, and continuous improvement. for topic 'Hiring Signal Calibration' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Focus on growth signals and risk signals from Competency Matrix."
```

### Skill Card 087: Incident Communication Practice
```yaml
skill_id: 087
domain: Leadership
intent: "Increase team effectiveness, decision quality, and sustainable pace."
use_when: "System and team complexity both increase."
avoid_when: "Avoid hero culture and single points of decision failure."
signals: "Repeated ambiguity, poor handoffs, and avoidable escalations."
preferred_approach: "Clarify ownership, coach through tradeoffs, and institutionalize learning loops."
optimization_lever: "Build systems where quality emerges from process, not heroics."
validation_check: "Can the team deliver consistently even when key people are unavailable?"
common_failure: "Knowledge silos and undocumented decision rationale."
senior_question: "What should be codified so team quality does not depend on memory?"
llm_prompt_starter: "Outline leadership operating model for ownership, quality, and continuous improvement. for topic 'Incident Communication Practice' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Follow Incident Response checklist items 02 and 07."
```

### Skill Card 088: Cross-Team Negotiation
```yaml
skill_id: 088
domain: Leadership
intent: "Increase team effectiveness, decision quality, and sustainable pace."
use_when: "System and team complexity both increase."
avoid_when: "Avoid hero culture and single points of decision failure."
signals: "Repeated ambiguity, poor handoffs, and avoidable escalations."
preferred_approach: "Clarify ownership, coach through tradeoffs, and institutionalize learning loops."
optimization_lever: "Build systems where quality emerges from process, not heroics."
validation_check: "Can the team deliver consistently even when key people are unavailable?"
common_failure: "Knowledge silos and undocumented decision rationale."
senior_question: "What should be codified so team quality does not depend on memory?"
llm_prompt_starter: "Outline leadership operating model for ownership, quality, and continuous improvement. for topic 'Cross-Team Negotiation' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Use Architecture Review checklist items 09 and 10."
```

### Skill Card 089: Technical Debt Stewardship
```yaml
skill_id: 089
domain: Leadership
intent: "Increase team effectiveness, decision quality, and sustainable pace."
use_when: "System and team complexity both increase."
avoid_when: "Avoid hero culture and single points of decision failure."
signals: "Repeated ambiguity, poor handoffs, and avoidable escalations."
preferred_approach: "Clarify ownership, coach through tradeoffs, and institutionalize learning loops."
optimization_lever: "Build systems where quality emerges from process, not heroics."
validation_check: "Can the team deliver consistently even when key people are unavailable?"
common_failure: "Knowledge silos and undocumented decision rationale."
senior_question: "What should be codified so team quality does not depend on memory?"
llm_prompt_starter: "Outline leadership operating model for ownership, quality, and continuous improvement. for topic 'Technical Debt Stewardship' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Assess in Architecture Review item 07; prioritize via Risk-First Planning."
```

### Skill Card 090: Architecture Governance Routines
```yaml
skill_id: 090
domain: Leadership
intent: "Increase team effectiveness, decision quality, and sustainable pace."
use_when: "System and team complexity both increase."
avoid_when: "Avoid hero culture and single points of decision failure."
signals: "Repeated ambiguity, poor handoffs, and avoidable escalations."
preferred_approach: "Clarify ownership, coach through tradeoffs, and institutionalize learning loops."
optimization_lever: "Build systems where quality emerges from process, not heroics."
validation_check: "Can the team deliver consistently even when key people are unavailable?"
common_failure: "Knowledge silos and undocumented decision rationale."
senior_question: "What should be codified so team quality does not depend on memory?"
llm_prompt_starter: "Outline leadership operating model for ownership, quality, and continuous improvement. for topic 'Architecture Governance Routines' with measurable acceptance criteria."
output_format_request: "Return assumptions, tradeoffs, implementation slices, tests, metrics, and rollback steps."
reference_map_alignment: "Regularly review Codebase Reference Map and update domain_constraints."
```

## Part 3 - Advanced Playbooks, Prompts, and Continuous Improvement

### Advanced Scenario Playbooks (Enhanced with AI Constraints)
```json
{
  "playbooks": [
    {
      "id": "PB-001",
      "title": "Handling partial outages in dependency chains",
      "objective": "Define success criteria and failure boundaries before implementation.",
      "inputs": ["Baseline metrics", "Architecture map", "Ownership matrix", "Rollout constraints"],
      "decision_pattern": "conservative | balanced | aggressive",
      "execution": "Ship in thin slices with observability and rollback at each slice.",
      "verification": "Compare baseline vs post-change p50/p95/p99, error rate, and user completion.",
      "learning": "Write post-implementation notes for assumptions that held or failed.",
      "exit_criteria": "Measurable outcome achieved and operational burden remains acceptable.",
      "ai_constraint": "MUST propose circuit breaker pattern aligned with Codebase Reference Map infrastructure/messaging settings."
    },
    {
      "id": "PB-002",
      "title": "Migrating from monolith to modular monolith",
      "objective": "Define success criteria and failure boundaries before implementation.",
      "inputs": ["Baseline metrics", "Architecture map", "Ownership matrix", "Rollout constraints"],
      "decision_pattern": "conservative | balanced | aggressive",
      "execution": "Ship in thin slices with observability and rollback at each slice.",
      "verification": "Compare baseline vs post-change p50/p95/p99, error rate, and user completion.",
      "learning": "Write post-implementation notes for assumptions that held or failed.",
      "exit_criteria": "Measurable outcome achieved and operational burden remains acceptable.",
      "ai_constraint": "Reference Skill Card 005 and 009; maintain dependency direction rules."
    },
    {
      "id": "PB-003",
      "title": "Introducing event-driven processing safely",
      "objective": "Define success criteria and failure boundaries before implementation.",
      "inputs": ["Baseline metrics", "Architecture map", "Ownership matrix", "Rollout constraints"],
      "decision_pattern": "conservative | balanced | aggressive",
      "execution": "Ship in thin slices with observability and rollback at each slice.",
      "verification": "Compare baseline vs post-change p50/p95/p99, error rate, and user completion.",
      "learning": "Write post-implementation notes for assumptions that held or failed.",
      "exit_criteria": "Measurable outcome achieved and operational burden remains acceptable.",
      "ai_constraint": "Use Transactional Outbox (Skill 011) and idempotent handlers (Skill 010)."
    },
    {
      "id": "PB-004",
      "title": "Reducing cloud cost without harming reliability",
      "objective": "Define success criteria and failure boundaries before implementation.",
      "inputs": ["Baseline metrics", "Architecture map", "Ownership matrix", "Rollout constraints"],
      "decision_pattern": "conservative | balanced | aggressive",
      "execution": "Ship in thin slices with observability and rollback at each slice.",
      "verification": "Compare baseline vs post-change p50/p95/p99, error rate, and user completion.",
      "learning": "Write post-implementation notes for assumptions that held or failed.",
      "exit_criteria": "Measurable outcome achieved and operational burden remains acceptable.",
      "ai_constraint": "Prioritize rightsizing and spot instances; ensure SLOs (Skill 070) remain met."
    },
    {
      "id": "PB-005",
      "title": "Hardening authentication for high-risk operations",
      "objective": "Define success criteria and failure boundaries before implementation.",
      "inputs": ["Baseline metrics", "Architecture map", "Ownership matrix", "Rollout constraints"],
      "decision_pattern": "conservative | balanced | aggressive",
      "execution": "Ship in thin slices with observability and rollback at each slice.",
      "verification": "Compare baseline vs post-change p50/p95/p99, error rate, and user completion.",
      "learning": "Write post-implementation notes for assumptions that held or failed.",
      "exit_criteria": "Measurable outcome achieved and operational burden remains acceptable.",
      "ai_constraint": "Apply Skill Cards 037-045; ensure MFA and audit trails."
    },
    {
      "id": "PB-006",
      "title": "Improving frontend performance on low-end devices",
      "objective": "Define success criteria and failure boundaries before implementation.",
      "inputs": ["Baseline metrics", "Architecture map", "Ownership matrix", "Rollout constraints"],
      "decision_pattern": "conservative | balanced | aggressive",
      "execution": "Ship in thin slices with observability and rollback at each slice.",
      "verification": "Compare baseline vs post-change p50/p95/p99, error rate, and user completion.",
      "learning": "Write post-implementation notes for assumptions that held or failed.",
      "exit_criteria": "Measurable outcome achieved and operational burden remains acceptable.",
      "ai_constraint": "Focus on bundle budget (Skill 049) and rendering strategy (Skill 026)."
    },
    {
      "id": "PB-007",
      "title": "Fixing flaky CI pipelines in large teams",
      "objective": "Define success criteria and failure boundaries before implementation.",
      "inputs": ["Baseline metrics", "Architecture map", "Ownership matrix", "Rollout constraints"],
      "decision_pattern": "conservative | balanced | aggressive",
      "execution": "Ship in thin slices with observability and rollback at each slice.",
      "verification": "Compare baseline vs post-change p50/p95/p99, error rate, and user completion.",
      "learning": "Write post-implementation notes for assumptions that held or failed.",
      "exit_criteria": "Measurable outcome achieved and operational burden remains acceptable.",
      "ai_constraint": "Apply Flaky Test Governance (Skill 058) and parallelization (Skill 065)."
    },
    {
      "id": "PB-008",
      "title": "Scaling analytics while preserving privacy controls",
      "objective": "Define success criteria and failure boundaries before implementation.",
      "inputs": ["Baseline metrics", "Architecture map", "Ownership matrix", "Rollout constraints"],
      "decision_pattern": "conservative | balanced | aggressive",
      "execution": "Ship in thin slices with observability and rollback at each slice.",
      "verification": "Compare baseline vs post-change p50/p95/p99, error rate, and user completion.",
      "learning": "Write post-implementation notes for assumptions that held or failed.",
      "exit_criteria": "Measurable outcome achieved and operational burden remains acceptable.",
      "ai_constraint": "Use Privacy Data Classification (Skill 036) and CDC pipelines (Skill 032)."
    },
    {
      "id": "PB-009",
      "title": "Running incident reviews that drive real change",
      "objective": "Define success criteria and failure boundaries before implementation.",
      "inputs": ["Baseline metrics", "Architecture map", "Ownership matrix", "Rollout constraints"],
      "decision_pattern": "conservative | balanced | aggressive",
      "execution": "Ship in thin slices with observability and rollback at each slice.",
      "verification": "Compare baseline vs post-change p50/p95/p99, error rate, and user completion.",
      "learning": "Write post-implementation notes for assumptions that held or failed.",
      "exit_criteria": "Measurable outcome achieved and operational burden remains acceptable.",
      "ai_constraint": "Follow Incident Response checklist; produce actionable postmortem items."
    },
    {
      "id": "PB-010",
      "title": "Planning risky database migrations with rollback",
      "objective": "Define success criteria and failure boundaries before implementation.",
      "inputs": ["Baseline metrics", "Architecture map", "Ownership matrix", "Rollout constraints"],
      "decision_pattern": "conservative | balanced | aggressive",
      "execution": "Ship in thin slices with observability and rollback at each slice.",
      "verification": "Compare baseline vs post-change p50/p95/p99, error rate, and user completion.",
      "learning": "Write post-implementation notes for assumptions that held or failed.",
      "exit_criteria": "Measurable outcome achieved and operational burden remains acceptable.",
      "ai_constraint": "Use expand/contract pattern; ensure Release Readiness item 02."
    },
    {
      "id": "PB-011",
      "title": "Untangling tightly coupled legacy modules",
      "objective": "Define success criteria and failure boundaries before implementation.",
      "inputs": ["Baseline metrics", "Architecture map", "Ownership matrix", "Rollout constraints"],
      "decision_pattern": "conservative | balanced | aggressive",
      "execution": "Ship in thin slices with observability and rollback at each slice.",
      "verification": "Compare baseline vs post-change p50/p95/p99, error rate, and user completion.",
      "learning": "Write post-implementation notes for assumptions that held or failed.",
      "exit_criteria": "Measurable outcome achieved and operational burden remains acceptable.",
      "ai_constraint": "Apply Bounded Context Mapping (Skill 001) and Dependency Direction Rules (Skill 009)."
    },
    {
      "id": "PB-012",
      "title": "Improving API consumer experience and stability",
      "objective": "Define success criteria and failure boundaries before implementation.",
      "inputs": ["Baseline metrics", "Architecture map", "Ownership matrix", "Rollout constraints"],
      "decision_pattern": "conservative | balanced | aggressive",
      "execution": "Ship in thin slices with observability and rollback at each slice.",
      "verification": "Compare baseline vs post-change p50/p95/p99, error rate, and user completion.",
      "learning": "Write post-implementation notes for assumptions that held or failed.",
      "exit_criteria": "Measurable outcome achieved and operational burden remains acceptable.",
      "ai_constraint": "Implement API-First Contracts (Skill 003) and versioned lifecycles (Skill 015)."
    },
    {
      "id": "PB-013",
      "title": "Recovering from data quality degradation",
      "objective": "Define success criteria and failure boundaries before implementation.",
      "inputs": ["Baseline metrics", "Architecture map", "Ownership matrix", "Rollout constraints"],
      "decision_pattern": "conservative | balanced | aggressive",
      "execution": "Ship in thin slices with observability and rollback at each slice.",
      "verification": "Compare baseline vs post-change p50/p95/p99, error rate, and user completion.",
      "learning": "Write post-implementation notes for assumptions that held or failed.",
      "exit_criteria": "Measurable outcome achieved and operational burden remains acceptable.",
      "ai_constraint": "Enforce Data Quality Contracts (Skill 035) and backfill with validation."
    },
    {
      "id": "PB-014",
      "title": "Raising security maturity without slowing delivery",
      "objective": "Define success criteria and failure boundaries before implementation.",
      "inputs": ["Baseline metrics", "Architecture map", "Ownership matrix", "Rollout constraints"],
      "decision_pattern": "conservative | balanced | aggressive",
      "execution": "Ship in thin slices with observability and rollback at each slice.",
      "verification": "Compare baseline vs post-change p50/p95/p99, error rate, and user completion.",
      "learning": "Write post-implementation notes for assumptions that held or failed.",
      "exit_criteria": "Measurable outcome achieved and operational burden remains acceptable.",
      "ai_constraint": "Shift-left with threat modeling (Skill 037) and automated scans in CI."
    },
    {
      "id": "PB-015",
      "title": "Improving release confidence after incident-heavy periods",
      "objective": "Define success criteria and failure boundaries before implementation.",
      "inputs": ["Baseline metrics", "Architecture map", "Ownership matrix", "Rollout constraints"],
      "decision_pattern": "conservative | balanced | aggressive",
      "execution": "Ship in thin slices with observability and rollback at each slice.",
      "verification": "Compare baseline vs post-change p50/p95/p99, error rate, and user completion.",
      "learning": "Write post-implementation notes for assumptions that held or failed.",
      "exit_criteria": "Measurable outcome achieved and operational burden remains acceptable.",
      "ai_constraint": "Strengthen canary validation (Skill 062) and SLO error budgets (Skill 070)."
    }
  ]
}
```

### LLM Collaboration Prompts (Machine-Readable)
```xml
<PromptFamilies>
  <Family name="Architecture">
    <Prompt id="1">Ask for 3 options with explicit constraints and irreversible decisions highlighted.</Prompt>
    <Prompt id="2">Ask for measurable acceptance criteria and validation methods.</Prompt>
    <Prompt id="3">Ask for failure modes, monitoring signals, and rollback triggers.</Prompt>
    <Prompt id="4">Ask for a smallest shippable slice and next two iterations.</Prompt>
    <Prompt id="5">Ask for common anti-patterns relevant to this scenario.</Prompt>
    <Prompt id="6">Ask for ownership map and expected review checkpoints.</Prompt>
  </Family>
  <Family name="Implementation">
    <Prompt id="1">Ask for 3 options with explicit constraints and irreversible decisions highlighted.</Prompt>
    <Prompt id="2">Ask for measurable acceptance criteria and validation methods.</Prompt>
    <Prompt id="3">Ask for failure modes, monitoring signals, and rollback triggers.</Prompt>
    <Prompt id="4">Ask for a smallest shippable slice and next two iterations.</Prompt>
    <Prompt id="5">Ask for common anti-patterns relevant to this scenario.</Prompt>
    <Prompt id="6">Ask for ownership map and expected review checkpoints.</Prompt>
  </Family>
  <Family name="Testing">
    <Prompt id="1">Ask for 3 options with explicit constraints and irreversible decisions highlighted.</Prompt>
    <Prompt id="2">Ask for measurable acceptance criteria and validation methods.</Prompt>
    <Prompt id="3">Ask for failure modes, monitoring signals, and rollback triggers.</Prompt>
    <Prompt id="4">Ask for a smallest shippable slice and next two iterations.</Prompt>
    <Prompt id="5">Ask for common anti-patterns relevant to this scenario.</Prompt>
    <Prompt id="6">Ask for ownership map and expected review checkpoints.</Prompt>
  </Family>
  <Family name="Security">
    <Prompt id="1">Ask for 3 options with explicit constraints and irreversible decisions highlighted.</Prompt>
    <Prompt id="2">Ask for measurable acceptance criteria and validation methods.</Prompt>
    <Prompt id="3">Ask for failure modes, monitoring signals, and rollback triggers.</Prompt>
    <Prompt id="4">Ask for a smallest shippable slice and next two iterations.</Prompt>
    <Prompt id="5">Ask for common anti-patterns relevant to this scenario.</Prompt>
    <Prompt id="6">Ask for ownership map and expected review checkpoints.</Prompt>
  </Family>
  <Family name="Performance">
    <Prompt id="1">Ask for 3 options with explicit constraints and irreversible decisions highlighted.</Prompt>
    <Prompt id="2">Ask for measurable acceptance criteria and validation methods.</Prompt>
    <Prompt id="3">Ask for failure modes, monitoring signals, and rollback triggers.</Prompt>
    <Prompt id="4">Ask for a smallest shippable slice and next two iterations.</Prompt>
    <Prompt id="5">Ask for common anti-patterns relevant to this scenario.</Prompt>
    <Prompt id="6">Ask for ownership map and expected review checkpoints.</Prompt>
  </Family>
  <Family name="Debugging">
    <Prompt id="1">Ask for 3 options with explicit constraints and irreversible decisions highlighted.</Prompt>
    <Prompt id="2">Ask for measurable acceptance criteria and validation methods.</Prompt>
    <Prompt id="3">Ask for failure modes, monitoring signals, and rollback triggers.</Prompt>
    <Prompt id="4">Ask for a smallest shippable slice and next two iterations.</Prompt>
    <Prompt id="5">Ask for common anti-patterns relevant to this scenario.</Prompt>
    <Prompt id="6">Ask for ownership map and expected review checkpoints.</Prompt>
  </Family>
  <Family name="Refactoring">
    <Prompt id="1">Ask for 3 options with explicit constraints and irreversible decisions highlighted.</Prompt>
    <Prompt id="2">Ask for measurable acceptance criteria and validation methods.</Prompt>
    <Prompt id="3">Ask for failure modes, monitoring signals, and rollback triggers.</Prompt>
    <Prompt id="4">Ask for a smallest shippable slice and next two iterations.</Prompt>
    <Prompt id="5">Ask for common anti-patterns relevant to this scenario.</Prompt>
    <Prompt id="6">Ask for ownership map and expected review checkpoints.</Prompt>
  </Family>
  <Family name="Release">
    <Prompt id="1">Ask for 3 options with explicit constraints and irreversible decisions highlighted.</Prompt>
    <Prompt id="2">Ask for measurable acceptance criteria and validation methods.</Prompt>
    <Prompt id="3">Ask for failure modes, monitoring signals, and rollback triggers.</Prompt>
    <Prompt id="4">Ask for a smallest shippable slice and next two iterations.</Prompt>
    <Prompt id="5">Ask for common anti-patterns relevant to this scenario.</Prompt>
    <Prompt id="6">Ask for ownership map and expected review checkpoints.</Prompt>
  </Family>
  <Family name="Incident">
    <Prompt id="1">Ask for 3 options with explicit constraints and irreversible decisions highlighted.</Prompt>
    <Prompt id="2">Ask for measurable acceptance criteria and validation methods.</Prompt>
    <Prompt id="3">Ask for failure modes, monitoring signals, and rollback triggers.</Prompt>
    <Prompt id="4">Ask for a smallest shippable slice and next two iterations.</Prompt>
    <Prompt id="5">Ask for common anti-patterns relevant to this scenario.</Prompt>
    <Prompt id="6">Ask for ownership map and expected review checkpoints.</Prompt>
  </Family>
  <Family name="Leadership">
    <Prompt id="1">Ask for 3 options with explicit constraints and irreversible decisions highlighted.</Prompt>
    <Prompt id="2">Ask for measurable acceptance criteria and validation methods.</Prompt>
    <Prompt id="3">Ask for failure modes, monitoring signals, and rollback triggers.</Prompt>
    <Prompt id="4">Ask for a smallest shippable slice and next two iterations.</Prompt>
    <Prompt id="5">Ask for common anti-patterns relevant to this scenario.</Prompt>
    <Prompt id="6">Ask for ownership map and expected review checkpoints.</Prompt>
  </Family>
  <Family name="Data">
    <Prompt id="1">Ask for 3 options with explicit constraints and irreversible decisions highlighted.</Prompt>
    <Prompt id="2">Ask for measurable acceptance criteria and validation methods.</Prompt>
    <Prompt id="3">Ask for failure modes, monitoring signals, and rollback triggers.</Prompt>
    <Prompt id="4">Ask for a smallest shippable slice and next two iterations.</Prompt>
    <Prompt id="5">Ask for common anti-patterns relevant to this scenario.</Prompt>
    <Prompt id="6">Ask for ownership map and expected review checkpoints.</Prompt>
  </Family>
  <Family name="Frontend UX">
    <Prompt id="1">Ask for 3 options with explicit constraints and irreversible decisions highlighted.</Prompt>
    <Prompt id="2">Ask for measurable acceptance criteria and validation methods.</Prompt>
    <Prompt id="3">Ask for failure modes, monitoring signals, and rollback triggers.</Prompt>
    <Prompt id="4">Ask for a smallest shippable slice and next two iterations.</Prompt>
    <Prompt id="5">Ask for common anti-patterns relevant to this scenario.</Prompt>
    <Prompt id="6">Ask for ownership map and expected review checkpoints.</Prompt>
  </Family>
</PromptFamilies>
```

### Anti-Patterns To Avoid (Categorized for LLM)
```json
{
  "anti_patterns": [
    { "id": "AP-001", "name": "Over-generalizing too early", "detection": "Abstract classes with single implementation" },
    { "id": "AP-002", "name": "Choosing tools based on hype over fit", "detection": "New tech introduced without tradeoff analysis" },
    { "id": "AP-003", "name": "Ignoring operational ownership", "detection": "No on-call rotation defined" },
    { "id": "AP-004", "name": "Treating tests as optional for critical paths", "detection": "Coverage <80% on critical modules" },
    { "id": "AP-005", "name": "Confusing throughput with user value", "detection": "Feature shipped but no metric movement" },
    { "id": "AP-006", "name": "Hiding risk behind optimistic estimates", "detection": "No pre-mortem or risk buffer in plan" },
    { "id": "AP-007", "name": "Adding abstractions without reducing complexity", "detection": "More files, same cognitive load" },
    { "id": "AP-008", "name": "Building dashboards without actionable alerts", "detection": "Dashboards exist but no one responds to them" },
    { "id": "AP-009", "name": "Delaying security modeling until release phase", "detection": "Security review requested just before launch" },
    { "id": "AP-010", "name": "Skipping post-incident learning loops", "detection": "Incidents recur with same root cause" },
    { "id": "AP-011", "name": "Expanding scope while quality bar drops", "detection": "Feature creep without corresponding test coverage" },
    { "id": "AP-012", "name": "Assuming cache invalidation is trivial", "detection": "No invalidation strategy documented" },
    { "id": "AP-013", "name": "Allowing silent breaking changes in APIs", "detection": "No contract testing or versioning" },
    { "id": "AP-014", "name": "Letting flaky tests normalize poor signal", "detection": "Team ignores red CI builds" },
    { "id": "AP-015", "name": "Running migrations without rollback proof", "detection": "No down migration tested" },
    { "id": "AP-016", "name": "Deploying without feature gating on risky paths", "detection": "Rollback requires full redeploy" },
    { "id": "AP-017", "name": "Using one environment as a testing substitute", "detection": "Staging is also dev playground" },
    { "id": "AP-018", "name": "Documenting what changed but not why", "detection": "Commit messages are 'fix bug'" },
    { "id": "AP-019", "name": "Ignoring accessibility under deadline pressure", "detection": "Keyboard navigation broken in new feature" },
    { "id": "AP-020", "name": "Optimizing averages while tail latency worsens", "detection": "p99 latency increasing while mean is flat" },
    { "id": "AP-021", "name": "Reviewing code style while missing behavior regressions", "detection": "PR comments only about formatting" },
    { "id": "AP-022", "name": "Keeping dead feature flags indefinitely", "detection": "Flag cleanup never prioritized" },
    { "id": "AP-023", "name": "Coupling release windows to one individual", "detection": "Only one person can deploy" },
    { "id": "AP-024", "name": "Failing to define data ownership", "detection": "No one knows who owns a given table" },
    { "id": "AP-025", "name": "Assuming incidents are only technical failures", "detection": "Postmortems never mention process or communication" }
  ]
}
```

### Interview-Grade Self Checks
```json
{
  "self_checks": [
    { "id": "SC-01", "question": "Can I explain this architecture to a new engineer in 10 minutes?" },
    { "id": "SC-02", "question": "Can I prove the bottleneck with data, not intuition?" },
    { "id": "SC-03", "question": "Can this change be rolled back safely under pressure?" },
    { "id": "SC-04", "question": "Can this component fail without cascading system failure?" },
    { "id": "SC-05", "question": "Can we detect silent data corruption quickly?" },
    { "id": "SC-06", "question": "Can we run this service with least privilege from day one?" },
    { "id": "SC-07", "question": "Can we test this behavior deterministically?" },
    { "id": "SC-08", "question": "Can we migrate this model with no prolonged downtime?" },
    { "id": "SC-09", "question": "Can we trace one user action across services end to end?" },
    { "id": "SC-10", "question": "Can we quantify outcome impact after release?" },
    { "id": "SC-11", "question": "Can another engineer operate this system without tribal knowledge?" },
    { "id": "SC-12", "question": "Can we prioritize defects by user harm, not internal convenience?" }
  ]
}
```

## Appendix: Continuous Growth Loop & Reflection Prompts
```yaml
continuous_growth_loop:
  - step: 1
    action: "Observe recurring pain points in delivery and operations."
  - step: 2
    action: "Convert pain points into explicit engineering standards."
  - step: 3
    action: "Automate standard checks in CI and release gates."
  - step: 4
    action: "Coach team on the rationale and tradeoffs behind standards."
  - step: 5
    action: "Measure adoption and quality impact of each standard."
  - step: 6
    action: "Remove standards that do not produce measurable value."
  - step: 7
    action: "Revisit standards quarterly to reflect product and scale changes."
  - step: 8
    action: "Publish short internal notes so lessons survive team turnover."
  - step: 9
    action: "Track improvement hypotheses like product experiments."
  - step: 10
    action: "Reward measurable quality improvements in planning cycles."

reflection_prompts:
  - id: "RP-0001"
    text: "What assumption is least certain right now, and what is the smallest experiment to validate it within one iteration?"
  - id: "RP-0002"
    text: "What part of the system is most likely to cause a 3am page, and why?"
  - id: "RP-0003"
    text: "If we had to cut 50% of the planned scope, what would we keep and why?"
  - id: "RP-0004"
    text: "What recent decision would I reverse if I had more information?"
  - id: "RP-0005"
    text: "What tribal knowledge exists that would be lost if a key person left?"
  - id: "RP-0006"
    text: "What metric would tell us we're building the wrong thing?"
  - id: "RP-0007"
    text: "What is the cost of delay for our current highest priority item?"
  - id: "RP-0008"
    text: "Where are we accepting manual toil that could be automated?"
  - id: "RP-0009"
    text: "What feedback loop is currently broken or too slow?"
  - id: "RP-0010"
    text: "What would I change about our architecture if starting from scratch today?"
  - id: "RP-0011"
    text: "What is the single biggest risk to our next release?"
  - id: "RP-0012"
    text: "What technical investment would pay the highest dividends over the next year?"
  - id: "RP-0013"
    text: "Where are we optimizing for developer convenience over user experience?"
  - id: "RP-0014"
    text: "What is the implicit SLA we're promising to users?"
  - id: "RP-0015"
    text: "What would a new team member find most confusing about our system?"
  - id: "RP-0016"
    text: "What failure mode have we not practiced recovering from?"
  - id: "RP-0017"
    text: "What data would be most damaging if it leaked?"
  - id: "RP-0018"
    text: "What is our current error budget burn rate and what does it tell us?"
  - id: "RP-0019"
    text: "What process is followed but no longer adds value?"
  - id: "RP-0020"
    text: "What would make our on-call rotation less stressful?"
```

---

**END OF ENHANCED SKILLS.MD v2.0**
*This document is designed to be both human-readable and machine-parseable. LLMs should extract the YAML/JSON/XML blocks for constraints and reference maps to prevent hallucination. Validate all proposals against the Codebase Reference Map in Part 0.*
```