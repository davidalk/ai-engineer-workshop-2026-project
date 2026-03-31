---
name: write-a-prd
description: Generate a PRD from the client brief and write it as a local markdown file in issues/. Use when the user wants to turn a client request into a structured PRD.
---

# Write a PRD

Read the client brief and generate a structured PRD, then write it to `issues/prd.md`.

## How to run

1. Read `client-brief.md` to understand what the client wants.
2. If the user has pointed you at additional context (existing code, past decisions), read that too.
3. Write a PRD to `issues/prd.md` using the structure below.
4. Tell the user where the file was written and ask if they want to review or iterate.

## PRD structure

```markdown
# PRD: [Title]

## Problem Statement

[What problem are we solving and why does it matter?]

## Solution

[High-level description of what we're building.]

## User Stories

[Numbered list: "As a [role], I want [capability], so that [benefit]."]

## Implementation Decisions

[Key technical choices, constraints, and trade-offs.]

## Testing Decisions

[How will we verify this works? What tests are needed?]

## Out of Scope

[Explicitly list what we are NOT building in this iteration.]

## Further Notes

[Anything else relevant — open questions, risks, dependencies.]
```

## Rules

- Write the PRD to `issues/prd.md`. Create the `issues/` directory if it doesn't exist.
- Do not submit a GitHub issue or call any external service.
- Keep user stories focused and independently testable.
- Be specific in implementation decisions — vague decisions create ambiguous work.
- "Out of scope" is as important as scope — include it.
