import { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import PropTypes from "prop-types";
import { postData } from "../data/Api";
import { VIEWS } from "../../constants/view";
import { useDataStore } from "./store";

export default function Search({
  isSearchVisible,
  onVisibilityChange,
  navigate,
}) {
  const searchBoxRef = useRef(null);
  const {setTerm, setData} = useDataStore();
  const [isSmallDevice, setIsSmallDevice] = useState(
    () => window.innerWidth < 768
  );

  // handle screen size
  useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(() => window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleIconClick = () => {
    onVisibilityChange(true);
    // ensures input is rendered before focusing
    setTimeout(() => {
      searchBoxRef.current?.focus();
    }, 0); 
  };

  const search = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchValue = formData.get("searchBox").trim();
    console.log(searchValue);
    if (!searchValue) return;
    setTerm(searchValue);
    searchBoxRef.current.value = "";
    const results = await postData(searchValue);
    if(!results) return;
    setData(results);
    navigate(e, VIEWS.DATA.SEARCH);
  };

  // link element to useref with ref={inputRef}
  return (
    <form onSubmit={search} className="flex items-center">
      <div className="relative flex items-center p-2">
        {(!isSmallDevice || isSearchVisible) && (
          <input
            ref={searchBoxRef}
            type="text"
            name="searchBox"
            placeholder="Search"
            className="text-[#fff] p-2 border-b focus:outline-none focus:border-b focus:w-lg ease-in-out duration-3000"
            onFocus={() => onVisibilityChange(true)}
            onBlur={() => onVisibilityChange(false)}
          />
        )}
        <button type="submit" className="hidden" />
        {isSmallDevice && (
          <FaSearch
            className="text-gray-500 text-2xl cursor-pointer"
            onClick={() => handleIconClick()}
          />
        )}
      </div>
    </form>
  );
}

Search.propTypes = {
  isSearchVisible: PropTypes.bool.isRequired,
  onVisibilityChange: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};
