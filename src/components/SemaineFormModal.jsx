import { useState } from 'react'
import axios from 'axios'

export default function SemaineFormModal({ show, onClose, onSave, semaineToEdit }) {
  const [numero, setNumero] = useState(semaineToEdit?.numero || '')
  const [annee, setAnnee] = useState(semaineToEdit?.annee || '')
  const [nbHeures, setNbHeures] = useState(semaineToEdit?.nbHeures || '')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const semaineData = { numero: parseInt(numero), annee: parseInt(annee), nbHeures: parseInt(nbHeures) }
    console.log("Données envoyées :", semaineData)

    try {
      if (semaineToEdit) {
        await axios.put(`http://localhost:5000/semaines/${semaineToEdit.id}`, semaineData)
      } else {
        await axios.post('http://localhost:5000/semaines', semaineData)
      }
      onSave()
      onClose()
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la semaine:", error)
    }
  }

  return (
    <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{semaineToEdit ? 'Modifier la semaine' : 'Ajouter une semaine'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Numéro de semaine</label>
                <input
                  type="number"
                  className="form-control"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Année</label>
                <input
                  type="number"
                  className="form-control"
                  value={annee}
                  onChange={(e) => setAnnee(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nombre d'heures</label>
                <input
                  type="number"
                  className="form-control"
                  value={nbHeures}
                  onChange={(e) => setNbHeures(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {semaineToEdit ? 'Modifier' : 'Ajouter'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}