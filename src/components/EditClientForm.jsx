import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_TRAINERS } from "../queries/trainerQueries";

export default function EditClientForm({ client }) {
  const navigate = useNavigate();

  var key = client.experience.toLowerCase();

  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [phone, setPhone] = useState(client.phone);
  const [goals, setGoals] = useState(client.goals);
  const [experience, setExperience] = useState(key);
  const [trainerId, setTrainerId] = useState(client.trainer.id);

  const { loading, error, data } = useQuery(GET_TRAINERS);

  const [updateClient] = useMutation(UPDATE_CLIENT, {
    variables: {
      id: client.id,
      name,
      email,
      phone,
      goals,
      experience,
      trainerId,
    },
    onCompleted: () => navigate("/clients"),
    refetchQueries: [{ query: GET_CLIENTS }],
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

    updateClient(name, email, phone, goals, experience, trainerId);
  };

  if (loading) return null;
  if (error) return <p>uh oh something went wrong</p>;

  return (
    !loading &&
    !error && (
      <>
        <div className="w-50 mx-auto">
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
                {data.trainers.map((trainer) => (
                  <option key={trainer.id} value={trainer.id}>
                    {trainer.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-secondary">
              Save Changes
            </button>
            <a href="/clients" className="btn btn-light ms-3">
              Cancel
            </a>
          </form>
        </div>
      </>
    )
  );
}
