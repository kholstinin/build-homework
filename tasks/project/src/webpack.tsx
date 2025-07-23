// @ts-ignore
__webpack_nonce__ = window.webpack_nonce;

import { createRoot } from "react-dom/client";
import { App } from "containers/app";
import '@ant-design/v5-patch-for-react-19';

import('./data').then(({data}) => console.log(data));

const targetHTMLElement = document.getElementById("root");
const root = createRoot(targetHTMLElement!);
root.render(<App />);
