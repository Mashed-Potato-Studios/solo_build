/**
 * Calculator module providing basic arithmetic operations
 */

export class Calculator {
  /**
   * Add two numbers
   * @param a First number
   * @param b Second number
   * @returns Sum of a and b
   */
  static add(a: number, b: number): number {
    return a + b;
  }

  /**
   * Subtract b from a
   * @param a First number
   * @param b Second number
   * @returns Difference of a and b
   */
  static subtract(a: number, b: number): number {
    return a - b;
  }

  /**
   * Multiply two numbers
   * @param a First number
   * @param b Second number
   * @returns Product of a and b
   */
  static multiply(a: number, b: number): number {
    return a * b;
  }

  /**
   * Divide a by b
   * @param a First number
   * @param b Second number
   * @returns Quotient of a and b
   * @throws Error if b is zero
   */
  static divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return a / b;
  }

  /**
   * Calculate the power of a raised to b
   * @param a Base
   * @param b Exponent
   * @returns a raised to the power of b
   */
  static power(a: number, b: number): number {
    return Math.pow(a, b);
  }
}
