import styles from './styles.module.css';

function render() {
  return `<div id="button" class=${styles.button}>hello world</div>`;
}

document.getElementById("root").innerHTML = render();
