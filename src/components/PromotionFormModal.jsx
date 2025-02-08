import { useState } from 'react'
import axios from 'axios'

export default function PromotionFormModal({ show, onClose, onSave, promoToEdit }) {
  const [nom, setNom] = useState(promoToEdit?.nom || '')
  const [nb_heure, setNbHeure] = useState(promoToEdit?.nb_heure || '')
  const [nb_personne, setNbPersonne] = useState(promoToEdit?.nb_personne || '')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const promoData = { nom, nb_heure, nb_personne }

    try {
      if (promoToEdit) {
        await axios.put(`http://localhost:5000/promos/${promoToEdit.nom}`, promoData)
      } else {
        await axios.post('http://localhost:5000/promos', promoData)
      }
      onSave()
      onClose()
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la promotion:", error)
    }
  }

  return (
    <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{promoToEdit ? 'Modifier la promotion' : 'Ajouter une promotion'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nom de la promotion</label>
                <input
                  type="text"
                  className="form-control"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nombre d'heures</label>
                <input
                  type="number"
                  className="form-control"
                  value={nb_heure}
                  onChange={(e) => setNbHeure(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nombre de personnes</label>
                <input
                  type="number"
                  className="form-control"
                  value={nb_personne}
                  onChange={(e) => setNbPersonne(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {promoToEdit ? 'Modifier' : 'Ajouter'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}