import { lazy } from "react";
import PropTypes from "prop-types";

const LineChart = lazy(() => import("../chart/LineChart"));
const BarChart = lazy(() => import("../chart/BarChart"));
const Table = lazy(() => import("../chart/Table"));
const NewsView = lazy(() => import("../chart/NewsView"));

const components = {
	forecast: (props) => <BarChart data={props.data} />,
	dividends: (props) => <Table data={props.data} />,
	news: (props) => <NewsView data={props.data} />,
	eurostat: (props) => <LineChart view={props.view} data={props.data} />,
};

export const DataView = ({ view, data }) => {
	const ActiveView = components[view] || Table;
	console.log(view);
	return <ActiveView view={view} data={data} />;
};

DataView.propTypes = {
	view: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired,
};
