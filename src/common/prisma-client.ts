/* eslint-disable no-console */
// https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#prismaclient-in-long-running-applications

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: [
    { level: 'warn', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'error', emit: 'event' },
  ],
});

prisma.$on('warn', (e: any) => {
  console.log(e);
});

prisma.$on('info', (e: any) => {
  console.log(e);
});

prisma.$on('error', (e: any) => {
  console.log(e);
});

// Checking if Prisma is connected
async function checkConnection() {
  try {
    await prisma.$connect();
    console.log('Prisma is connected to the database.');
  } catch (error: any) {
    console.error('Error connecting to the database:', error.message);
  }
}

// Call the function to check connection
checkConnection();

export default prisma;
