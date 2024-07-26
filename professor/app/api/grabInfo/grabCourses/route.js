import { getCourses } from "@/helpers/grab/bulkgrabbers";
import { NextResponse } from "next/server"; 

async function handler(request) {
    try{
        const courses = await getCourses();
        return NextResponse.json(courses, {status:200});
    }catch(error){
        console.error(error);
        return NextResponse.json({error: "Internal Server Error"}, {status:500})
    }
}


export {handler as GET}