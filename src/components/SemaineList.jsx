export default function SemaineList({ semaines, onDelete, onEdit }) {
    return (
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Numéro</th>
              <th>Année</th>
              <th>Nombre d'heures</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {semaines.map(semaine => (
              <tr key={semaine.id}>
                <td>{semaine.numero}</td>
                <td>{semaine.annee}</td>
                <td>{semaine.nbHeures}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => onEdit(semaine)}
                  >
                    Modifier
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(semaine.id)}
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