// Node modules
import { useEffect, useState } from "react";

// Project files
import ItemLaunch from "./components/ItemLaunch";
import Error from "./components/Error";

export default function App() {
  // Local state
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(0); // 0 loading, 1 loaded, 2 error

  // Properties
  const resource = "https://api.spacexdata.com/v5/launches/query";
  const limitPerPage = 10;
  const options = {
    method: "POST",
    body: { options: { page: page, limit: limitPerPage } },
  };

  // Methods
  useEffect(() => {
    fetch(resource, options)
      .then((response) => response.json())
      .then((result) => onSucess(result))
      .catch((error) => onError(error));
  }, []);

  function onSucess(result) {
    const data = result.docs;

    setData(data);
    setStatus(1);
  }

  function onError(error) {
    console.error(error);
    alert("Could not load API, check console for more information.");
    setStatus(2);
  }

  // Components
  const Launches = data.map((item) => <ItemLaunch key={item.id} item={item} />);

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
        <tbody>{Launches}</tbody>
      </table>

      <section className="controls">
        <button>Previous</button>
        <span>Page: #</span>
        <button>Next</button>
      </section>
    </div>
  );
}
