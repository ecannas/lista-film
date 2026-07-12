import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [testo, setTesto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (testo.trim() !== '') {
      onSearch(testo);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex justify-content-center mb-4">
      <input
        type="text"
        className="form-control w-50 me-2"
        placeholder="Cerca un film..."
        value={testo}
        onChange={(e) => setTesto(e.target.value)}
      />
      <button type="submit" className="btn btn-primary fw-bold">
        <i className="bi bi-search"></i> Cerca
      </button>
    </form>
  );
}

export default SearchBar;