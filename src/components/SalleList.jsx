export default function SalleList({ salles, onDelete, onEdit }) {
    return (
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Numéro</th>
              <th>Bâtiment</th>
              <th>Places</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {salles.map(salle => (
              <tr key={`${salle.num_salle}-${salle.batiment}`}>
                <td>{salle.num_salle}</td>
                <td>{salle.batiment}</td>
                <td>{salle.nb_place}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => onEdit(salle)}
                  >
                    Modifier
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(salle.num_salle, salle.batiment)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }