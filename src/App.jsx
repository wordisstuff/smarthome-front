import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [valve1, setValve1] = useState(false);
  const [valve2, setValve2] = useState(false);

  const toggleValve = async (relay, state, setState) => {
    // if (state === null) setState(false);
    setState((prev) => !prev);
    console.log(state);
    try {
      const response = await axios.post("http://localhost:8080/valves", {
        relay: relay,
        state,
        date: new Date().toISOString(), // або new Date().toLocaleString() для читабельного формату
      });

      console.log("Відповідь сервера:", response.data);
      return response.data;
    } catch (error) {
      console.error("Помилка надсилання запиту:", error);
      return null;
    }
  };

  return (
    <>
      <div className="card">
        <button className="btn" onClick={() => toggleValve(1)}>
          valve 1
        </button>
        <button className="btn" onClick={() => toggleValve(2)}>
          valve 2
        </button>
        <label className="switch">
          {" "}
          v1
          <input
            type="checkbox"
            checked={valve1}
            onChange={() => toggleValve(1, valve1, setValve1)}
          />
          <span className="slider"></span>
        </label>
        <label className="switch">
          {" "}
          v2
          <input
            type="checkbox"
            checked={valve2}
            onChange={() => setValve2((prev) => !prev)}
          />
          <span className="slider"></span>
        </label>
      </div>
    </>
  );
}

export default App;
