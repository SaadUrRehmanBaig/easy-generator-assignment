import React, { Fragment, useEffect } from "react";
import { getLoginUser } from "../../helpers/storage";
import "./WelcomePage.scss";

export default function WelcomePage(props) {
  const [userName, setUserName] = React.useState(null);

  useEffect(() => {
    const data = getLoginUser();
    if (data) {
      setUserName(data?.userName || "");
    }
  }, []);

  return (
    <Fragment>
      <div className="welcome_screen">
        <div className="welcom_screen_content">
          <h1>Welcome {userName} to this Application</h1>
        </div>
      </div>
    </Fragment>
  );
}
