// app/api/review/route.js
import { NextResponse } from 'next/server';
import { postReview } from '@/helpers/reviews/review';

export async function POST(req) {
  try {
    const body = await req.json();
    const { professorId, courseId, userId, overallRating, difficulty, workload, lecture, learning, comment } = body;

    // Log the received data for debugging
    const review = {
      professorId,
      courseId,
      userId,
      overallRating,
      difficulty,
      workload,
      lecture,
      learning,
      comment
    };
    console.log(review); 
    const result = await postReview(review);
    if (result) {
      // Log the created review for debugging
      console.log('Created review:', result);
      return NextResponse.json(result);
    } else {
      console.error('Failed to submit review');
      return NextResponse.error(new Error('Failed to submit review'));
    }

  } catch (error) {
    console.error('Failed to submit review:', error);
    return NextResponse.error(new Error('Failed to submit review'));
  }
}
