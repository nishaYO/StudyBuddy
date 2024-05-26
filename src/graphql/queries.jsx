import { gql } from "@apollo/client";

// AutoLogin Query
export const AUTO_LOGIN_QUERY = gql`
  query AutoLogin($input: AuthInput!) {
    autoLogin(input: $input) {
      loggedIn
      profilePicUrl
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

export const GET_STREAK_REPORTS = gql`
  query GetStreakReports($userID: ID!) {
    getStreakReports(userID: $userID) {
      _id
      userID
      date
      calendar {
        date
        studyTimePercent
        studyTime {
          hours
          minutes
        }
      }
    }
  }
`;

export const GET_CURRENT_STREAK = gql`
  query GetCurrentStreak($userID: ID!) {
    getCurrentStreak(userID: $userID)
  }
`;


export const GET_MAIN_STATS = gql`
  query GetMainStats($userID: ID!) {
    getMainStats(userID: $userID) {
      _id
      userID
      date
      latestSession {
        endTime
        sessionDuration
      }
      totalStudyDuration {
        today
        week
        month
        total
      }
    }
  }
`;
