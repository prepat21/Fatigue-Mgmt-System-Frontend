import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-start"
        style={{ margin: "175px" }}
      >
        <div className="vstack gap-2 col-md-6 mx-auto">
          <h1 className="display-1 text-primary-emphasis mx-auto">Hi, Admin</h1>
          <h1 className="display-5 text-primary mx-auto">
            Welcome to Your Dashboard!
          </h1>
        </div>
        <div className="d-grid gap-5 col-3 mt-2 ms-5">
          <Link to="/trainers" className="btn btn-primary btn-lg fs-4">
            Trainers
          </Link>
          <Link to="/clients" className="btn btn-primary btn-lg fs-4">
            Clients
          </Link>
        </div>
      </div>
    </>
  );
}
