import { DOMAIN, PORT } from "./constants.ts";
import { TaskType } from "./types.ts";

export async function serverDeleteTask(taskId: string) {
  const response = await fetch(`http://${DOMAIN}:${PORT}/tasks/${taskId}`, {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("ERROR: Could not delete task");
  }

  return response.json();
}

export async function serverUpdateTask(taskId: string, values: TaskType) {
  const response = await fetch(`http://${DOMAIN}:${PORT}/tasks/${taskId}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ values: values }),
  });

  if (!response.ok) {
    throw new Error("ERROR: Could not update task");
  }

  return response.json();
}

export async function serverCreateTask(values: TaskType) {
  const response = await fetch(`http://${DOMAIN}:${PORT}/tasks`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ values: values }),
  });

  if (!response.ok) {
    throw new Error("ERROR: Could not create task");
  }

  return response.json();
}

export async function serverDeleteTaskAll() {
  const response = await fetch(`http://${DOMAIN}:${PORT}/tasks`, {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("ERROR: Could not delete task");
  }

  return response.json();
}
