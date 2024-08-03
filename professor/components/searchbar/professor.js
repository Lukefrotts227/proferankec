"use client"; 

import { useRouter } from "next/navigation"; 
import { useState, ChangeEvent } from "react";  


export const SearchBarProfessor = ({ defaultValue }) => {
    const router = useRouter(); 
    const [searchValue, setSearchValue] = useState(defaultValue);
    const handleChange = (e) =>{
        const inputValue = e.target.value; 
        setSearchValue(inputValue); 
    }
    const handleSearch = () => {
        if(searchValue){
            const encodedURI = encodeURI(searchValue);  
            router.push(`/search/professor?q=${encodeURI(encodedURI)}`);
        }
        if(!searchValue){
            router.push(`/search/professor`);
        }
    }
    const handleKeyPress = (e) => {
        if(e.key == "Enter") return handleSearch(); 
    }
    return (
        <div>
            <input 
                type="text" 
                value={searchValue} 
                onChange={handleChange} 
                onKeyPress={handleKeyPress}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    )

}