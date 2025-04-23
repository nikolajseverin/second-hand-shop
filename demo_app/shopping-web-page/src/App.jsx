import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'
import ClothingList from './Components/clothes-list'
import ClothingItemPage from './Components/clothes-item'
import SearchBar from './Components/search'
import SellCloth from './Components/sell-cloth';

function App() {
  const [result, setResult] = useState([])

  const handleResultChange = data => {
    setResult(data)
  }

  return (
    <Router>  {/* Wrap your app in Router to enable routing */}
      <SearchBar />
      <nav style={{ marginBottom: '16px' }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/sell-cloth">Sell Cloth</Link>
      </nav>
      <Routes>
        <Route path="/clothes/:id" element={<ClothingItemPage />} />
        <Route path="/" element={<ClothingList />} />
        <Route path="/sell-cloth" element={<SellCloth />} />  {/* Rute for SellClothPage */}
      </Routes>
    </Router>
  );
}

export default App
