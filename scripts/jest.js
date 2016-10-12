var execSync = require('child_process').execSync;

// let it only run once
console.log('> Building files (lerna).')

execSync(
  'lerna bootstrap && lerna run build',
  (error, stdout) => console.log(stdout)
);

console.log('  Done.')
