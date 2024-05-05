import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Jobs from "./components/Jobs/Jobs";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Jobs />
    </>
  );
}

export default App;
