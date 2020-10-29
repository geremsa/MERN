import React, { useCallback, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Users from "./user/pages/userss";
import Newplace from "./places/pages/newplace";
import Userplaces from "./places/pages/userplaces";
import Mainnavigation from "./shared/components/Navigation/mainnavigation";
import Updateplace from "./places/pages/updateplace";
import Auth from "./user/pages/authhh";
import { AuthContext } from "./shared/context/auth-context";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userId, setuserId] = useState(null);

  const login = useCallback((uid) => {
    setisLoggedIn(true);
    setuserId(uid);
  }, []);

  const logout = useCallback(() => {
    setisLoggedIn(false);
    setuserId(null);
  }, []);
  //so that login state is not lost on refresh
  useEffect(() => {
    const reslocal = localStorage.getItem("mysong");
    if (reslocal) {
      setisLoggedIn(JSON.parse(reslocal));
    }
    const uid = localStorage.getItem("userId");
    if (uid) {
      setuserId(JSON.parse(uid));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("mysong", JSON.stringify(isLoggedIn));
    localStorage.setItem("userId", JSON.stringify(userId));
  });

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/:userId/places" exact component={Userplaces} />
        <Route path="/places/new" exact component={Newplace} />
        <Route path="/places/:placeId" exact component={Updateplace} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/:userId/places" component={Userplaces} />
        <Route path="/auth" exact component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userId }}>
      <Router>
        <Mainnavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
