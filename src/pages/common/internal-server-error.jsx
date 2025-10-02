import { Link } from "react-router";

export const InternalServerError = () => (
  <div style={{ textAlign: "center", marginTop: "50px" }}>
    <h1>500 - Internal Server Error</h1>
    <p>Sorry, Server Error!!</p>
    <Link to="/">Go back to Home</Link>
  </div>
);
