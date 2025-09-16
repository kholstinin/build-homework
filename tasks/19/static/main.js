import React from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");

const root = createRoot(container);

function App() {
  return <div id="text">hello from native esm with react</div>;
}

root.render(<App />);
