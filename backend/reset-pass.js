const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash('admin123', 10);
  await prisma.adminUser.upsert({
    where: { username: 'admin' },
    update: { passwordHash },
    create: { username: 'admin', passwordHash }
  });
  console.log('Password reset to admin123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
