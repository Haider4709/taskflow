import {
    Link,
    Navigate,
    Route,
    Routes,
} from "react-router";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";


function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}


function App() {
    return (
        <>
            <Navbar />

            <main className="container">
                <Routes>

                    <Route
                        path="/"
                        element={
                            <div>
                                <h1>Welcome to TaskFlow</h1>

                                <p>
                                    Manage your projects and tasks.
                                </p>

                                <Link to="/dashboard">
                                    Go to Dashboard
                                </Link>
                            </div>
                        }
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/projects"
                        element={
                            <ProtectedRoute>
                                <Projects />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/tasks"
                        element={
                            <ProtectedRoute>
                                <Tasks />
                            </ProtectedRoute>
                        }
                    />

                </Routes>
            </main>
        </>
    );
}


export default App;
