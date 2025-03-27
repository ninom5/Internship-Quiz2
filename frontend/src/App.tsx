import { Router } from "./Router";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong!</div>}>
      <Router />
    </ErrorBoundary>
  );
}

export default App;
