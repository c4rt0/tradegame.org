import React, { useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";
import { isAuthenticated } from "./../../Store/selectors/authSelector";
import { isAdminRole } from "../../Store/selectors/roleSelector";
const Loading = () => {
  let history = useHistory();
  useEffect(() => {
    console.log("i'm in loading");
    if (isAuthenticated()) {
      if (!isAdminRole()) {
        history.push("/dashboard");
      } else {
        history.push("/ranking");
      }
    } else {
      history.push("/");
    }
  }, [history]);
  return (
    <div className="App bg-gray_100">
      <header className="App-header bg-gray_100">
        <div>
          <p>Loading...</p> <CircularProgress />
        </div>
      </header>
    </div>
  );
};

export default Loading;
