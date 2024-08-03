import { useRouter } from "next/navigation"; 

export const ProfessorCard = ({ professor }) => {
    const router = useRouter();
    const professorPageName = '/professors/' + professor.Prefix + '-' + professor.Firstname + '-' + professor.LastName;

    const handleClick = () =>{
        router.push(professorPageName); 
    }
 

    return (
        <div onClick = {handleClick}>
            <h1>{professor.Prefix} {professor.Firstname} {professor.LastName}</h1>
        </div>
    )
}   