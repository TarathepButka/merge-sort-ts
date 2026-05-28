# Project: merge-sort-ts

## Overview

A TypeScript library implementing a custom merge function that combines three integer arrays into a single sorted (ascending) array **without using any built-in sort functions**. Uses a two-pointer merge technique from merge sort.

---

## Technology Stack

| Tool           | Version   | Purpose                          |
| -------------- | --------- | -------------------------------- |
| TypeScript     | ^5.x      | Language with strict type safety |
| Vitest         | ^3.x      | Unit testing framework           |
| Node.js        | ^20.x LTS | Runtime environment              |
| tsx            | ^4.x      | TypeScript execution (ts-node alternative) |

### Why Vitest over Jest?

- **~4–5x faster cold start** — uses esbuild for transpilation instead of Babel/ts-jest.
- **Native TypeScript & ESM support** — zero config, no `ts-jest` transformer needed.
- **HMR-based watch mode** — ~28x faster re-runs on file change.
- **Jest-compatible API** — `describe`, `it`, `expect` work identically.
- **Built-in coverage** via `v8` or `istanbul` — no extra packages.

---

## Project Structure

```
merge-sort-ts/
├── src/
│   ├── merge.ts              # Core merge function implementation
│   └── main.ts               # Demo entry point
├── tests/
│   └── merge.test.ts         # Unit tests (Vitest)
├── .gitignore
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── CLAUDE.md                 # This file — project conventions
└── README.md
```

### Conventions

- **Separate test folder** — tests live in `tests/` with `.test.ts` suffix, importing from `../src/`.
- **One module per file** — keep files focused and small.
- **Barrel exports are discouraged** unless the project grows significantly.

---

## TypeScript Best Practices

### Strict Configuration

Always enforce strict mode in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### Coding Conventions

1. **Prefer `readonly` arrays** for input parameters — signals immutability.
2. **Use explicit return types** on all exported functions.
3. **Prefer `unknown` over `any`** — use type guards for runtime checks.
4. **Use `const` by default** — only use `let` when reassignment is necessary.
5. **No magic numbers** — extract constants with descriptive names.
6. **Functional style** — avoid mutating input arrays; return new arrays.
7. **No built-in sort** — `Array.prototype.sort()` is prohibited in this project. All ordering must be done via manual pointer-based merging.

### Naming Conventions

| Entity     | Style          | Example               |
| ---------- | -------------- | --------------------- |
| Functions  | camelCase      | `mergeSortedArrays`   |
| Variables  | camelCase      | `leftIndex`           |
| Constants  | UPPER_SNAKE    | `DEFAULT_VALUE`       |
| Types      | PascalCase     | `MergeResult`         |
| Files      | kebab-case     | `merge-utils.ts`      |
| Test files | kebab-case     | `merge-utils.test.ts` |

---

## Unit Testing Best Practices (Vitest)

### Test Structure

```typescript
describe('functionName', () => {
  // Group by behavior
  describe('when given valid input', () => {
    it('should return expected result', () => {
      // Arrange
      const input = [1, 2, 3];
      // Act
      const result = functionName(input);
      // Assert
      expect(result).toEqual([1, 2, 3]);
    });
  });

  // Edge cases
  describe('edge cases', () => {
    it('should handle empty arrays', () => { /* ... */ });
    it('should handle single element arrays', () => { /* ... */ });
  });
});
```

### Testing Conventions

1. **Use descriptive test names** — describe the behavior, not the implementation.
2. **Follow AAA pattern** — Arrange, Act, Assert in every test.
3. **One assertion per concept** — a test can have multiple `expect` calls if they verify the same logical concept.
4. **Test edge cases explicitly**:
   - Empty arrays `[]`
   - Single-element arrays `[0]`, `[5]`
   - Arrays with duplicate values
   - Arrays with all zeros
   - Large arrays for performance validation
5. **Use `describe` blocks** to group related tests by scenario.
6. **Use `it` (not `test`)** for consistency and readability.
7. **Enable globals** in `vitest.config.ts` to avoid importing `describe`, `it`, `expect` in every file.
8. **Never use `.sort()` in test assertions** — if you need to verify order, assert the exact expected array.

### Coverage Targets

- **Statements**: 100%
- **Branches**: 100%
- **Functions**: 100%
- **Lines**: 100%

---

## Algorithm Notes

### Problem Specification

```
merge(collection_1: number[], collection_2: number[], collection_3: number[]): number[]
```

- `collection_1` — sorted ascending (min → max)
- `collection_2` — sorted descending (max → min)
- `collection_3` — sorted ascending (min → max)

**Returns**: A single array sorted in ascending order.

### Strategy

1. **Read `collection_2` backwards** (pointer starts at end, decrements) — since it's already descending, reading from the end yields ascending order. No copy or reverse needed.
2. **3-way pointer merge** — `collection_1` and `collection_3` read forward, `collection_2` reads backward. Each step picks the smallest head among the three.
3. **Time complexity**: O(n) single pass, where n = total elements across all arrays.
4. **Space complexity**: O(n) for the result array only — no extra intermediate arrays.

### Prohibited APIs

- `Array.prototype.sort()`
- `Array.prototype.toSorted()`
- Any third-party sorting library

---

## Commands Reference

| Action               | Command              |
| -------------------- | -------------------- |
| Install dependencies | `npm install`        |
| Run tests            | `npm test`           |
| Run tests (watch)    | `npm run test:watch` |
| Run tests (coverage) | `npm run test:cov`   |
| Execute main         | `npm start`          |
| Type check           | `npm run typecheck`  |
