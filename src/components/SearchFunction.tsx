import { useState } from "react";

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
    <div>
      <input
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Busque um livro..."
        type="text"
        value={input}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchFunction;
