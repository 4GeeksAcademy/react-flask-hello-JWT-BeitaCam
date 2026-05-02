import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {

	const navigate = useNavigate();

	const token = sessionStorage.getItem("token");

	const handleLogout = () => {
		sessionStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">

				<Link to="/">
					<span className="navbar-brand mb-0 h1">Auth App 🔐</span>
				</Link>

				<div className="ml-auto">

					{/* 👇 SI NO hay token */}
					{!token ? (
						<>
							<Link to="/login">
								<button className="btn btn-primary me-2">Login</button>
							</Link>

							<Link to="/signup">
								<button className="btn btn-success">Signup</button>
							</Link>
						</>
					) : (
						/* 👇 SI hay token */
						<>
							<Link to="/private">
								<button className="btn btn-warning me-2">Private</button>
							</Link>

							<button className="btn btn-danger" onClick={handleLogout}>
								Logout
							</button>
						</>
					)}

				</div>
			</div>
		</nav>
	);
};