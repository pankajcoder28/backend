import { createBrowserRouter } from "react-router";
import App from "./App.jsx"
import './App.css'
import Register from "../features/auth/pages/Register.jsx";
import Login from "../features/auth/pages/Login.jsx";
import CreateProduct from "../features/products/pages/CreateProduct.jsx";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <h1>dashboard</h1>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/seller/create-product",
        element: <CreateProduct/>
    }
])