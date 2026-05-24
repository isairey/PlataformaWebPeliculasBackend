import { Link } from "react-router-dom";
import logo from "../../../assets/tmovie.png";
import "./AuthHeader.scss";

const AuthHeader = () => {
  return (
    <div className="auth-header-container">
      <img src={logo} alt="tmovie logo" />
      <Link className="logo-link" to="/">
        tMovies
      </Link>
    </div>
  );
};

export default AuthHeader;
