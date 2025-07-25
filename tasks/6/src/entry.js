document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");

  body.innerHTML = "hello world";

  PERF_MARK("render", { environment: "dev" });
});
