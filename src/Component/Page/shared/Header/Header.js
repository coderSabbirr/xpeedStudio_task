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
            style={{ color: "black" }}
          >
            <img
              src="https://i.ibb.co/JCvmP4d/xpeedstudio-logo-header.png"
              style={{ width: "80%", height: "100%" }}
              alt=""
            />
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link table-li" to="/table">
            Table
          </Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link table-li" to="/getForm">
            Get Form
          </Link>
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
