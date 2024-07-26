
import { getProfessors } from "@/helpers/grab/bulkgrabbers";

async function handler(request) {
    try{
        const professors = await getProfessors();
        return {status: 200, message: professors};
    }catch(error){
        console.error(error);
        return {status: 500, message: "Internal Server Error"};
    }
}


export {handler as GET}