// Node modules
import { useState } from "react";

// Project files
import FlightsContext from "./FlightsContext";

export default function FlightsProvider({ children }) {
  const [docs, setDocs] = useState("Default Value");

  const updateDocs = (newValue) => {
    setDocs(newValue);
  };

  return (
    <FlightsContext.Provider value={{ docs, updateDocs }}>
      {children}
    </FlightsContext.Provider>
  );
}
