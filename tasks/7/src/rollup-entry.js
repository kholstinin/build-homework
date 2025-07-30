import logo from "./assets/logo.svg";
import avatar from "./assets/avatar.svg";
import template from "./template.ejs";
import illustration from "./assets/illustration.png";
import ad from "./assets/ad.inline.svg";
import data from "./data.json";

window.data = data;
window.template = template;

console.log(data);
console.log(template);

const compile = window.ejs.compile(template);

const renderData = {
  ...JSON.parse(data),
  logoPath: logo,
  avatarInline: avatar,
  illustrationPath: illustration,
  adInline: ad,
};

const render = compile(renderData);
const root = document.getElementById("root");
root.innerHTML = render;
