import prisma from "@/helpers/prisma/prisma";

// this function is used to promote a user to an admin

export async function promoteUser(email){
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if(user){
        await prisma.user.update({
            where: {
                email: email
            },
            data: {
                role: "ADMIN"
            }
        });
        return {status: 200, message: "Promotion!!"};
    }else{
        return {status: 404, message: "User not found"};
    }   
}