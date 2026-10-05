import { Link } from "react-router";


function Dashboard() {
    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    return (
        <div>

            <h1>
                Welcome, {user.username}
            </h1>

            <p>
                Manage your projects and tasks.
            </p>

            <div className="dashboard-grid">

                <Link
                    to="/projects"
                    className="dashboard-card"
                >
                    <h2>Projects</h2>

                    <p>
                        Create and manage projects.
                    </p>
                </Link>

                <Link
                    to="/tasks"
                    className="dashboard-card"
                >
                    <h2>Tasks</h2>

                    <p>
                        Track your work.
                    </p>
                </Link>

            </div>

        </div>
    );
}


export default Dashboard;
