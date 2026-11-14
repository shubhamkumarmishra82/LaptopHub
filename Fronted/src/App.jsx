import { Route, Routes, useLocation } from "react-router-dom";

import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Products from "./Components/Products";
import AboutUs from "./Components/AboutUs";

import UserRegisterPage from "./UserLogin/UserRegisterPage";
import UserLogin from "./UserLogin/UserLogin";
import AdminRegisterPage from "./UserLogin/AdminRegisterPage";
import AdminDashboard from "./Admin/AdminDashboard";
import DashboardHome from "./Admin/DashboardHome";
import Product from "./AdminPage/Product";
import CreateProductPage from "./AdminPage/CreateProductPage";
import UpdateProduct from "./AdminPage/UpdateProduct";
import ProductDetails from "./Pages/ProductDetails";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import MyOrders from "./Pages/MyOders";
import Order from "./AdminPage/Order";
import OrderUpdate from "./AdminPage/OrderUpdate";
import Users from "./AdminPage/Users";
import MyReviews from "./Pages/MyReviews";
import Reviews from "./AdminPage/Reviews";
import MyProfile from "./Pages/MyProfile";
import UpdateProfile from "./Pages/UpdateProfile";

function App() {

    const location = useLocation();

    // Admin pages
    const isAdminPage = location.pathname.startsWith("/admin");

    // Login and Register pages
    const isAuthPage =
        location.pathname === "/login" ||
        location.pathname === "/register";

    // Navbar and Footer hide condition
    const hideLayout = isAdminPage || isAuthPage;

    return (
        <>
            {!hideLayout && <Navbar />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/laptops" element={<Products />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/login" element={<UserLogin />} />
                <Route path="/register" element={<UserRegisterPage />} />
                <Route path="/productdetails/:id" element={<ProductDetails/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/my-orders" element={<MyOrders/>}/>
                <Route path="/myreview" element={<MyReviews/>}/>
                <Route path="/profile" element={<MyProfile/>}/>
                <Route path="/update-profile" element={<UpdateProfile/>}/>

                <Route path="/admin/register" element={<AdminRegisterPage />} />
                 <Route path="/admin/login"element={<UserLogin />}/>


                 <Route path="/admin/dashboard" element={<AdminDashboard />}>
                 <Route index element={<DashboardHome />} />
                 <Route path="products" element={<Product />} />
                <Route path="products/add" element={<CreateProductPage />} />
               <Route path="products/update/:id"element={<UpdateProduct />} />
                <Route path="orders" element={<Order />} />
               <Route path="order-update/:id" element={<OrderUpdate />} />
                 <Route path="users" element={<Users />} />
                 <Route path="reviews" element={<Reviews />} />
</Route>
            </Routes>

            {!hideLayout && <Footer />}
        </>
    );
}

export default App;