const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const promoRoutes = require('./routes/promoRoutes');
const salleRoutes = require('./routes/salleRoutes');
const semaineRoutes = require('./routes/semaineRoutes');
const occupationRoutes = require('./routes/occupationRoutes'); // Importation des routes des occupations

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/promos', promoRoutes);
app.use('/salles', salleRoutes);
app.use('/semaines', semaineRoutes);
app.use('/occupations', occupationRoutes); // Ajout des routes pour gérer les occupations

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
