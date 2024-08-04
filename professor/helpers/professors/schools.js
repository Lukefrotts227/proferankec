import prisma from "@/helpers/prisma/prisma";

export const getSchools = async ( professor ) => {
    const profSchools = await prisma.professor.findUnique(
        {
            where: {
                id: professor.id
            },
            select: {
                courses: {
                    select: {
                        course: {
                            select: {
                                school: true
                            }
                        }
                    }
                }
            }
        }
    );
    const schools = profSchools.courses.map(courseprof => courseprof.course.School); 
    const uniqueSchools = [...new Set(schools)];    
    return uniqueSchools;

}