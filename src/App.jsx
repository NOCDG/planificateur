import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Accueil from './pages/Accueil'
import Planification from './pages/Planification'
import Configuration from './pages/Configuration'
import Salles from './pages/Salles'
import Semaines from './pages/Semaines'
import Promotions from './pages/Promotions'

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/planifier" element={<Planification />} />
          <Route path="/configurer" element={<Configuration />} />
          <Route path="/salles" element={<Salles />} />
          <Route path="/semaines" element={<Semaines />} />
          <Route path="/promotions" element={<Promotions />} />
        </Routes>
      </div>
    </>
  )
}