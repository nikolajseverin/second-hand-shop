import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // This is used to access route parameters (like :id)

const SERVER_BASE_URL = 'http://localhost:5500';

function ClothingItemPage() {
  const { id } = useParams();  // Get the `id` from the URL parameter
  const [item, setItem] = useState(null);

  // Fetch the item data based on the `id`
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${SERVER_BASE_URL}/clothes`);

        if (!response.ok) {
          throw new Error('Failed to fetch item data');
        }

        const data = await response.json();

        const foundItem = data.find(item => item.id === parseInt(id));

        setItem(foundItem);  // Set the fetched item data to state
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();  // Fetch item data when the component mounts
  }, [id]);  // Dependency array ensures fetching happens when `id` changes
  
  if (!item) {
    return <p>Loading...</p>;  // Show loading state if item data is still being fetched
  }

  return (
    <div>
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
      <h1>{item.title}</h1>
      <p>{item.description}</p>
      <p>${item.price}</p>
    </div>
  );
}

export default ClothingItemPage;
