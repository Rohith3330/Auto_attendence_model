import React from "react";
import SchoolIcon from "@mui/icons-material/School";
import DonutChart from "./DountChart";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import fontawesome from "@fortawesome/fontawesome";

// fontawesome.library.add(faUser);

const DashboardCard = ({
  header = { icon: <SchoolIcon />, title: "Total Students", text: 5 },
  body = (
    <FontAwesomeIcon
      icon={faUser}
      style={{ width: "100%", minHeight: "80%" }}
    />
  ),
  link = "",
}) => {
  return (
    <div className="dashboard-card">
      <FontAwesomeIcon icon="fa-regular fa-user" />
      <div className="dashboard-card--header">
        <div className="dashboard-card--icon">{header.icon}</div>
        <div className="dashboard-card--title">
          <p className="title-name">{header.title}</p>
          <p className="title-count">{header.text}</p>
        </div>
      </div>

      <div className="dashboard-card--body">{body}</div>

      <div className="dashboard-card--footer">
        <p>More info</p>
        <ArrowForwardIcon />
      </div>
    </div>
  );
};

export default DashboardCard;
