import prisma from "../prisma/prisma";

// the function is used to post a review for a professor to the database
// also have to check if the given user has already posted a review for the given professor and course
export async function postReview(professorId, courseId, userId, rating, review) {
  const reviewExists = await prisma.review.findFirst({
    where: {
      professorId: professorId,
      courseId: courseId,
      userId: userId
    }
  });

  if(reviewExists){
    return {status: 400, message: "You have already posted a review for this professor and course"};
  }

  await prisma.review.create({
    data: {
      professorId: professorId,
      courseId: courseId,
      userId: userId,
      rating: rating,
      review: review
    }
  });

  return {status: 200, message: "Review posted"};
}
