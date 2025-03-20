/**
 * String utility functions for common string operations
 */

export class StringUtils {
  /**
   * Capitalize the first letter of each word in a string
   * @param str Input string
   * @returns String with first letter of each word capitalized
   */
  static capitalize(str: string): string {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  /**
   * Reverse a string
   * @param str Input string
   * @returns Reversed string
   */
  static reverse(str: string): string {
    return str.split('').reverse().join('');
  }

  /**
   * Count the occurrences of a substring in a string
   * @param str Input string
   * @param substr Substring to count
   * @returns Number of occurrences
   */
  static countOccurrences(str: string, substr: string): number {
    if (!substr) return 0;
    return (str.match(new RegExp(substr, 'g')) || []).length;
  }

  /**
   * Truncate a string to a maximum length and add ellipsis if truncated
   * @param str Input string
   * @param maxLength Maximum length
   * @returns Truncated string
   */
  static truncate(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + '...';
  }

  /**
   * Convert a string to camelCase
   * @param str Input string
   * @returns camelCase string
   */
  static toCamelCase(str: string): string {
    return str
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/^[A-Z]/, firstChar => firstChar.toLowerCase());
  }
}
