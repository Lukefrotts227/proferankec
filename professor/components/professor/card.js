"use client"

import { useRouter } from "next/navigation"; 

const ProfessorCard = ({ professor }) => {
  const router = useRouter();
  const professorPageName = `/professors/${professor.Prefix}-${professor.Firstname}-${professor.Lastname}`;

  const handleClick = () => {
    console.log("Navigating to:", professorPageName);
    router.push(professorPageName);
  };

  console.log("Professor:", professor); // Log the professor object

  return (
    <div onClick={handleClick}>
      <h1>{professor.Prefix} {professor.Firstname} {professor.Lastname}</h1>
    </div>
  );
};

export default ProfessorCard;
