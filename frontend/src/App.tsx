import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CartProvider } from "./contexts/CartContext"
import BookListPage from "./pages/BookListPage"
import CartPage from "./pages/CartPage"
import BuyBookPage from "./pages/BuyBookPage"

function App() {
  return (
    <>
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<BookListPage />} />
          <Route path="/books" element={<BookListPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/buy/:title/:bookId/:price" element={<BuyBookPage />} />
        </Routes>
      </Router>
    </CartProvider>
      
    </>
  )
}

export default App