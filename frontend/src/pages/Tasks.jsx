import { useEffect, useState } from "react";

import { api } from "../api";


function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);

    const [title, setTitle] = useState("");
    const [project, setProject] = useState("");

    const [error, setError] = useState("");


    async function loadData() {
        try {
            const [
                tasksData,
                projectsData,
            ] = await Promise.all([
                api.getTasks(),
                api.getProjects(),
            ]);

            setTasks(tasksData);
            setProjects(projectsData);

        } catch (error) {
            setError(error.message);
        }
    }


    useEffect(() => {
        loadData();
    }, []);


    async function handleCreate(event) {
        event.preventDefault();

        if (!title.trim() || !project) {
            return;
        }

        try {
            const task = await api.createTask({
                title,
                project: Number(project),
            });

            setTasks([
                task,
                ...tasks,
            ]);

            setTitle("");
            setProject("");

        } catch (error) {
            setError(error.message);
        }
    }


    async function toggleTask(task) {
        const newStatus =
            task.status === "done"
                ? "todo"
                : "done";

        try {
            const updated =
                await api.updateTask(
                    task.id,
                    {
                        status: newStatus,
                    }
                );

            setTasks(
                tasks.map(item =>
                    item.id === updated.id
                        ? updated
                        : item
                )
            );

        } catch (error) {
            setError(error.message);
        }
    }


    async function deleteTask(id) {
        try {
            await api.deleteTask(id);

            setTasks(
                tasks.filter(
                    task => task.id !== id
                )
            );

        } catch (error) {
            setError(error.message);
        }
    }


    return (
        <div>

            <h1>Tasks</h1>

            {error && (
                <div className="error">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleCreate}
                className="form-card"
            >

                <h2>Create Task</h2>

                <input
                    placeholder="Task title"
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)
                    }
                />

                <select
                    value={project}
                    onChange={(event) =>
                        setProject(event.target.value)
                    }
                >

                    <option value="">
                        Select project
                    </option>

                    {projects.map(project => (
                        <option
                            key={project.id}
                            value={project.id}
                        >
                            {project.name}
                        </option>
                    ))}

                </select>

                <button type="submit">
                    Create Task
                </button>

            </form>

            <div>

                {tasks.length === 0 ? (
                    <p>No tasks yet.</p>
                ) : (
                    tasks.map(task => (
                        <div
                            key={task.id}
                            className="task-card"
                        >

                            <div>

                                <h3
                                    className={
                                        task.status === "done"
                                            ? "completed"
                                            : ""
                                    }
                                >
                                    {task.title}
                                </h3>

                                <p>
                                    Status: {task.status}
                                </p>

                            </div>

                            <div>

                                <button
                                    onClick={() =>
                                        toggleTask(task)
                                    }
                                >
                                    {task.status === "done"
                                        ? "Undo"
                                        : "Complete"}
                                </button>

                                {" "}

                                <button
                                    className="danger"
                                    onClick={() =>
                                        deleteTask(task.id)
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                    ))
                )}

            </div>

        </div>
    );
}


export default Tasks;
