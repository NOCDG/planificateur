export default function Accueil() {
    return (
      <div className="container mt-4">
        <h1>Bienvenue sur le Planificateur</h1>
        <div className="row mt-4">
          <div className="col-md-8">
            <h3>Présentation</h3>
            <p>Application de gestion des plannings pour établissement scolaire</p>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Accès rapide</h5>
                <p className="card-text">Utilisez le menu de navigation pour accéder aux différentes fonctionnalités</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }