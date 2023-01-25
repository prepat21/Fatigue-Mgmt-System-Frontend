import logo from "./assets/logo.png";

export default function Header() {
  return (
    <nav className="nav nav-pills bg-light p-3 mb-3">
      <div className="container d-flex justify-content-start align-items-center">
        <img src={logo} alt="logo" width="32" height="24" className="me-3" />
        <a className="navbar-brand me-3" href="/">
          Personal Training Systems
        </a>
        <a className="nav-link" href="/trainers/">
          Trainers
        </a>
        <a className="nav-link" href="/clients">
          Clients
        </a>
      </div>
    </nav>
  );
}
