/** @description helper function */
export function compare (a, b): 1 | 0 | -1 {
  return a < b ? -1 : a > b ? 1 : 0;
}

/** @description helper function */
export function pretty_compare (a_str: string, b_str: string): 1 | 0 | -1 {
  const suffix = count_common_suffix(a_str, b_str);
  a_str = a_str.substring(0, a_str.length - suffix);
  b_str = b_str.substring(0, b_str.length - suffix);

  for (;;) {
    const prefix = count_common_prefix(a_str, b_str);
    a_str = a_str.substring(prefix);
    b_str = b_str.substring(prefix);

    const a_num = parse_number(a_str);
    const b_num = parse_number(b_str);
    if (!isNaN(a_num) && !isNaN(b_num)) {
      if (a_num < b_num) {
        return -1;
      }
      if (a_num > b_num) {
        return 1;
      }
      a_str = remove_number_prefix(a_str, a_num);
      b_str = remove_number_prefix(b_str, b_num);
      continue;
    }
    return compare(a_str, b_str);
  }
}

/**
 * only consider leading numbers:
 * - "version-1.txt" -> NaN
 * - "-1.txt" -> NaN
 * - "1.txt" -> 1
 *
 * do not consider scientific notation:
 * - "1e3" -> 1
 *
 * do not consider decimal point (only consider the first part of version in semver):
 * - "1.2.3" -> 1
 * - "1.2" -> 1
 * - "1" -> 1
 *
 * skip leading zeros:
 * - "0123" -> 123
 *
 *  treat non numeric characters as NaN:
 * - "readme.md" -> NaN
 */
export function parse_number (s: string): number {
  if (s.length === 0) {
    return NaN;
  }
  if (s[0] === '-') {
    return NaN;
  }
  return parseFloat(s.replace('e', ' ').replace('.', ' '));
}

function remove_number_prefix (s: string, num: number): string {
  if (num === 0) {
    return s.replace(/^0+/, '');
  }
  return s.replace(/^0+/, '').slice(String(num).length);
}

/**
 * @description helper function
 * @return the number of common suffix
 * e.g. ".txt" suffix -> 4
 */
export function count_common_suffix (a: string, b: string): number {
  const n = Math.min(a.length, b.length);
  let tail = 0;
  for (let i = 0; i < n; i++) {
    if (a[a.length - 1 - i] === b[b.length - 1 - i]) {
      tail++;
    } else {
      break;
    }
  }
  return tail;
}

/**
 * @description helper function
 * @return the number of common prefix
 * e.g. "version-" prefix -> 8
 */
export function count_common_prefix (a: string, b: string): number {
  const n = Math.min(a.length, b.length);
  let prefix = 0;
  for (let i = 0; i < n; i++) {
    if (a[i] === b[i]) {
      prefix++;
    } else {
      break;
    }
  }
  return prefix;
}

/** @description main sorting function */
export function pretty_sort (xs: string[]): string[] {
  return xs.sort(pretty_compare);
}
