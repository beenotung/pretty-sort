import { parse_number } from '../src';

let passed = 0;
let failed = 0;

function test(input: string, expected: number) {
  let result = parse_number(input);
  if (isNaN(result) && isNaN(expected)) {
    console.log(`[passed] ${input} -> ${result}`);
    passed++;
    return;
  }
  if (result === expected) {
    console.log(`[passed] ${input} -> ${result}`);
    passed++;
    return;
  }
  console.log(`[failed] ${input} -> ${result}`);
  failed++;
}

test('version-1.txt', NaN);
test('-1.txt', NaN);
test('1.txt', 1);

test('readme.md', NaN);

test('1e3', 1);

test('1', 1);
test('1.2', 1);
test('1.2.3', 1);
test('0123', 123);

console.log({ passed, failed });

if (failed !== 0) {
  process.exit(1);
}
