import prisma from "../prisma/prisma";

export async function searchProfessors(query) {
    // Convert query to lower case
    query = query.toLowerCase();
    
    const professors = await prisma.professor.findMany({
        where: {
            OR: [
                { Firstname: { contains: query} },
                { Lastname: { contains: query } }
            ]
        }
    });
    return professors;
}
