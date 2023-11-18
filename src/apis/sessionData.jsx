const BASE_URL = "http://localhost:5000/session"; 

export const sendSessionData = async (sessionData) => {
  try {
    const response = await fetch(`${BASE_URL}/process`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sessionData),
    });

    if (!response.ok) {
      throw new Error("Failed to send session data");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error sending session data:", error);
    throw error;
  }
};
