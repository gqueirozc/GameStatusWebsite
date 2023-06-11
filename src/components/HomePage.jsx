import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import MainTable from "./Table/MainTable";
import EmptyTable from "./Table/EmptyTable";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { GetPlayerNamesForTable } from "../services/APIService";
import "../css/HomePage.css";

export default function HomePage() {
  const [playerNames, setPlayerNames] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  const tableHead = {
    name: "Player Name",
    rank: "Rank",
    totalskill: "Total Level",
    combatlevel: "Combat Level",
    totalxp: "Total XP",
  };

  useEffect(() => {
    (async () => {
      var playersData = await GetPlayerNamesForTable();
      setPlayerNames(playersData);
      setLoading(false);
    })();
  }, []);

  function tableFilter(inputId, tableId, searchColumn) {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(inputId);
    filter = input.value.toUpperCase();
    table = document.getElementById(tableId);
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[searchColumn];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  const handleInputChange = (event) => {
    if (event.key === "Enter") {
      navigate(`/player/${event.target.value.replaceAll(" ", "-")}`);
    }
  };

  const handleSearchButtonClick = () => {
    const filterValue = document.getElementById("playerNameSearchInput").value;
    if (filterValue === "") {
      alert("Empty search player box, please provide a player name.");
    } else {
      navigate(`/player/${filterValue.replaceAll(" ", "-")}`);
    }
  };

  return isLoading ? (
    <div className="App">
      <NavBar />
      <CircularProgress className="loading-circle" color="inherit" size={70} />
    </div>
  ) : (
    <div className="homepage">
      <NavBar />
      <div className="table-div">
        <div className="input-container">
          <div>
            <input
              className="input-search input-left"
              type="text"
              id="playerNameSearchInput"
              onKeyDown={handleInputChange}
              placeholder="Search player..."
            />
            <button className="search-button" onClick={handleSearchButtonClick}>
              Search
            </button>
          </div>
          <div> Registered users: {playerNames.count} </div>
          <input
            className="input-filter input-right"
            type="text"
            id="playerNameFilterInput"
            onChange={() =>
              tableFilter("playerNameFilterInput", "playerNamesTable", 0)
            }
            placeholder="Filter player..."
          />
        </div>
        {playerNames.players.length === 0 ? (
          <EmptyTable id="emptyPlayerList" type="playerNameList" />
        ) : (
          <MainTable
            id="playerNamesTable"
            data={playerNames.players}
            head={tableHead}
          />
        )}
      </div>
      <footer />
    </div>
  );
}
