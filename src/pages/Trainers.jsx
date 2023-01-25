import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_TRAINERS } from "../queries/trainerQueries";
import { BiArrowBack } from "react-icons/bi";
import TrainerCard from "../components/TrainerCard";
import AddTrainerModal from "../components/AddTrainerModal";

export default function Trainers() {
  const { loading, error, data } = useQuery(GET_TRAINERS);

  if (loading) return null;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      <div className="d-flex justify-content-center align-items-evenly">
        <AddTrainerModal />
        <Link
          to="/"
          className="btn btn-light d-inline btn-sm w-0 h-100 ms-auto "
        >
          <BiArrowBack />
          Back
        </Link>
      </div>
      {data.trainers.length > 0 ? (
        <div className="row">
          {data.trainers.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>
      ) : (
        <p>No Trainers</p>
      )}
    </>
  );
}
