import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { GET_TRAINERS } from "../queries/trainerQueries";
import { ADD_TRAINER } from "../mutations/trainerMutations";

export default function AddTrainerModal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [certifications, setCertifications] = useState("");
  const [training, setTraining] = useState("lifestyle");

  const [addTrainer] = useMutation(ADD_TRAINER, {
    variables: { name, email, phone, certifications, training },
    update(cache, { data: { addTrainer } }) {
      const { trainers } = cache.readQuery({ query: GET_TRAINERS });
      cache.writeQuery({
        query: GET_TRAINERS,
        data: { trainers: [...trainers, addTrainer] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      name === "" ||
      email === "" ||
      phone === "" ||
      certifications === "" ||
      training === ""
    )
      return alert("hello");

    addTrainer(name, email, phone, certifications, training);

    setName("");
    setEmail("");
    setPhone("");
    setCertifications("");
    setTraining("lifestyle");
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#AddTrainerModal"
      >
        <div className="d-flex align-items-center">
          <FaList className="me-2" />
          <div>Add Trainer</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="AddTrainerModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="#AddTrainerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="AddTrainerModal">
                New Trainer
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
                    <strong>Certifications</strong> (NASM CPT, etc.)
                  </label>
                  <textarea
                    className="form-control"
                    id="certifications"
                    value={certifications}
                    onChange={(e) => setCertifications(e.target.value)}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    <strong>Training</strong>
                  </label>
                  <select
                    className="form-select"
                    id="training"
                    value={training}
                    onChange={(e) => setTraining(e.target.value)}
                  >
                    <option value="lifestyle">Lifestyle</option>
                    <option value="sports">Sports</option>
                    <option value="bodybuilding">Bodybuilding</option>
                    <option value="powerlifting">Powerlifting</option>
                  </select>
                </div>

                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
