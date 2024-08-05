import { PrismaClient } from '@prisma/client';
import  ProfessorCard  from "@/components/professor/card";

const prisma = new PrismaClient();

async function getCourseData(courseParam) {
    const decodedParam = decodeURIComponent(courseParam);
    const [name, school, department] = decodedParam.split("-");
    console.log(name, school, department);
    const courseData = await prisma.course.findFirst({
    where: {
      name: name,
      Department: department,
      School: school
    },
    include: {
      professors: {
        include: {
          professor: true
        }
      }
    }
  });

  return courseData;
}

const CoursePage = async ({ params }) => {
  const course = await getCourseData(params.course);

  if (!course) {
    return <p>Course not found</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{course.name} - {course.School} - {course.Department}</h1>
      <h2>Professors</h2>
      <ul>
        {course.professors.map(({ professor }) => (
          <li key={professor.id}>
            <ProfessorCard professor={professor} />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default CoursePage;
