import { Link,useNavigate } from "react-router-dom";

function Navbar({isLogged,username,onLogout }) {
const navigate = useNavigate();

const eseguiLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      onLogout();
      navigate('/login');
    } catch (error) {
      console.error("Errore durante il logout", error);
    }
};


  return (
    <div className="container-fluid bg-primary py-2 shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
 
        <Link to="/" className="navbar-brand text-light fw-bold d-flex align-items-center text-decoration-none">
          <i className="bi bi-film me-2"></i> Film App
        </Link>
        <div className="d-flex align-items-center gap-3">
          {isLogged ? (
            <>
            <Link to="/preferiti" className="btn btn-outline-warning btn-sm me-2 fw-bold">
                <i className="bi bi-star-fill"></i> I Miei Preferiti
            </Link>
            <span className="text-light fw-bold">Benvenuto, {username}!</span>
              <button className="btn btn-outline-light btn-sm" onClick={eseguiLogout}>
                <i className="bi bi-box-arrow-right"></i> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-light btn-sm fw-bold text-primary">
              <i className="bi bi-person-circle"></i> Accedi
            </Link>         
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;