import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { GET_PROJECTS } from "../queries/projectQueries";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../mutations/projectMutations";

export default function DeleteProjectButton({ projectId }) {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  return (
    <button className="btn btn-danger mt-4 btn-lg" onClick={deleteProject}>
      <div className="d-flex justify-content-center align-items-center">
        <FaTrash className="me-2 fw-bold" /> <strong>DELETE</strong>
      </div>
    </button>
  );
}
