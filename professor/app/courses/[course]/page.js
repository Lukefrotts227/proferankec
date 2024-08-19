import { PrismaClient } from '@prisma/client';
import  ProfessorCard  from "@/components/professor/card";
import Filter from "@/components/reviews/filterDrop";
import ReviewCard from "@/components/reviews/reviewcard";
import Review from "@/components/reviews/review";
import { getServerSession } from 'next-auth'; 
import authOptions from "@/helpers/auth/options";


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

async function getUserId(session) {
  // grab the session from the db
   if (!session) {
     return null;
   }
   const user = await prisma.user.findFirst({
     where: {
       email: session.user.email
     }
   });
   return user.id;

}


async function getCourseData(courseParam, professorId = null) {
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

  let professor = reviews[0].professor;
  if(professorId == null){
    professor ={
      id: null,
      Prefix: "All",
      Firstname: "Professors",
      Lastname: ""
    }
  }
  const overallReview = calcAverageRatings(reviews, professor);



  return {courseData: courseData, reviews: reviews,  overallReview: overallReview};
}


const CoursePage = async ({ params, searchParams }) => {
  const professorId = searchParams?.professorId; 
  const courseDataAll = await getCourseData(params.course, professorId ); 
  const session = await getServerSession(authOptions); 

  const course = courseDataAll.courseData;

  const reviews = courseDataAll.reviews;

  const overallReview = courseDataAll.overallReview;
  console.log(overallReview); 


  const userid = await getUserId(session);
  const allProfessorsWithReviews = [...new Set(reviews.map(review => review.professor))];

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

      <div className = "py-8">
        <h1 className = "pt-5 pb-7 text-3xl text-center">Overall Ratings</h1>
        <ReviewCard review={overallReview} type="course" />
      </div>

      <h1>Filter for a Professor</h1>
      <Filter items={allProfessorsWithReviews} itemId={professorId} type="professor" param="professorId" />

      <div className="py-5" />

    </main>
  );
};

export default CoursePage;
