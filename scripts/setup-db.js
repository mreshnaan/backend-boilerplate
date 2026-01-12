#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🔧 Setting up database...\n');

try {
  console.log('📦 Generating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  console.log('\n🔄 Running database migrations...');
  execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });

  console.log('\n✅ Database setup complete!');
} catch (error) {
  console.error('\n❌ Database setup failed:', error.message);
  process.exit(1);
}
