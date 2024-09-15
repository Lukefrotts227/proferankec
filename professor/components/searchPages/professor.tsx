"use client"
import { useSearchParams } from "next/navigation"
import  ProfessorCard  from "@/components/professor/card";
import SearchBar from "@/components/searchbar/comp";
import useSWR from "swr";


type Professor = {
    id: number;
    Firstname?: string;
    Lastname?: string;
    Prefix?: string;
    Verified?: boolean;
};


const fetcher = async (url : string ) => {
    const res = await fetch(url);
    return res.json();
};

const SearchInner: React.FC = () => {
    const search = useSearchParams(); 
    const searchQ = search ? search.get("q") : "";
    const { data, error } = useSWR(`/api/search/professor?q=${searchQ}`, fetcher);


    return(
        <>
            <div className="flex space-x-8">
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-4">Professors Search</h2>
                        <SearchBar type="professor" size = "small" onPage={true} placeholder={searchQ }/>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-4">Courses Search</h2>
                        <SearchBar type="course" size ="small"  />
                    </div>

                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-4">School Search</h2>
                        <SearchBar type="school" size = "small" />
                    </div>
            </div>

            <div>
            {data && data.length > 0 ? (
                data.map((professor: Professor) => (
                <ProfessorCard key={professor.id} professor={professor} />
                ))
            ) : (
                <p>No professors available.</p> // This message is optional and can be customized or removed
            )}
            </div>
        
        </>
        
    ); 
}

export default SearchInner; 