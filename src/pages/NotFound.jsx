import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <FaExclamationTriangle className="text-danger" size="5em" />
      <h1>Please Get The Fuck Out Of Here</h1>
      <p className="lead">This Page Is Not For Cunts Like You</p>
      <Link className="btn btn-primary">Leave And Never Return Virgin</Link>
    </div>
  );
}
