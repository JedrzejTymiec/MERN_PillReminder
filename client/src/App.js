import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path={["/", "/login"]} component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/app" component={Main} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
