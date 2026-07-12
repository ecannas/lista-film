import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errore, setErrore] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setErrore('');
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();

        onLoginSuccess(data.username);
        navigate('/'); 
      } else {
        setErrore("Credenziali errate. Riprova.");
      }
    } catch (error) {
      setErrore("Errore di connessione al server");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          
          <div className="card shadow border-primary">
            <div className="card-header bg-primary text-white text-center py-3">
              <h4 className="mb-0"><i className="bi bi-person-circle"></i> Accesso</h4>
            </div>
            
            <div className="card-body p-4 bg-light">
              
              {errore && (
                <div className="alert alert-danger p-2 text-center border-danger" role="alert">
                  <i className="bi bi-exclamation-triangle-fill"></i> {errore}
                </div>
              )}

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label text-primary fw-bold">Nome Utente</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-primary fw-bold">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 fw-bold">
                  <i className="bi bi-box-arrow-in-right"></i> Entra
                </button>
              </form>

              <div className="mt-4 text-center">
                <Link to="/register" className="text-warning text-decoration-none fw-bold">
                  Non hai un account? Registrati
                </Link>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Login;