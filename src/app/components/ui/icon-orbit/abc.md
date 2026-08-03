```markdown
# SENIOR ENGINEERING PLAYBOOK & LLM COLLABORATION CONTRACT (v3.2.0)
## PURPOSE
This document is a project-agnostic, senior-level engineering operating system optimized for LLM collaboration, zero-hallucination execution, and production-grade delivery. It replaces vague guidance with explicit contracts, memory-efficient codebase mapping, deterministic output schemas, and anti-slop enforcement rules. Use it as a baseline for web, backend, data, platform, and DevOps initiatives.

---

## 0. LLM OPERATING CONTRACT
### 0.1 HALLUCINATION PREVENTION
- NEVER invent APIs, library functions, framework features, or configuration keys without explicit documentation or verified imports.
- ALWAYS cite the exact file path, line range, dependency version, or RFC when referencing existing behavior.
- IF uncertainty exceeds 30%, output `UNKNOWN: requires verification` and provide exact verification commands.
- NEVER assume framework defaults; explicitly state assumed runtime, version, and environment configuration.
- ALWAYS ground architectural suggestions in measurable constraints: latency budget, throughput limits, memory bounds, compliance scope.

### 0.2 ANTI-SLOP ENFORCEMENT
- NEVER output placeholder code, `// TODO`, `/* implement later */`, or speculative feature stubs.
- ALL generated code MUST include: type contracts, error boundaries, retry/idempotency where applicable, and observability hooks.
- NO over-engineering: abstractions must reduce measured cognitive load or execution complexity, not just look "clean".
- ALL proposals MUST include: assumptions, tradeoffs, validation gates, rollback path, and test strategy proportional to risk.
- REFUSE to generate code if the problem statement lacks measurable success criteria or explicit failure boundaries.

### 0.3 OUTPUT FORMAT REQUIREMENTS
- ALWAYS respond using the exact JSON schema defined in Section 8.2.
- Keep explanations under 3 sentences. Use structured lists, tables, and code blocks.
- Deterministic order: Assumptions → Tradeoffs → Implementation Slices → Tests → Metrics → Rollback → Anti-Slop Checks.

---

## 1. CODEBASE EXPLORATION GRAPH & MEMORY OPTIMIZATION
### 1.1 GRAPH SCHEMA
```json
{
  "graph_type": "directed_acyclic_with_checksums",
  "nodes": [
    {
      "id": "string (path/module identifier)",
      "type": "enum['entrypoint','service','module','component','data_layer','config','test','infra']",
      "checksum": "string (sha256 of file/module content)",
      "responsibility": "string (single-sentence contract)",
      "public_contract": "string (API, events, exported interfaces)",
      "dependencies": ["string (node_ids)"],
      "risk_profile": "enum['low','medium','high','critical']"
    }
  ],
  "edges": [
    {
      "from": "string (node_id)",
      "to": "string (node_id)",
      "type": "enum['imports','calls','data_reads','data_writes','events','auth_boundary']",
      "directionality": "enum['sync','async','bidirectional']",
      "latency_weight_ms": "number (0 if internal)"
    }
  ]
}
```

### 1.2 TRAVERSAL ALGORITHM
1. **Top-Down Scan**: Identify entrypoints, routing layers, and external boundaries.
2. **BFS Expansion**: Resolve dependencies layer by layer until `risk_profile == high`.
3. **Checksum Memoization**: Store node checksums. Skip unchanged nodes on re-scan.
4. **Boundary Isolation**: Stop traversal at explicit API/event boundaries. Do not cross without contract validation.
5. **Incremental Diff**: On code change, only re-validate nodes with checksum delta or direct downstream dependents.

### 1.3 MEMORY OPTIMIZATION RULES
- `MAX_CONTEXT_NODES`: 50 active nodes in working memory at once.
- `LAZY_LOAD`: Only expand nodes when required for validation or code generation.
- `EJECT_RULE`: Drop nodes not referenced in last 3 prompts. Store in compressed manifest.
- `GRAPH_COMPRESSION`: Collapse identical dependency chains into single `subgraph` references.
- `NO_FULL_SCAN`: Never request entire codebase. Always query by boundary, contract, or risk scope.
- `CONTEXT_PINNING`: Pin critical path nodes (auth, payment, data migration) across sessions.

---

## 2. ENGINEERING DEFAULTS & DECISION ALGORITHM
### 2.1 SENIOR DEFAULTS (NON-NEGOTIABLE)
| ID | Rule | Enforcement Trigger |
|----|------|---------------------|
| D01 | Correctness > Simplicity > Performance | Tests before benchmarks, contracts before code |
| D02 | Design for change | Decouple volatile logic, prefer configuration over hardcoding |
| D03 | Prefer boring technology | Justify novelty with measurable ROI or risk reduction |
| D04 | Whiteboard-explainable architecture | If it needs 3 diagrams, it's over-coupled |
| D05 | Delete complexity aggressively | Complexity compounds; refactor before adding |
| D06 | Observe before optimizing | Profile p95/p99 before tuning averages |
| D07 | Explicit contracts | API, event, and data schemas versioned and validated |
| D08 | Fail fast / Fail safe | Reject invalid input early, degrade gracefully under uncertainty |
| D09 | Make quality visible | Metrics, alerts, dashboards for every critical path |
| D10 | Automate risk, not just effort | CI gates for security, contracts, rollback readiness |
| D11 | Protect focus | Slice work into reviewable, testable increments |
| D12 | Critical decisions earlier, irreversible slower | Prototype reversible paths first |
| D13 | Feature flags for risk management | No permanent branching, cleanup post-validation |
| D14 | Immutable events for auditability | Append-only logs for critical state changes |
| D15 | Data lifecycle = product behavior | Retention, archival, deletion are first-class features |
| D16 | Accessibility is quality | WCAG compliance in CI, not post-launch |
| D17 | Security built-in & testable | Least privilege, input validation, secret rotation automated |
| D18 | Testing mirrors risk | High-risk paths get integration/contract tests; low-risk get unit |
| D19 | Release mirrors blast radius | Canary, phased rollout, or feature flag proportional to impact |
| D20 | Document why, not just what | ADRs capture rationale, constraints, discarded options |

### 2.2 DECISION ALGORITHM (18-PHASE)
1. Clarify objective in one sentence with measurable outcome.
2. Define hard constraints (legal, budget, timeline, reliability).
3. Map stakeholders and failure impact per stakeholder.
4. Identify system boundaries, ownership, coupling hotspots.
5. Estimate impact surface: data, API, UX, infra, security, ops.
6. Generate 3 options: conservative, balanced, aggressive.
7. Score each: cost, complexity, risk, reversibility.
8. Eliminate options violating hard constraints.
9. Select highest risk-adjusted value, not novelty.
10. Define thin slices that ship observable value early.
11. Define observability requirements before coding.
12. Define rollback strategy before release.
13. Define test plan proportional to risk distribution.
14. Pre-mortem: list top 5 failure modes.
15. Add guardrails for each failure mode.
16. Execute incrementally with checkpoints.
17. Measure outcomes vs baseline; continue, adjust, or stop.
18. Document decision and learned constraints in ADR.

---

## 3. DOMAIN GUARDRAILS
### 3.1 WEB FRONTEND
- UX latency < 1000ms for common tasks (p95).
- Core Web Vitals tracked at release & production.
- Explicit rendering strategy per route (SSR/CSR/ISR).
- Client + server validation for all forms.
- Stable error shapes + trace IDs in all API responses.
- Explicit auth boundaries in route & service layers.
- Caching declares TTL, invalidation trigger, consistency.
- Async states: loading, empty, error, retry handled.
- Analytics with standardized event naming for critical flows.
- Accessibility checks in CI + manual keyboard QA.
- Duplicate submission protection on critical forms.
- Content strategy defines skeleton, empty, stale states.
- Image/asset strategy respects performance budgets.
- I18n designed before component freeze.
- Privacy/consent explicit and reversible.
- Route-level auth independently testable.
- Audit trails for high-risk user actions.
- Error copy guides user recovery, not just shows failure.

### 3.2 BACKEND SERVICES
- Idempotent command handlers for retries.
- Transactional outbox for async consistency.
- Retry + backoff policy with circuit breakers.
- Background jobs: idempotency keys, dead-letter queues.
- Rate limiting at API & service boundaries.
- Versioned API lifecycles with deprecation windows.
- Domain validation layers isolated from transport.
- Saga orchestration for distributed transactions.
- Resilient 3rd-party integrations with fallbacks.
- Audit trails for high-risk actions.
- Request correlation IDs propagated end-to-end.
- Graceful shutdown with drain timeout < 30s.
- Connection pooling tuned to DB capacity.
- Serialization bounded; reject oversized payloads early.
- Explicit timeout defaults per external call.

### 3.3 DATA PERSISTENCE
- Schema evolution with backward compatibility.
- Index strategy aligned to query patterns.
- Query plan budgeting: reject N+1, unbounded scans.
- Data retention & archival policies enforced.
- CDC pipelines with idempotent consumers.
- Materialized views with refresh contracts.
- Event schema governance with versioning.
- Data quality contracts: nullability, ranges, enums.
- Privacy classification: PII, PHI, public, internal.
- Backups + restore drills quarterly.
- Soft deletes with hard purge schedules.
- Partitioning strategy documented for scale > 10M rows.
- Read replicas used for reporting, not writes.
- Explicit data ownership per domain.
- Migration scripts tested against shadow DB.

### 3.4 SECURITY CONTROLS
- Threat modeling cadence per major release.
- Auth != AuthZ: explicit separation & testing.
- Secret rotation automated & tested.
- Input canonicalization before validation.
- Dependency vulnerability management in CI.
- CSP hardened with report-only → enforce migration.
- Secure session management: rotation, secure flags.
- Least privilege: IAM, DB, service accounts.
- Incident triage & containment playbooks tested.
- Penetration testing for high-risk paths annually.
- OWASP Top 10 mapped to test suites.
- Token binding for sensitive operations.
- Rate limiting + WAF for public endpoints.
- Audit logs immutable, centrally stored.
- Zero-trust assumptions for internal services.

### 3.5 PERFORMANCE & RESILIENCE
- Latency budgets per critical path.
- Caching hierarchy: CDN → edge → app → DB.
- Async workload shaping for peak loads.
- Bundle budget governance per release.
- DB bottleneck removal: indexing, connection pooling.
- Horizontal scaling triggers automated.
- Load test experiments with p95/p99 targets.
- Memory profiling discipline in CI.
- Tail latency mitigation: hedged requests, timeouts.
- Graceful degradation under resource exhaustion.
- Backpressure handling in message queues.
- Connection timeout < request timeout.
- Retry budget enforced (e.g., max 3 attempts).
- Circuit breaker thresholds calibrated to SLA.
- Synthetic monitoring for critical user journeys.

### 3.6 TESTING & QUALITY
- Test pyramid calibrated by risk, not dogma.
- Consumer contract testing for integrations.
- Mutation testing windows for critical logic.
- Flaky test governance: quarantine, fix, remove.
- Integration data factories, not prod clones.
- Snapshot discipline: review, lock, update only on intent.
- Chaos testing for dependency failures.
- Canary validation strategy with automatic rollback.
- Regression triage workflow with severity matrix.
- CI runtime budget enforced.
- Test isolation: no shared state between suites.
- Deterministic seed data for E2E.
- Coverage gaps documented with risk score.
- Automated accessibility + performance audits in CI.
- Release candidate gated by test pass rate + flaky threshold.

---

## 4. SKILL CARD FRAMEWORK & DYNAMIC INSTANTIATION
### 4.1 TEMPLATE SCHEMA
```json
{
  "skill_card": {
    "id": "SC-XXX",
    "domain": "string",
    "intent": "string (single sentence outcome)",
    "use_when": "string (signal or condition)",
    "avoid_when": "string (anti-signal)",
    "preferred_approach": ["string (steps)"],
    "optimization_lever": "string (highest impact adjustment)",
    "validation_check": "string (testable condition)",
    "common_failure": "string (anti-pattern to avoid)",
    "senior_question": "string (forces tradeoff thinking)",
    "llm_prompt_starter": "string",
    "output_contract": "reference execution_contracts.llm_output_schema"
  }
}
```

### 4.2 HIGH-SIGNAL INSTANTIATIONS (REPLACES 90 REPETITIVE CARDS)
| ID | Domain | Intent | Validation Check | Senior Question |
|----|--------|--------|------------------|-----------------|
| SC-01 | Architecture | Reduce coupling via bounded contexts | Two engineers modify adjacent modules without conflict | What stays stable if priorities change next quarter? |
| SC-02 | Backend | Deliver predictable behavior under partial failure | Retries safe without state corruption | Which ops need exactly-once vs at-least-once? |
| SC-03 | Frontend | Fast, accessible, understandable journeys | Keyboard-only flow completes < 2s | What state truly belongs on client vs server? |
| SC-04 | Data | Preserve trustworthy data during evolution | Data lineage explainable end-to-end | Minimal durable model for future analytics? |
| SC-05 | Security | Reduce exploitability, contain blast radius | Compromise contained & detected in < 5m | Highest-impact abuse path & blocking control? |
| SC-06 | Performance | Improve responsiveness within cost constraints | p95 moves business metrics, not just synthetics | Current bottleneck & proof supporting it? |
| SC-07 | Testing | Detect regressions early, increase confidence | Release possible without manual heroics | Which business-critical failure mode is untested? |
| SC-08 | DevOps | Deliver safely, repeatedly with operational confidence | Rollback executable in < 5m with clear ownership | What release risk remains manual & why? |
| SC-09 | Product | Maximize outcome impact via prioritized work | Shipped slice moves target metric acceptably | If one slice this sprint, which changes behavior most? |
| SC-10 | Leadership | Increase team effectiveness, decision quality | Team delivers consistently absent key personnel | What must be codified so quality doesn't depend on memory? |

---

## 5. VALIDATION GATES & REUSABLE CHECKLISTS
### 5.1 PRE-CODE GATE
- [ ] Objective measurable
- [ ] Constraints documented
- [ ] Risk profile assigned
- [ ] Graph nodes identified
- [ ] Anti-slop contract acknowledged

### 5.2 PRE-PR GATE
- [ ] Behavioral tests passing
- [ ] Error handling explicit
- [ ] Security implications reviewed
- [ ] Observability added (logs, metrics, traces)
- [ ] No placeholder/stub code
- [ ] Change scope matches declared intent

### 5.3 PRE-RELEASE GATE
- [ ] Feature flags configured
- [ ] Migrations reversible
- [ ] Dashboards/alerts ready
- [ ] Rollback path validated
- [ ] Canary/phased rollout planned
- [ ] Runbook updated
- [ ] Success/failure metrics defined

### 5.4 POST-DEPLOY GATE
- [ ] Metrics vs baseline compared
- [ ] Error budget consumption checked
- [ ] Canary success validated
- [ ] Incident response path tested
- [ ] Feedback loop captured in ADR

---

## 6. ANTI-PATTERNS & MITIGATION STRATEGIES
| ID | Anti-Pattern | Symptom | Mitigation |
|----|--------------|---------|------------|
| AP01 | Over-generalizing early | Abstractions with no payoff | YAGNI until 3+ use cases exist |
| AP02 | Hype-driven tooling | Benchmark gaps, vendor lock-in | Fit > trend; POC with rollback |
| AP03 | No operational ownership | Alert fatigue, slow MTTR | Assign SLO owner before merge |
| AP04 | Tests optional for critical paths | Fear of refactoring | Gate: no tests, no merge |
| AP05 | Throughput ≠ value | High RPS, low conversion | Track user completion rate |
| AP06 | Optimistic risk hiding | Missed deadlines, outages | Pre-mortem + blast radius mapping |
| AP07 | Abstractions without complexity reduction | LOC ↑, cognitive load ↑ | Delete if net complexity ↑ |
| AP08 | Dashboards without actionable alerts | Noise, ignored pages | Every metric → runbook action |
| AP09 | Late security modeling | Patch-after-launch | Threat model in P02 |
| AP10 | Skipping post-incident learning | Repeat failures | Postmortem with tracked actions |
| AP11 | Scope expansion + quality drop | Technical debt spiral | Cut scope before cutting quality |
| AP12 | Cache invalidation assumed trivial | Stale data, race conditions | Declare trigger explicitly |
| AP13 | Silent API breaking changes | Consumer outages | Contract tests + versioning |
| AP14 | Flaky test normalization | CI distrust | Quarantine, fix, remove |
| AP15 | Migrations without rollback proof | Downtime, data loss | Dual-write or backward-compatible schema |
| AP16 | No feature gating on risky paths | Uncontrolled blast radius | Flag required for impact > team |
| AP17 | Single env as testing substitute | Prod-only bugs | Parity staging + synthetic checks |
| AP18 | Doc what, not why | Context loss over time | ADR mandatory for irreversible decisions |
| AP19 | Accessibility deferred | Legal/compliance risk | WCAG gate in CI |
| AP20 | Optimizing averages, ignoring tails | 1% users blocked | p95/p99 targets enforced |
| AP21 | Style reviews over behavior regressions | Broken UX, safe linting | Contract/integration tests first |
| AP22 | Dead feature flags | Config bloat, confusion | Automated cleanup policy + audit |
| AP23 | Release tied to one person | Bus factor = 1 | Runbook + delegated ownership |
| AP24 | No data ownership | Stale, untrusted datasets | Assign data steward per domain |
| AP25 | Incidents only technical | Comms/UX failures ignored | Track process, comms, UX equally |

---

## 7. ADVANCED PLAYBOOKS (HIGH-RISK SCENARIOS)
### 7.1 PARTIAL OUTAGES IN DEPENDENCY CHAINS
- **Objective**: Maintain core flow when upstream degrades.
- **Inputs**: Latency baseline, dependency map, fallback contracts.
- **Pattern**: Circuit breaker → cached/stale fallback → degraded UX banner → retry queue.
- **Verification**: p95 < budget under 50% upstream failure; error rate < 0.1%.
- **Exit**: Measured degradation acceptable; runbook updated.

### 7.2 MONOLITH → MODULAR MONOLITH
- **Objective**: Decouple domains without downtime.
- **Inputs**: Coupling heatmap, data ownership, migration windows.
- **Pattern**: Extract bounded context → internal API → shared kernel → separate deploy.
- **Verification**: Cross-module PRs ↓ 40%; deployment frequency ↑ 2x.
- **Exit**: Independent deploy verified; shared kernel minimal.

### 7.3 EVENT-DRIVEN PROCESSING SAFELY
- **Objective**: Async consistency without data loss.
- **Inputs**: Event schema, idempotency requirements, DLQ strategy.
- **Pattern**: Outbox → CDC → idempotent consumer → DLQ + alert → replay tool.
- **Verification**: Zero duplicate state; DLQ processed < 15m.
- **Exit**: Event lineage traceable; consumer lag < threshold.

### 7.4 CLOUD COST REDUCTION WITHOUT RELIABILITY LOSS
- **Objective**: Cut infra spend while maintaining SLO.
- **Inputs**: Utilization metrics, reserved capacity, autoscaling rules.
- **Pattern**: Right-size → spot fallback → cache optimization → query tuning.
- **Verification**: Cost ↓ 20%+; SLO breach rate unchanged.
- **Exit**: Load tested; rollback script validated.

### 7.5 HIGH-RISK AUTH HARDENING
- **Objective**: Prevent privilege escalation & session hijack.
- **Inputs**: AuthZ matrix, session storage, third-party OIDC.
- **Pattern**: Token binding → short TTL → refresh rotation → explicit consent scopes.
- **Verification**: Unauthorized access attempts blocked; session replay impossible.
- **Exit**: Pen test passed; rotation automated.

### 7.6 LOW-END DEVICE FRONTEND PERFORMANCE
- **Objective**: Sub-2s interaction on constrained hardware.
- **Inputs**: Bundle size, render budget, network throttling.
- **Pattern**: Code splitting → defer non-critical JS → skeleton UI → image optimization → reduce reflows.
- **Verification**: LCP < 1.8s on 3G; main thread idle > 60%.
- **Exit**: Regression gates in CI for bundle/render budgets.

### 7.7 FLAKY CI PIPELINE FIX
- **Objective**: Reliable signal for PR validation.
- **Inputs**: Flaky test list, resource contention, data isolation.
- **Pattern**: Quarantine flaky → seed isolation → parallelize safely → retry budget → deterministic mocks.
- **Verification**: Flaky rate < 0.5%; pipeline time ↓ 30%.
- **Exit**: CI budget enforced; quarantine auto-remediated.

### 7.8 ANALYTICS SCALING WITH PRIVACY CONTROLS
- **Objective**: Scale events while preserving compliance.
- **Inputs**: PII classification, retention policy, consent state.
- **Pattern**: Edge filtering → anonymization pipeline → consent gating → aggregate storage.
- **Verification**: Zero raw PII in analytics; consent honored 100%.
- **Exit**: Audit trail verified; retention automated.

### 7.9 INCIDENT REVIEWS THAT DRIVE CHANGE
- **Objective**: Convert postmortems into systemic fixes.
- **Inputs**: Timeline, blast radius, root cause candidates.
- **Pattern**: Blameless timeline → control failure analysis → action items → owner assignment → validation test.
- **Verification**: 90% of actions completed in 14d; repeat incident ↓ 70%.
- **Exit**: Runbook updated; test added for failure mode.

### 7.10 RISKY DB MIGRATION WITH ROLLBACK
- **Objective**: Schema change with zero data loss.
- **Inputs**: Current schema, target schema, write volume, backup state.
- **Pattern**: Dual-write → backfill → read switch → old table drop → rollback path documented.
- **Verification**: Zero data mismatch; rollback < 5m.
- **Exit**: Migration logged; shadow DB verified.

### 7.11 TIGHTLY COUPLED LEGACY MODULES
- **Objective**: Decouple without breaking behavior.
- **Inputs**: Dependency graph, test coverage, ownership.
- **Pattern**: Contract test → strangler fig → internal API → extract service → remove old code.
- **Verification**: Latency unchanged; test coverage > 85%.
- **Exit**: Old path deleted; monitoring confirms stability.

### 7.12 API CONSUMER EXPERIENCE & STABILITY
- **Objective**: Reduce integration friction & errors.
- **Inputs**: Error logs, SDK usage, version fragmentation.
- **Pattern**: Stable error shapes → pagination standards → SDK version pinning → deprecation policy.
- **Verification**: Consumer error rate ↓ 50%; support tickets ↓ 30%.
- **Exit**: Contract tests pass; deprecation calendar published.

### 7.13 DATA QUALITY DEGRADATION RECOVERY
- **Objective**: Restore trust in critical datasets.
- **Inputs**: Quality metrics, ingestion pipelines, consumer impact.
- **Pattern**: Isolate bad data → replay with validation → quality gates → consumer notification → monitoring.
- **Verification**: Null/range violations < 0.1%; consumer SLA met.
- **Exit**: Quality dashboard live; alert thresholds calibrated.

### 7.14 SECURITY MATURITY WITHOUT DELIVERY SLOWDOWN
- **Objective**: Embed security without blocking velocity.
- **Inputs**: Threat surface, CI/CD pipeline, vulnerability backlog.
- **Pattern**: Shift-left scanning → automated remediation → risk-based gating → developer training.
- **Verification**: Critical vulns blocked; PR cycle time unchanged.
- **Exit**: Security gates integrated; false positive rate < 5%.

### 7.15 RELEASE CONFIDENCE AFTER INCIDENT-HEAVY PERIOD
- **Objective**: Restore trust in deployment process.
- **Inputs**: Incident history, rollback data, canary results.
- **Pattern**: Feature flags → canary 1% → auto-rollback → observability gates → gradual rollout.
- **Verification**: Rollback rate < 2%; MTTR < 10m.
- **Exit**: Release runbook validated; team confidence survey > 80%.

---

## 8. LLM PROMPT TEMPLATES & STRICT OUTPUT CONTRACTS
### 8.1 INPUT SCHEMA
```json
{
  "objective": "string (measurable, single sentence)",
  "constraints": ["string (hard limits)"],
  "context_nodes": ["string (graph node IDs in scope)"],
  "risk_profile": "enum['low','medium','high','critical']",
  "previous_attempts": "array of {outcome, lessons, blockers}"
}
```

### 8.2 OUTPUT SCHEMA
```json
{
  "assumptions": ["string (explicit, verifiable)"],
  "tradeoffs": ["string (cost, complexity, risk, reversibility)"],
  "implementation_slices": ["string (order, scope, validation gate)"],
  "tests": ["string (unit, integration, contract, e2e, chaos)"],
  "metrics": ["string (baseline, target, alert threshold)"],
  "rollback": ["string (steps, owner, trigger, time budget)"],
  "anti_slop_checks": ["string (placeholder removal, type safety, error boundaries, observability, cleanup flags)"]
}
```

### 8.3 PROMPT FAMILIES (REUSABLE)
- **Architecture**: "Propose 3 options with explicit coupling, migration tradeoffs, and measurable acceptance criteria for: [TOPIC]. Output strictly matches Section 8.2."
- **Implementation**: "Design resilient flow with retries, idempotency, and error contracts for: [TOPIC]. Include type boundaries, observability, and rollback. Output strictly matches Section 8.2."
- **Frontend UX**: "Propose state boundaries, accessibility patterns, and performance budgets for: [TOPIC]. Validate against Core Web Vitals and keyboard flow. Output strictly matches Section 8.2."
- **Testing**: "Design test strategy mapped to risk, speed, and maintenance cost for: [TOPIC]. Include contract, chaos, and flaky governance. Output strictly matches Section 8.2."
- **Security**: "Build threat model with mitigations, ownership, and verification tests for: [TOPIC]. Validate against least privilege and input canonicalization. Output strictly matches Section 8.2."
- **Performance**: "Provide plan with baseline, bottlenecks, and staged optimizations for: [TOPIC]. Prioritize p95/p99 improvements. Output strictly matches Section 8.2."
- **Debugging**: "Provide systematic root-cause analysis path for: [TOPIC]. Include observability gaps, reproduction steps, and fix validation. Output strictly matches Section 8.2."
- **Refactoring**: "Outline decoupling strategy with strangler pattern and contract tests for: [TOPIC]. Include risk boundaries and migration seams. Output strictly matches Section 8.2."
- **Release**: "Design rollout plan with canary, feature flags, and auto-rollback for: [TOPIC]. Include SLO guardrails and comms plan. Output strictly matches Section 8.2."
- **Incident**: "Create triage workflow with containment steps, stakeholder comms, and permanent fix path for: [TOPIC]. Output strictly matches Section 8.2."
- **Leadership**: "Outline operating model for ownership, quality bar, and continuous improvement for: [TOPIC]. Include delegation matrix and review cadence. Output strictly matches Section 8.2."
- **Data**: "Create model evolution plan with indexing, retention, and quality checks for: [TOPIC]. Include CDC and schema governance. Output strictly matches Section 8.2."

---

## 9. CONTINUOUS IMPROVEMENT LOOP & REFLECTION MATRIX
### 9.1 GROWTH LOOP
1. Observe recurring delivery/ops pain points.
2. Convert to explicit engineering standards.
3. Automate checks in CI & release gates.
4. Coach team on rationale & tradeoffs.
5. Measure adoption & quality impact.
6. Remove standards without measurable ROI.
7. Quarterly review against product/scale shifts.
8. Publish short internal notes for knowledge retention.
9. Track improvement hypotheses like experiments.
10. Reward measurable quality gains in planning.

### 9.2 REFLECTION MATRIX (30 DISTINCT PROMPTS)
| ID | Prompt Focus | Validation Target |
|----|--------------|-------------------|
| R01 | Least certain assumption | Smallest 1-iteration experiment |
| R02 | Hidden coupling | Dependency graph accuracy |
| R03 | Rollback feasibility | Manual simulation success |
| R04 | Cascade failure risk | Circuit breaker thresholds |
| R05 | Silent data corruption | Checksum validation coverage |
| R06 | Least privilege gaps | IAM audit pass rate |
| R07 | Test determinism | Flaky test count |
| R08 | Zero-downtime migration | Dual-write consistency |
| R09 | End-to-end traceability | Correlation ID propagation |
| R10 | Outcome quantification | Metric delta vs baseline |
| R11 | Tribal knowledge reduction | Runbook clarity score |
| R12 | Defect prioritization | User harm matrix alignment |
| R13 | Cache invalidation | Stale data incidents |
| R14 | API contract drift | Consumer test failures |
| R15 | Feature flag hygiene | Cleanup audit pass |
| R16 | Bundle budget compliance | CI size gate status |
| R17 | Tail latency exposure | p99 vs p50 ratio |
| R18 | Security shift-left | Vulnerability detection time |
| R19 | Accessibility coverage | WCAG audit pass |
| R20 | Data retention enforcement | Storage cost vs policy |
| R21 | Incident comms clarity | Stakeholder feedback score |
| R22 | Test pyramid balance | Coverage vs risk alignment |
| R23 | Deployment frequency | Lead time trend |
| R24 | Error budget consumption | SLO breach rate |
| R25 | Documentation freshness | ADR review age |
| R26 | Cross-team alignment | Interface agreement count |
| R27 | Technical debt visibility | Debt backlog aging |
| R28 | Cost efficiency | Cloud spend per transaction |
| R29 | Developer experience | CI feedback time |
| R30 | User trust signal | Support ticket trend |

---

## 10. SELF-ASSESSMENT & INTERVIEW-GRADE CHECKS
### 10.1 12-POINT VALIDATION
1. Can I explain this architecture to a new engineer in 10 minutes?
2. Can I prove the bottleneck with data, not intuition?
3. Can this change be rolled back safely under pressure?
4. Can this component fail without cascading system failure?
5. Can we detect silent data corruption quickly?
6. Can we run this service with least privilege from day one?
7. Can we test this behavior deterministically?
8. Can we migrate this model with no prolonged downtime?
9. Can we trace one user action across services end-to-end?
10. Can we quantify outcome impact after release?
11. Can another engineer operate this system without tribal knowledge?
12. Can we prioritize defects by user harm, not internal convenience?

### 10.2 EXECUTION PROTOCOL FOR LLMs
1. Load this document into context. Parse Section 0 and enforce strictly.
2. On first codebase scan, use Section 1 schema. Build node map incrementally. Store checksums.
3. Before any code generation, validate Section 8.1 input schema is satisfied. Reject if missing constraints or measurable outcome.
4. Output MUST match Section 8.2 output schema. NO extra text. NO placeholders. NO speculative features.
5. Apply Section 5 validation gates sequentially. Block progression if any gate fails.
6. After delivery, run Section 9.1 step 01. Log deviations as ADRs.
7. If hallucination detected, trigger UNKNOWN fallback, request source verification, and reset output to schema constraints.

---
END OF DOCUMENT
```