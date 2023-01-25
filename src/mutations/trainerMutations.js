import { gql } from "@apollo/client";

const ADD_TRAINER = gql`
  mutation addTrainer(
    $name: String!
    $email: String!
    $phone: String!
    $certifications: String!
    $training: TrainingType!
  ) {
    addTrainer(
      name: $name
      email: $email
      phone: $phone
      certifications: $certifications
      training: $training
    ) {
      id
      name
      email
      phone
      certifications
      training
    }
  }
`;

const UPDATE_TRAINER = gql`
  mutation updateTrainer(
    $id: ID!
    $name: String!
    $email: String!
    $phone: String!
    $certifications: String!
    $training: UpdateTrainingType!
  ) {
    updateTrainer(
      id: $id
      name: $name
      email: $email
      phone: $phone
      certifications: $certifications
      training: $training
    ) {
      id
      name
      email
      phone
      certifications
      training
    }
  }
`;

const DELETE_TRAINER = gql`
  mutation deleteTrainer($id: ID!) {
    deleteTrainer(id: $id) {
      id
    }
  }
`;

export { ADD_TRAINER, DELETE_TRAINER, UPDATE_TRAINER };
