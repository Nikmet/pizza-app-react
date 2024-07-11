import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, defer, RouterProvider } from "react-router-dom";
import { Cart } from "./pages/Cart/Cart.tsx";
import { Error } from "./pages/Error/Error.tsx";
import { Layout } from "./layout/Layout/Layout.tsx";
import { Product } from "./pages/Product/Product.tsx";
import axios from "axios";
import { PREFIX } from "./helpers/api.ts";
import { AuthLayout } from "./layout/Auth/Auth.layout.tsx";
import { Login } from "./pages/Login/Login.tsx";
import { Register } from "./pages/Register/Register.tsx";
import { RequireAuth } from "./helpers/RequireAuth/RequireAuth.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { Success } from "./pages/Succes/Succes.tsx";

const Menu = lazy(() => import("./pages/Menu/Menu"));

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: (
                <RequireAuth>
                    <Layout />
                </RequireAuth>
            ),
            children: [
                {
                    path: "/",
                    element: (
                        <Suspense fallback={<>Загрузка...</>}>
                            <Menu />
                        </Suspense>
                    )
                },
                {
                    path: "/cart",
                    element: <Cart />
                },
                {
                    path: "/product/:id",
                    element: <Product />,
                    errorElement: <Error></Error>,
                    loader: async ({ params }) => {
                        return defer({
                            data: axios
                                .get(`${PREFIX}/products/${params.id}`)
                                .then((data) => data)
                                .catch((e) => e.message)
                        });
                    }
                },
                {
                    path: "/success",
                    element: <Success />
                }
            ]
        },
        {
            path: "/auth",
            element: <AuthLayout></AuthLayout>,
            children: [
                {
                    path: "login",
                    element: <Login />
                },
                {
                    path: "register",
                    element: <Register />
                }
            ]
        },
        {
            path: "*",
            element: <Error />
        }
    ],
    { basename: "/pizza-app-react/" }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
