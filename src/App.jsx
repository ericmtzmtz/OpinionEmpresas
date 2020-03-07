import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Login from "./components/Login";
import {PrivateRoute} from './components/PrivateRoute'
import {isLoggedIn} from './components/Auth'
import Empresa from "./components/Empresas";

// const Home = () => <h3>Estas Logeeado</h3>

//TODO Web Template Studio: Add routes for your new pages here.
const App = () => {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
		  <PrivateRoute exact isLoggedIn={isLoggedIn()} path='/empresas' component={Empresa}/>
          <Route exact path = "/" component = { Login } />
          {/* <Route path = "/empresas" component = { Empresa } /> */}
        </Switch>
        <Footer />
      </React.Fragment>
    );
}

export default App;
