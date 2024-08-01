import { useRouter } from "next/navigation"; 
import { useState, ChangeEvent } from "react";  


export const SerachInput = ({ defaultValue }) => {
    const router = useRouter(); 
    const [searchValue, setSearchValue] = useState(defaultValue);
    const handleChange = (e) =>{
        const inputValue = e.target.value; 
        setSearchValue(inputValue);
    }
    const handleSearch = () => {
        if(inputValue){
            router.push(`/search?query=${searchValue}`);
        }
        if(!inputValue){
            router.push(`/search`);
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