import prisma from "@/helpers/prisma/prisma"; 
import { ProfessorCard } from "@/components/professor/card";


async function getCourseData(course){
    const [name, department, school] = course.course.split("-");
    const course = await prisma.course.findFirst({
        where: {
            name: name,
            department: department,
            school: school
        }, 
        include: {
            professors:{
                include:{
                    professor: true
                }
            }
        }
    });


}

const CoursePage = async ({ params })  => {
    const course = getCourseData(params.course);

    if(!course){
        return(
            <p>Course not found</p>
        )
    }

    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24">

            <h1>{course.name} {course.school} {course.department}</h1>
            <h2>Professors</h2>
            
            {course.professors.map(professor => {
                return(
                    <ProfessorCard professor={professor} />
                )
            })}
        </main>
    )

}

export default CoursePage;