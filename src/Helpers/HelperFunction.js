import HostUrls from "../utils/HostUrls";

export async function APICall(endpoint, method, params, body) {
  const auth_token = localStorage.getItem("auth-token");

  try {
    const response = await fetch(`${HostUrls.baseUrl}${endpoint}${params}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "auth-token": auth_token,
      },
      ...(method !== "GET" ? { body: JSON.stringify(body) } : null),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    throw error;
  }
}
