import { merge } from "../src/merge";

describe("merge", () => {
  // ─── Basic Functionality ──────────────────────────────────────────────

  describe("when given typical sorted arrays", () => {
    it("should merge three arrays into a single ascending-sorted array", () => {
      // Arrange
      const collection1 = [1, 3, 5, 7];       // ascending
      const collection2 = [8, 6, 4, 2];       // descending
      const collection3 = [0, 9, 10, 11];     // ascending

      // Act
      const result = merge(collection1, collection2, collection3);

      // Assert
      expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    });

    it("should handle arrays with overlapping value ranges", () => {
      const collection1 = [1, 4, 7];          // ascending
      const collection2 = [6, 3, 1];          // descending
      const collection3 = [2, 5, 8];          // ascending

      const result = merge(collection1, collection2, collection3);

      expect(result).toEqual([1, 1, 2, 3, 4, 5, 6, 7, 8]);
    });

    it("should handle arrays with duplicate values across collections", () => {
      const collection1 = [1, 3, 5];
      const collection2 = [5, 3, 1];
      const collection3 = [1, 3, 5];

      const result = merge(collection1, collection2, collection3);

      expect(result).toEqual([1, 1, 1, 3, 3, 3, 5, 5, 5]);
    });
  });

  // ─── Edge Cases: Empty Arrays ─────────────────────────────────────────

  describe("edge cases with empty arrays", () => {
    it("should return empty array when all three arrays are empty", () => {
      const result = merge([], [], []);

      expect(result).toEqual([]);
    });

    it("should handle when only collection1 is empty", () => {
      const result = merge([], [5, 3, 1], [2, 4, 6]);

      expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("should handle when only collection2 is empty", () => {
      const result = merge([1, 3, 5], [], [2, 4, 6]);

      expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("should handle when only collection3 is empty", () => {
      const result = merge([1, 3, 5], [6, 4, 2], []);

      expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("should handle when two arrays are empty", () => {
      const result = merge([], [], [1, 2, 3]);

      expect(result).toEqual([1, 2, 3]);
    });

    it("should handle when collection1 and collection3 are empty (only desc array)", () => {
      const result = merge([], [9, 5, 2], []);

      expect(result).toEqual([2, 5, 9]);
    });
  });

  // ─── Edge Cases: Single Element Arrays ────────────────────────────────

  describe("edge cases with single-element arrays", () => {
    it("should merge three single-element arrays", () => {
      const result = merge([2], [3], [1]);

      expect(result).toEqual([1, 2, 3]);
    });

    it("should merge single-element arrays with same value", () => {
      const result = merge([5], [5], [5]);

      expect(result).toEqual([5, 5, 5]);
    });
  });

  // ─── Edge Cases: Zeros ────────────────────────────────────────────────

  describe("edge cases with zeros", () => {
    it("should handle arrays starting from 0", () => {
      const collection1 = [0, 2, 4];
      const collection2 = [3, 1, 0];
      const collection3 = [0, 5, 10];

      const result = merge(collection1, collection2, collection3);

      expect(result).toEqual([0, 0, 0, 1, 2, 3, 4, 5, 10]);
    });

    it("should handle all-zero arrays", () => {
      const result = merge([0, 0], [0, 0], [0, 0]);

      expect(result).toEqual([0, 0, 0, 0, 0, 0]);
    });
  });

  // ─── Arrays of Different Lengths ──────────────────────────────────────

  describe("arrays with different lengths", () => {
    it("should handle arrays of varying lengths", () => {
      const collection1 = [1];
      const collection2 = [10, 8, 6, 4, 2];
      const collection3 = [3, 5, 7];

      const result = merge(collection1, collection2, collection3);

      expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 10]);
    });

    it("should handle one very large array and two small ones", () => {
      const collection1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const collection2 = [20, 15];
      const collection3 = [11];

      const result = merge(collection1, collection2, collection3);

      expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 15, 20]);
    });
  });

  // ─── Immutability ─────────────────────────────────────────────────────

  describe("immutability", () => {
    it("should not mutate the input arrays", () => {
      const collection1 = [1, 3, 5];
      const collection2 = [6, 4, 2];
      const collection3 = [7, 8, 9];

      // Take copies before calling merge
      const copy1 = [...collection1];
      const copy2 = [...collection2];
      const copy3 = [...collection3];

      merge(collection1, collection2, collection3);

      expect(collection1).toEqual(copy1);
      expect(collection2).toEqual(copy2);
      expect(collection3).toEqual(copy3);
    });
  });

  // ─── Result Correctness Properties ────────────────────────────────────

  describe("result correctness", () => {
    it("should return an array whose length equals the sum of all input lengths", () => {
      const collection1 = [1, 3, 5, 7, 9];
      const collection2 = [10, 8, 6, 4, 2];
      const collection3 = [0, 11, 12];

      const result = merge(collection1, collection2, collection3);

      expect(result).toHaveLength(
        collection1.length + collection2.length + collection3.length
      );
    });

    it("should produce a result where every element is <= the next", () => {
      const collection1 = [2, 10, 20, 30];
      const collection2 = [25, 15, 5];
      const collection3 = [1, 8, 22];

      const result = merge(collection1, collection2, collection3);

      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i]).toBeLessThanOrEqual(result[i + 1]);
      }
    });

    it("should contain exactly the same elements as the inputs combined", () => {
      const collection1 = [3, 7, 11];
      const collection2 = [9, 4, 1];
      const collection3 = [2, 6, 10];

      const result = merge(collection1, collection2, collection3);

      // Verify every input element appears in the result the correct number of times
      const allInputs = [...collection1, ...collection2, ...collection3];
      expect(result).toHaveLength(allInputs.length);

      // Count occurrences — without using sort
      const countMap = (arr: number[]): Map<number, number> => {
        const map = new Map<number, number>();
        for (const n of arr) {
          map.set(n, (map.get(n) ?? 0) + 1);
        }
        return map;
      };

      expect(countMap(result)).toEqual(countMap(allInputs));
    });
  });

  // ─── Larger Input ─────────────────────────────────────────────────────

  describe("performance with larger inputs", () => {
    it("should correctly merge large arrays (1000 elements each)", () => {
      // Build ascending array: 0, 3, 6, 9, ...
      const collection1: number[] = [];
      for (let i = 0; i < 1000; i++) {
        collection1.push(i * 3);
      }

      // Build descending array: 2999, 2996, 2993, ...
      const collection2: number[] = [];
      for (let i = 0; i < 1000; i++) {
        collection2.push(2999 - i * 3);
      }

      // Build ascending array: 1, 4, 7, 10, ...
      const collection3: number[] = [];
      for (let i = 0; i < 1000; i++) {
        collection3.push(1 + i * 3);
      }

      const result = merge(collection1, collection2, collection3);

      expect(result).toHaveLength(3000);

      // Verify ascending order
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i]).toBeLessThanOrEqual(result[i + 1]);
      }
    });
  });
});
