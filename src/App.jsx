// Node modules
import { useEffect, useState } from "react";

// Project files
import Error from "./components/Error";
import PaginationControls from "./components/PaginationControls";
import TableLaunch from "./components/TableLaunch";
import "./style/style.css";

export default function App() {
  // Local state
  const [data, setData] = useState({
    docs: [],
    hasNextPage: false,
    hasPrevPage: false,
    totalDocs: 0,
  });
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(0); // 0 loading, 1 loaded, 2 error

  // Properties
  const resource = "https://api.spacexdata.com/v5/launches/query";
  const limit = 10;

  // Methods
  useEffect(() => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        options: { page: page, limit: limit },
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
  if (status === 2) return <Error />;

  return (
    <div className="App">
      <h1>Space launches</h1>
      <TableLaunch data={data.docs} />
      {status === 1 && (
        <PaginationControls data={data} limit={limit} state={[page, setPage]} />
      )}
    </div>
  );
}
