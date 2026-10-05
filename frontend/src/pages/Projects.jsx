import { useEffect, useState } from "react";

import { api } from "../api";


function Projects() {
    const [projects, setProjects] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [error, setError] = useState("");


    async function loadProjects() {
        try {
            const data = await api.getProjects();

            setProjects(data);
        } catch (error) {
            setError(error.message);
        }
    }


    useEffect(() => {
        loadProjects();
    }, []);


    async function handleCreate(event) {
        event.preventDefault();

        if (!name.trim()) {
            return;
        }

        try {
            const project = await api.createProject({
                name,
                description,
            });

            setProjects([
                project,
                ...projects,
            ]);

            setName("");
            setDescription("");

        } catch (error) {
            setError(error.message);
        }
    }


    async function handleDelete(id) {
        if (!window.confirm("Delete this project?")) {
            return;
        }

        try {
            await api.deleteProject(id);

            setProjects(
                projects.filter(
                    project => project.id !== id
                )
            );

        } catch (error) {
            setError(error.message);
        }
    }


    return (
        <div>

            <h1>Projects</h1>

            {error && (
                <div className="error">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleCreate}
                className="form-card"
            >

                <h2>Create Project</h2>

                <input
                    placeholder="Project name"
                    value={name}
                    onChange={(event) =>
                        setName(event.target.value)
                    }
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(event) =>
                        setDescription(event.target.value)
                    }
                />

                <button type="submit">
                    Create Project
                </button>

            </form>

            <div>

                {projects.length === 0 ? (
                    <p>No projects yet.</p>
                ) : (
                    projects.map(project => (
                        <div
                            key={project.id}
                            className="project-card"
                        >

                            <div>
                                <h2>
                                    {project.name}
                                </h2>

                                <p>
                                    {project.description}
                                </p>
                            </div>

                            <button
                                className="danger"
                                onClick={() =>
                                    handleDelete(project.id)
                                }
                            >
                                Delete
                            </button>

                        </div>
                    ))
                )}

            </div>

        </div>
    );
}


export default Projects;
