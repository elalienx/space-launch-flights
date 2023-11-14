// Node modules
import { useEffect, useState } from "react";

// Project files
import ItemLaunch from "./components/ItemLaunch";
import Loader from "./components/Loader";
import Error from "./components/Error";

export default function App() {
  // Local state
  // Refactor into Context API
  const [docs, setDocs] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [totalDocs, setTotalDocs] = useState(0);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [status, setStatus] = useState(0); // 0 loading, 1 loaded, 2 error
  const [initalLoad, setInitialLoad] = useState(false);

  // Properties
  const resource = "https://api.spacexdata.com/v5/launches/query";
  const limitPerPage = 10;
  const options = {
    method: "POST",
    body: { options: { page: page, limit: limitPerPage } },
  };

  // Derived state
  const totalRecords = page * limitPerPage + offset;

  // Methods
  useEffect(() => {
    fetch(resource, options)
      .then((response) => response.json())
      .then((result) => onSuccess(result))
      .catch((error) => onError(error));
  }, []);

  function onSuccess(result) {
    const { docs, hasNextPage, hasPrevPage, nextPage, prevPage, totalDocs } =
      result;

    setDocs(docs);
    setHasNextPage(hasNextPage);
    setHasPrevPage(hasPrevPage);
    setNextPage(nextPage);
    setPrevPage(prevPage);
    setTotalDocs(totalDocs);
    setStatus(1);
    setInitialLoad(true);
  }

  function onError(error) {
    console.error(error);
    alert("Could not load API, check console for more information.");
    setStatus(2);
  }

  function onPrev() {}

  function onNext() {}

  // Components
  const Launches = docs.map((item) => <ItemLaunch key={item.id} item={item} />);

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
          {status === 1 && Launches}
        </tbody>
      </table>

      {initalLoad && (
        <section className="controls">
          <button disabled={hasNextPage} onClick={() => onPrev()}>
            Prev
          </button>
          <span> | </span>
          <button disabled={hasPrevPage} onClick={() => onNext()}>
            Next
          </button>
          <p>
            Current range of records: {totalRecords} of {totalDocs}
          </p>
        </section>
      )}
    </div>
  );
}
