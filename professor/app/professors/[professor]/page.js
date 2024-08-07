import prisma from "@/helpers/prisma/prisma"; 
import  CourseCard  from "@/components/course/card";
import authOptions from "@/helpers/auth/options";
import { getServerSession } from "next-auth";
import Review from "@/components/reviews/review";
import ReviewCard from "@/components/reviews/reviewcard";





async function getReviews(professor){
    const reviews = await prisma.review.findMany({
        where: {
            professorId: professor.id
        }, include: {
            course: true,
            user: true
        }
    });
    return reviews;
}

async function getUserId(session) {
   // grab the session from the db
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


const ProfessorPage = async ({ params }) => {
    const professor = await getProfessorData(params.professor);
    const reviews = await getReviews(professor);
    const session = await getServerSession(authOptions);
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
        <ul>
          {professor.courses.map(({ course }) => (
            <li key={course.id}>
              <CourseCard course={course} />
            </li>
          ))}
        </ul>
        <div className="py-5" />



        
        <Review professor = { professor } session = { session } userid={userid} />

        <div className="py-5" />
        
        <h2>Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          <ul>
            {reviews.map(review => (
              <li key={review.id}>
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
        )}
        
          
        
        
      </main>
    );
  };
  
  export default ProfessorPage;
  
  