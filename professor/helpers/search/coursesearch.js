import prisma from "../prisma/prisma";


export async function searchCourses(query) {
    // covert to lower case
    query = query.toLowerCase();
    
    const courses = await prisma.course.findMany({
        where: {
            name: {
                contains: query,
            }
        }
    });
    return courses;

}