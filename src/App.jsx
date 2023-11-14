// Node modules
import { useContext, useEffect, useState } from "react";

// Project files
import ItemLaunch from "./components/ItemLaunch";
import Loader from "./components/Loader";
import Error from "./components/Error";
import "./style/style.css";

/**
 * Requirements:
 * 1. Disable pagination controls until the initial data is loaded.
 * 2. Disable Previous/Next page buttons if previous/next page is not available.
 * 3. Display current range of records (e.g. "1-10 of 1000") and a total number of launches.
 * 4. Test a race condition when the user press the prev/next buttons on subsequent loadings.
 */
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
            <th>Launch name</th>
            <th>Date</th>
            <th>Successful</th>
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
          Range of records {recordStart}-{recordEnd}
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
