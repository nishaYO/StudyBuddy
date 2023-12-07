import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      email
      name
    }
  }
`;

function User() {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: "1" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>User Info:</h2>
      {data && data.getUser && (
        <div>
          <p>Name: {data.getUser.name}</p>
          <p>Email: {data.getUser.email}</p>
        </div>
      )}
    </div>
  );
}

export default User;
