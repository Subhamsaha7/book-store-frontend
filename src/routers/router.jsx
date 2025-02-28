import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AdminLogin from "../components/AdminLogin";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";
import OrderPage from "../pages/books/OrderPage";
import SingleBook from "../pages/books/SingleBook";
import AddBook from "../pages/dashboard/addBook/AddBook";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import UpdateBook from "../pages/dashboard/editBook/UpdateBook";
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks";
import Home from "../pages/home/Home";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/orders",
                element: <PrivateRoute><OrderPage /></PrivateRoute>,
            },
            {
                path: "/about",
                element: <h1>About</h1>,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/cart",
                element: <CartPage />,
            },
            {
                path: "/checkout",
                element: <PrivateRoute><CheckoutPage /></PrivateRoute>,
            },
            {
                path: "/books/:id",
                element: <SingleBook />,
            },

            {
                path: "/user-dashboard",
        element: <DashboardLayout />,
              }

        ]
    },

    {
        path: "/admin",
        element: <AdminLogin />
    },

    {
        path: "/dashboard",
        element: <AdminRoute><DashboardLayout /></AdminRoute>,
        children: [
            {
                path: "",
                element: <AdminRoute><Dashboard /></AdminRoute>,
            },
            {
                path: "add-new-book",
                element: <AdminRoute>
                    <AddBook />
                </AdminRoute>,
            },
            {
                path: "edit-book/:id",
                element: <AdminRoute>
                    <UpdateBook />
                </AdminRoute>,
            },
            {
                path: "manage-books",
                element: <AdminRoute><ManageBooks /></AdminRoute>,
            },

        ]
    }
]);
export default router;