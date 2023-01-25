import { gql } from "@apollo/client";

const GET_TRAINERS = gql`
  query getTrainers {
    trainers {
      id
      name
      email
      phone
      certifications
      training
    }
  }
`;

const GET_TRAINER = gql`
  query getTrainer($id: ID!) {
    trainer(id: $id) {
      id
      name
      email
      phone
      certifications
      training
    }
  }
`;

export { GET_TRAINERS, GET_TRAINER };
