import SearchBar from '@/components/searchbar/comp';
const TopSearchSection = () => {
    return(
        <div>
            <SearchBar type = "course" size = "small" />
            <div className = "py-1" />
            <SearchBar type ="professor" size = "small" />
            <div className = "py-1" />
            <SearchBar type = "school" size = "small" />
      </div>
      );
}

export default TopSearchSection; 