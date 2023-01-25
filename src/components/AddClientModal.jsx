import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_TRAINERS } from "../queries/trainerQueries";

export default function AddClientModal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [goals, setGoals] = useState("");
  const [experience, setExperience] = useState("novice");
  const [trainerId, setTrainerId] = useState("");

  const { loading, error, data } = useQuery(GET_TRAINERS);

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone, goals, experience, trainerId },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      name === "" ||
      email === "" ||
      phone === "" ||
      goals === "" ||
      experience === ""
    )
      return alert("Please fill in all fields");

    console.log(phone);

    addClient(name, email, phone, goals, experience, trainerId);

    setName("");
    setEmail("");
    setPhone("");
    setGoals("");
    setExperience("novice");
    setTrainerId("");
  };

  if (loading) return null;
  if (error) return <p>uh oh something went wrong</p>;

  return (
    !loading &&
    !error && (
      <>
        <button
          type="button"
          className="btn btn-primary mb-3"
          data-bs-toggle="modal"
          data-bs-target="#addClientModal"
        >
          <div className="d-flex align-items-center">
            <FaUser className="me-2" />
            <div>Add Client</div>
          </div>
        </button>

        <div
          className="modal fade"
          id="addClientModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-labelledby="addClientModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="addClientModalLabel">
                  Add Client
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
                    <label className="form-label">
                      <strong>Name</strong> (first and last)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      <strong>Email</strong> (myemail@mydomain.com)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      <strong>Phone</strong> (###)-###-####
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      <strong>Goals</strong> (lose weight, football, etc.)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="goals"
                      value={goals}
                      onChange={(e) => setGoals(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      <strong>Experience</strong>
                    </label>
                    <select
                      className="form-select"
                      id="experience"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    >
                      <option value="novice">Novice</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      <strong>Trainer</strong>
                    </label>
                    <select
                      id="trainerId"
                      className="form-select"
                      value={trainerId}
                      onChange={(e) => setTrainerId(e.target.value)}
                    >
                      <option value="">Select Trainer</option>
                      {data.trainers.map((trainer) => (
                        <option key={trainer.id} value={trainer.id}>
                          {trainer.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-secondary"
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}
