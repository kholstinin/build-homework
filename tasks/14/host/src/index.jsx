import React from "react";
import { createRoot } from "react-dom/client";

import { Button, Header, Footer } from "components";

const root = createRoot(document.getElementById("root"));

root.render(
  <div>
    <Header />
    <Button />
    <Footer />
  </div>
);
