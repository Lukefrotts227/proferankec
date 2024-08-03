import prisma from "@/helpers/prisma/prisma"; 


async function getCourseData(course){
    const [name, department, school] = course.course.split("-");
    const course = await prisma.course.findFirst({
        where: {
            name: name,
            department: department,
            school: school
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
        <div>
            <h1>{course.name} {course.school} {course.department}</h1>
        </div>
    )

}

export default CoursePage;