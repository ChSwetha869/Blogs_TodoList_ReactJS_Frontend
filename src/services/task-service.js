
const API_BASE_URL = "http://localhost:3000/api";

async function request(endpoint, options = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            ...(options.body ? { "Content-Type": "application/json" } : {}),
            ...options.headers,
        },
    });
    const data = await response.json().catch(() => null);
    if (!response.ok) {
        throw new Error(data?.message || "API request failed");
    }
    return data;
}

// GET: fetch all tasks
export function getTasks() {
    return request("/tasks");
}

// POST: add a task
export function addTask(value) {
    return request("/addTasks", {
        method: "POST",
        body: JSON.stringify({ value }),
    });
}

// PUT: update a task name
export function updateTask(id, value) {
    return request(`/updateTasks/${id}`, {
        method: "PUT",
        body: JSON.stringify({ value }),
    });
}

// DELETE: delete a task
export function deleteTask(id) {
    return request(`/deleteTasks/${id}`, {
        method: "DELETE",
    });
}

// PUT: mark a task as completed
export function markTaskCompleted(id, completed = true) {
    return request(`/completeTasks/${id}`, {
        method: "PUT",
        body: JSON.stringify({ completed }),
    });
}