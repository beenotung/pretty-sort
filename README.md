# pretty-sort

[![npm Package Version](https://img.shields.io/npm/v/pretty-sort.svg?maxAge=2592000)](https://www.npmjs.com/package/pretty-sort)

sort string with awareness to tailing numeric value

## Example

To sort below folder name:

    Class 1
    Class 2
    Class 3
    Class 4
    Class 10
    Class 11
    Class 12
    Class 13
    Group 1
    Group 2
    Group 3
    Group 4
    Group 10
    Group 11
    Group 12

If we sort it by by default string comparison, we will get:

    Class 1
    Class 10
    Class 11
    Class 12
    Class 13
    Class 2
    Class 3
    Class 4
    Group 1
    Group 10
    Group 11
    Group 12
    Group 2
    Group 3
    Group 4

This algorithm will extract the numeric value in the tailing of string,
and sort the element by the prefix, then the numeric value.

Hence we will get:

    Class 1
    Class 2
    Class 3
    Class 4
    Class 10
    Class 11
    Class 12
    Class 13
    Group 1
    Group 2
    Group 3
    Group 4
    Group 10
    Group 11
    Group 12

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
/** @description main sorting function */
export function pretty_sort(xs: string[]): string[]

/** @description speed up sorting by caching the comparison result, it consumes some memory */
export function enable_tailing_value_memorize(): void

/** @description free up the memory used to cache comparison result */
export function disable_tailing_value_memorize(): void

/** @description helper function */
export function compare(a: any, b: any): 1 | 0 | -1

/**
 * @description helper function
 * @return [numeric value, offset of last non-numeric char]
 * */
export let tailing_value: (s: string) => undefined | [number, number]

/** @description helper function */
export function pretty_compare(a_str: string, b_str: string): 1 | 0 | -1
```
