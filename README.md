# merge-sort-ts

A TypeScript implementation of a custom **3-way merge** function that combines three integer arrays into a single sorted (ascending) array — **without using any built-in sort functions**.

## Problem Statement

```typescript
merge(collection_1: number[], collection_2: number[], collection_3: number[]): number[]
```

| Parameter      | Sort Order                |
| -------------- | ------------------------- |
| `collection_1` | Ascending (min → max)     |
| `collection_2` | Descending (max → min)    |
| `collection_3` | Ascending (min → max)     |

**Returns**: A single `number[]` sorted in ascending order containing all elements.

### Constraint

No built-in sort functions (`Array.sort()`, `Array.toSorted()`, etc.) are used.

## Algorithm

1. **Reverse** `collection_2` to make it ascending (O(n) pass).
2. **3-way pointer merge** — compare heads of all three arrays and pick the smallest at each step.
3. **Time complexity**: O(n) where n = total elements.
4. **Space complexity**: O(n) for the result array.

## Prerequisites

- [Node.js](https://nodejs.org/) **v20+** (LTS recommended)
- npm (comes with Node.js)

## Setup

```bash
# Clone or navigate to the project
cd merge-sort-ts

# Install dependencies
npm install
```

## Running the Code

```bash
# Execute the demo
npm start
```

Example output:

```
Collection 1 (asc): [ 1, 3, 5, 7, 9 ]
Collection 2 (desc): [ 10, 8, 6, 4, 2 ]
Collection 3 (asc): [ 0, 11, 12, 13, 14 ]
──────────────────────────────────────────────────
Merged result (asc): [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ]
```

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:cov
```

## Type Checking

```bash
npm run typecheck
```

## Project Structure

```
merge-sort-ts/
├── src/
│   ├── merge.ts          # Core merge function
│   ├── merge.test.ts     # Unit tests (Vitest)
│   └── main.ts           # Demo entry point
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── CLAUDE.md             # AI coding conventions
└── README.md
```

## Tech Stack

| Tool       | Purpose                                |
| ---------- | -------------------------------------- |
| TypeScript | Strict type safety                     |
| Vitest     | Fast unit testing (native TS support)  |
| tsx        | Run TypeScript directly without build  |

## License

MIT
