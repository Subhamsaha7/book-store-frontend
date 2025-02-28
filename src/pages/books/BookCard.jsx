import React from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { addToCart } from '../../redux/features/cart/CartSlice';
import { getImgUrl } from '../../utils/getImgUrl';

const BookCard = ({ book }) => {

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    }
    return (
        <div className=" rounded-lg transition-shadow duration-300">
            <div
                className="flex flex-col sm:flex-row sm:items-center sm:h-72  sm:justify-center gap-4"
            >
                <div className="sm:h-72 h-60 sm:flex-shrink-0 border border-white/80 shadow-2xl rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,255,255,0.6)] hover:border-gray-200">
                    <Link to={`/books/${book?._id}`}>
                        <img
                            src={`${getImgUrl(book?.coverImage)}`}
                            alt="Book Cover"
                            className="w-full h-full object-cover p-2 cursor-pointer hover:scale-105 transition-transform duration-300"
                        />
                    </Link>
                </div>



                <div>
                    <Link to={`/books/${book._id}`}
                    ><h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
                            {book?.title}
                        </h3></Link>
                    <p className="text-gray-600 mb-5">{book?.description.length > 80 ? `${book.description.slice(0, 80)}...` : book?.description}</p>
                    <p className="font-medium mb-5">
                        $ {book?.newPrice} <span className="line-through font-normal ml-2">$ {book?.oldPrice}</span>
                    </p>
                    <button 
                    onClick={() => handleAddToCart(book)}
                    className="bg-[#FFCE1A] px-6 py-2 rounded-md text-base font-nunito flex items-center gap-2 border-2 border-transparent hover:border-white hover:scale-105  hover:text-white transition-all duration-300 ease-in-out cursor-pointer shadow-md">
                        <FiShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                    </button>


                </div>
            </div>
        </div>
    );
};

export default BookCard
