import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { GET_TRAINERS } from "../queries/trainerQueries";
import { useMutation } from "@apollo/client";
import { DELETE_TRAINER } from "../mutations/trainerMutations";

export default function DeleteTrainerButton({ trainerId }) {
  const navigate = useNavigate();

  const [deleteTrainer] = useMutation(DELETE_TRAINER, {
    variables: { id: trainerId },
    onCompleted: () => navigate("/trainers"),
    refetchQueries: [{ query: GET_TRAINERS }],
  });

  return (
    <button className="btn btn-danger mt-4 btn-lg" onClick={deleteTrainer}>
      <div className="d-flex justify-content-center align-items-center">
        <FaTrash className="me-2 fw-bold" /> <strong>DELETE</strong>
      </div>
    </button>
  );
}
