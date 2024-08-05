import prisma from "@/helpers/prisma/prisma"; 
import  CourseCard  from "@/components/course/card";


async function getProfessorData(professorParam) {
    const decodedParam = decodeURIComponent(professorParam);
    const [prefix, firstname, lastname] = decodedParam.split("-");
  
    const prof = await prisma.professor.findFirst({
      where: {
        Prefix: prefix,
        Firstname: firstname,
        Lastname: lastname
      },
      include: {
        courses: {
          include: {
            course: true
          }
        }
      }
    });
    
    return prof;
  }


const ProfessorPage = async ({ params }) => {
    const professor = await getProfessorData(params.professor);
  
    if (!professor) {
      return (
        <p>Professor not found</p>
      );
    }
  
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>{professor.Prefix} {professor.Firstname} {professor.Lastname}</h1>
        <h2>Courses</h2>
        <ul>
          {professor.courses.map(({ course }) => (
            <li key={course.id}>
              <CourseCard course={course} />
            </li>
          ))}
        </ul>
        
      </main>
    );
  };
  
  export default ProfessorPage;
  
  