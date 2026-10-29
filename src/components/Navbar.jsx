import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="logo">
          <span className="logo__mark" aria-hidden="true">🍊</span>
          <span>recipe<span>book</span></span>
        </Link>
        <nav className="navbar__links">
          <NavLink to="/" end>Explore</NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
          <Link to="/add" className="btn btn--primary">+ Add recipe</Link>
        </nav>
      </div>
    </header>
  );
}
