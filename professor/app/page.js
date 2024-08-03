
import Login from "@/components/auth/loginformbasicgoogle01";
import { SearchBarProfessor } from "@/components/searchbar/professor";
import { SearchBarCourse } from "@/components/searchbar/courses";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Login /> 
      <h1>Professors search</h1>
      <SearchBarProfessor />    

      <h1>Courses search</h1>
      <SearchBarCourse /> 
    </main>
  );
}
