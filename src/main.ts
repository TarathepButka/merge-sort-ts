import { merge } from "./merge";

// Demo: Merge three collections into a single sorted array
const collection1: number[] = [1, 3, 5, 7, 9];      // ascending
const collection2: number[] = [10, 8, 6, 4, 0];     // descendings
const collection3: number[] = [0, 11, 12, 13, 14];  // ascending

const result: number[] = merge(collection1, collection2, collection3);

console.log("Collection 1 (asc):", collection1);
console.log("Collection 2 (desc):", collection2);
console.log("Collection 3 (asc):", collection3);
console.log("─".repeat(50));
console.log("Merged result (asc):", result);
