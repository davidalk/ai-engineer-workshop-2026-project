---
name: prd-to-issues
description: Break a PRD into independently-workable issues and write each as a local markdown file in issues/. Use when the user wants to turn a PRD into a list of concrete tasks.
---

# PRD to Issues

Read the PRD and break it into independently-workable issues. Write each issue as a numbered markdown file in `issues/`.

## How to run

1. Read `issues/prd.md` (or ask the user which PRD file to use).
2. Identify all the work items implied by the PRD's user stories and implementation decisions.
3. Write each issue as a separate file using the naming pattern `issues/NNN-short-title.md` (e.g. `issues/001-add-user-auth.md`).
4. Number issues starting from the next available number (check what files already exist in `issues/`).
5. Tell the user how many issues were created and list their filenames.

## Issue file structure

```markdown
# Issue NNN: [Title]

## Parent PRD

[Filename of the PRD, e.g. `issues/prd.md`]

## What to build

[Clear description of what needs to be implemented. Specific enough that a developer can start without asking questions.]

## Acceptance criteria

- [ ] [Specific, verifiable condition]
- [ ] [Specific, verifiable condition]

## Blocked by

[List any issues (by filename) that must be completed first, or "None - can start immediately."]

## User stories addressed

[List the user story numbers from the PRD that this issue fulfills.]
```

## Rules

- Do NOT use `gh issue create` or any GitHub CLI commands.
- Do NOT reference GitHub issue numbers. Use local filenames (e.g. `issues/001-title.md`) for cross-references.
- Each issue should be independently completable — avoid issues that are just "do everything else first".
- Keep issues small enough to complete in one focused session.
- Acceptance criteria must be specific and verifiable, not vague ("works correctly" is not acceptable).
- Create the `issues/` directory if it doesn't exist.
