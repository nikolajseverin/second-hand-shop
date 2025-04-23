import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../list.css'

const SERVER_BASE_URL = "http://localhost:5500";
const API_BASE_URL = "http://localhost:5500/clothes";

async function getAllClothes() {
  const response = await fetch(API_BASE_URL);
  return response.json();
}

function ClothingList({ onClick }) {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matchingItems, setMatchingItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchClothes() {
      try {
        const data = await getAllClothes();
        setClothes(data);
      } catch (error) {
        console.error("Error fetching clothes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchClothes();
  }, []);

  const handleItemSelect = (itemId) => {
    setMatchingItems([]);
    navigate(`/clothes/${itemId}`);  // Navigate to the item detail page
  };

  if (loading) return <p>Loading clothes...</p>;

  return (
    <div>
      {/* Title Section */}
      <h2 className="horizontal-scroll-container-title">All clothes</h2>

      {/* Horizontal Scroll Container */}
      <div className="horizontal-scroll-container">
        {clothes.map((item) => (
          <div
            key={item.id}
            className="item"
            onClick={() => handleItemSelect(item.id)}>
            <div className="item-content">
              <h4>{item.title}</h4>
              <p>{"$" + item.price}</p>
            </div>
            <div className="item-image">
              <img
                src={`${SERVER_BASE_URL}${item.imageUrl}`}
                alt={item.title}
                style={{
                  maxWidth: '50%',
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ClothingList;
