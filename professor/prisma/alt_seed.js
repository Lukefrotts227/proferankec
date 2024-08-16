const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create multiple users
  await prisma.user.createMany({
    data: [
      { name: 'Alice Smith', email: 'alice@example.com', isAdmin: true },
      { name: 'Bob Johnson', email: 'bob@example.com', isAdmin: false },
      { name: 'Carol Williams', email: 'carol@example.com', isAdmin: false },
      { name: 'Dave Brown', email: 'dave@example.com', isAdmin: false },
      { name: 'Eve Davis', email: 'eve@example.com', isAdmin: false },
      { name: 'Frank Wilson', email: 'frank@example.com', isAdmin: true },
      { name: 'Grace Miller', email: 'grace@example.com', isAdmin: false },
      { name: 'Henry Clark', email: 'henry@example.com', isAdmin: false },
      { name: 'Ivy Young', email: 'ivy@example.com', isAdmin: false },
      { name: 'Jack King', email: 'jack@example.com', isAdmin: false },
      { name: 'Liam Adams', email: 'liam@example.com', isAdmin: false },
      { name: 'Mia Thompson', email: 'mia@example.com', isAdmin: false },
      { name: 'Noah Harris', email: 'noah@example.com', isAdmin: false },
      { name: 'Olivia Lewis', email: 'olivia@example.com', isAdmin: false },
      { name: 'Sophia Martinez', email: 'sophia@example.com', isAdmin: false },
    ]
  });

  const allUsers = await prisma.user.findMany();

  await prisma.professor.createMany({
    data: [
      { Firstname: 'John', Lastname: 'Doe', Prefix: 'Dr.', Verified: true },
      { Firstname: 'Jane', Lastname: 'Smith', Prefix: 'Prof.', Verified: true },
      { Firstname: 'Mike', Lastname: 'Johnson', Prefix: 'Dr.', Verified: false },
      { Firstname: 'Sara', Lastname: 'Lee', Prefix: 'Prof.', Verified: true },
      { Firstname: 'Robert', Lastname: 'Brown', Prefix: 'Dr.', Verified: true },
      { Firstname: "Jose", Lastname: "Gonzalez", Prefix: "Dr.", Verified: true },
      { Firstname: 'Emily', Lastname: 'Davis', Prefix: 'Prof.', Verified: false },
      { Firstname: 'David', Lastname: 'Harris', Prefix: 'Dr.', Verified: true },
      { Firstname: 'Sophia', Lastname: 'Martinez', Prefix: 'Prof.', Verified: true },
      { Firstname: 'James', Lastname: 'Anderson', Prefix: 'Dr.', Verified: true },
      { Firstname: 'Lisa', Lastname: 'Turner', Prefix: 'Prof.', Verified: false },
      { Firstname: 'Paul', Lastname: 'Garcia', Prefix: 'Dr.', Verified: true },
      { Firstname: 'Nina', Lastname: 'Roberts', Prefix: 'Prof.', Verified: false },
      { Firstname: 'Walter', Lastname: 'Clark', Prefix: 'Dr.', Verified: true },
      { Firstname: 'Rachel', Lastname: 'Walker', Prefix: 'Prof.', Verified: true },
    ],
  });

  const allProfessors = await prisma.professor.findMany();

  await prisma.course.createMany({
    data: [
      {
        name: 'Introduction to Computer Science',
        description: 'An introductory course on computer science.',
        School: 'School of Engineering',
        Department: 'Computer Science',
      },
      {
        name: 'Advanced Mathematics',
        description: 'A course on advanced mathematical concepts.',
        School: 'School of Science',
        Department: 'Mathematics',
      },
      {
        name: 'Physics for Engineers',
        description: 'Fundamentals of physics with applications to engineering.',
        School: 'School of Engineering',
        Department: 'Physics',
      },
      {
        name: 'Literature and Society',
        description: 'Exploration of literature in relation to social issues.',
        School: 'School of Humanities',
        Department: 'Literature',
      },
      {
        name: 'Modern Art History',
        description: 'A study of modern art movements and their cultural impact.',
        School: 'School of Arts',
        Department: 'Art History',
      },
      {
        name: 'Introduction to Psychology',
        description: 'An introductory course on psychology.',
        School: 'School of Social Sciences',
        Department: 'Psychology',
      },
      {
        name: 'Introduction to Biology',
        description: 'An introductory course on biology.',
        School: 'School of Science',
        Department: 'Biology',
      },
      {
        name: 'Data Structures and Algorithms',
        description: 'A course on fundamental data structures and algorithms.',
        School: 'School of Engineering',
        Department: 'Computer Science',
      },
      {
        name: 'Ethics in Modern Society',
        description: 'A study of ethical principles in contemporary society.',
        School: 'School of Humanities',
        Department: 'Philosophy',
      },
      {
        name: 'Introduction to Sociology',
        description: 'An introductory course on sociology.',
        School: 'School of Social Sciences',
        Department: 'Sociology',
      },
      {
        name: 'Organic Chemistry',
        description: 'An in-depth study of organic chemistry.',
        School: 'School of Science',
        Department: 'Chemistry',
      },
      {
        name: 'History of Western Civilization',
        description: 'An exploration of Western civilization from ancient times to the present.',
        School: 'School of Humanities',
        Department: 'History',
      },
      {
        name: 'Machine Learning',
        description: 'An introduction to machine learning algorithms and applications.',
        School: 'School of Engineering',
        Department: 'Computer Science',
      },
      {
        name: 'Classical Mechanics',
        description: 'An advanced course on classical mechanics.',
        School: 'School of Science',
        Department: 'Physics',
      },
      {
        name: 'World Literature',
        description: 'A survey of world literature from various cultures.',
        School: 'School of Humanities',
        Department: 'Literature',
      },
    ],
  });

  const allCourses = await prisma.course.findMany();

  const courseProfessorAssignments = [
    { courseId: allCourses[0].id, professorId: allProfessors[0].id },
    { courseId: allCourses[1].id, professorId: allProfessors[1].id },
    { courseId: allCourses[2].id, professorId: allProfessors[2].id },
    { courseId: allCourses[3].id, professorId: allProfessors[3].id },
    { courseId: allCourses[4].id, professorId: allProfessors[4].id },
    { courseId: allCourses[0].id, professorId: allProfessors[1].id },
    { courseId: allCourses[1].id, professorId: allProfessors[0].id },
    { courseId: allCourses[2].id, professorId: allProfessors[3].id },
    { courseId: allCourses[3].id, professorId: allProfessors[5].id },
    { courseId: allCourses[5].id, professorId: allProfessors[4].id }, 
    { courseId: allCourses[6].id, professorId: allProfessors[2].id }, 
    { courseId: allCourses[4].id, professorId: allProfessors[3].id },
    { courseId: allCourses[7].id, professorId: allProfessors[6].id },
    { courseId: allCourses[8].id, professorId: allProfessors[7].id },
    { courseId: allCourses[9].id, professorId: allProfessors[8].id },
    { courseId: allCourses[10].id, professorId: allProfessors[9].id },
    { courseId: allCourses[11].id, professorId: allProfessors[10].id },
    { courseId: allCourses[12].id, professorId: allProfessors[11].id },
    { courseId: allCourses[13].id, professorId: allProfessors[12].id },
    { courseId: allCourses[14].id, professorId: allProfessors[13].id },
    { courseId: allCourses[0].id, professorId: allProfessors[5].id }, 
    { courseId: allCourses[1].id, professorId: allProfessors[6].id }, 
    { courseId: allCourses[2].id, professorId: allProfessors[7].id }, 
    { courseId: allCourses[3].id, professorId: allProfessors[8].id }, 
    { courseId: allCourses[4].id, professorId: allProfessors[9].id }, 
    { courseId: allCourses[5].id, professorId: allProfessors[10].id }, 
    { courseId: allCourses[6].id, professorId: allProfessors[11].id }, 
    { courseId: allCourses[7].id, professorId: allProfessors[12].id }, 
    { courseId: allCourses[8].id, professorId: allProfessors[13].id }, 
    { courseId: allCourses[9].id, professorId: allProfessors[14].id },
  ];

  for (const assignment of courseProfessorAssignments) {
    await prisma.courseProfessor.create({
      data: assignment,
    });
  }

  const reviews = [
    {
      courseId: allCourses[0].id,
      professorId: allProfessors[0].id,
      userId: allUsers[0].id,
      overallRating: 4.5,
      difficulty: 3.5,
      workload: 4.0,
      lecture: 5.0,
      learning: 4.5,
      comment: 'Great course, learned a lot!',
    },
    {
      courseId: allCourses[1].id,
      professorId: allProfessors[1].id,
      userId: allUsers[1].id,
      overallRating: 4.0,
      difficulty: 4.5,
      workload: 4.5,
      lecture: 4.0,
      learning: 4.0,
      comment: 'Challenging but rewarding.',
    },
    {
      courseId: allCourses[2].id,
      professorId: allProfessors[2].id,
      userId: allUsers[2].id,
      overallRating: 3.5,
      difficulty: 4.0,
      workload: 3.0,
      lecture: 3.5,
      learning: 3.0,
      comment: 'Average course, could be better.',
    },
    {
      courseId: allCourses[3].id,
      professorId: allProfessors[3].id,
      userId: allUsers[3].id,
      overallRating: 5.0,
      difficulty: 2.0,
      workload: 3.0,
      lecture: 5.0,
      learning: 5.0,
      comment: 'Engaging and insightful!',
    },
    {
      courseId: allCourses[4].id,
      professorId: allProfessors[4].id,
      userId: allUsers[4].id,
      overallRating: 4.0,
      difficulty: 3.0,
      workload: 4.0,
      lecture: 4.0,
      learning: 4.0,
      comment: 'Good course with interesting content.',
    },
    {
      courseId: allCourses[0].id,
      professorId: allProfessors[1].id,
      userId: allUsers[1].id,
      overallRating: 4.0,
      difficulty: 3.0,
      workload: 3.0,
      lecture: 4.0,
      learning: 4.0,
      comment: 'Well taught, but could use more examples.',
    },
    {
      courseId: allCourses[1].id,
      professorId: allProfessors[0].id,
      userId: allUsers[0].id,
      overallRating: 5.0,
      difficulty: 4.0,
      workload: 4.0,
      lecture: 5.0,
      learning: 5.0,
      comment: 'One of the best courses I’ve taken!',
    },
    {
      courseId: allCourses[2].id,
      professorId: allProfessors[3].id,
      userId: allUsers[2].id,
      overallRating: 3.0,
      difficulty: 4.5,
      workload: 5.0,
      lecture: 3.0,
      learning: 3.0,
      comment: 'Too much work for the material covered.',
    },
    {
      courseId: allCourses[7].id,
      professorId: allProfessors[6].id,
      userId: allUsers[6].id,
      overallRating: 4.0,
      difficulty: 3.0,
      workload: 4.0,
      lecture: 4.0,
      learning: 4.0,
      comment: 'Solid introduction to algorithms.',
    },
    {
      courseId: allCourses[8].id,
      professorId: allProfessors[7].id,
      userId: allUsers[7].id,
      overallRating: 4.5,
      difficulty: 2.5,
      workload: 3.0,
      lecture: 5.0,
      learning: 5.0,
      comment: 'A thought-provoking course on ethics.',
    },
    {
      courseId: allCourses[9].id,
      professorId: allProfessors[8].id,
      userId: allUsers[8].id,
      overallRating: 4.0,
      difficulty: 3.5,
      workload: 4.0,
      lecture: 4.0,
      learning: 4.0,
      comment: 'Interesting perspectives on sociology.',
    },
    {
      courseId: allCourses[10].id,
      professorId: allProfessors[9].id,
      userId: allUsers[9].id,
      overallRating: 4.0,
      difficulty: 4.5,
      workload: 5.0,
      lecture: 4.0,
      learning: 5.0,
      comment: 'Tough but very rewarding.',
    },
    {
      courseId: allCourses[11].id,
      professorId: allProfessors[10].id,
      userId: allUsers[10].id,
      overallRating: 5.0,
      difficulty: 3.0,
      workload: 4.0,
      lecture: 5.0,
      learning: 5.0,
      comment: 'Fascinating look at history.',
    },
    {
      courseId: allCourses[12].id,
      professorId: allProfessors[11].id,
      userId: allUsers[11].id,
      overallRating: 4.5,
      difficulty: 4.0,
      workload: 4.0,
      lecture: 5.0,
      learning: 5.0,
      comment: 'Great introduction to machine learning.',
    },
    {
      courseId: allCourses[13].id,
      professorId: allProfessors[12].id,
      userId: allUsers[12].id,
      overallRating: 3.5,
      difficulty: 4.5,
      workload: 5.0,
      lecture: 3.5,
      learning: 3.5,
      comment: 'Very challenging, not for beginners.',
    },
    {
      courseId: allCourses[14].id,
      professorId: allProfessors[13].id,
      userId: allUsers[13].id,
      overallRating: 4.0,
      difficulty: 3.0,
      workload: 4.0,
      lecture: 4.0,
      learning: 4.0,
      comment: 'Excellent course, highly recommended.',
    },
  ];

  for (const review of reviews) {
    await prisma.review.create({
      data: review,
    });
  }

  console.log('Database seeded with more focused test Data');
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
