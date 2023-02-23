import React from "react";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <div class="app-container">
        <Sidebar />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
