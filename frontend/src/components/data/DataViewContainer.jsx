import Aside from "./Aside.jsx";
import { DataView } from "./DataView.jsx";
import PropTypes from "prop-types";
import { useState, useEffect, Suspense } from "react";
import { getData } from "./Api.js";
import { VIEWS } from "../../constants/view.js";
import { useDataStore } from "../nav/store.js";
import navigate from "../nav/PageNavigation.js";

const DataViewContainer = ({ view }) => {
  const { data, setData } = useDataStore();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // debounce and throtteling frequent api calls
  useEffect(() => {
    setError(null);
    if (view.trim().toLowerCase() !== VIEWS.DATA.SEARCH.trim().toLowerCase()) {
      setLoading(true);
      getData(view)
        .then((d) => setData(d))
        .catch(() => setError(`Failed to load data: error occured`))
        .finally(() => setLoading(false));
    }
  }, [view]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 my-6">
      <div className="md:px-8 col-span-1 md:col-span-4">
        {error ? (
          <p>{error}</p>
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <Suspense fallback={<p>Loading data...</p>}>
            <DataView view={view} data={data} />
          </Suspense>
        )}
      </div>
      <Aside navigate={navigate} />
    </div>
  );
};

DataViewContainer.propTypes = {
  view: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default DataViewContainer;
