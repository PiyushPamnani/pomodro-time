import React from "react";
import Auth from "./auth/Auth";
import Timer from "./components/Timer";

const App = () => {
  return (
    <div className="App">
      <Auth />
      <Timer />
    </div>
  );
};

export default App;
