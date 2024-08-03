import prisma from "@/helpers/prisma/prisma"; 


async function getProfessorData(professor){
    const [prefix, firstname, lastname] = professor.professor.split(" ");
    const professor = await prisma.professor.findFirst({
        where: {
            prefix: prefix,
            firstname: firstname,
            lastname: lastname
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
        <div>
            <h1>{professor.prefix} {professor.firstname} {professor.lastname}</h1>
        </div>
    )

}

export default professorPage;