import SearchInner from "@/components/searchPages/course.js";



export default function Search() {
    

    

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            
            <h1 className="text-3xl font-bold mb-8">Search Professors and Courses</h1>
                <SearchInner />   
        </main>
    ); 
}