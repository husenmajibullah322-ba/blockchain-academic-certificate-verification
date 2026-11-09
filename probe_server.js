import { spawn } from 'child_process';
import http from 'http';

console.log('Testing Vite dev server launch...');
const vite = spawn('node', ['./node_modules/vite/bin/vite.js'], {
  stdio: 'pipe'
});

vite.stdout.on('data', (d) => {
  console.log('[Vite Output]:', d.toString().trim());
});

vite.stderr.on('data', (d) => {
  console.error('[Vite Stderr]:', d.toString().trim());
});

setTimeout(() => {
  http.get('http://localhost:5173', (res) => {
    console.log('HTTP Status Code from Vite Server:', res.statusCode);
    vite.kill('SIGTERM');
    process.exit(res.statusCode === 200 ? 0 : 1);
  }).on('error', (err) => {
    console.error('HTTP Request failed:', err.message);
    vite.kill('SIGTERM');
    process.exit(1);
  });
}, 2500);

