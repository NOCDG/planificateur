import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Planificateur</Link>
        
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/planifier">Planifier</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/configurer">Configurer</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}