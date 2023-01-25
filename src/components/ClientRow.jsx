import { useQuery } from "@apollo/client";
import { GET_TRAINER } from "../queries/trainerQueries";
import DeleteClientModal from "./DeleteClientModal";

export default function ClientRow({ client }) {
  const { loading, error, data } = useQuery(GET_TRAINER, {
    variables: { id: client.trainer.id },
  });

  if (loading) return null;
  if (error) return <p>Something went wrong</p>;

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>{data.trainer.name}</td>
      <td>
        <DeleteClientModal key={client.id} client={client} />
      </td>
    </tr>
  );
}
