import { gql } from "@apollo/client";

export const SIGN_UP_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      CodeMailed
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
