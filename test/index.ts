import { disable_tailing_value_memorize, enable_tailing_value_memorize, pretty_sort } from '../src';

function test(name: string, target: string[]) {
  let subject = target.map(x => x).sort((a, b) => Math.random() < .5 ? 1 : -1);

  let result = pretty_sort(subject);
  if (target.toString() === result.toString()) {
    console.log('passed:', name);
  } else {
    console.error('failed, result:');
    console.error(result);
    process.exit(1);
  }
}

enable_tailing_value_memorize();
disable_tailing_value_memorize();

test('Groups', [
  'Group 1',
  'Group 2',
  'Group 3',
  'Group 4',
  'Group 5',
  'Group 6',
  'Group 7',
  'Group 8',
  'Group 9',
  'Group 10',
  'Group 11',
  'Group 12',
]);

test('StudentIDs', [
  '12345678d',
  '23456789d',
  '34567890d',
  '45678901d',
]);

test('Multi-Groups', [
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 10',
  'Class 11',
  'Class 12',
  'Class 13',
  'Group 1',
  'Group 2',
  'Group 3',
  'Group 4',
  'Group 10',
  'Group 11',
  'Group 12',
]);
