import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../api/cartApi";
import { increaseCartCount } from "../store/cartSlice";

const ProductCard = ({ product }) => {
  const {role} = useSelector(state=>state.auth)
  const navigate = useNavigate()
    const dispatch = useDispatch();
    const handleAddToCart = async (productId) => {
        try {
            const response = await addToCart(productId);
            // Increase Navbar count after successful API call
            dispatch(increaseCartCount());
            alert("Product added to cart successfully");
        } catch (error) {
           alert(error.message);
        }   
    }
  
    return (
        <div className="product-card h-100">

            <span className="discount-badge">
                -{product.discount}%
            </span>

            <button className="wishlist-btn">♡</button>

            <div className="product-image">
                <img
                    src={`http://localhost:9090${product.imageUrl}`}
                    alt={product.name}
                />
            </div>

            <div className="product-details">

                <span className="product-brand">
                    {product.brand}
                </span>

                <h3 className="product-name">
                    {product.name}
                </h3>

                <p className="product-specs">
                    {product.processor} | {product.ram} | {product.storage}
                </p>

                <div className="product-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating-number">{product.rating}</span>
                    <span className="review-count">
                        ({product.reviews})
                    </span>
                </div>

                <div className="product-price">

                    <span className="current-price">
                        ₹{product.price.toLocaleString("en-IN")}
                    </span>

                    <strike className="old-price text-danger">
                        ₹{product.oldprice.toLocaleString("en-IN")}
                    </strike>

                </div>

                <div className="product-actions">
                    <button className="btn btn-outline-primary flex-grow-1" onClick={()=>{
                       if(role ==="USER"){
                         handleAddToCart(product.id)

                       }
                       else{
                        navigate("/login")
                       }
                    }}>
                        🛒 Add to Cart
                    </button>

                    <button className="btn btn-primary flex-grow-1" onClick={()=>navigate(`/productdetails/${product.id}`)}>
                        Details
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ProductCard;