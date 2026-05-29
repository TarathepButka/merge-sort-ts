/**
 * An ascending iterator over a sorted array.
 * Abstracts away whether the underlying data is sorted asc or desc,
 * always yielding values from smallest to largest.
 */
interface AscendingIterator {
  /** `true` when every element has been consumed. */
  readonly done: boolean;
  /** The next (smallest remaining) value. Only valid when `done` is `false`. */
  readonly current: number;
  /** Advance the pointer to the next element. */
  advance(): void;
}

/** Iterate an ascending-sorted array from front to back. */
function forwardIterator(arr: readonly number[]): AscendingIterator {
  let i = 0;

  return {
    get done() {
      return i >= arr.length;
    },
    get current() {
      return arr[i];
    },
    advance() {
      i++;
    },
  };
}

/** Iterate a descending-sorted array from back to front (yielding ascending order). */
function reverseIterator(arr: readonly number[]): AscendingIterator {
  let i = arr.length - 1;

  return {
    get done() {
      return i < 0;
    },
    get current() {
      return arr[i];
    },
    advance() {
      i--;
    },
  };
}

/**
 * Merges three integer arrays into a single array sorted in ascending order.
 *
 * Given:
 * - `collection1` is sorted ascending  (min → max)
 * - `collection2` is sorted descending (max → min)
 * - `collection3` is sorted ascending  (min → max)
 * - No built-in sort functions are used.
 *
 * Strategy:
 * Each input is wrapped in an {@link AscendingIterator} that always yields
 * values from smallest to largest, regardless of the underlying sort order.
 * A single loop then picks the minimum `current` across all non-exhausted
 * iterators each step → O(n × k) time where k = number of arrays (3).
 *
 * @param collection1 - Array sorted ascending
 * @param collection2 - Array sorted descending
 * @param collection3 - Array sorted ascending
 * @returns A new array containing all elements sorted in ascending order
 */
export function merge(
  collection1: readonly number[],
  collection2: readonly number[],
  collection3: readonly number[],
): number[] {
  const iterators: AscendingIterator[] = [
    forwardIterator(collection1),
    reverseIterator(collection2),
    forwardIterator(collection3),
  ];

  const totalLength =
    collection1.length + collection2.length + collection3.length;
  const result = new Array<number>(totalLength);

  for (let r = 0; r < totalLength; r++) {
    let minIdx = -1;
    let minVal = Infinity;

    for (let s = 0; s < iterators.length; s++) {
      if (!iterators[s].done && iterators[s].current <= minVal) {
        minVal = iterators[s].current;
        minIdx = s;
      }
    }

    result[r] = minVal;
    iterators[minIdx].advance();
  }

  return result;
}
