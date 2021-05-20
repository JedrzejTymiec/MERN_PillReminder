import { Fragment } from "react";
import Navbar from "./Navbar";
import Sidebar from "./sidebar/Sidebar";
import PrivateRoute from "./PrivateRoute";
import { BrowserRouter as Router, Switch } from "react-router-dom";

const Main = () => {
  return (
    <Fragment>
      <Router>
        <Navbar />
        <Sidebar />
        {/* <Switch>
          <PrivateRoute exact path="/app/calendar" />
          <PrivateRoute exact path="/app/addnew" />
          <PrivateRoute exact path="/app/day" />
        </Switch> */}
      </Router>
    </Fragment>
  );
};

export default Main;
