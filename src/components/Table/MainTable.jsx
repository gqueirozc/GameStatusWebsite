import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import "../../css/PlayerTable.css";

const Head = ({ keys, head, onSortChange }) => {
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleSortChange = (column) => {
    let order = "asc";
    if (sortColumn === column && sortOrder === "asc") {
      order = "desc";
    }
    setSortColumn(column);
    setSortOrder(order);
    if (onSortChange) {
      onSortChange(column, order);
    }
  };

  const getSortIcon = (column) => {
    if (sortColumn === column) {
      return sortOrder === "asc" ? "▲" : "▼";
    }
    return "";
  };

  return (
    <thead>
      <tr>
        {keys.map((key) => (
          <th key={key} onClick={() => handleSortChange(key)}>
            {head[key]}
            {getSortIcon(key)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const Row = ({ record }) => {
  const navigate = useNavigate();
  const redirect = (e) => {
    if (e.target.checked === undefined) {
      if (e.target.firstChild.checked === undefined) {
        const formattedName = record.name.replaceAll(/ /g, "-");
        navigate("/player/" + formattedName);
      }
    }
  };

  const keys = Object.keys(record);
  return (
    <tr onClick={(e) => redirect(e, record.name)}>
      {keys.map((key) => (
        <td key={key + record.name}>{record[key]}</td>
      ))}
    </tr>
  );
};

const ProjectTable = ({ id, head, data }) => {
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleSortChange = (column, order) => {
    setSortColumn(column);
    setSortOrder(order);
  };

  const parseValue = (value, column) => {
    if (typeof value === "string") {
      if (column === "Player Name") {
        return value.toLowerCase();
      } else if (!isNaN(parseFloat(value.replace(/,/g, "")))) {
        return parseFloat(value.replace(/,/g, ""));
      }
    }
    return value;
  };

  const sortedData = data.sort((a, b) => {
    const aValue = parseValue(a[sortColumn], sortColumn);
    const bValue = parseValue(b[sortColumn], sortColumn);
    if (sortOrder === "asc") {
      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue);
      } else {
        return aValue - bValue;
      }
    } else if (sortOrder === "desc") {
      if (typeof aValue === "string" && typeof bValue === "string") {
        return bValue.localeCompare(aValue);
      } else {
        return bValue - aValue;
      }
    } else {
      return 0;
    }
  });

  const keys = Object.keys(data[0]);
  return (
    <Table
      className="player-table table table-striped table-hover fixed-table"
      id={id}
    >
      <Head keys={keys} head={head} onSortChange={handleSortChange} />
      <tbody>
        {sortedData.map((record) => (
          <Row key={record.name} record={record} />
        ))}
      </tbody>
    </Table>
  );
};

export default ProjectTable;
