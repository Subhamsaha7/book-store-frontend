import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';

const OrderPage = () => {
    const { currentUser } = useAuth();

    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);

    if (isLoading) return <div className="text-center text-lg font-semibold">Loading...</div>;
    if (isError) return <div className="text-center text-red-500">Error fetching order data</div>;

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                Your Orders
            </h2>

            {orders.length === 0 ? (
                <div className="text-center text-gray-600 text-lg">No orders found!</div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map((order, index) => (
                        <div
                            key={order._id}
                            className="relative bg-white p-10 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                        >
                            <p className="absolute top-3 left-3 bg-[#0D0842] text-white px-3 py-1 rounded-md shadow-md ">
                                # {index + 1}
                            </p>
                            <h2 className="font-bold text-lg mb-2 text-gray-900">
                                Order ID: {order._id}
                            </h2>
                            <p className="text-gray-700"><strong>Name:</strong> {order.name}</p>
                            <p className="text-gray-700"><strong>Email:</strong> {order.email}</p>
                            <p className="text-gray-700"><strong>Phone:</strong> {order.phone}</p>
                            <p className="text-gray-700 font-semibold text-lg mt-2">
                                Total Price: <span className="text-green-600">${order.totalPrice}</span>
                            </p>

                            <div className="mt-4">
                                <h3 className="font-semibold text-gray-800">Address:</h3>
                                <p className="text-gray-600">{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                            </div>

                            <div className="mt-4">
                                <h3 className="font-semibold text-gray-800">Products:</h3>
                                <ul className="list-disc list-inside text-gray-600">
                                    {order.productIds.map((productId) => (
                                        <li key={productId} className="text-gray-700">{productId}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderPage;
