import Aside from "./Aside";
import { DataView } from "./DataView";
import PropTypes from "prop-types";
import { useState, useEffect, Suspense } from "react";
import { getData } from "./Api.js";
import { VIEWS } from "../../constants/view";
import { useDataStore } from "../nav/store.js";

const DataViewContainer = ({ view, navigate }) => {
  const { data, setData } = useDataStore();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // debounce and throtteling for frequent api calls
  useEffect(() => {
    if (view.trim().toLowerCase() !== VIEWS.DATA.SEARCH.trim().toLowerCase()) {
      setLoading(true);
      getData(view)
        .then((d) => setData(d))
        .catch((e) => setError(`Failed to load data: ${e}`))
        .finally(() => setLoading(false));
    }
  }, [view]);

  // container mx-auto px-4 w-full h-full grid grid-cols-5 gap-4 my-6
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 my-6">
      {/* dataview */}
      <div className="col-span-1 md:col-span-4">
        {error ? (
          <p>{error}</p>
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <Suspense fallback={<p>Loading data...</p>}>
            <DataView view={view} data={data} />
          </Suspense>
          /* {<pre>{JSON.stringify(data, null, 2)}</pre>} */
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
