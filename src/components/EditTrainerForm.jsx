import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_TRAINER } from "../queries/trainerQueries";
import { FiEdit } from "react-icons/fi";
import { UPDATE_TRAINER } from "../mutations/trainerMutations";

export default function EditTrainerForm({ trainer }) {
  var key = trainer.training.toLowerCase();

  const [name, setName] = useState(trainer.name);
  const [email, setEmail] = useState(trainer.email);
  const [phone, setPhone] = useState(trainer.phone);
  const [certifications, setCertifications] = useState(trainer.certifications);
  const [training, setTraining] = useState(key);

  const [updateTrainer] = useMutation(UPDATE_TRAINER, {
    variables: { id: trainer.id, name, email, phone, certifications, training },
    refetchQueries: [{ query: GET_TRAINER }],
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

    updateTrainer(name, email, phone, certifications, training);
  };

  return (
    <>
      <div>
        <button
          type="button"
          className="btn btn-link mb-3"
          data-bs-toggle="modal"
          data-bs-target="#AddTrainerModal"
        >
          <div className="d-flex align-items-center">
            <FiEdit />
            <div></div>
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
                  Update Trainer Information
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
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
