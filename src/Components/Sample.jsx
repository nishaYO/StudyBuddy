import { useMutation, useQuery } from "@apollo/client";
import { SEND_SESSION_DATA_MUTATION, FETCH_REPORTS_QUERY } from "./your-graphql-queries";
import Loading from "./Loading";

// Example for sending session data
const [sendSessionData] = useMutation(SEND_SESSION_DATA_MUTATION);

const handleSessionEnd = (sessionData) => {
  sendSessionData({
    variables: {
      sessionData: sessionData,
    },
  })
    .then((response) => {
      console.log("Session data sent successfully:", response);
    })
    .catch((error) => {
      console.error("Error sending session data:", error);
    });
};

// Example for fetching reports
const { loading, error, data } = useQuery(FETCH_REPORTS_QUERY);

if (loading) {
  return <Loading/>
}

if (error) {
  console.error("Error fetching reports:", error);
  return <p>Error fetching reports</p>;
}

const reports = data.fetchReports.reports;
console.log("Fetched Reports:", reports);
