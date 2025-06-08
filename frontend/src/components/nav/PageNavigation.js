// customEvent for router
export default function navigate(e, view) {
  e.preventDefault();
  window.dispatchEvent(new CustomEvent("navigate", { detail: view }));
}
