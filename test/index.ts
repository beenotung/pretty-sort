import {
  disable_tailing_value_memorize,
  enable_tailing_value_memorize,
  pretty_sort,
} from '../src';

function test(name: string, target: string[]) {
  let subject = target
    .map(x => x)
    .sort((a, b) => (Math.random() < 0.5 ? 1 : -1));

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
  // prettier-force-new-line
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

test('Filenames', [
  '3.txt',
  '4.txt',
  '7.txt',
  '9.txt',
  '11.txt',
  '16.txt',
  '17.txt',
  '19.txt',
  '25.txt',
  '28.txt',
]);

test('Numbers in middle', [
  'Student 1 Submission',
  'Student 2 Submission',
  'Student 3 Submission',
  'Student 10 Submission',
  'Student 11 Submission',
  'Student 12 Submission',
]);

test('number prefix', [
  '1-email.html',
  '1-output.json',
  '2-email.html',
  '2-output.json',
  '10-email.html',
  '10-output.json',
]);
