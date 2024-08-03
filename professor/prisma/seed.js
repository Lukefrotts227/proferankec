const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    // seed the database with courses professor and nothing else
    
  
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("seeded database")
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
