import { postReview } from "../helpers/review/review";
import { NextResponse } from "next/server";

// function for user to post a review for a professor
// account for a 400 error if the user has already posted a review for the professor and course


export async function handler(request){
    try{
        const {professorId, courseId, userId, rating, review} = request.body;
        const response = await postReview(professorId, courseId, userId, rating, review);
        return NextResponse.json(response, {status: response.status});
    }catch(error){
        console.error(error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
   
}



export { handler as POST}