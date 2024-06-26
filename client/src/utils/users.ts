import { UserType } from "./types.ts";
import { PORT, DOMAIN } from "./constants.ts";

export async function login(): Promise<UserType> {
  const response = await fetch(`http://${DOMAIN}:${PORT}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "JohnDoe@example.com",
      password: "123",
    }),
  });

  if (!response.ok) {
    throw new Error("ERROR: Could not fetch tasks");
  }

  return response.json();
}
