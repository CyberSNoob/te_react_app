import { VIEWS } from "../../constants/view";
import PropTypes from "prop-types";

export const Home = ({ navigate }) => {
  return (
    <div className="grid grid-cols-2 w-full gap-6 md:gap-8 lg:gap-10 my-8 text-default-txtcolor">
      {Object.values(VIEWS.DATA).filter(v => v !== 'search').map((item) => {
        return (
          <article
            key={`home-${item}`}
            className="flex items-center justify-around h-32 bg-default hover:invert-100 hover:border"
            onClick={(e) => {
              navigate(e, item);
            }}
          >
            <p className="text-xl uppercase font-bold">{item}</p>
          </article>
        );
      })}
    </div>
  );
};

Home.propTypes = { navigate: PropTypes.func.isRequired };
