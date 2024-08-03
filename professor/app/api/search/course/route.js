import { NextResponse, NextRequest } from "next/server"; 
import { searchCourses } from "@/helpers/search/coursesearch";
async function handler(req, res) {
    try{
        const serachParams = new URL(req.url).searchParams;
        const search = serachParams.get("q");
        if(!search){
            return NextResponse.error("No search query provided", 400);
        }
        console.log(search);

        const courses = await searchCourses(search);
        return NextResponse.json(courses);
    } catch(e){
        console.log(e);
        return NextResponse.error("An error occurred", 500);
    }
}


export {handler as GET}