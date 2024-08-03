import prisma from "../prisma/prisma";


export async function searchProfessors(query) {
    // covert to lower case
    query = query.toLowerCase();
    
    const professors = await prisma.professor.findMany({
        where: {
            name: {
                contains: query,
            }
        }
    });
    return professors;
}