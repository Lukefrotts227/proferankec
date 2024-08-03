import { useRouter } from "next/navigation"; 

export const CourseCard = ({ course }) => {
    const router = useRouter();
    const coursePageName = '/courses/' + course.name + '-' + course.School + '-' + course.Department; 

    const handleClick = () =>{
        router.push(coursePageName); 
    }
 

    return (
        <div onClick = {handleClick}>
            <h1>{course.name} {course.School} {course.Department}</h1>
        </div>
    )
}   