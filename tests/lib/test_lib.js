function testMyFunction() {
  const { myFunction } = require('../src/lib/myFunction');

  const result1 = myFunction('valid input');
  console.assert(result1 === 'expected output', 'Failed: myFunction did not return expected output for valid input');

  try {
    myFunction('invalid input');
    console.error('Failed: myFunction did not throw error for invalid input');
  } catch (e) {
    console.log('Passed: myFunction threw error for invalid input');
  }
}

testMyFunction();