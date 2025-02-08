import { useState, useEffect } from 'react'
import SemaineList from '../components/SemaineList'
import SemaineFormModal from '../components/SemaineFormModal'
import axios from 'axios'

export default function Semaines() {
  const [semaines, setSemaines] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [semaineToEdit, setSemaineToEdit] = useState(null)

  useEffect(() => {
    fetchSemaines()
  }, [])

  const fetchSemaines = async () => {
    try {
      const response = await axios.get('http://localhost:5000/semaines')
      setSemaines(response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération des semaines:", error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/semaines/${id}`)
      fetchSemaines()
    } catch (error) {
      console.error("Erreur lors de la suppression:", error)
    }
  }

  const handleEdit = (semaine) => {
    setSemaineToEdit(semaine)
    setShowModal(true)
  }

  const handleAdd = () => {
    setSemaineToEdit(null)
    setShowModal(true)
  }

  return (
    <div className="container mt-4">
      <h2>Gestion des Semaines</h2>
      <button className="btn btn-primary mb-3" onClick={handleAdd}>
        Ajouter une semaine
      </button>
      <SemaineList semaines={semaines} onDelete={handleDelete} onEdit={handleEdit} />
      <SemaineFormModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={fetchSemaines}
        semaineToEdit={semaineToEdit}
      />
    </div>
  )
}