import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../../redux/features/books/booksApi';

const ManageBooks = () => {
    const navigate = useNavigate();
    const { data: books, refetch } = useFetchAllBooksQuery();
    const [deleteBook] = useDeleteBookMutation();

    // Handle deleting a book
    const handleDeleteBook = async (id) => {
        try {
            await deleteBook(id).unwrap();
            alert('Book deleted successfully!');
            refetch();
        } catch (error) {
            console.error('Failed to delete book:', error.message);
            alert('Failed to delete book. Please try again.');
        }
    };

    return (
        <section className="py-10 bg-gray-100 min-h-screen">
            <div className="w-full xl:w-10/12 px-6 mx-auto">
                <div className="bg-white shadow-xl rounded-xl overflow-hidden">
                    
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-5 px-6 flex justify-between items-center">
                        <h3 className="text-lg font-bold">📚 Manage Books</h3>
                        <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
                            ➕ Add New
                        </button>
                    </div>

                    {/* Table Container */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead className="bg-gray-200 text-gray-700 text-sm uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-3 border-b">#</th>
                                    <th className="px-6 py-3 border-b">Book Title</th>
                                    <th className="px-6 py-3 border-b">Category</th>
                                    <th className="px-6 py-3 border-b">Price</th>
                                    <th className="px-6 py-3 border-b text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {books && books.map((book, index) => (
                                    <tr key={book._id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 font-semibold">{index + 1}</td>
                                        <td className="px-6 py-4 text-gray-800">{book.title}</td>
                                        <td className="px-6 py-4">{book.category}</td>
                                        <td className="px-6 py-4 font-semibold text-green-600">${book.newPrice}</td>
                                        <td className="px-6 py-4 flex justify-center space-x-3">
                                            {/* Edit Button */}
                                            <Link 
                                                to={`/dashboard/edit-book/${book._id}`} 
                                                className="bg-blue-400 text-white px-4 py-2 rounded-lg text-sm shadow-md hover:shadow-xl transform hover:scale-105 transition-all"
                                            >
                                                 Edit
                                            </Link>

                                            {/* Delete Button */}
                                            <button
                                                onClick={() => handleDeleteBook(book._id)}
                                                className="bg-red-400 text-white px-4 py-2 rounded-lg text-sm shadow-md hover:shadow-xl transform hover:scale-105 transition-all"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ManageBooks;
