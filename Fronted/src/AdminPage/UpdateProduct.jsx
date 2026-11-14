import { useNavigate, useParams } from "react-router-dom";
import "./CreateProductPage.css";
import { addProduct, getProductById } from "../api/productApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const UpdateProduct = () => {
  const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch()

 const products = useSelector((state)=>state.product.product)
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    modelNumber: "",
    processor: "",
    ram: "",
    storage: "",
    graphics: "",
    display: "",
    operatingSystem: "",
    price: "",
    discount: "",
    stock: "",
    warranty: "",
    description: "",
    image: null,
  });
 

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setProduct((previous) => ({
      ...previous,
      [name]: files ? files[0] : value,
    }));
  };
 useEffect(() => {
    dispatch(getProductById(id))
        .then((data) => {
            setProduct({
                ...data,
                image: null
            });
        })
        .catch((err) => {
            console.log(err.message);
        });
}, [id, dispatch]);

  const handleSubmit = async (e) => {
  
    e.preventDefault();
    try{
         const formData = new FormData();

        Object.keys(product).forEach((key) => {
            formData.append(key, product[key]);
        });
       const data = await addProduct(formData);
       alert(data)
       navigate("/admin/dashboard/products")
        
    }
     catch(err){
        alert(err)
      }
  };

  return (
    <div className="create-product-page">
      <div className="create-product-heading">
        <div>
          <h2>Update Product</h2>
        
        </div>

        <button
          type="button"
          className="back-product-btn"
          onClick={() => navigate("/admin/dashboard/products")}
        >
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="product-form-card">
          <h4>Basic Information</h4>

          <div className="product-form-grid">
            <div>
              <label>Product Name *</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter product name"
                value={product.name}
                onChange={handleChange}
                
              />

            </div>

            <div>
              <label>Brand *</label>
              <select
                name="brand"
                className="form-select"
                value={product.brand}
                onChange={handleChange}
                
              >
                <option value="">Select Brand</option>
                <option value="HP">HP</option>
                <option value="Dell">Dell</option>
                <option value="Lenovo">Lenovo</option>
                <option value="ASUS">ASUS</option>
                <option value="Acer">Acer</option>
                <option value="Apple">Apple</option>
              </select>
  
            </div>

            <div>
              <label>Category *</label>
              <select
                name="category"
                className="form-select"
                value={product.category}
                onChange={handleChange}
               
              >
                <option value="">Select Category</option>
                <option value="Gaming">Gaming Laptop</option>
                <option value="Business">Business Laptop</option>
                <option value="Student">Student Laptop</option>
                <option value="Creator">Creator Laptop</option>
              </select>
      
            </div>

            <div>
              <label>Model Number</label>
              <input
                type="text"
                name="modelNumber"
                className="form-control"
                placeholder="Enter model number"
                value={product.modelNumber}
                onChange={handleChange}
              />
      
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="product-form-card">
          <h4>Laptop Specifications</h4>

          <div className="product-form-grid">
            <div>
              <label>Processor *</label>
              <input
                type="text"
                name="processor"
                className="form-control"
                placeholder="Intel Core i5 13th Gen"
                value={product.processor}
                onChange={handleChange}
               
              />
             
            </div>

            <div>
              <label>RAM *</label>
              <select
                name="ram"
                className="form-select"
                value={product.ram}
                onChange={handleChange}
                
              >
                <option value="">Select RAM</option>
                <option value="8GB">8GB</option>
                <option value="16GB">16GB</option>
                <option value="32GB">32GB</option>
                <option value="64GB">64GB</option>
              </select>
      
            </div>

            <div>
              <label>Storage *</label>
              <select
                name="storage"
                className="form-select"
                value={product.storage}
                onChange={handleChange}
               
              >
                <option value="">Select Storage</option>
                <option value="256GB SSD">256GB SSD</option>
                <option value="512GB SSD">512GB SSD</option>
                <option value="1TB SSD">1TB SSD</option>
                <option value="2TB SSD">2TB SSD</option>
              </select>
            </div>

            <div>
              <label>Graphics</label>
              <input
                type="text"
                name="graphics"
                className="form-control"
                placeholder="NVIDIA RTX 4050"
                value={product.graphics}
                onChange={handleChange}
              />
     
            </div>

            <div>
              <label>Display</label>
              <input
                type="text"
                name="display"
                className="form-control"
                placeholder="15.6 inch FHD"
                value={product.display}
                onChange={handleChange}
              />
          
            </div>

            <div>
              <label>Operating System</label>
              <select
                name="operatingSystem"
                className="form-select"
                value={product.operatingSystem}
                onChange={handleChange}
              >
                <option value="">Select OS</option>
                <option value="Windows 11">Windows 11</option>
                <option value="Windows 11 Home">Windows 11 Home</option>
                <option value="macOS">macOS</option>
                <option value="Linux">Linux</option>
                <option value="DOS">DOS</option>
              </select>
              
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="product-form-card">
          <h4>Pricing & Inventory</h4>

          <div className="product-form-grid">
            <div>
              <label>Price (₹) *</label>
              <input
                type="number"
                name="price"
                className="form-control"
                placeholder="Enter price"
                value={product.price}
                onChange={handleChange}
              
              />
       
            </div>

            <div>
              <label>Discount (%)</label>
              <input
                type="number"
                name="discount"
                className="form-control"
                placeholder="Enter discount"
                min="0"
                max="100"
                value={product.discount}
                onChange={handleChange}
              />
            
            </div>

            <div>
              <label>Stock Quantity *</label>
              <input
                type="number"
                name="stock"
                className="form-control"
                placeholder="Enter stock"
                value={product.stock}
                onChange={handleChange}
                
              />
           
            </div>

            <div>
              <label>Warranty</label>
              <select
                name="warranty"
                className="form-select"
                value={product.warranty}
                onChange={handleChange}
              >
                <option value="">Select Warranty</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
              </select>
             
            </div>
          </div>
        </div>

        {/* Description and Image */}
        <div className="product-form-card">
          <h4>Product Details</h4>

          <div className="mb-3">
            <label>Product Description *</label>
            <textarea
              name="description"
              className="form-control"
              rows="5"
              placeholder="Enter product description..."
              value={product.description}
              onChange={handleChange}
              
            />
           
          </div>

          <div>
            <label>Product Image *</label>
            <input
              type="file"
              name="image"
              className="form-control"
              accept="image/*"
              onChange={handleChange}
        
            />
          
          </div>

          {product.image && (
            <p className="selected-image-name">
              Selected: {product.image.name}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="product-form-actions">
          <button
            type="button"
            className="cancel-product-btn"
            onClick={() => navigate("/admin/dashboard/products")}
          >
            Cancel
          </button>

          <button type="submit" className="save-product-btn">
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
