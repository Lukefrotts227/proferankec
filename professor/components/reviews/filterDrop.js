"use client"


import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react"; 


const Filter =  ({ items, itemId, type = "course", param = "courseId" }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [selectedItem, setSelectedItem] = useState(itemId || '');

    
    const handleItemChange = (id) =>{
        setSelectedItem(id);  
        const params = new URLSearchParams(window.location.search);


        if(id){

            params.set(param, id);
        } else{
            params.delete(param);
        }
        router.push(`${pathname}?${params.toString()}`, undefined, { shallow: true });

    }

    return (
        <>
            <Listbox value={selectedItem} onChange={handleItemChange}>
                <ListboxButton className="relative w-1/3 cursor-default py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    {selectedCourse ? items.find(item => item.id === selectedCourse).name : `'All ${type}s'`}
                </ListboxButton>
                <ListboxOptions className=" mt-2 max-h-60 w-1/3 overflow-auto rounded-md bg-white shadow-lg z-10 sm:text-sm">
                    <ListboxOption value="" className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-300 transition-all " 
                    >
                        All {type}s
                    </ListboxOption>
                    {items.map((item) => (
                        <ListboxOption key={item.id} value={item.id} className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-300">
                            {item.name}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>
        </>
    ); 
}

export default Filter;