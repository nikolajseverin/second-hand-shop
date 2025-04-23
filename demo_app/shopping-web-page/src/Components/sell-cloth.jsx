import React, { useState } from 'react';

const SERVER_BASE_URL = 'http://localhost:5500';

function SellCloth() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [size, setSize] = useState('');
    const [category, setCategory] = useState('');
    const [seller, setSeller] = useState('');
    const [location, setLocation] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);  // Get the selected file
    };

    // Ensuring all inputs have the same width and padding
    const inputStyle = {
        width: '100%',
        padding: '8px',
        boxSizing: 'border-box',
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !price || !description || !image) {
            setError('Please fill out all fields and upload an image');
            return;
        }

        setLoading(true);
        setError('');

        const formData = new FormData(); ""
        formData.append('title', title);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('size', size);
        formData.append('category', category);
        formData.append('seller', seller);
        formData.append('location', location);

        try {
            const response = await fetch(`${SERVER_BASE_URL}/clothes`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server error response:', errorData);
                throw new Error(`Failed to upload item: ${errorData.error || 'Unknown error'}`);
            }

            alert('Item listed successfully!');
        } catch (error) {
            setError('Error uploading item, please try again');
            console.log(error);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
            <h1 style={{ textAlign: 'center', marginBottom: 0, marginTop: '2rem' }}>Sell Your Clothes</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter item title"
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter item price"
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label>Size:</label>
                    <select value={size} onChange={(e) => setSize(e.target.value)} style={inputStyle}>
                        <option value="">Select size</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                </div>
                <div>
                    <label>Category:</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
                        <option value="">Select category</option>
                        <option value="Jackets">Jackets</option>
                        <option value="Shirts">Shirts</option>
                        <option value="Sweaters">Sweaters</option>
                        <option value="T-Shirts">T-Shirts</option>
                        <option value="Jeans">Jeans</option>
                        <option value="Dresses">Dresses</option>
                    </select>
                </div>
                <div>
                    <label>Seller:</label>
                    <input
                        type="text"
                        value={seller}
                        onChange={(e) => setSeller(e.target.value)}
                        placeholder="Enter your name or username"
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter your location"
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter item description"
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file"
                        onChange={handleImageChange}
                        accept="image/jpeg, image/png, image/gif"
                        style={inputStyle}
                    />
                </div>
                {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '4px'
                    }}
                >
                    {loading ? 'Uploading...' : 'Sælg'}
                </button>
            </form>
        </div>
    );
}

export default SellCloth;
