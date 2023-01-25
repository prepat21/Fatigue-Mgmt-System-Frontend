import { gql } from "@apollo/client";

const ADD_CLIENT = gql`
  mutation addClient(
    $name: String!
    $email: String!
    $phone: String!
    $goals: String!
    $experience: ExperienceType!
    $trainerId: ID!
  ) {
    addClient(
      name: $name
      email: $email
      phone: $phone
      goals: $goals
      experience: $experience
      trainerId: $trainerId
    ) {
      id
      name
      email
      phone
      goals
      experience
      trainer {
        id
        name
        email
        phone
        certifications
        training
      }
    }
  }
`;

const UPDATE_CLIENT = gql`
  mutation updateClient(
    $id: ID!
    $name: String!
    $email: String!
    $phone: String!
    $goals: String!
    $experience: UpdateExperienceType!
    $trainerId: ID!
  ) {
    updateClient(
      id: $id
      name: $name
      email: $email
      phone: $phone
      goals: $goals
      experience: $experience
      trainerId: $trainerId
    ) {
      id
      name
      email
      phone
      goals
      experience
      trainer {
        id
        name
        email
        phone
        certifications
        training
      }
    }
  }
`;

const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
      name
      email
      phone
      goals
      experience
      trainer {
        id
        name
        email
        phone
        certifications
        training
      }
    }
  }
`;

export { ADD_CLIENT, DELETE_CLIENT, UPDATE_CLIENT };
