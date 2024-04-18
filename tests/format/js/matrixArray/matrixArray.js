// Test file for array matrix formatting feature

// Single line array should remain unchanged
const testArray1 = [1, 2, 3, 4];

// Multiline array, already formatted
const testArray2 = [
    1, 2,
    3, 4
];

// Multiline array, needs reformatting
const testArray3 = [
    1, 2,
3, 4 
// Intentionally misaligned for testing
];

// Multiline array with more complex elements
const testArray4 = [
    [1, 2], [3, 4],
  [5, 6], [7, 8] // Intentionally misaligned for testing
];
