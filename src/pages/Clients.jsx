import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "../components/Spinner";
import ClientRow from "../components/ClientRow";
import AddClientModal from "../components/AddClientModal";
import ViewClientInfo from "../components/ViewClientInfo";

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    !loading &&
    !error && (
      <>
        <div className="d-flex">
          <AddClientModal />
          <ViewClientInfo />
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Trainer</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {data.clients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      </>
    )
  );
}
