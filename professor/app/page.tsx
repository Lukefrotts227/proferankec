
import Login from "@/components/auth/loginformbasicgoogle01";
import SearchBar  from "@/components/searchbar/comp"; 

import { getServerSession } from "next-auth"; 
import authOptions from "@/helpers/auth/options";
import HomeButton from '@/components/util/homeButton';

interface TopBannerProps {
  session: any;
}


const TopBanner: React.FC<TopBannerProps> = ({ session }) => {
  return (
    <header className="w-full bg-blue-700 text-white p-6 shadow-md">
      <div className="max-w-7x1 mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <HomeButton size={80} disabled={true} />
          <h1 className="text-2xl font-bold">Professor Rank</h1>
        </div>
        <div>
          {session ? (
            <Login showLogin={false} user={session.user} />
          ) : (
            <Login showLogin={true} />
          )}
        </div>
      </div>
    </header>
  );
}


export default async function Home() {
  const session =  await getServerSession(authOptions); 
  

  // condionally render sign in if user is not signed in

  return (
    <main className={`flex min-h-screen flex-col p-8`}>
      {/* Top Bar with Login Button */}
      <TopBanner session={session} />
  
      {/* Centered Content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-3xl font-bold mb-8">Search Professors and Courses</h1>
        <div className="flex space-x-8">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Professors Search</h2>
            <SearchBar type="professor"/>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Courses Search</h2>
            <SearchBar type="course" />
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">School Search</h2>
            <SearchBar type="school" />
          </div>
        </div>
      </div>
    </main>
  );
  
  
}
