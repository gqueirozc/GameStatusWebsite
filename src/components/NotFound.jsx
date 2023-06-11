import React from "react";
import notfound from "../images/not-found-img.jpg";
import "../css/NotFoundPage.css";
import NavBar from "./NavBar";
import Link from "@mui/material/Link";

export default function NotFound() {
  return (
    <div>
      <NavBar />
      <div className="not-found-page">
        <div className="not-found">
          <p>Oops, page not found!</p>
          <Link className="not-found-return-link" href="/" underline="hover">
            <p>Return to main page</p>
          </Link>
        </div>
        <img src={notfound} alt="" className="notfound-img-img" />
      </div>
    </div>
  );
}
