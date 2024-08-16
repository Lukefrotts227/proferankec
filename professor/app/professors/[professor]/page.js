import prisma from "@/helpers/prisma/prisma"; 
import  CourseCard  from "@/components/course/card";
import authOptions from "@/helpers/auth/options";
import { getServerSession } from "next-auth";
import Review from "@/components/reviews/review";
import ReviewCard from "@/components/reviews/reviewcard";
import CourseFilter from "@/components/reviews/filterDrop";









async function getReviews(professor, courseId = null) {
  // Convert courseId to an integer if it's provided
  const reviews = await prisma.review.findMany({
      where: {
          professorId: professor.id,
          ...(courseId && { courseId: parseInt(courseId, 10) }), // Convert courseId to an integer
      },
      include: {
          course: true,
          user: true,
      },
  });
  return reviews;
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

async function getProfessorData(professorParam) {
    const decodedParam = decodeURIComponent(professorParam);
    const [prefix, firstname, lastname] = decodedParam.split("-");
  
    const prof = await prisma.professor.findFirst({
      where: {
        Prefix: prefix,
        Firstname: firstname,
        Lastname: lastname
      },
      include: {
        courses: {
          include: {
            course: true
          }
        }
      }
    });
    
    return prof;
  }




const ProfessorPage = async ({ params, searchParams }) => {
    console.log(params); 
    const professor = await getProfessorData(params.professor);
    const session = await getServerSession(authOptions);
     
    const courseId = searchParams?.courseId || null; 
    console.log('course id: ' + courseId);
    const reviews = await getReviews(professor, courseId);
    const allCoursesWithReviews = [...new Set(professor.courses.map(({ course }) => course))];
    
    const userid = await getUserId(session); 
     

  
    if (!professor) {
      return (
        <p>Professor not found</p>
      );
    }
  
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>{professor.Prefix} {professor.Firstname} {professor.Lastname}</h1>
        <h2>Courses</h2>
        <ul  className="flex flex-row">
          {professor.courses.map(({ course }) => (
            <li className="px-3" key={course.id}>
              <CourseCard course={course} />
            </li>
          ))}
        </ul>

        <h1>Filter for a Course</h1>
        <CourseFilter courses={allCoursesWithReviews} currentCourseId={courseId} />

        <div className="py-5" />



        
        <Review professor = { professor } session = { session } userid={userid} />

        <div className="py-5" />
        
        <h2>Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          <ul className = "flex flex-col w-2/3  justify-center">
            {reviews.map(review => (
              <li key={review.id} className="p-5">
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
        )}
        
          
        
        
      </main>
    );
  };
  
  export default ProfessorPage;
  
  