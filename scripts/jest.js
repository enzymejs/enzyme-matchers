var execSync = require('child_process').execSync;

// let it only run once
console.log('> Building files (lerna).')

try {
  execSync(
    'lerna bootstrap && lerna run build',
    (error, stdout) => console.log(stdout, error)
  );
} catch(e) {
  console.error(e.stdout.toString('utf8'));
  process.exit(1);
}

console.log('  Done.')
