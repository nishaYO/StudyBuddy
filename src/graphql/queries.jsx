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
