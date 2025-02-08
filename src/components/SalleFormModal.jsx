import { useState } from 'react'
import axios from 'axios'

export default function SalleFormModal({ show, onClose, onSave, salleToEdit }) {
  const [num_salle, setNumSalle] = useState(salleToEdit?.num_salle || '')
  const [batiment, setBatiment] = useState(salleToEdit?.batiment || '')
  const [nb_place, setNbPlace] = useState(salleToEdit?.nb_place || '')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const salleData = { num_salle, batiment, nb_place }

    try {
      if (salleToEdit) {
        await axios.put(`http://localhost:5000/salles/${salleToEdit.num_salle}/${salleToEdit.batiment}`, salleData)
      } else {
        await axios.post('http://localhost:5000/salles', salleData)
      }
      onSave()
      onClose()
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la salle:", error)
    }
  }

  return (
    <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{salleToEdit ? 'Modifier la salle' : 'Ajouter une salle'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Numéro de salle</label>
                <input
                  type="text"
                  className="form-control"
                  value={num_salle}
                  onChange={(e) => setNumSalle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Bâtiment</label>
                <input
                  type="text"
                  className="form-control"
                  value={batiment}
                  onChange={(e) => setBatiment(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nombre de places</label>
                <input
                  type="number"
                  className="form-control"
                  value={nb_place}
                  onChange={(e) => setNbPlace(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {salleToEdit ? 'Modifier' : 'Ajouter'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}