import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AdminRoute } from "./Services/AdminGaud";
import { UserRoute } from "./Services/UserGaurd";
import Alert from "./jsx/Components/alert";
import Login from "./jsx/Pages/Login";
import ScrollToTop from "./jsx/Components/helperComponents/ScrollToTop";
import Loading from "./jsx/Pages/Loading";
import { useSelector } from "react-redux";
import { SignUp } from "./jsx/Pages/Signup";
import { DashboardHome } from "./jsx/Pages/DashboardHome/dashboardHome";
import { Ranking } from "./jsx/Pages/Ranking/Ranking";
import { UserProfile } from "./jsx/Pages/UserProfile/UserProfile";
import { AdminPage } from "./jsx/Pages/AdminPage/AdminPage";
import { CommonRoute } from "./Services/CommonGaud";
import { Info } from "./jsx/Pages/Info/Info";
export default function App() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({});
  const alertInfo = useSelector((state) => state.alert.alertdata);
  useEffect(() => {
    if (alertInfo && alertInfo.msg) {
      setAlertData(alertInfo);
      setShowAlert(alertInfo.show);
    }
  }, [alertInfo]);
  const TIMEOUT = 3000;
  useEffect(() => {
    let timeout = setTimeout(() => setShowAlert(false), TIMEOUT);
    return () => {
      clearTimeout(timeout);
    };
  }, [showAlert]);
  return (
    <div>
      {showAlert && (
        <Alert
          color={alertData.color}
          message={alertInfo.msg}
          setShowAlert={setShowAlert}
        />
      )}
      <Router>
        <ScrollToTop />
        <Switch>
          <Route exact path={"/"} component={Login} />
          <Route exact path={"/loading"} component={Loading} />
          <Route exact path={"/signup"} component={SignUp} />
          <UserRoute path={"/dashboard"} component={DashboardHome} />
          <Route exact path={"/ranking"} component={Ranking} />
          <AdminRoute path={"/admin-page"} component={AdminPage} />
          <CommonRoute path={"/profile"} component={UserProfile} />
          <Route exact path={"/info"} component={Info} />
        </Switch>
      </Router>
    </div>
  );
}
