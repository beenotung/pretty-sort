# pretty-sort

[![npm Package Version](https://img.shields.io/npm/v/pretty-sort.svg?maxAge=2592000)](https://www.npmjs.com/package/pretty-sort)

sort strings by their numeric parts, so `file2` comes before `file10` and `1.0.10` before `1.0.11`

## Example

Given the folder names `Class 1`, `Class 2`, `Class 10`, `Group 1`, `Group 2` and `Group 10`, plain string comparison compares the digits one character at a time, so `Class 10` lands before `Class 2`:

    Class 1, Class 10, Class 2, Group 1, Group 10, Group 2

`pretty_sort` compares the numeric part by value instead:

    Class 1, Class 2, Class 10, Group 1, Group 2, Group 10

Each name is split into numeric and text runs; numbers compare by value and text by character, so `class-3-student-5` sorts by class number, then by student number. Matching is exact, so `Class 2` and `class 2` are different groups.

## Usage Example

For more examples, see: [test/index.ts](./test/index.ts)

```typescript
import { pretty_sort } from 'pretty-sort'

let list1 = [
  'Group 1',
  'Group 10',
  'Group 2',
  'Group 3'
]

let list2 = pretty_sort(list1)
// list1 === list2
// remark: list1 and list2 reference to the same instance of array
// remark: list1 is updated in-place, similar to Array.sort()

console.log(list2)
/*
[
  'Group 1',
  'Group 2',
  'Group 3',
  'Group 10'
]
*/
```

## Typescript Signature

```typescript
/** @description main sorting function; sorts in place and returns the same array */
export function pretty_sort(xs: string[]): string[]

/** @description the comparator behind pretty_sort */
export function pretty_compare(a_str: string, b_str: string): 1 | 0 | -1

/** @description helper function */
export function compare(a: any, b: any): 1 | 0 | -1

/** @description leading number of a name, or NaN when it does not start with one */
export function parse_number(s: string): number

/** @description number of characters shared with another name, counted from the start */
export function count_common_prefix(a: string, b: string): number

/** @description number of characters shared with another name, counted from the end */
export function count_common_suffix(a: string, b: string): number
```

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others
