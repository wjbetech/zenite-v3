# Progress & Workflow

The most important things to consider when building out and using the workflow is clarity about what remains to be done and safety of the application/the application's developmental procedures.

1. **Docs-first Iteration**: Keep the documents inside the `/docs/` directory synchronized with confirmation and real-time choices. Record each major decision made in the `/docs/ADR.md` directory with issue number, branch, and date.
2. **Feature mapping**: Link architecture entries to `docs/features.md` items, e.g. `daily log`, `weekly spread`, `goals tracker`, so that each component and module understands its own specs.
3. **Full CI/CD**: Development and version control should be kept within a tight CI/CD pipeline so that the master branch is always kept clean. Development should be handled on the `dev` branch, and all active development should be handled on branches off of the `dev` branch following strict branch naming conventions. `feat/` for new features, `chore/` for chores, `bug/` for big fixes.
