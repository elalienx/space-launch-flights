// Node modules
import { useEffect, useState } from "react";

// Project files
import ItemLaunch from "./components/ItemLaunch";
import Loader from "./components/Loader";
import Error from "./components/Error";
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
  const recordStart = page * limit;
  const recordEnd = recordStart + 10;

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

  // Components
  const Items = data?.docs.map((item) => (
    <ItemLaunch key={item.id} item={item} />
  ));

  // Safeguard
  if (status === 2) return <Error />;

  return (
    <div className="App">
      <h1>Space launches</h1>

      <table>
        <thead>
          <tr>
            <th>Patch</th>
            <th>Launch name</th>
            <th>Date</th>
            <th>Successful?</th>
          </tr>
        </thead>
        <tbody>
          {status === 0 && <Loader />}
          {status === 1 && Items}
        </tbody>
      </table>

      <section className="controls">
        <button
          disabled={!data.hasPrevPage}
          onClick={() => setPage((currentPage) => currentPage - 1)}
        >
          Prev
        </button>
        <span> | </span>
        <button
          disabled={!data.hasNextPage}
          onClick={() => setPage((currentPage) => currentPage + 1)}
        >
          Next
        </button>
        <hr />
        <p>
          Range of records {recordStart}-{recordEnd} (incomeplete code ⚠️)
        </p>
        <p>
          Total launches:
          {data.totalDocs}
        </p>
        <p>Page: {page}</p>
      </section>
    </div>
  );
}
