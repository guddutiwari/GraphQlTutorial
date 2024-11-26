import { gql, useQuery } from "@apollo/client";

const query = gql`
  query GetTodosWithUser {
    getTodos {
      title
      completed
      user {
        name
        email
      }
    }
  }
`;

function App() {
  const { data, error, loading } = useQuery(query);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  console.log(data, "Data");

  if (error) {
    console.error("GraphQL Error:", error);
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div className="App">
      {data?.getTodos?.map((todo) => (
        <tr>
          <td>{todo?.title}</td>
          <td>{todo?.user?.name}</td>
        </tr>
      ))}
    </div>
  );
}

export default App;
