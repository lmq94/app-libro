import React from "react";

function Navbar() {
    return (
            <header>
                  <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark " data-bs-theme="dark">
                    <div className = "container-fluid d-flex align-items-center">
                    <button className="navbar-toggler bg-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Ver libros</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/agregar-libro">Agregar un libro</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/contacto">Contacto</a>
                            </li>
                        </ul>
                    </div>
                    </div>
                </nav>
            </header>
    );
  }

  function Footer() {
    return (
      <footer className="footer bg-dark mt-5" data-bs-theme="dark">
        <div className="container">
          <p className="text-center">Derechos de autor © {new Date().getFullYear()} Mi Sitio</p>
        </div>
      </footer>
    );
  }
  
  export default Footer;

export {Navbar, Footer};