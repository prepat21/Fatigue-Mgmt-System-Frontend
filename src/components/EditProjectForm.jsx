import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { FiEdit } from "react-icons/fi";
import { GET_CLIENTS } from "../queries/clientQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutations";

export default function EditProjectForm({ project }) {
  var key;
  if (project.status === "Not Started") key = "new";
  else if (project.status === "In Progress") key = "progress";
  else key = "completed";

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(key);
  const [clientId, setClientId] = useState(project.client.id);

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status, clientId },
    refetchQueries: [{ query: GET_PROJECT }],
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !status || !clientId) {
      return alert("Please Submit All Fields");
    }

    updateProject(name, description, status, clientId);
  };

  if (loading) return null;
  if (error) return <p>Something is wrong</p>;

  return (
    !loading &&
    !error && (
      <>
        <div className="mt-5">
          <FiEdit></FiEdit>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                id="status"
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="new">Not Started</option>
                <option value="progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Client</label>
              <select
                id="clientId"
                className="form-select"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
              >
                <option value="">Select Client</option>
                {data.clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              data-bs-dismiss="modal"
              className="btn btn-primary"
            >
              Update
            </button>
          </form>
        </div>
      </>
    )
  );
}
/*
<div>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#UpdateProjectModal"
          >
            <div className="d-flex align-items-center">
              <FiEdit />
              <div></div>
            </div>
          </button>
        </div>

        <div
          className="modal fade"
          id="UpdateProjectModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-labelledby="#UpdateProjectModal"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="#UpdateProjectModal">
                  Update Project
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={onSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      id="status"
                      className="form-select"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="new">Not Started</option>
                      <option value="progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Client</label>
                    <select
                      id="clientId"
                      className="form-select"
                      value={clientId}
                      onChange={(e) => setClientId(e.target.value)}
                    >
                      <option value="">Select Client</option>
                      {data.clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>


*/
