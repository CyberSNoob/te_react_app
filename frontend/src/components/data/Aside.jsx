import { VIEWS } from "../../constants/view";
import PropTypes from "prop-types";

const Aside = ({ navigate }) => {
  const dataView = Object.keys(VIEWS.DATA);

  return (
    <aside className="hidden md:block pt-4 border-l text-center font-medium bold">
      <ul className="flex flex-col gap-4">
        {dataView.filter(v => v.trim().toLowerCase() !== 'search').map((item) => (
          <li key={`aside-${item}`}>
            <button
              onClick={(e) => navigate(e, item.toLowerCase())}
              className="hover:underline hover:cursor-pointer"
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

Aside.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default Aside;
