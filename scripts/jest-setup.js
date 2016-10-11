var execSync = require('child_process').execSync;

console.log('\n\nbuilding package files!\n')

execSync(
  'lerna run build',
  (error, stdout) => console.log(stdout)
);
