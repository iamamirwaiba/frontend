import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Booking from "./Pages/Booking/Booking";
import SignUp from "./Pages/Auth/SignUp";
import Login from "./Pages/Auth/Login";
import Arena from "./Pages/Arena/Arena";
import Account from "./components/Account/Account";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";


function App() {
  return (
    <>
      <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/booking" component={Booking} />
            <PrivateRoute exact path="/arena" component={Arena} />
            <Route path="/signUp" component={SignUp} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/account" component={Account} />
          </Switch>
      </Router>
    </>
  );
}

export default App;
