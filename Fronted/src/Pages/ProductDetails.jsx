import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../api/productApi";
import "./ProductDetails.css";
import { addToCart } from "../api/cartApi";
import { increaseCartCount } from "../store/cartSlice";

const ProductDetails = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { products } = useSelector(state => state.product);
    const {role} = useSelector(state=>state.auth)

    useEffect(() => {
        if (!products || products.length === 0) {
            dispatch(getProductById(id));
        }
    }, [dispatch, products]);

    const product = products?.find(
        item => item.id === Number(id)
    );

    if (!product) {
        return (
            <div className="container text-center py-5">
                <h3>Loading Product...</h3>
            </div>
        );
    }

    const oldPrice = product.discount
        ? product.price / (1 - product.discount / 100)
        : product.price;

 const handleBuyNow = () => {
  navigate("/checkout", {
    state: {
      type: "buyNow",
      product: product
    }
  });
};
 const handleAddToCart = async (productId) => {
        try {
            const response = await addToCart(productId);
            // Increase Navbar count after successful API call
            dispatch(increaseCartCount());
            alert("Product added to cart successfully");
            navigate("/cart")
        } catch (error) {
           alert(error.message);
        }   
    }
    return (
        <div className="container product-details-page py-5">

            <button
                className="btn btn-outline-secondary mb-4"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>

            <div className="row g-5">

                {/* Product Image */}
                <div className="col-lg-6">

                    <div className="details-image-box">
                        <img
                            src={`http://localhost:9090${product.imageUrl}`}
                            alt={product.name}
                            className="details-image"
                        />
                    </div>

                </div>

                {/* Product Information */}
                <div className="col-lg-6">

                    <span className="details-brand">
                        {product.brand}
                    </span>

                    <h2 className="details-title">
                        {product.name}
                    </h2>

                    <p className="text-muted">
                        Model: {product.modelNumber}
                    </p>

                    <div className="details-rating">
                        ⭐⭐⭐⭐⭐
                        <span> 4.5 (120 Reviews)</span>
                    </div>

                    <hr />

                    {/* Price */}
                    <div className="details-pricing">

                        <h2>
                            ₹{Number(product.price).toLocaleString("en-IN")}
                        </h2>

                        {product.discount > 0 && (
                            <>
                                <del>
                                    ₹{Math.round(oldPrice).toLocaleString("en-IN")}
                                </del>

                                <span className="details-discount">
                                    {product.discount}% OFF
                                </span>
                            </>
                        )}

                    </div>

                    <p className="details-description">
                        {product.description}
                    </p>

                    <div className="details-stock">
                        {product.stock > 0
                            ? `In Stock (${product.stock} available)`
                            : "Out of Stock"}
                    </div>

                    {/* Buttons */}
                    <div className="details-buttons">

                        <button
                            className="btn btn-outline-primary"
                            disabled={product.stock <= 0}
                            onClick={()=>{
                                if(role==="USER"){
                                     handleAddToCart(product.id)
                                }
                                else{
                                    navigate("/login")
                                }
                            }}
                        >
                            🛒 Add to Cart
                        </button>

                        <button
                            className="btn btn-primary"
                            disabled={product.stock <= 0}
                            onClick={()=>{
                                if(role=="USER"){
                                    handleBuyNow()
                                }
                                else{
                                    navigate("/login")
                                }
                            } }
                        >
                            Buy Now
                        </button>

                    </div>

                </div>

            </div>

            {/* Specifications */}
            <div className="specification-section mt-5">

                <h3 className="fw-bold mb-4">
                    Technical Specifications
                </h3>

                <div className="table-responsive">

                    <table className="table table-bordered">

                        <tbody>

                            <tr>
                                <th>Brand</th>
                                <td>{product.brand}</td>
                            </tr>

                            <tr>
                                <th>Model Number</th>
                                <td>{product.modelNumber}</td>
                            </tr>

                            <tr>
                                <th>Category</th>
                                <td>{product.category}</td>
                            </tr>

                            <tr>
                                <th>Processor</th>
                                <td>{product.processor}</td>
                            </tr>

                            <tr>
                                <th>RAM</th>
                                <td>{product.ram}</td>
                            </tr>

                            <tr>
                                <th>Storage</th>
                                <td>{product.storage}</td>
                            </tr>

                            <tr>
                                <th>Display</th>
                                <td>{product.display}</td>
                            </tr>

                            <tr>
                                <th>Graphics</th>
                                <td>{product.graphics}</td>
                            </tr>

                            <tr>
                                <th>Operating System</th>
                                <td>{product.operatingSystem}</td>
                            </tr>

                            <tr>
                                <th>Warranty</th>
                                <td>{product.warranty}</td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};

export default ProductDetails;