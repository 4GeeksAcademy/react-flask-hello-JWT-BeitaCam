import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {

	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignup = async () => {
		try {
			const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password })
			});

			if (resp.ok) {
				alert("Usuario creado ✅");
				navigate("/login");
			} else {
				alert("Error al registrar");
			}

		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container mt-5">
			<h2>Registro</h2>

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

			<button className="btn btn-success" onClick={handleSignup}>
				Registrarse
			</button>
		</div>
	);
};