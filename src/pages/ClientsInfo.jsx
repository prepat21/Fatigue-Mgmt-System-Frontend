import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useQuery } from "@apollo/client";
import { GET_CLIENT } from "../queries/clientQueries";
import EditClientForm from "../components/EditClientForm";

export default function ClientsInfo() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_CLIENT, {
    variables: { id },
  });

  if (loading) return <Spinner />;
  if (error)
    return (
      <a className="btn btn-light" data-bs-dismiss="modal">
        Cancel
      </a>
    );

  return (
    <>
      {!loading && !error && (
        <>
          <EditClientForm client={data.client} />
        </>
      )}
    </>
  );
}
