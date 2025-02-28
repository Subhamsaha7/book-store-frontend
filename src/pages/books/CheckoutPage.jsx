import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/AuthContext';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';

import Swal from "sweetalert2";



const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const[createOrder, {isLoading, error}] = useCreateOrderMutation();

    const onSubmit = async (data) => {
        const newOrder = {
            name: data.name,
            email: currentUser?.email,
            address: {
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode,
            },
            phone: data.phone,
            productIds: cartItems.map(item => item?._id),
            totalPrice: totalPrice,
        };

        try {
            await createOrder(newOrder).unwrap();
            Swal.fire({
                title: "Confirmed Order",
                text: "Your order placed successfully!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, It's Okay!"
            });
            navigate("/orders")
        } catch (error) {
            console.error("Error place an order", error);
            toast.error("Failed to place an order");
        }
    };

    if(isLoading) return <div>Loading....</div>

    return (
        <section className="flex items-center justify-center min-h-screen p-4 sm:p-6 bg-gradient-to-br ">
            <ToastContainer />
            <div className="w-full max-w-md sm:max-w-lg md:max-w-3xl lg:max-w-4xl bg-white shadow-2xl rounded-xl p-6 sm:p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-3xl relative">

                {/* Floating Decor Elements */}
                <div className="absolute top-0 left-0 w-10 h-10 bg-blue-500 rounded-full shadow-lg animate-bounce sm:w-12 sm:h-12"></div>
                <div className="absolute bottom-0 right-0 w-10 h-10 bg-yellow-400 rounded-full shadow-lg animate-bounce sm:w-12 sm:h-12"></div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 mb-4 text-center">
                    🛍️ Checkout - Cash on Delivery
                </h2>
                <p className="text-gray-700 text-center mb-2">
                    Total Price: <strong className="text-blue-600">${totalPrice}</strong>
                </p>
                <p className="text-gray-700 text-center mb-6">
                    Items: <strong className="text-blue-600">{cartItems.length}</strong>
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-gray-700 font-medium">Full Name</label>
                        <input
                            {...register("name", { required: true })}
                            type="text"
                            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                        />
                        {errors.name && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                    </div>

                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-gray-700 font-medium">Email Address</label>
                        <input
                            type="email"
                            disabled
                            value={currentUser?.email}
                            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm bg-gray-200"
                        />
                    </div>

                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-gray-700 font-medium">Phone Number</label>
                        <input
                            {...register("phone", { required: true })}
                            type="number"
                            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                        />
                        {errors.phone && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">City</label>
                        <input
                            {...register("city", { required: true })}
                            type="text"
                            placeholder='City'
                            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">State/Province</label>
                        <input
                            {...register("state", { required: true })}
                            type="text"
                            placeholder='State'
                            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Country/Region</label>
                        <input
                            {...register("country", { required: true })}
                            type="text"
                            placeholder='Country'
                            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Zipcode</label>
                        <input
                            {...register("zipcode", { required: true })}
                            type="text"
                            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                        />
                    </div>

                    <div className="col-span-1 sm:col-span-2 flex items-center">
                        <input
                            onChange={(e) => setIsChecked(e.target.checked)}
                            type="checkbox"
                            className="mr-2 h-5 w-5 accent-blue-600"
                        />
                        <label className="text-gray-700 text-sm">
                            I agree to the{" "}
                            <Link className="text-blue-500 underline">Terms & Conditions</Link>{" "}and{" "}
                            <Link className="text-blue-500 underline">Shopping Policy</Link>
                        </label>
                    </div>

                    <div className="col-span-1 sm:col-span-2 text-center">
                        <button
                            disabled={!isChecked}
                            className={`px-6 py-3 text-lg text-white font-semibold rounded-lg transition-all duration-300 shadow-lg ${isChecked
                                ? "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transform hover:scale-105"
                                : "bg-gray-400 cursor-not-allowed"
                                }`}
                        >
                            🚀 Place Order
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default CheckoutPage;
