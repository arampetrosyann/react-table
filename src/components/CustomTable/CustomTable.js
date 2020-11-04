import React, { useState } from "react";
import styles from "./CustomTable.module.css";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { BsCircle } from "react-icons/bs";
import { orderBy } from "lodash";
import PropTypes from "prop-types";

const SortingOrders = {
  default: "default",
  desc: "desc",
  asc: "asc",
};

const getSortOrder = (sortOrder) => {
  switch (sortOrder) {
    case SortingOrders.default:
      return SortingOrders.asc;
    case SortingOrders.asc:
      return SortingOrders.desc;
    case SortingOrders.desc:
      return SortingOrders.asc;
    default:
      throw new Error(`There's no such an Sorting Order: ${sortOrder}`);
  }
};

export default function CustomTable({
  headers,
  data,
  onFilter,
  onItemClick,
  onRemoveItems,
}) {
  const [sortOrder, setSortOrder] = useState(SortingOrders.default);
  const [sortedColIdx, setSortedColIdx] = useState();
  const [sortedData, setSortedData] = useState(data);
  const [selectedRows, setSelectedRows] = useState([]);

  const sortText =
    sortOrder === SortingOrders.asc ? (
      <AiFillCaretUp />
    ) : sortOrder === SortingOrders.desc ? (
      <AiFillCaretDown />
    ) : (
      <BsCircle />
    );

  const handleSortClick = (dataIndex) => {
    setSortedColIdx(dataIndex);

    let nextOrder = getSortOrder(sortOrder);

    if (dataIndex !== sortedColIdx) {
      nextOrder = SortingOrders.asc;
    }

    setSortOrder(nextOrder);
    setSortedData(orderBy(sortedData, [sortedColIdx], [nextOrder]));
    onFilter(sortedData, sortOrder, sortedColIdx);
  };

  const handleRowClick = (item) => {
    onItemClick(item);
    setSelectedRows((r) => {
      const isItemSelected = selectedRows.findIndex((i) => i.id === item.id);
      return isItemSelected !== -1
        ? r.filter((i) => i.id !== item.id)
        : [...r, item];
    });
  };

  const handleDeleteSelectedItems = () => {
    const filteredData = sortedData.filter((d) => {
      const isItemInSortedData = selectedRows.findIndex((i) => i.id === d.id);

      return isItemInSortedData === -1;
    });

    setSortedData(filteredData);
    setSelectedRows([]);
    onRemoveItems(filteredData);
  };

  const renderHeadertoTableData = ({ title, dataIndex, width, sorter }) => {
    return (
      <th className={styles.headers} style={{ width }} key={dataIndex}>
        {title}
        <span>
          {sorter && (
            <button
              className={styles.sortBtn}
              onClick={() => handleSortClick(dataIndex)}
            >
              {sortedColIdx === dataIndex ? sortText : <BsCircle />}
            </button>
          )}
        </span>
      </th>
    );
  };

  const renderDataToTableRow = (item) => {
    return (
      <tr
        className={styles.tableRow}
        onClick={() => handleRowClick(item)}
        key={item.id}
      >
        {headers.map(({ dataIndex, width }, key) => {
          return (
            <td key={dataIndex} style={{ width }}>
              {key === 0 ? (
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={
                    selectedRows.findIndex((i) => i.id === item.id) !== -1
                  }
                />
              ) : null}
              {item[dataIndex] || "—"}
            </td>
          );
        })}
      </tr>
    );
  };

  return (
    <div className={styles.container}>
      <button className={styles.deleteBtn} onClick={handleDeleteSelectedItems}>
        Delete {selectedRows.length} Selected Items
      </button>
      <table className={styles.table}>
        <thead>
          <tr>{headers.map(renderHeadertoTableData)}</tr>
        </thead>
        <tbody>{sortedData.map(renderDataToTableRow)}</tbody>
      </table>
    </div>
  );
}

CustomTable.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      dataIndex: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      sorter: PropTypes.bool,
    })
  ),
  data: PropTypes.arrayOf(PropTypes.object),
  onItemClick: PropTypes.func,
  onRemoveItems: PropTypes.func,
  onFilter: PropTypes.func,
};
