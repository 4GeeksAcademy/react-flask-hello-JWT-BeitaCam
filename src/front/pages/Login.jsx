import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {

	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		try {
			const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password })
			});

			const data = await resp.json();

			if (resp.ok) {
				sessionStorage.setItem("token", data.access_token);
				navigate("/private");
			} else {
				alert(data.msg || "Error en login");
			}

		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container mt-5">
			<h2>Login</h2>

			<input
				className="form-control mb-2"
				placeholder="Email"
				onChange={(e) => setEmail(e.target.value)}
			/>

			<input
				type="password"
				className="form-control mb-2"
				placeholder="Password"
				onChange={(e) => setPassword(e.target.value)}
			/>

			<button className="btn btn-primary" onClick={handleLogin}>
				Iniciar sesión
			</button>
		</div>
	);
};