import prisma from '@helpers/prisma/prisma';


async function main() {
  await prisma.review.deleteMany({});
  await prisma.courseProfessor.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.professor.deleteMany({});
  
  await prisma.account.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.verificationToken.deleteMany({});
  await prisma.user.deleteMany({});
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
