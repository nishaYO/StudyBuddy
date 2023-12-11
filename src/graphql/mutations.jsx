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
      user {
        id
        name
        email
      }
      token
    }
  }
`;
