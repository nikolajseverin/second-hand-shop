import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SERVER_BASE_URL = 'http://localhost:5500';

function CategoryFilter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchTerm) {
      setItems([]);
      return;
    }

    const fetchByName = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${SERVER_BASE_URL}/clothes/search/${searchTerm}`);
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        setError('Could not fetch clothes');
      } finally {
        setLoading(false);
      }
    };

    fetchByName();
  }, [searchTerm]);

  const handleItemSelect = (itemId) => {
    navigate(`/clothes/${itemId}`);
  };

  return (
    <div style={{ margin: '1rem' }}>
      <label htmlFor="searchTerm">Søg efter navn:</label>
      <input
        id="searchTerm"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="F.eks. 'Jacket'"
        style={{ padding: '8px', marginLeft: '1rem', fontSize: '16px' }}
      />

      {loading && <p>Loading items...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {items.length > 0 && (
        <ul style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '0.5rem' }}>
          {items.map((item) => (
            <li
              key={item.id}
              style={{ cursor: 'pointer', padding: '0.5rem 0' }}
              onClick={() => handleItemSelect(item.id)}
            >
              {item.title} – ${item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryFilter;