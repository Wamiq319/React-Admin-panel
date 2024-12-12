import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";

const SearchInput = ({ handleSearch, placeholder, className = "" }) => {
  const words = useSelector((state) => state.lang.words);
  return (
    <div
      className={`flex items-center gap-3 w-52 rounded-md border border-orange-300 px-3 py-2 focus-within:border-orange-500 ${className}`}
    >
      <CiSearch className="text-slate-800" />
      <input
        onChange={handleSearch}
        type="text"
        placeholder={placeholder || words["Search"]}
        className="w-full bg-transparent outline-none text-base"
      />
    </div>
  );
};

export default SearchInput;
