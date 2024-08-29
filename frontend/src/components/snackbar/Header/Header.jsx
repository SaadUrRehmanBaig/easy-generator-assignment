import { Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React from "react";
import "./Header.scss";

const Header = ({ onLogout }) => {
  return (
    <div className="header-container">
      <Button
        variant="contained"
        className="logout-button"
        onClick={onLogout}
        startIcon={<ExitToAppIcon />}
      >
        Logout
      </Button>
    </div>
  );
};

export default Header;
