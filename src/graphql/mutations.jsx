import { gql } from "@apollo/client";

export const SIGN_UP_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      CodeMailed
    }
  }
`;

// export const GOOGLE_SIGN_UP_MUTATION = gql`
//   mutation GoogleSignIn($input: GoogleSignupInput!) {
//     googleSignIn(input: $input) {
//       CodeMailed
//     }
//   }
// `;

export const GOOGLE_SIGN_IN_MUTATION = gql`
  mutation GoogleSignIn($input: GoogleSignInInput!) {
    googleSignIn(input: $input) {
      loggedIn
      user {
        id
        name
        email
      }
      token
      message
    }
  }
`;

export const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      verified
      user {
        id
        name
        email
      }
      token
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($input: LoginInput!) {
    login(input: $input) {
      loggedIn
      user {
        id
        name
        email
      }
      token
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($userID: ID!) {
    deleteUser(userID: $userID) {
      success
      message
    }
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      message
      success
    }
  }
`;

export const NEW_NOTE_MUTATION = gql`
  mutation NewNote($input: newNoteInput!) {
    newNote(input: $input) {
      success
      note {
        id
        title
        content
        date
      }
      message
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation UpdateNote($noteId: ID!, $input: updateNoteInput!) {
    updateNote(noteId: $noteId, input: $input) {
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

export const DELETE_NOTE_MUTATION = gql`
  mutation DeleteNote($noteId: ID!) {
    deleteNote(noteId: $noteId) {
      success
      message
    }
  }
`;
export const SEND_SESSION_DATA_MUTATION = gql`
  mutation SendSessionData($input: SessionDataInput!) {
    sendSessionData(input: $input) {
      success
      message
    }
  }
`;
export const SUBMIT_CONTACT_FORM = gql`
  mutation SubmitContactForm($input: ContactFormInput!) {
    submitContactForm(input: $input) {
      success
      message
    }
  }
`;
