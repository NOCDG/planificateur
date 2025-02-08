import { Link } from 'react-router-dom'

export default function Configuration() {
  return (
    <div className="container mt-4">
      <h2>Configuration</h2>
      <div className="list-group">
        <Link to="/salles" className="list-group-item list-group-item-action">
          Gérer les salles
        </Link>
        <Link to="/semaines" className="list-group-item list-group-item-action">
          Gérer les semaines
        </Link>
        <Link to="/promotions" className="list-group-item list-group-item-action">
          Gérer les promotions
        </Link>
      </div>
    </div>
  )
}