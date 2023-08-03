function strongPasswordChecker(password) {
  const n = password.length;

  // Initialize variables to track the conditions
  let hasLower = false;
  let hasUpper = false;
  let hasDigit = false;
  let repeatingCount = 0;

  // Loop through the password to check conditions
  for (let i = 0; i < n; i++) {
    const char = password[i];

    if (char >= 'a' && char <= 'z') hasLower = true;
    if (char >= 'A' && char <= 'Z') hasUpper = true;
    if (char >= '0' && char <= '9') hasDigit = true;

    // Check for repeating characters
    if (i > 1 && char === password[i - 1] && char === password[i - 2]) {
      repeatingCount++;
    }
  }

  let steps = 0;

  // Check for the length condition
  if (n < 6) {
    steps = Math.max(6 - n, repeatingCount);
  } else if (n > 20) {
    let removeCount = n - 20;
    // Reduce removeCount by replacing 3 repeating characters with 1 replacement
    const reduction = Math.min(removeCount, Math.floor(repeatingCount / 2));
    removeCount -= reduction;
    steps = removeCount + repeatingCount;
  } else {
    steps = repeatingCount;
  }

  // Check for the other conditions
  const missingConditions = !hasLower + !hasUpper + !hasDigit;
  steps = Math.max(steps, missingConditions);

  return steps;
}

// Test cases
console.log(strongPasswordChecker('a')); // Output: 5
console.log(strongPasswordChecker('aA1')); // Output: 3
console.log(strongPasswordChecker('1337C0d3')); // Output: 0

export { strongPasswordChecker };
