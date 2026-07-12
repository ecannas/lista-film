import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState,useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Preferiti from './pages/Preferiti';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState('');

    useEffect(() => {
    const controllaSessione = async () => {
      try {
        const response = await fetch('/api/utenti/me', {
             credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();

          if (data.username) {
            setIsLogged(true);
            setUsername(data.username);
          } else {
            console.warn("⚠️ JSON ricevuto ma campo 'username' mancante.");
          }
        } else {
          console.log("ℹ️ Il server ha risposto con un errore (es. 401). L'utente non è loggato.");
        }
      } catch (error) {
        console.error("❌ Errore di rete o di connessione al server:", error);
      }
    };

    controllaSessione();
  }, []);

  const handleLogoutSuccess = () => {
    setIsLogged(false);
    setUsername('');
  };

  return (

    <Router>
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        
        <Navbar isLogged={isLogged} username={username} onLogout={handleLogoutSuccess} />

        <Routes>
          <Route path="/" element={<Home isLogged={isLogged} />} />
          <Route path="/login" element={<Login onLoginSuccess={(nome) => {
              setIsLogged(true);
              setUsername(nome);
            }
          } />} />
          <Route path="/register" element={<Register />} />
          <Route path="/preferiti" element={<Preferiti isLogged={isLogged} />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;