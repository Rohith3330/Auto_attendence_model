import { NavLink } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import HomeIcon from "@mui/icons-material/Home";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import { Typography } from "@mui/material";

export default function Sidenav() {
  const [open, setopen] = useState(true);
  const toggleOpen = () => {
    setopen(!open);
  };
  const navData = [
    {
      id: 0,
      icon: <HomeIcon />,
      text: "Home",
      link: "/",
    },
    {
      id: 1,
      icon: <TravelExploreIcon />,
      text: "Students List",
      link: "students",
    },
    {
      id: 2,
      icon: <BarChartIcon />,
      text: "Mark Attendance",
      link: "mark-attendance",
    },
  ];
  return (
    <div className={open ? "sidenav" : "sidenavClosed"}>
    <h3 className={`logo--name ${open ? "logo--open" : "logo-close"}`}>{open ? "DRONA" : "D"}</h3>
      <button className={"menuBtn"} onClick={toggleOpen}>
        {open ? (
          <KeyboardDoubleArrowLeftIcon />
        ) : (
          <KeyboardDoubleArrowRightIcon />
        )}
      </button>
      {navData.map((item) => {
        return (
          <NavLink key={item.id} className={"sideitem"} to={item.link}>
            {item.icon}
            <span className={"linkText"}>{open && item.text}</span>
          </NavLink>
        );
      })}
    </div>
  );
}
