
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../api/productApi";

const Products = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    const { products: productData } = useSelector(state => state.product);

    const [products, setProducts] = useState([]);

    useEffect(() => {

        // Filter se aaye hain to all products fetch nahi karenge
        if (location.state?.filtered) {
            return;
        }

        // Normal Products page open hone par all products
        dispatch(getAllProducts());

    }, [dispatch, location.key, location.state]);

    useEffect(() => {

        if (productData && productData.length > 0) {

            const updatedProducts = productData.map(product => ({
                ...product,
                rating: 4.5,
                reviews: 120,
                oldprice: product.price +
                    ((product.price * product.discount) / 100)
            }));

            setProducts(updatedProducts);

        } else {
            setProducts([]);
        }

    }, [productData]);

    return (
        <section className="container py-5">

            <div className="text-center mb-4">
                <h2 className="fw-bold">Featured Laptops</h2>
                <p className="text-muted">
                    Explore our latest and best-selling laptops
                </p>
            </div>

            <div className="row g-4">

                {products.map(product => (
                    <div className="col-12 col-sm-6 col-lg-3" key={product.id}>
                        <ProductCard product={product} />
                    </div>
                ))}

            </div>

        </section>
    );
};

export default Products;
