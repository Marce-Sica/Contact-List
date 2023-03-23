import React from "react";
import { Link } from "react-router-dom";


export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-dark p-3">
			<div className="container d-flex justify-content-center">
				<Link to="/">
					<button className="title text-white p-3 rounded-3 bg-secondary"><h3>Lista de contactos</h3></button>
				</Link>
			</div>
		</nav>

	);
};
