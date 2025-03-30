import { Router } from "./Router";
import { ErrorBoundary } from "react-error-boundary";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong!</div>}>
      <Router />
      <ToastContainer />
    </ErrorBoundary>
  );
}

export default App;
