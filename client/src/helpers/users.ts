import { UserType } from "../types.tsx";
import { getUserIdFromCookie } from "./functions.ts";
import { PORT, DOMAIN } from "../constants.ts";

export async function login(): Promise<UserType> {
  const response = await fetch(`http://${DOMAIN}:${PORT}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "DaveWhite@example.com",
      password: "456",
    }),
  });

  if (!response.ok) {
    throw new Error("ERROR: Could not fetch tasks");
  }

  return response.json();
}

export async function fetchUser(): Promise<UserType> {
  const userId = getUserIdFromCookie();

  if (!userId) {
    throw new Error("ERROR: User ID could not be retrieved from cookie");
  }

  const response = await fetch(`http://${DOMAIN}:${PORT}/users/${userId}`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("ERROR: Could not fetch tasks");
  }

  return response.json();
}
