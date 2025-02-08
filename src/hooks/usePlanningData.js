import { useState, useEffect } from "react";
import axios from "axios";

const usePlanningData = () => {
    const [promos, setPromos] = useState([]);
    const [salles, setSalles] = useState([]);
    const [semaines, setSemaines] = useState([]);
    const [occupations, setOccupations] = useState([]);
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const [promoRes, salleRes, semaineRes, occupationRes] = await Promise.all([
          axios.get("http://localhost:5000/promos"),
          axios.get("http://localhost:5000/salles"),
          axios.get("http://localhost:5000/semaines"),
          axios.get("http://localhost:5000/occupations"),
        ]);
  
        console.log("Occupations récupérées :", occupationRes.data); // ✅ Vérification
  
        setPromos(promoRes.data);
        setSalles(salleRes.data);
        setSemaines(semaineRes.data);
        setOccupations(occupationRes.data);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };
  
    return { promos, salles, semaines, occupations, fetchData };
  };
  
export default usePlanningData;
