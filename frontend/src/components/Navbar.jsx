import {Link, useNavigate,} from "react-router";
import {api} from "../api";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    async function handleLogout() {
        try {
            await api.logout();
        } catch {
            // Token may already be invalid.
        }

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    }

    return (
        <nav className="navbar">

            <Link
                to="/"
                className="logo"
            >
                TaskFlow
            </Link>

            <div className="nav-links">

                {token ? (
                    <>
                        <Link to="/dashboard">
                            Dashboard
                        </Link>

                        <Link to="/projects">
                            Projects
                        </Link>

                        <Link to="/tasks">
                            Tasks
                        </Link>

                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/register">
                            Register
                        </Link>
                    </>
                )}

            </div>

        </nav>
    );
}


export default Navbar;