import React from "react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <a href="/" className="navbar-brand">Mi Sitio</a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="/inicio" className="nav-link">Inicio</a>
          </li>
          <li className="nav-item">
            <a href="/acerca" className="nav-link">Acerca</a>
          </li>
          <li className="nav-item">
            <a href="/contacto" className="nav-link">Contacto</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function Footer() {
    return (
      <footer className="footer">
        <div className="container">
          <p>Derechos de autor © {new Date().getFullYear()} Mi Sitio</p>
        </div>
      </footer>
    );
  }
  

export default {Navbar, Footer};