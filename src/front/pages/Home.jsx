import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer();

	const loadData = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL;

			const response = await fetch(backendUrl + "/api/users"); 
			const data = await response.json();

			if (response.ok) {
				dispatch({ type: "set_users", payload: data.users });
			}

		} catch (error) {
			console.log("Error conectando con backend:", error);
		}
	};

	useEffect(() => {
		loadData();
	}, []);

	return (
		<div className="text-center mt-5">
			<h1>Conexión API 🚀</h1>

			<div className="alert alert-info mt-3">
				{store.users ? (
					<span>API funcionando correctamente ✅</span>
				) : (
					<span className="text-danger">
						
					</span>
				)}
			</div>
		</div>
	);
};