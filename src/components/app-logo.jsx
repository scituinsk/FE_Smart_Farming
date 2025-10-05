import { Link } from "react-router";

import logoBrand from "../assets/logo-brand.png";

export const AppLogo = () => {
  return (
    <Link to="/">
      <img src={logoBrand} alt="LOGO BRAND" />
    </Link>
  );
};
