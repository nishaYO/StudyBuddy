const BASE_URL = "http://localhost:5000/reports"; 

export const fetchReports = async () => {
  try {
    const response = await fetch(`${BASE_URL}/fetch`);
    if (response.ok) {
      const data = await response.json();
      return data.reports;
    } else {
      throw new Error("Failed to fetch reports");
    }
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};
