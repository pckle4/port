# Optimization Execution Checklist

- `[x]` Remove global loader blocking from `app.ts` & `app.html`
- `[x]` Remove `isLoading` timeout blocks and `@defer` from `home.ts` & `home.html`
- `[x]` Delete obsolete UI components logic (Files will be tree-shaken by Angular's production compiler `esbuild`)
- `[x]` Verify component imports to ensure 100% removal of dead code
