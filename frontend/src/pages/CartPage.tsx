import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

// The CartPage component displays the items in the user's cart, allowing them to update quantities, remove items, clear the cart, and see the total price.

function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <>
            <h2>Your Cart</h2>
            <div>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Book</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item.bookId}>
                                    <td>{item.title}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.bookId, parseInt(e.target.value) || 1)}
                                        />
                                    </td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <button onClick={() => removeFromCart(item.bookId)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <h3>Total: ${totalPrice.toFixed(2)}</h3>
                <button onClick={() => navigate(-1)}>Go Back</button>
                <button onClick={clearCart} disabled={cart.length === 0}>Clear Cart</button>
            </div>
        </>
    );
}

export default CartPage;