import { useState, useEffect } from 'react'
import PromotionList from '../components/PromotionList'
import PromotionFormModal from '../components/PromotionFormModal'
import axios from 'axios'

export default function Promotions() {
  const [promotions, setPromotions] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [promoToEdit, setPromoToEdit] = useState(null)

  useEffect(() => {
    fetchPromotions()
  }, [])

  const fetchPromotions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/promos')
      setPromotions(response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération des promotions:", error)
    }
  }

  const handleDelete = async (nom) => {
    try {
      await axios.delete(`http://localhost:5000/promos/${nom}`)
      fetchPromotions()
    } catch (error) {
      console.error("Erreur lors de la suppression:", error)
    }
  }

  const handleEdit = (promo) => {
    setPromoToEdit(promo)
    setShowModal(true)
  }

  const handleAdd = () => {
    setPromoToEdit(null)
    setShowModal(true)
  }

  return (
    <div className="container mt-4">
      <h2>Gestion des Promotions</h2>
      <button className="btn btn-primary mb-3" onClick={handleAdd}>
        Ajouter une promotion
      </button>
      <PromotionList promotions={promotions} onDelete={handleDelete} onEdit={handleEdit} />
      <PromotionFormModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={fetchPromotions}
        promoToEdit={promoToEdit}
      />
    </div>
  )
}