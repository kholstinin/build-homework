if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

const root = document.getElementById("root");
root.innerHTML = "JavaScript is working";
