import React, { useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { useFetchBookByIdQuery } from "../../redux/features/books/booksApi";
import { addToCart } from "../../redux/features/cart/CartSlice";
import { getImgUrl } from "../../utils/getImgUrl";

const SingleBook = () => {
    const { id } = useParams();
    const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
    const dispatch = useDispatch();

    // Scroll to Top when page loads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    if (isLoading) return <div className="text-center text-lg font-semibold">Loading...</div>;
    if (isError) return <div className="text-center text-lg font-semibold text-red-500">Error loading book info</div>;

    return (
        <div className="flex justify-center items-center min-h-screen w-full p-4 -mt-20">
            <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-5 transform transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl border border-gray-200">
                <h1 className="text-xl font-bold text-gray-900 mb-3 text-center drop-shadow-md">
                    {book.title}
                </h1>

                {/* Book Cover (No Background) */}
                <div className="relative overflow-hidden rounded-lg  mb-3 w-full h-56 flex justify-center items-center">
                    <img
                        src={`${getImgUrl(book.coverImage)}`}
                        alt={book.title}
                        className="h-full w-full object-contain transform transition-all duration-500 hover:scale-110"
                    />
                </div>

                {/* Book Info */}
                <div className="text-gray-700 space-y-1 text-sm sm:text-base">
                    <p><strong>Author:</strong> {book.author || "Admin"}</p>
                    <p><strong>Published:</strong> {new Date(book?.createdAt).toLocaleDateString()}</p>
                    <p className="capitalize"><strong>Category:</strong> {book?.category}</p>
                    <p className="text-gray-700">
                        <strong>Description:</strong> {book.description}
                    </p>
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={() => handleAddToCart(book)}
                    className="mt-4 w-full flex justify-center items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-2 text-white font-bold rounded-lg shadow-md transform transition-all duration-300 hover:translate-y-[-3px] hover:shadow-lg hover:brightness-110"
                >
                    <FiShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    );
};

export default SingleBook;
