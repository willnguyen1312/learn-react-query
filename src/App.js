import axios from "axios";
import { useQuery } from "react-query";

function App() {
  const queryInfo = useQuery("pokemon", async () => {
    await new Promise((res) => setTimeout(res, 1000));

    return axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.data.results);
  });

  return queryInfo.isLoading ? (
    "Loading..."
  ) : queryInfo.isError ? (
    queryInfo.error.message
  ) : (
    <div>
      {queryInfo.data.map((result) => {
        return <div key={result.name}>{result.name}</div>;
      })}
    </div>
  );
}

export default App;
