import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import { Button } from "react-bootstrap";
import {isLoggedIn, deleteTokens} from '../Auth'

const handleLogout = () => {
	deleteTokens()
	window.location.replace('/')
}
const NavBar = () => {
	return (
    	<React.Fragment>
			<div className={styles.skipLink}>
				<a href="#mainContent">Skip to Main Content</a>
			</div>
			<nav className="navbar navbar-expand-sm navbar-light border-bottom justify-content-between">
				<Link className="navbar-brand" to="/">Opinions</Link>
				<div className="navbar-nav">
					<Link className="nav-link" to="/">Home</Link>
					<Link className="nav-link" to="/empresas">Empresas</Link>
					<Link className="nav-link" to="/opinions">Opiniones</Link>
					{isLoggedIn()?(
					<Button className="bt bt-primary ml-2" type="submit" onClick={()=>handleLogout()}>Cerrar sesion</Button>
					):''}
				</div>
			</nav>
    </React.Fragment>
  );
}
export default NavBar;
