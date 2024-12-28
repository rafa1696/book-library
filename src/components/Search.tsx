import { useState } from "react";

interface IBusca {
  onSearch: (input: string) => void;
}

const Busca = ({ onSearch }: IBusca) => {
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

export default Busca;
