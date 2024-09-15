"use client"
import { useSearchParams } from "next/navigation"
import  CourseCard  from "@/components/course/card";
import SearchBar from "@/components/searchbar/comp";
import useSWR from "swr";

type Course = {
    id: number; 
    name?: string; 
    description?: string;
    School?: string; 
    Department?: string;
}

const fetcher = async (url: string) => {
    const res = await fetch(url);
    return res.json();
}; 

const SearchInner: React.FC = () => {
    const search = useSearchParams();

    const searchQ = search ? search.get("q") : "";

    const { data, error } = useSWR(`/api/search/course?q=${searchQ}`, fetcher);

    return(
        <>
            <div className="flex space-x-8">
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-4">Professors Search</h2>
                        <SearchBar type="professor" size="small"/>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-4">Courses Search</h2>
                        <SearchBar type="course" size = "small" onPage={true} placeholder={searchQ}/>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-4">School Search</h2>
                        <SearchBar type="school" size = "small"/>
                    </div>
            </div>
            
            
            <div>
            {data && data.length > 0 ? (
                data.map((course : Course) => (
                <CourseCard key={course.id} course={course} />
                ))
            ) : (
                <p>No courses available.</p> // Optional fallback message
            )}
            </div>
        
        </>
    ); 
}

export default SearchInner;