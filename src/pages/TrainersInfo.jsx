import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useQuery } from "@apollo/client";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { MdSchool } from "react-icons/md";
import { CiDumbbell } from "react-icons/ci";
import { GET_TRAINER } from "../queries/trainerQueries";
import DeleteTrainerButton from "../components/DeleteTrainerButton";
import EditTrainerForm from "../components/EditTrainerForm";

export default function TrainersInfo() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_TRAINER, {
    variables: { id },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link
            to="/trainers/"
            className="btn btn-light d-inline btn-sm w-25 ms-auto "
          >
            Back
          </Link>
          <div className="d-flex justify-content-start align-items-self">
            <h1 className="display-4">{data.trainer.name}</h1>
            <EditTrainerForm trainer={data.trainer} />
          </div>
          <p className="mt-3 fs-5">
            <FiMail className="" /> {data.trainer.email}
          </p>
          <p className="mt-1 fs-5">
            <BsFillTelephoneOutboundFill className="mb-1" />{" "}
            {data.trainer.phone}
          </p>
          <h1 className="fs-3 mt-3">
            Coaching:
            <p className="mt-3 fs-5">
              <MdSchool className="mb-1" /> {data.trainer.certifications}
            </p>
            <p className="lead bold">
              <CiDumbbell className="mb-1" />{" "}
              <strong>{data.trainer.training}</strong>
            </p>
          </h1>
          <DeleteTrainerButton trainerId={data.trainer.id} />
        </div>
      )}
    </>
  );
}
