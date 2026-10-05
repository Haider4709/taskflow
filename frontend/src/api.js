const API_URL = "http://127.0.0.1:8000/api";

async function request(endpoint, options = {}) {
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };

    if (token) {
        headers.Authorization = `Token ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(
            data.detail ||
            data.message ||
            JSON.stringify(data) ||
            `Request failed with status ${response.status}`
        );
    }

    return data;
}

export const api = {
    // Authentication
    register(data) {
        return request("/auth/register/", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    login(data) {
        return request("/auth/login/", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    logout() {
        return request("/auth/logout/", {
            method: "POST",
        });
    },

    me() {
        return request("/auth/me/");
    },

    // Projects
    getProjects() {
        return request("/projects/");
    },

    createProject(data) {
        return request("/projects/", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    updateProject(id, data) {
        return request(`/projects/${id}/`, {
            method: "PATCH",
            body: JSON.stringify(data),
        });
    },

    deleteProject(id) {
        return request(`/projects/${id}/`, {
            method: "DELETE",
        });
    },

    // Tasks
    getTasks() {
        return request("/tasks/");
    },

    createTask(data) {
        return request("/tasks/", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    updateTask(id, data) {
        return request(`/tasks/${id}/`, {
            method: "PATCH",
            body: JSON.stringify(data),
        });
    },

    deleteTask(id) {
        return request(`/tasks/${id}/`, {
            method: "DELETE",
        });
    },
};
