import Aside from "./Aside.jsx";
import { DataView } from "./DataView.jsx";
import PropTypes from "prop-types";
import { useState, useEffect, Suspense, useRef } from "react";
import { getData } from "./Api.js";
import { VIEWS } from "../../constants/view.js";
import { useDataStore } from "../nav/store.js";
import navigate from "../nav/PageNavigation.js";
import debounce from "lodash/debounce";

const DataViewContainer = ({ view }) => {
  const { data, setData } = useDataStore();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const debouncedGetDataRef = useRef(null);

  // debounce and throtteling frequent api calls
  useEffect(() => {
    // set ref if null
    if (!debouncedGetDataRef.current) {
      debouncedGetDataRef.current = debounce((currentView) => {
        setError(null);
        setLoading(true);
        getData(currentView)
          .then((d) => setData(d))
          .catch(() => setError(`Failed to load data: error occured`))
          .finally(() => setLoading(false));
      }, 500);
    }
    if (view.trim().toLowerCase() !== VIEWS.DATA.SEARCH.trim().toLowerCase()) {
      debouncedGetDataRef.current(view);
    } else {
      setLoading(false);
      setError();
    }
    return () => debouncedGetDataRef.current && debouncedGetDataRef.current.cancel();
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
