import SearchBar from '@/components/searchbar/comp';
const TopSearchSection = () => {
    return(
        <div>
            <SearchBar type = "course" size = "small" placeholder />
            <div className = "py-1" />
            <SearchBar type ="professor" size = "small" placeholder />
            <div className = "py-1" />
            <SearchBar type = "school" size = "small" placeholder />
      </div>
      );
}

export default TopSearchSection; 