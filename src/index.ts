/** @description helper function */
export function compare (a, b): 1 | 0 | -1 {
  return a < b ? -1 : a > b ? 1 : 0;
}

/**
 * @description helper function
 * @return [numeric value, offset of last non-numeric char]
 * */
export let tailing_value = (s: string): undefined | [number, number] => {
  let acc = 0;
  let p = 1;
  for (let i = s.length - 1; i >= 0; i--) {
    const c = s.charCodeAt(i);
    if (48 <= c && c <= 48 + 9) {
      acc += (c - 48) * p;
      p *= 10;
      continue;
    }
    if (acc === 0) {
      return undefined;
    }
    return [acc, i];
  }
  return [acc, 0];
};

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

const ori_tailing_value = tailing_value;

/** @description speed up sorting by caching the comparison result, it consumes some memory */
export function enable_tailing_value_memorize () {
  const mem = {};
  tailing_value = (s: string) => {
    if (s in mem) {
      return mem[s];
    }
    return (mem[s] = ori_tailing_value(s));
  };
}

/** @description free up the memory used to cache comparison result */
export function disable_tailing_value_memorize () {
  tailing_value = ori_tailing_value;
}
