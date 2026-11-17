/** @description helper function */
export function compare (a, b): 1 | 0 | -1 {
  return a < b ? -1 : a > b ? 1 : 0;
}

type Run = {
  /** the value of a run of digits; a word run has none */
  num?: number;
  text: string;
};

type SortKey = {
  stem: Run[];
  ext: Run[];
};

// The extension is split off first so that a shared suffix does not decide the
// order of the versions above it: '1.0.10.txt' sorts by '1.0.10', not by '.txt'.
// A leading dot belongs to the stem, it marks a dotfile ('.bashrc') instead of
// starting an extension.
function parse_sort_key (name: string): SortKey {
  let dot = name.lastIndexOf('.');
  // -1 is a name without an extension, 0 is a dotfile like '.bashrc'
  if (dot < 1) {
    dot = name.length;
  }
  return {
    stem: split_runs(name.substring(0, dot)),
    ext: split_runs(name.substring(dot)),
  };
}

// split one part into numeric and non-numeric runs: 'file10' -> [file, 10]
function split_runs (part: string): Run[] {
  const runs: Run[] = [];
  let index = 0;
  while (index < part.length) {
    const digit = part[index] >= '0' && part[index] <= '9';
    let end = index + 1;
    while (end < part.length) {
      if ((part[end] >= '0' && part[end] <= '9') !== digit) {
        break;
      }
      end++;
    }
    const text = part.substring(index, end);
    runs.push(digit ? { num: +text, text } : { text });
    index = end;
  }
  return runs;
}

function compare_run (a: Run, b: Run): 1 | 0 | -1 {
  // runs of digits compare by value, so file2 comes before file10
  if (a.num !== undefined && b.num !== undefined && a.num !== b.num) {
    return a.num < b.num ? -1 : 1;
  }
  // a digit run next to a word, or two equal numbers ('1' and '01'), compare by
  // their characters, which keeps '.hidden' and 'A.txt' where they were
  return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
}

function compare_runs (a: Run[], b: Run[]): 1 | 0 | -1 {
  const count = Math.min(a.length, b.length);
  for (let index = 0; index < count; index++) {
    const diff = compare_run(a[index], b[index]);
    if (diff !== 0) {
      return diff;
    }
  }
  // '1' and '1.0' share the prefix, the shorter key comes first
  return a.length < b.length ? -1 : a.length > b.length ? 1 : 0;
}

/** @description helper function */
export function pretty_compare (a_str: string, b_str: string): 1 | 0 | -1 {
  if (a_str === b_str) {
    return 0;
  }
  const a_key = parse_sort_key(a_str);
  const b_key = parse_sort_key(b_str);
  let diff = compare_runs(a_key.stem, b_key.stem);
  if (diff !== 0) {
    return diff;
  }
  diff = compare_runs(a_key.ext, b_key.ext);
  if (diff !== 0) {
    return diff;
  }
  // the runs spell the name out, so only the same name reaches this line
  return 0;
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
