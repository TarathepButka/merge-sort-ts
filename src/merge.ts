/**
 * Merges three integer arrays into a single array sorted in ascending order.
 *
 * Given:
 * - `collection1` is sorted ascending (min(0) → max)
 * - `collection2` is sorted descending (max → min(0))
 * - `collection3` is sorted ascending (min(0) → max)
 * - No built-in sort functions are used.
 *
 * Strategy:
 * - collection1 (asc): read forward  → pointer i starts at 0, increments
 * - collection2 (desc): read backward → pointer j starts at end, decrements
 * - collection3 (asc): read forward  → pointer k starts at 0, increments
 * - 3-way merge picks the smallest head each step → O(n) time.
 *
 * @param collection1 - Array sorted ascending
 * @param collection2 - Array sorted descending
 * @param collection3 - Array sorted ascending
 * @returns A new array containing all elements sorted in ascending order
 */
export function merge(
  collection1: readonly number[],
  collection2: readonly number[],
  collection3: readonly number[]
): number[] {
  const totalLength: number =
    collection1.length + collection2.length + collection3.length;
  const result: number[] = new Array(totalLength);

  let i: number = 0;                        // pointer for collection1 (asc → forward)
  let j: number = collection2.length - 1;   // pointer for collection2 (desc → backward)
  let k: number = 0;                        // pointer for collection3 (asc → forward)
  let r: number = 0;                        // pointer for result

  // --- 3-way merge: all three arrays still have elements ---
  while (i < collection1.length && j >= 0 && k < collection3.length) {
    if (collection1[i] <= collection2[j] && collection1[i] <= collection3[k]) {
      result[r++] = collection1[i++];
    } else if (collection2[j] <= collection1[i] && collection2[j] <= collection3[k]) {
      result[r++] = collection2[j--];
    } else {
      result[r++] = collection3[k++];
    }
  }

  // --- 2-way merges: one array exhausted, two remain ---
  while (i < collection1.length && j >= 0) {
    if (collection1[i] <= collection2[j]) {
      result[r++] = collection1[i++];
    } else {
      result[r++] = collection2[j--];
    }
  }

  while (i < collection1.length && k < collection3.length) {
    if (collection1[i] <= collection3[k]) {
      result[r++] = collection1[i++];
    } else {
      result[r++] = collection3[k++];
    }
  }

  while (j >= 0 && k < collection3.length) {
    if (collection2[j] <= collection3[k]) {
      result[r++] = collection2[j--];
    } else {
      result[r++] = collection3[k++];
    }
  }

  // --- Drain: only one array left ---
  while (i < collection1.length) {
    result[r++] = collection1[i++];
  }

  while (j >= 0) {
    result[r++] = collection2[j--];
  }

  while (k < collection3.length) {
    result[r++] = collection3[k++];
  }

  return result;
}
