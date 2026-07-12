import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errore, setErrore] = useState('');
  const [successo, setSuccesso] = useState('');
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrore('');
    setSuccesso('');

    try {
      const response = await fetch('/api/utenti/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        setSuccesso("Registrazione avvenuta con successo! Ti stiamo portando al login...");
        setTimeout(() => {
          navigate('/login');
        }, 2500);
      } else if (response.status === 409) {
        setErrore("Questo username esiste già. Scegline un altro.");
      } else {
        setErrore("Errore durante la registrazione.");
      }
    } catch (error) {
      setErrore("Errore di connessione al server");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          
          <div className="card shadow border-warning">
            <div className="card-header bg-warning text-dark text-center py-3">
              <h4 className="mb-0 fw-bold"><i className="bi bi-person-plus"></i> Registrazione</h4>
            </div>
            
            <div className="card-body p-4 bg-light text-dark">
              
              {errore && <div className="alert alert-danger p-2 text-center">{errore}</div>}
              {successo && <div className="alert alert-success p-2 text-center fw-bold">{successo}</div>}

              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label className="form-label text-warning fw-bold">Scegli un Username</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-warning fw-bold">Scegli una Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-warning w-100 fw-bold">
                  Crea Account
                </button>
              </form>

              <div className="mt-4 text-center">
                <Link to="/login" className="text-primary text-decoration-none fw-bold">
                  Hai già un account? Accedi
                </Link>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Register;