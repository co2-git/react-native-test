import 'babel-polyfill';
import fs from 'fs';
import path from 'path';
import write from '../lib/write';
import exec from '../lib/exec';

const testEnvFile = path.join(process.cwd(), 'reactorstest.json');

async function runTests() {
  console.log('===================================================');
  console.log('REACTORS TEST');
  console.log('===================================================');
  try {
    await write(testEnvFile, JSON.stringify({test: true}, null, 2));
    await exec('react-native run-ios');
    await write(testEnvFile, JSON.stringify({test: false}, null, 2));
  } catch (error) {
    console.log(error.stack);
    process.exit(8);
  }
}

runTests();
