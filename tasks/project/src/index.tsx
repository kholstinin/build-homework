import { createRoot } from "react-dom/client";
import { App } from "containers/app";
import '@ant-design/v5-patch-for-react-19';

const targetHTMLElement = document.getElementById("root");
const root = createRoot(targetHTMLElement!);
root.render(<App />);
