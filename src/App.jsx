// Node modules
import { useEffect, useState } from "react";

// Project files
import PaginationControls from "./components/PaginationControls";
import TableLaunch from "./components/TableLaunch";
import "./style/style.css";

export default function App() {
  // Local state
  const [data, setData] = useState({
    docs: [],
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10,
    totalDocs: 0,
  });
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(0); // 0 loading, 1 loaded, 2 error

  // Properties
  const resource = "https://api.spacexdata.com/v5/launches/query";

  // Methods
  useEffect(() => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        options: { page: page, limit: data.limit },
      }),
    };

    fetch(resource, options)
      .then((response) => response.json())
      .then((result) => onSuccess(result))
      .catch((error) => onError(error));
  }, [page]);

  function onSuccess(result) {
    console.log(result);
    setData(result);
    setStatus(1);
  }

  function onError(error) {
    console.error(error);
    setStatus(2);
  }

  // Safeguard
  if (status === 2) return <p>Cannot load data ❌</p>;

  return (
    <div className="App">
      <h1>Space launches</h1>
      <TableLaunch data={data.docs} />
      {status === 0 && <p>Loading...</p>}
      <PaginationControls data={data} state={[page, setPage]} />
    </div>
  );
}
