import { gql } from "@apollo/client";

// AutoLogin Query
export const AUTO_LOGIN_QUERY = gql`
  query AutoLogin($input: AuthInput!) {
    autoLogin(input: $input) {
      loggedIn
    }
  }
`;

// Get all notes for a user
export const GET_ALL_NOTES = gql`
  query GetAllNotes($userID: ID!) {
    getAllNotes(userID: $userID) {
      success
      message
      notes {
        id
        title
        content
        date
      }
    }
  }
`;

export const GET_NOTE = gql`
  query GetNote($noteId: ID!) {
    getNote(noteId: $noteId) {
      success
      message
      note {
        id
        title
        content
        date
      }
    }
  }
`;

export const FETCH_REPORTS = gql`
query FetchReports {
  fetchReports {
    success
    message
    reports {
      startTime
      endTime
      sessionDuration
      sessionIntervals
      userID
    }
  }
}
`;
