import Cookies from "js-cookie";

const Navbar = function ({ isAuthenticated, updateAuthStatus }) {
  const logoutUser = e => {
    e.preventDefault();

    Cookies.remove("token");
    updateAuthStatus(false);

    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className={`nav-link ${
                  !isAuthenticated ? "disabled-links" : ""
                }`}
                aria-current="page"
                href="/add"
                disabled={isAuthenticated}
              >
                Add
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  !isAuthenticated ? "disabled-links" : ""
                }`}
                href="/difference"
                disabled={isAuthenticated}
              >
                Difference
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  !isAuthenticated ? "disabled-links" : ""
                }`}
                href="/multiplication"
                disabled={isAuthenticated}
              >
                Multiplication
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  !isAuthenticated ? "disabled-links" : ""
                }`}
                href="/division"
                disabled={isAuthenticated}
              >
                Division
              </a>
            </li>
          </ul>
          <span className="navbar-text">
            {isAuthenticated ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="/history">
                    History
                  </a>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link active"
                    aria-current="page"
                    onClick={logoutUser}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/register"
                  >
                    Register
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
              </ul>
            )}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
