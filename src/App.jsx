import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/user/add")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <h1>Server response:</h1>
      <p>{data}</p>
    </>
  );
}

export default App;
