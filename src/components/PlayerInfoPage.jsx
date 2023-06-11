import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import {
  GetPlayerInformation,
  ConfirmInsertDialog,
  ConfirmRemoveDialog,
  ConfirmUpdateInfoDialog,
} from "../services/APIService";
import NavBar from "./NavBar";
import "../css/PlayerInfoPage.css";
import "../css/PlayerTable.css";

export default function PlayerInfoPage() {
  const [playerInfo, setPlayerInfo] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    const player = window.location.pathname.replace("/player/", "");
    const playerName = player.replaceAll("-", " ");
    setPlayerName(playerName);
    (async () => {
      const playerInformation = await GetPlayerInformation(playerName);
      setPlayerInfo(playerInformation);
      setLoading(false);
    })();
  }, []);

  return isLoading ? (
    <div className="App">
      <NavBar />
      <CircularProgress className="loading-circle" color="inherit" size={70} />
    </div>
  ) : (
    <div>
      <NavBar />
      {Object.keys(playerInfo).length !== 0 ? (
        <div className="container">
          <div className="container-inner">
            <div className="player-activities">
              <div className="player-info">
                <img src={require(`../images/defaultHead.png`)}></img>
                <Typography variant="h3" className="player-title">
                  {playerInfo.name || "Undefined"}
                </Typography>
                <div className="player-stats">
                  <div className="player-stat">
                    <p>Combat Level</p>
                    <p>
                      <b>{playerInfo.combatLevel || "N/A"}</b>
                    </p>
                  </div>
                  <div className="player-stat">
                    <p>Total XP</p>
                    <p>
                      <b>{playerInfo.totalXP || "N/A"}</b>
                    </p>
                  </div>
                  <div className="player-stat">
                    <p>Current Rank</p>
                    <p>
                      <b>{playerInfo.rank || "N/A"}</b>
                    </p>
                  </div>
                </div>
                <div className="button-container">
                  <ConfirmUpdateInfoDialog playerName={playerName} />
                  <ConfirmRemoveDialog playerName={playerName} />
                </div>
              </div>
              <h3>Latest Activities</h3>
              <div className="activity-box">
                {playerInfo.activities.map((activity, index) => (
                  <div className="activity" key={index}>
                    <div className="activity-icon">
                      {activity.image && (
                        <img
                          className="activity-img"
                          src={require(`../images/${activity.image}`)}
                          alt="Activity Icon"
                        />
                      )}
                    </div>
                    <div className="activity-details">
                      <span className="activity-text">{activity.text}</span>
                      <span className="activity-date">{activity.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="player-skills">
              <table className="skills-table table table-striped">
                <thead>
                  <tr>
                    <th>Total Skill Level: {playerInfo.totalSkill}</th>
                    <th>Skill</th>
                    <th>Level</th>
                    <th>XP</th>
                    <th>Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {playerInfo.skillValues.map((skill, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          className="skill-img"
                          src={require(`../images/${skill.skillName}.png`)}
                          alt="Skill Icon"
                        ></img>
                      </td>
                      <td>{skill.skillName}</td>
                      <td>{skill.level}</td>
                      <td>{skill.xp}</td>
                      <td>{skill.rank}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="container-inner">
            <div className="player-activities">
              <div className="player-info">
                <Typography variant="h3" className="player-title">
                  {playerName}
                </Typography>
                <div className="player-stats">
                  <div className="player-stat">
                    <p>Combat Level</p>
                    <p>
                      <b>{playerInfo.combatLevel || "N/A"}</b>
                    </p>
                  </div>
                  <div className="player-stat">
                    <p>Total XP</p>
                    <p>
                      <b>{playerInfo.totalXP || "N/A"}</b>
                    </p>
                  </div>
                  <div className="player-stat">
                    <p>Current Rank</p>
                    <p>
                      <b>{playerInfo.rank || "N/A"}</b>
                    </p>
                  </div>
                </div>
                <div className="button-container">
                  <div>
                    <b>Player NOT tracked</b>
                  </div>
                  <ConfirmInsertDialog playerName={playerName} />
                </div>
              </div>
              <h3>Latest Activities</h3>
              <div className="activity-box">
                <div className="activity" key="N/D">
                  <div className="activity-icon">
                    <img className="activity-img" alt="Activity Icon" />
                  </div>
                  <div className="activity-details">
                    <span className="activity-text"> N/D </span>
                    <span className="activity-date"> N/D </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="player-skills">
              <h3>Skill Values</h3>
              <table className="skills-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Skill</th>
                    <th>Level</th>
                    <th>XP</th>
                    <th>Rank</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key="N/D">
                    <td>
                      <img className="activity-img" alt="Skill Icon"></img>
                    </td>
                    <td>N/D</td>
                    <td>N/D</td>
                    <td>N/D</td>
                    <td>N/D</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <footer />
    </div>
  );
}
