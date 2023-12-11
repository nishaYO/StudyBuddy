import { gql } from "@apollo/client";

// AutoLogin Query
export const AUTO_LOGIN_QUERY = gql`
  query AutoLogin($input: AuthInput!) {
    autoLogin(input: $input) {
      loggedIn
    }
  }
`;
