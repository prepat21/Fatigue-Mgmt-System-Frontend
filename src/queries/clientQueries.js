import { gql } from "@apollo/client";

const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
      goals
      experience
      trainer {
        id
        name
      }
    }
  }
`;

const GET_CLIENT = gql`
  query getClient($id: ID!) {
    client(id: $id) {
      id
      name
      email
      phone
      goals
      experience
      trainer {
        id
        name
      }
    }
  }
`;

export { GET_CLIENTS, GET_CLIENT };
