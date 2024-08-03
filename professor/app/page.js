
import Login from "@/components/auth/loginformbasicgoogle01";
import { SearchBar } from "@/components/searchbar/professor";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Login /> 
      <SearchBar />     
    </main>
  );
}
