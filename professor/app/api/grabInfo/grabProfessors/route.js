
import { getProfessors } from "@/helpers/grab/bulkgrabbers";
import { NextResponse } from "next/server";

async function handler(request) {
    try{
        const professors = await getProfessors();
        return {status: 200, message: professors};
    }catch(error){
        console.error(error);
        return NextResponse.json( {error: "Internal Server Error"}, {status: 500})
    }
}


export {handler as GET}