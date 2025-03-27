import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="not-found-content">
      <h1>404</h1>
      <p>Nothing to see here. Go back.</p>
      <Link to="/">
        <button id="go-back-btn">Go back</button>
      </Link>
    </div>
  );
};
