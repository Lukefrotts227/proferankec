import { PrismaClient } from '@prisma/client';
import  ProfessorCard  from "@/components/professor/card";

const prisma = new PrismaClient();


function calcAverageRatings(reviews, professor){
  const overallRatings = reviews.map(review => review.overallRating);
  const difficulties = reviews.map(review => review.difficulty);
  const workloads = reviews.map(review => review.workload);
  const lectures = reviews.map(review => review.lecture);
  const learning = reviews.map(review => review.learning);

  const meanOverallRating = overallRatings.reduce((a, b) => a + b, 0) / overallRatings.length;
  const meanDifficulty = difficulties.reduce((a, b) => a + b, 0) / difficulties.length;
  const meanWorkload = workloads.reduce((a, b) => a + b, 0) / workloads.length;
  const meanLecture = lectures.reduce((a, b) => a + b, 0) / lectures.length;
  const meanLearning = learning.reduce((a, b) => a + b, 0) / learning.length;

  const overallReview = {
    overallRating: meanOverallRating,
    difficulty: meanDifficulty,
    workload: meanWorkload,
    lecture: meanLecture,
    learning: meanLearning,
    professor: professor,
  }

  return overallReview; 

}


async function getCourseData(courseParam) {
  const decodedParam = decodeURIComponent(courseParam);
  const [name, school, department] = decodedParam.split("-");
  console.log(name, school, department);

  const courseData = await prisma.course.findFirst({
    where: {
      name: name,
      Department: department,
      School: school,
    },
    include: {
      professors: {
        include: {
          professor: true,
        },
      },
      Review: {  // Include the reviews associated with the course
        include: {
          user: true,  // Include the user who wrote the review, if needed
          professor: true, // Include the professor related to the review, if needed
        },
      },
    },
  });

  const reviews = courseData.Review;
  const overallReview = calcAverageRatings(reviews, null);



  return {courseData: courseData, overallReview: overallReview};
}


const CoursePage = async ({ params }) => {
  const courseDataAll = await getCourseData(params.course); 

  const course = courseDataAll.courseData;

  const overallReview = courseDataAll.overallReview;

  if (!course) {
    return <p>Course not found</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{course.name} - {course.School} - {course.Department}</h1>
      <h2>Professors</h2>
      <ul>
        {course.professors.map(({ professor }) => (
          <li key={professor.id}>
            <ProfessorCard professor={professor} />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default CoursePage;
