const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create professors
  await prisma.professor.createMany({
    data: [
      { Firstname: 'John', Lastname: 'Doe', Prefix: 'Dr.', Verified: true },
      { Firstname: 'Jane', Lastname: 'Smith', Prefix: 'Prof.', Verified: true },
      { Firstname: 'Emily', Lastname: 'Johnson', Prefix: 'Dr.', Verified: true },
      { Firstname: 'Michael', Lastname: 'Williams', Prefix: 'Mr.', Verified: true },
      { Firstname: 'Sarah', Lastname: 'Brown', Prefix: 'Ms.', Verified: true },
      { Firstname: 'David', Lastname: 'Jones', Prefix: 'Dr.', Verified: true },
      { Firstname: 'Laura', Lastname: 'Miller', Prefix: 'Prof.', Verified: true },
      { Firstname: 'James', Lastname: 'Davis', Prefix: 'Dr.', Verified: true }
    ]
  });

  // Create courses
  await prisma.course.createMany({
    data: [
      { name: 'Introduction to Computer Science', description: 'Basics of Computer Science', School: 'University A', Department: 'Engineering' },
      { name: 'Advanced Mathematics', description: 'In-depth Mathematical Concepts', School: 'University B', Department: 'Science' },
      { name: 'Physics for Engineers', description: 'Applied Physics in Engineering', School: 'University A', Department: 'Engineering' },
      { name: 'Modern History', description: 'History from 1900 onwards', School: 'University C', Department: 'Arts' },
      { name: 'Biology 101', description: 'Basics of Biology', School: 'University B', Department: 'Science' },
      { name: 'Creative Writing', description: 'Art of Writing', School: 'University C', Department: 'Arts' },
      { name: 'Chemistry Lab', description: 'Practical Chemistry', School: 'University B', Department: 'Science' },
      { name: 'Introduction to Psychology', description: 'Fundamentals of Psychology', School: 'University C', Department: 'Arts' }
    ]
  });

  // Establish relationships between courses and professors
  const courseProfessors = [
    { courseId: 1, professorId: 1 },
    { courseId: 1, professorId: 2 },
    { courseId: 2, professorId: 3 },
    { courseId: 2, professorId: 4 },
    { courseId: 3, professorId: 5 },
    { courseId: 3, professorId: 6 },
    { courseId: 4, professorId: 7 },
    { courseId: 4, professorId: 8 },
    { courseId: 5, professorId: 1 },
    { courseId: 5, professorId: 3 },
    { courseId: 6, professorId: 5 },
    { courseId: 6, professorId: 7 },
    { courseId: 7, professorId: 2 },
    { courseId: 7, professorId: 4 },
    { courseId: 8, professorId: 6 },
    { courseId: 8, professorId: 8 }
  ];

  for (const cp of courseProfessors) {
    await prisma.courseProfessor.create({
      data: cp
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("seeded database");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
