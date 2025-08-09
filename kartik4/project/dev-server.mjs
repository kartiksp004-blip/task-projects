import { spawn } from 'child_process';
import { createServer } from 'http';
import { parse } from 'url';

const PORT = process.env.PORT || 3000;

// Start the backend server
const startServer = () => {
  const server = spawn('npm', ['run', 'server'], {
    stdio: 'inherit',
    shell: true,
  });

  server.on('error', (err) => {
    console.error('Failed to start server:', err);
  });

  return server;
};

// Start the frontend development server
const startClient = () => {
  const client = spawn('npm', ['run', 'client'], {
    stdio: 'inherit',
    shell: true,
  });

  client.on('error', (err) => {
    console.error('Failed to start client:', err);
  });

  return client;
};

console.log('🚀 Starting development servers...');
console.log('📱 Frontend: http://localhost:3000');
console.log('🔧 Backend: http://localhost:3001');

const serverProcess = startServer();
const clientProcess = startClient();

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down development servers...');
  serverProcess.kill();
  clientProcess.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down development servers...');
  serverProcess.kill();
  clientProcess.kill();
  process.exit(0);
});