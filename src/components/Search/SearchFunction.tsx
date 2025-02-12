import { useState } from "react";
import SearchBar from "./components/SearchBar";

interface ISearchFunction {
  onSearch: (input: string) => void;
}

const SearchFunction = ({ onSearch }: ISearchFunction) => {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    if (input.trim()) {
      onSearch(input);
    }
  };

  return (
    <SearchBar
      handleSearch={handleSearch}
      input={input}
      setInput={setInput}
    />
  );
};

export default SearchFunction;
