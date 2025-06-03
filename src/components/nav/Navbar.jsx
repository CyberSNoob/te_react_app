import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { VIEWS } from "../../constants/view";
import PropTypes from "prop-types";
import Search from "./Search";
import TEIcon from "./TEICON";
import navigate from "./PageNavigation";

const navViews = Object.values(VIEWS).slice(0, 3);
const dataViews = Object.values(VIEWS.DATA);

const MainAside = ({ isAsideActive }) => {
  return (
    <aside
      id="default-sidebar"
      className={`fixed bottom left-0 z-40 w-full sm:w-[90%] md:w-[60%] lg:w-[40%] h-screen font-medium uppercase bg-default opacity-95 transition-transform duration-500 ease-in-out transform 
  ${isAsideActive ? "translate-x-0" : "-translate-x-full"}`}
    >
      <ul className="flex flex-col items-center gap-6 mt-4 text-l">
        {navViews.map((v) => (
          <li key={`aside-nav-${v}`} className="w-full mb-4">
            <a
              href="#"
              className="block text-center border-b border-gray-300 mx-8"
              onClick={(e) => navigate(e, v)}
            >
              {v}
            </a>
          </li>
        ))}
        <div className="my-4"></div>
        {dataViews
          .filter((v) => v.trim().toLowerCase() !== "search")
          .map((v) => (
            <li key={`aside-data-${v}`} className="w-full mb-4">
              <a
                href="#"
                className="block text-center border-b border-gray-300 mx-24"
                onClick={(e) => navigate(e, v)}
              >
                {v.toUpperCase()}
              </a>
            </li>
          ))}
      </ul>
    </aside>
  );
};

MainAside.propTypes = { isAsideActive: PropTypes.bool.isRequired };

const Navbar = () => {
  const [isAsideActive, setIsAsideActive] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleSearchVisibility = (isVisible) => {
    setIsSearchVisible(isVisible);
  };

  return (
    <header className="w-full h-full bg-default text-default-txtcolor overflow-x-hidden">
      <div className="container mx-auto">
        <div className="flex justify-between py-2">
          <div className="flex">
            <button
              type="button"
              onClick={() => setIsAsideActive(!isAsideActive)}
            >
              <RxHamburgerMenu className="text-4xl m-1 cursor-pointer" />
            </button>
            <a
              href="#"
              className="content-center px-4"
              onClick={(e) => navigate(e, "home")}
            >
              <TEIcon />
            </a>
          </div>

          <nav className={`hidden ${isSearchVisible ? "hidden" : "md:flex"}`}>
            <ul
              className={`flex items-center gap-x-8 p-2 font-medium uppercase`}
            >
              {navViews.map((v) => (
                <li key={`main-${v}`}>
                  <a href="#" onClick={(e) => navigate(e, v)}>
                    {v}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <Search
            isSearchVisible={isSearchVisible}
            onVisibilityChange={handleSearchVisibility}
            navigate={navigate}
          />
        </div>
        {isAsideActive && (
          <div
            className="fixed inset-0 bg-gray-500 opacity-50 z-30"
            onClick={() => setIsAsideActive(!isAsideActive)}
          ></div>
        )}
        <MainAside isAsideActive={isAsideActive} />
      </div>
    </header>
  );
};

export default Navbar;
