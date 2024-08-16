"use client"


import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react"; 


const CourseFilter =  ({ courses, courseId }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [selectedCourse, setSelectedCourse] = useState(courseId || '');

    
    const handleCourseChange = (id) =>{
        setSelectedCourse(id);  
        const params = new URLSearchParams(window.location.search);


        if(id){

            params.set('courseId', id);
        } else{
            params.delete('courseId');
        }
        router.push(`${pathname}?${params.toString()}`, undefined, { shallow: true });

    }

    return (
        <>
            <Listbox value={selectedCourse} onChange={handleCourseChange}>
                <ListboxButton className="relative w-1/3 cursor-default py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    {selectedCourse ? courses.find(course => course.id === selectedCourse).name : 'All Courses'}
                </ListboxButton>
                <ListboxOptions className=" mt-2 max-h-60 w-1/3 overflow-auto rounded-md bg-white shadow-lg z-10 sm:text-sm">
                    <ListboxOption value="" className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-300 transition-all " 
                    >
                        All Courses
                    </ListboxOption>
                    {courses.map((course) => (
                        <ListboxOption key={course.id} value={course.id} className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-300">
                            {course.name}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>
        </>
    ); 
}

export default CourseFilter;