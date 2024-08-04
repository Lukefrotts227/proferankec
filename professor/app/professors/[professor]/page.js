import prisma from "@/helpers/prisma/prisma"; 
import Review from "@/components/reviews/review";
import { CourseCard } from "@/components/course/card";


async function getProfessorData(professor){
    const [prefix, firstname, lastname] = professor.professor.split(" ");
    const professor = await prisma.professor.findFirst({
        where: {
            prefix: prefix,
            firstname: firstname,
            lastname: lastname
        }, 
        include : {
            courses: {
                include: {
                    course: true
                }
            }
        }
    });
    return professor; 

}

const professorPage = async ({ params })  => {
    const professor = getProfessorData(params.professor);

    if(!professor){
        return(
            <p>Professor not found</p>
        )
    }

    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24">

            <h1>{professor.prefix} {professor.firstname} {professor.lastname}</h1>

            <h2>Courses</h2>
            {professor.courses.map(course => {
                return(
                    <CourseCard course={course} />
                )
            })}
        </main>
    )

}

export default professorPage;