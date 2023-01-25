import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";

export default function ViewClientInfo() {
  const [clientId, setClientId] = useState("");

  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return null;
  if (error) return <p>uh oh something went wrong</p>;

  return (
    !loading &&
    !error && (
      <>
        <button
          type="button"
          className="btn btn-outline-primary ms-3 mb-3"
          data-bs-toggle="modal"
          data-bs-target="#viewClientModal"
        >
          <div className="d-flex align-items-center">
            <div>
              <strong>View Client</strong>
            </div>
          </div>
        </button>

        <div
          className="modal fade"
          id="viewClientModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-labelledby="viewClientModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <h1
                className="modal-title fs-5 ms-3 mt-3"
                id="viewClientModalLabel"
              >
                View Client
              </h1>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <select
                      id="clientId"
                      className="form-select"
                      value={clientId}
                      onChange={(e) => setClientId(e.target.value)}
                    >
                      <option value="">Select Client </option>
                      {data.clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <a
                    href={`/clients/${clientId}`}
                    className="btn btn-secondary"
                  >
                    view
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}
