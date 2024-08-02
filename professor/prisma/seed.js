import prisma from '@helpers/prisma/prisma';

async function main() {
  // Create dummy professors
  const professor1 = await prisma.professor.create({
    data: {
      name: 'Dr. John Doe',
      Verified: true,
    },
  });

  const professor2 = await prisma.professor.create({
    data: {
      name: 'Dr. Jane Smith',
      Verified: false,
    },
  });

  const professor3 = await prisma.professor.create({
    data: {
      name: 'Dr. Joe Bloggs',
      Verified: true,
    },
  });

  // Create dummy courses
  const course1 = await prisma.course.create({
    data: {
      name: 'Introduction to Computer Science',
      description: 'An introductory course on computer science fundamentals.',
    },
  });

  const course2 = await prisma.course.create({
    data: {
      name: 'Advanced Mathematics',
      description: 'A course on advanced mathematical concepts and theories.',
    },
  });

  const course3 = await prisma.course.create({
    data: {
      name: 'Physics for Engineers',
      description: 'A course on the principles of physics applied to engineering.',
    },
  });

  // Assign professors to courses (many-to-many)
  await prisma.courseProfessor.createMany({
    data: [
      { courseId: course1.id, professorId: professor1.id },
      { courseId: course1.id, professorId: professor2.id },
      { courseId: course2.id, professorId: professor3.id },
      { courseId: course3.id, professorId: professor1.id },
    ],
  });

  console.log({ professor1, professor2, professor3, course1, course2, course3 });
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
