"use client"
import { useSearchParams } from "next/navigation"
import  ProfessorCard  from "@/components/professor/card";
import { SearchBarProfessor } from "@/components/searchbar/professor";
import { SearchBarCourse } from "@/components/searchbar/courses";
import useSWR from "swr";

const fetcher = async (url) => {
    const res = await fetch(url);
    return res.json();
}

export default function Search() {
    const search = useSearchParams();

    const searchQ = search ?  search.get("q") : "";
    

    const { data, error } = useSWR(`/api/search/professor?q=${searchQ}`, fetcher);

    

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>Professors search</h1>
            <SearchBarProfessor defaultValue={searchQ} />

            <h1>Courses search</h1>
            <SearchBarCourse defaultValue={searchQ} />


            <div>
                {data && data.map((professor) => (
                    <ProfessorCard key={professor.id} professor={professor} />
                ))}
            </div>
            
        </main>
    )
}