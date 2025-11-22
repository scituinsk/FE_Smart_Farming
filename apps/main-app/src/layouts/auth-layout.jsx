import { Outlet } from "react-router";

export const AuthLayout = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#e9e9e9",
      border: "2px solid green",
      padding: "10px",
      margin: "5px",
    }}
  >
    <Outlet />
  </div>
);
