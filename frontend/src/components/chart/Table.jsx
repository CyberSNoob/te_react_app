import PropTypes from "prop-types";

const Table = ({ data }) => {
  // checks only if it's array and not empty, not if it's an object or string
  const api_data = data && Array.isArray(data) ? data : [];
  if (!api_data.length) return <p>Data not available (yet)</p>;
  let columnNames = Object.keys(api_data[0]);
  let populateTableHeader = columnNames.map((columnName, i) => (
    <th key={i} className="border">
      {columnName}
    </th>
  ));
  let populateTableBody = api_data.map((rowData, i) => (
    <tr key={i}>
      {Object.entries(rowData).map(([k, v]) => (
        <td
          key={k}
          className={`${String(v).length > 32 ? "w-[32rem]" : "w-32"} border`}
        >
          {v}
        </td>
      ))}
    </tr>
  ));
  return (
    <div>
      <table className="table-fixed w-auto text-sm bg-gray-400 [&_th]:p-2 [&_td]:p-2 [&_th]:bg-gray-200 [&_tr:nth-child(even)]:bg-gray-200 [&_tr:nth-child(odd)]:bg-gray-100">
        <thead className="text-xs uppercase text-left">
          <tr className="bg-gray-200">{populateTableHeader}</tr>
        </thead>
        <tbody>{populateTableBody}</tbody>
      </table>
    </div>
  );
};

export default Table;

Table.propTypes = { data: PropTypes.array.isRequired };
