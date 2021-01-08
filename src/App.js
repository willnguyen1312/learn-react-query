import axios from "axios";
import { useReducer } from "react";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";

function Pokemon() {
  const queryInfo = usePokemon();

  return queryInfo.isLoading ? (
    "Loading..."
  ) : queryInfo.isError ? (
    queryInfo.error.message
  ) : (
    <div>
      {queryInfo.data.map((result) => {
        return <div key={result.name}>{result.name}</div>;
      })}

      {queryInfo.isFetching ? "Updating..." : null}
    </div>
  );
}

function usePokemon() {
  return useQuery(
    "queryKey",
    async () => {
      await new Promise((res) => setTimeout(res, 1000));

      return axios
        .get("https://pokeapi.co/api/v2/pokemon")
        .then((res) => res.data.results);
    },
    {
      // refetchOnWindowFocus: true,
      // staleTime: 1000,
      // cacheTime: 3000,
    }
  );
}

function Count() {
  const querInfo = usePokemon();
  return <h3>You are looking at {querInfo.data?.length} pokemon</h3>;
}

function App() {
  const [show, toggle] = useReducer((d) => !d, true);
  return (
    <>
      <button onClick={toggle}>{show ? "Hide" : "Show"}</button>
      <Count />
      {show ? <Pokemon /> : null}
      <ReactQueryDevtools />
    </>
  );
}

export default App;
