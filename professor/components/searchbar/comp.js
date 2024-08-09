"use client"

import { useRouter } from "next/navigation"; 
import { useState } from "react"; 


export const SearchBarPrimitive = ({ defaultValue = '', searchType = 'course', placeholder = 'Search...', buttonText = 'Search', size="medium"}) =>{
    const router = useRouter(); 
    const [searchValue, setSearchValue] = useState(defaultValue);

    const handleChange = (e) => {
        const inputValue = e.target.value; 
        setSearchValue(inputValue); 
    }; 

    const handleSearch = () => {
        const encodedURI = encodeURI(searchValue);  
        if(searchValue){
            const value = `/search/${searchType}?q=${encodeURI(encodedURI)}`;
            router.push(value); 
            
        }

    }; 

    const handleKeyPress = (e) => {
        if(e.key == "Enter") return handleSearch(); 
    }; 

    const sizeClasses = {
        small: 'px-2 py-1 text-sm',
        medium: 'px-4 py-2 text-base', // Default size
        large: 'px-6 py-3 text-lg',
    };

    return(
        <div className="flex space-x-4 ">
            <input
            type = "text"
            value = {searchValue}
            onChange = {handleChange}
            onKeyPress = {handleKeyPress}
            placeholder = {placeholder}
            className = {`border border-gray-300 rounded-lg ${sizeClasses[size]}`}
            />
            <button onClick = {handleSearch} className={`bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 ${sizeClasses[size]}`}>
                {buttonText}
            </button>

        </div>
    ); 
 
}; 

const SearchBar = ({ type = "course", size = "medium", onPage = false, placeholder}) => {
    if(type == "course" && onPage) return <SearchBarPrimitive searchType="course" placeholder={placeholder} buttonText="Search Courses" size = {size}/>;
    if(type == "professor" && onPage) return <SearchBarPrimitive searchType="professor" placeholder={placeholder} buttonText="Search Professors" size={size} />;
    if(type == "course") return <SearchBarPrimitive searchType="course" placeholder="Search for courses..." buttonText="Search Courses" size = {size}/>; 
    if(type == "professor") return <SearchBarPrimitive searchType="professor" placeholder="Search for professors..." buttonText="Search Professors" size={size} />;
    return null;  

}; 


export default SearchBar; 