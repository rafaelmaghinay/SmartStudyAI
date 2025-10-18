const API_BASE_URL = "http://localhost:8080/api";

export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include", // send JSESSIONID cookie
    ...options,
  };

  try {
    const response = await fetch(url, config);

    const contentType = response.headers.get("content-type");
    let data;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      // Detect Spring login page
      if (text.includes("<title>Please sign in</title>")) {
        throw new Error("Not authenticated – login required");
      }
      data = text;
    }

    if (!response.ok) {
      throw new Error(
        (data && data.message) || `Request failed with ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error("API Request error:", error);
    throw error;
  }
};
