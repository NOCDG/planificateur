import { useState, useEffect } from 'react'
import SalleList from '../components/SalleList'
import SalleFormModal from '../components/SalleFormModal'
import axios from 'axios'

export default function Salles() {
  const [salles, setSalles] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [salleToEdit, setSalleToEdit] = useState(null)

  useEffect(() => {
    fetchSalles()
  }, [])

  const fetchSalles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/salles')
      setSalles(response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération des salles:", error)
    }
  }

  const handleDelete = async (num_salle, batiment) => {
    try {
      await axios.delete(`http://localhost:5000/salles/${num_salle}/${batiment}`)
      fetchSalles()
    } catch (error) {
      console.error("Erreur lors de la suppression:", error)
    }
  }

  const handleEdit = (salle) => {
    setSalleToEdit(salle)
    setShowModal(true)
  }

  const handleAdd = () => {
    setSalleToEdit(null)
    setShowModal(true)
  }

  return (
    <div className="container mt-4">
      <h2>Gestion des Salles</h2>
      <button className="btn btn-primary mb-3" onClick={handleAdd}>
        Ajouter une salle
      </button>
      <SalleList salles={salles} onDelete={handleDelete} onEdit={handleEdit} />
      <SalleFormModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={fetchSalles}
        salleToEdit={salleToEdit}
      />
    </div>
  )
}