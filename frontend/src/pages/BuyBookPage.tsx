import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate, useParams } from "react-router";
import type { CartItem } from "../types/CartItem";
import WelcomeBand from "../components/WelcomeBand";

function BuyBookPage() {
    const navigate = useNavigate();
    const { title, bookId, price } = useParams<{ title: string; bookId: string; price: string }>();
    const {addToCart} = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookId: Number(bookId!),
            title: title!,
            price: Number(price!),
            quantity
        };
        addToCart(newItem);
        navigate("/cart");
    }

    return (
        <>
        <WelcomeBand />
        <h2>Buy {title}</h2>
        <p>Price: ${price}</p>
        <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />

            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
        
        <button onClick={() => navigate(-1)}>Continue Shopping</button>
        </>
    );
}

export default BuyBookPage;