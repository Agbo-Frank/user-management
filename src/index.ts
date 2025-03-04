import app from './app';
import { PORT } from './utils/config';

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.log('Unhandled rejection: ', reason)
});

process.on('SIGTERM', () => {
  console.log('Application shutting down...');
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Application runing on port ${PORT}...`)
})