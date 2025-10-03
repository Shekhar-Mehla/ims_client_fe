import React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Searching for:", query);
  // 👉 here you can call an API or filter your data
};

const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full  rounded-2xl max-w-md"
    >
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 text-gray-500 hover:cursor-pointer" />
      <Input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-9 "
      />
    </form>
  );
};

export default SearchBar;
