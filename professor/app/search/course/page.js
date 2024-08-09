"use client"
import { useSearchParams } from "next/navigation"
import  CourseCard  from "@/components/course/card";
import SearchBar from "@/components/searchbar/comp";
import useSWR from "swr";

const fetcher = async (url) => {
    const res = await fetch(url);
    return res.json();
}

export default function Search() {
    const search = useSearchParams();

    const searchQ = search ?  search.get("q") : "";
    

    const { data, error } = useSWR(`/api/search/course?q=${searchQ}`, fetcher);

    

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex flex-col items-center justify-center flex-grow">
                <h1 className="text-3xl font-bold mb-8">Search Professors and Courses</h1>
                <div className="flex space-x-8">
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-semibold mb-4">Professors Search</h2>
                    <SearchBar type="professor" size="small"/>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-semibold mb-4">Courses Search</h2>
                    <SearchBar type="course" size = "small" onPage={true} placeholder={searchQ}/>
                </div>
                </div>
            </div>


            <div>
                {data && data.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
            
        </main>
    ); 
}