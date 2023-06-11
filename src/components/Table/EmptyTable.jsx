import React from "react";
import { Table } from "react-bootstrap";
import "../../css/PlayerTable.css";

const Header = () => {
  return (
    <thead>
      <tr>
        <th>Player Name</th>
        <th>Rank</th>
        <th>Total Level</th>
        <th>Combat Level</th>
        <th>Total XP</th>
      </tr>
    </thead>
  );
};

const Row = () => {
  return (
    <>
      <tr>
        <td className="td3">No players registered</td>
        <td className="td3">No players registered</td>
        <td className="td3">No players registered</td>
        <td className="td3">No players registered</td>
        <td className="td3">No players registered</td>
      </tr>
    </>
  );
};

const EmptyTablee = (id) => {
  return (
    <Table id={id} className="player-table">
      <Header />
      <tbody>
        <Row />
      </tbody>
    </Table>
  );
};

export default EmptyTablee;
