import prisma from "@/helpers/prisma/prisma";

export const postReview = async ( review ) => {
    if(review){
        try{
            const newReview = await prisma.review.create({
                data: {
                    professorId: review.professorId,
                    courseId: review.courseId,
                    userId: review.userId,
                    Overallrating: review.overallRating,
                    Difficulty: review.difficulty,
                    Workload: review.workload,
                    Lecture: review.lecture,
                    Learning: review.learning,
                    comment: review.comment
                }
            });
            return newReview;
        }catch(e){
            console.error('Failed to submit review:', e);
            return null;
        }
    } else {
        return null;
    }


}