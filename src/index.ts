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
  if (a_str.length === 0 || b_str.length === 0) {
    return compare(a_str, b_str);
  }

  const a_tail = tailing_value(a_str);
  if (!a_tail) {
    return compare(a_str, b_str);
  }
  const b_tail = tailing_value(b_str);
  if (!b_tail) {
    return compare(a_str, b_str);
  }
  const [a_val, a_offset] = a_tail;
  const [b_val, b_offset] = b_tail;

  a_str = a_str.substring(0, a_offset);
  b_str = b_str.substring(0, b_offset);

  const acc = pretty_compare(a_str, b_str);
  if (acc !== 0) {
    return acc;
  }

  return compare(a_val, b_val);
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
