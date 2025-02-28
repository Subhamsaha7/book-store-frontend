import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart, removeFromCart } from "../../redux/features/cart/CartSlice";
import { getImgUrl } from "../../utils/getImgUrl";

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
        toast.error(`${product.title} removed from cart!`, { icon: "🛒" });
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        toast.error("Cart cleared!", { icon: "🗑️" });
    };

    return (
        <div className="flex flex-col h-full bg-white shadow-2xl rounded-lg p-6 max-w-3xl mx-auto mt-12">
            <div className="flex items-start justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
                <button
                    onClick={handleClearCart}
                    className="py-2 px-4 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105"
                >
                    Clear Cart
                </button>
            </div>
            <div className="mt-6 overflow-y-auto max-h-[400px] space-y-4">
                {cartItems.length > 0 ? (
                    cartItems.map((product) => (
                        <div key={product._id} className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition-all">
                            <img
                                src={getImgUrl(product.coverImage)}
                                alt={product.title}
                                className="w-20 h-20 rounded-md object-cover border border-gray-300"
                            />
                            <div className="ml-4 flex-1">
                                <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                                <p className="text-gray-600 text-sm capitalize">Category: {product.category}</p>
                                <p className="text-indigo-600 font-bold">${product.newPrice}</p>
                            </div>
                            <button
                                onClick={() => handleRemoveFromCart(product)}
                                className="text-red-500 hover:text-red-700 text-sm font-semibold"
                            >
                                Remove
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No products in cart!</p>
                )}
            </div>
            <div className="border-t mt-6 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                    <p>Subtotal</p>
                    <p>${totalPrice || "0.00"}</p>
                </div>
                <p className="text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div className="mt-4 flex gap-4">
                    <Link
                        to="/checkout"
                        className="flex-1 text-center bg-indigo-600 text-white py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
                    >
                        Checkout
                    </Link>
                    <Link to="/" className="flex-1 text-center py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300">Continue Shopping</Link>
                </div>
            </div>
        </div>
    );
};

export default CartPage;