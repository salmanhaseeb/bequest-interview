import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

const API_URL = "http://localhost:8080";

function App() {
  const [data, setData] = useState<string>("");
  const [hash, setHash] = useState<string>("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(API_URL);
    const { data } = await response.json();
    setData(data);
    setHash(createHash(data)); // Store hash of the data
  };

  const updateData = async () => {
    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    await getData();
  };

  const verifyData = () => {
    const currentHash = createHash(data);
    if (currentHash === hash) {
      alert("Data is valid");
    } else {
      alert("Data has been tampered with! Recovering last known valid data.");
      recoverData();
    }
  };

  const recoverData = async () => {
    const response = await fetch(`${API_URL}/history`);
    const history = await response.json();
    if (history.length > 0) {
      const latestValidData = history[0].data; // Get the last valid version
      setData(latestValidData);
      setHash(createHash(latestValidData));
    } else {
      alert("No recovery data available.");
    }
  };

  const createHash = (data: string) => {
    return CryptoJS.SHA256(data).toString();
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        position: "absolute",
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        fontSize: "30px",
      }}
    >
      <div>Saved Data</div>
      <input
        style={{ fontSize: "30px" }}
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <button style={{ fontSize: "20px" }} onClick={updateData}>
          Update Data
        </button>
        <button style={{ fontSize: "20px" }} onClick={verifyData}>
          Verify Data
        </button>
      </div>
    </div>
  );
}

export default App;