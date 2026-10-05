import { useState } from "react";
import { useNavigate, Link } from "react-router";

import { api } from "../api";


function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    async function handleSubmit(event) {
        event.preventDefault();

        console.log("REGISTER BUTTON CLICKED");

        setError("");
        setLoading(true);

        try {
            console.log("Sending registration request...");

            const data = await api.register({
                username,
                email,
                password,
            });

            console.log("Registration response:", data);

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            navigate("/dashboard");

        } catch (error) {
            console.error(
                "REGISTRATION ERROR:",
                error
            );

            setError(
                error.message ||
                "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="auth-card">

            <h1>Create Account</h1>

            {error && (
                <div className="error">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>

                <label>
                    Username
                </label>

                <input
                    type="text"
                    value={username}
                    onChange={(event) =>
                        setUsername(event.target.value)
                    }
                    required
                />


                <label>
                    Email
                </label>

                <input
                    type="email"
                    value={email}
                    onChange={(event) =>
                        setEmail(event.target.value)
                    }
                />


                <label>
                    Password
                </label>

                <input
                    type="password"
                    value={password}
                    onChange={(event) =>
                        setPassword(event.target.value)
                    }
                    required
                />


                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Creating..."
                        : "Create Account"}
                </button>

            </form>

            <p>
                Already have an account?{" "}
                <Link to="/login">
                    Login
                </Link>
            </p>

        </div>
    );
}


export default Register;
