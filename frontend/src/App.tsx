import { Router } from "./Router";
import { ErrorBoundary } from "react-error-boundary";
import { ToastContainer } from "react-toastify";
import { TokenProvider } from "context/TokenProvider";

function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong!</div>}>
      <TokenProvider>
        <Router />
        <ToastContainer />
      </TokenProvider>
    </ErrorBoundary>
  );
}

export default App;
