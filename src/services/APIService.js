import axios from "axios";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../css/PlayerInfoPage.css";

export async function GetAllPlayerData() {
  try {
    const { data } = await axios.get(
      "https://localhost:7072/api/UserStatus/GetAllPlayerData"
    );
    return data;
  } catch (error) {
    alert(
      `${error.message}.\r\nAPI is unavailable...\r\nPlease try again later.`
    );
  }
}

export async function GetSinglePlayerData(playerName) {
  try {
    const { data } = await axios.get(
      `https://localhost:7072/api/UserStatus/GetPlayerData/${playerName}`
    );
    return data;
  } catch (error) {
    alert(
      `${error.message}.\r\nAPI is unavailable...\r\nPlease try again later.`
    );
  }
}

export async function InsertPlayerData(playerName) {
  await axios.post(
    `https://localhost:7072/api/UserStatus/InsertUser/${playerName}`
  );
}

export async function UpdaatePlayerData(playerName) {
  await axios.post(
    `https://localhost:7072/api/UserStatus/UpdateUserInfo/${playerName}`
  );
}

export async function DeletePlayerData(playerName) {
  await axios.post(
    `https://localhost:7072/api/UserStatus/DeleteUser/${playerName}`
  );
}

export function ConfirmInsertDialog({ playerName }) {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    handleCloseDialog();
    try {
      await InsertPlayerData(playerName);
      alert("Started Tracking.");
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data;
        if (errorMessage.includes("profile is private")) {
          alert(`Error 500\nPrivate Profile. Unable to track.`);
        } else if (errorMessage.includes("profile does not exist")) {
          alert(`Error 500.\nProfile does not exist. Unable to track`);
        } else {
          alert("An error occurred. Please try again later.");
        }
        window.location.href = "/";
      }
    }
  };

  return (
    <>
      <button className="btn" onClick={handleOpenDialog}>
        Start tracking
      </button>
      <Modal show={open} onHide={handleCloseDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Start tracking player?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This will try to start tracking player information, adding it to the
          database, and then will reload the page.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleConfirm}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleCloseDialog}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export function ConfirmRemoveDialog({ playerName }) {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    handleCloseDialog();
    try {
      await DeletePlayerData(playerName);
      alert("Stopped Tracking... Navigating to home page.");
      window.location.href = "/";
    } catch (error) {
      alert("An error occurred. Please try again later.");
      window.location.href = "/";
    }
  };

  return (
    <>
      <button className="btn" onClick={handleOpenDialog}>
        Stop tracking
      </button>
      <Modal show={open} onHide={handleCloseDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Stop tracking player?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This will remove the player information from the database and then
          navigate to the homepage.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleConfirm}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleCloseDialog}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export function ConfirmUpdateInfoDialog({ playerName }) {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    handleCloseDialog();
    try {
      await UpdaatePlayerData(playerName);
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data;
        if (errorMessage.includes("profile is private")) {
          alert(`Error 500\nPrivate Profile. Unable to track.`);
        } else if (errorMessage.includes("profile does not exist")) {
          alert(`Error 500.\nProfile does not exist. Unable to track`);
        } else {
          alert("An error occurred. Please try again later.");
        }
        window.location.href = "/";
      }
    }
  };

  return (
    <>
      <button className="btn" onClick={handleOpenDialog}>
        Force update
      </button>
      <Modal show={open} onHide={handleCloseDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Update player information?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This will update the information on the page and then reload it.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleConfirm}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleCloseDialog}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export async function GetPlayerNamesForTable() {
  try {
    const apiData = await GetAllPlayerData();
    const playerList = apiData.map((data) => {
      let totalXP;
      if (data.totalxp.$numberInt) {
        totalXP = parseInt(data.totalxp.$numberInt);
      } else if (data.totalxp.$numberLong) {
        totalXP = parseInt(data.totalxp.$numberLong);
      } else {
        totalXP = 0;
      }

      return {
        name: data.name,
        rank: data.rank,
        totalskill: data.totalskill.$numberInt,
        totalxp: totalXP,
        combatlevel: data.combatlevel.$numberInt,
      };
    });

    const playerCount = playerList.length;
    return {
      players: playerList,
      count: playerCount,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      players: [],
      count: 0,
    };
  }
}

export async function GetPlayerInformation(playerName) {
  try {
    const apiData = await GetSinglePlayerData(playerName);
    const fullData = apiData[0];

    function formatActivityText(text, details) {
      let imagesrc;
      if (text.includes("Quest complete:")) {
        text = text.replace("Quest complete: ", "");
        imagesrc = "quest_icon.png";
      } else if (text.includes("I found")) {
        text = text
          .replace("I found a", "")
          .replace("n", "")
          .replace("I found some", "");
        imagesrc = "coins.png";
      } else if (text.includes("I killed")) {
        text = text.replace("I killed", "");
        imagesrc = "kill.png";
      } else if (text.includes("treasure trail")) {
        text = text.replace("completed", "");
        imagesrc = "clues.png";
      } else if (text.includes("Clan")) {
        imagesrc = "clan.png";
      } else if (text.includes("XP in")) {
        const match = text.match(/in\s(.+)/i);
        if (match) {
          const skill = match[1].trim().replace(".", "");
          text = text.replace(`in ${skill}`, "");
          imagesrc = `${skill}.png`;
        }
      } else if (
        text.includes("Levelled up") &&
        !details.includes("I am now level")
      ) {
        const match = text.match(/up\s(.+)/i);
        if (match) {
          const skill = match[1].trim().replace(".", "");
          text = text.replace(`${skill}.`, "");
          imagesrc = `${skill}.png`;
        }
      } else if (
        text.includes("Levelled up") &&
        details.includes("I am now level")
      ) {
        const match = text.match(/up\s(.+)/i);
        const matchlevel = details.match(/I am now level\s(.+)/i);
        if (match) {
          const skill = match[1].trim().replace(".", "");
          const level = matchlevel[1].trim().replace(".", "");
          text = text.replace(`${skill}.`, level);
          imagesrc = `${skill}.png`;
        }
      }
      return [capitalizeWords(text.trim()), imagesrc];
    }

    function capitalizeWords(str) {
      return str.replace(/\b\w/g, (match) => match.toUpperCase());
    }

    const activities = (fullData.activities || [])
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 12)
      .map((activity) => ({
        date: formatDateTimeString(activity.date),
        details: activity.details.trim(),
        text: formatActivityText(activity.text, activity.details)[0].replace(
          ".",
          ""
        ),
        image: formatActivityText(activity.text, activity.details)[1],
      }));

    function formatDateTimeString(dateTimeString) {
      const dateObj = new Date(dateTimeString);
      const formattedDate = dateObj.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const formattedTime = dateObj.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `${formattedDate} ${formattedTime}`;
    }

    const skillValues = (fullData.skill_values || []).map((skill) => ({
      id: skill.id ? parseInt(skill.id.$numberInt) : null,
      skillName: skill.skillName ? skill.skillName.trim() : null,
      level: skill.level ? parseInt(skill.level.$numberInt) : null,
      xp: skill.xp ? parseInt(skill.xp.$numberInt) : null,
      rank: skill.rank ? parseInt(skill.rank.$numberInt) : null,
    }));

    const loggedIn = fullData.loggedIn === "true";
    const name = fullData.name ? fullData.name.trim() : null;
    const combatLevel = fullData.combatlevel
      ? parseInt(fullData.combatlevel.$numberInt)
      : null;
    const questsComplete = fullData.questscomplete
      ? parseInt(fullData.questscomplete.$numberInt)
      : null;
    const questsNotStarted = fullData.questsnotstarted
      ? parseInt(fullData.questsnotstarted.$numberInt)
      : null;
    const questsStarted = fullData.questsstarted
      ? parseInt(fullData.questsstarted.$numberInt)
      : null;
    const rank = fullData.rank ? fullData.rank.replace(/,/g, "").trim() : null;
    const totalSkill = fullData.totalskill
      ? parseInt(fullData.totalskill.$numberInt)
      : null;

    let totalXP;
    if (fullData.totalxp) {
      if (fullData.totalxp.$numberInt) {
        totalXP = parseInt(fullData.totalxp.$numberInt);
      } else if (fullData.totalxp.$numberLong) {
        totalXP = parseInt(fullData.totalxp.$numberLong);
      } else {
        totalXP = 0;
      }
    } else {
      totalXP = null;
    }

    return {
      activities,
      combatLevel,
      loggedIn,
      name,
      questsComplete,
      questsNotStarted,
      questsStarted,
      rank,
      skillValues,
      totalSkill,
      totalXP,
    };
  } catch (error) {
    console.error("Error:", error);
    return {};
  }
}
