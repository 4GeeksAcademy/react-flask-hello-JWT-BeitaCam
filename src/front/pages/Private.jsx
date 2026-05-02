import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {

	const navigate = useNavigate();

	useEffect(() => {
		const token = sessionStorage.getItem("token");

		if (!token) {
			navigate("/login");
		}
	}, []);

	return (
		<div className="container mt-5">
			<h2>Zona privada 🔒</h2>
			<p>Solo puedes ver esto si estás logueada</p>
		</div>
	);
};