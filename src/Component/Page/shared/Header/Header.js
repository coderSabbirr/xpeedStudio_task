import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
const Header = () => {
  return (
    <div className="" style={{ paddingLeft: "100px", paddingTop: "20px" }}>
      <ul className="nav">
        <li className="nav-item">
          <Link
            className="nav-link active"
            aria-current="page"
            to="/"
            style={{ color: "black", fontSize: "20px" }}
          >
            XpeedStudio
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link table-li" href=".">
            Table
          </a>
        </li>
        <li className="nav-item ">
          <a className="nav-link table-li" href=".">
            Get Form
          </a>
        </li>
        <li className="nav-item ">
          <a className="nav-link table-li" href=".">
            Update Form
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
