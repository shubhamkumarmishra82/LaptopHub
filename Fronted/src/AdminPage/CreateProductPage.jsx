
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateProductPage.css";
import productValidate from "../util/productValidate";
import { addProduct } from "../api/productApi";

const CreateProductPage = () => {
  const navigate = useNavigate();

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
  const [error , setError] = useState({})

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setProduct((previous) => ({
      ...previous,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateError = productValidate(product)
      setError(validateError)
      if(Object.keys(validateError).length  !== 0) return;
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
          <h2>Add New Product</h2>
          <p>Add a new laptop to your store</p>
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
              {error.name && <p className="text-danger">{error.name}</p>}
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
              {error.brand && <p className="text-danger">{error.brand}</p>}
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
              {error.category && <p className="text-danger">{error.category}</p>}
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
              {error.modelNumber && <p className="text-danger">{error.modelNumber}</p>}
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
              {error.processor && <p className="text-danger">{error.processor}</p>}
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
              {error.ram && <p className="text-danger">{error.ram}</p>}
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
              {error.storage && <p className="text-danger">{error.storage}</p>}
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
              {error.graphics && <p className="text-danger">{error.graphics}</p>}
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
              {error.display && <p className="text-danger">{error.display}</p>}
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
              {error.operatingSystem && <p className="text-danger">{error.operatingSystem}</p>}
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
              {error.price && <p className="text-danger">{error.price}</p>}
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
              {error.discount && <p className="text-danger">{error.discount}</p>}
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
              {error.stock && <p className="text-danger">{error.stock}</p>}
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
              {error.warranty && <p className="text-danger">{error.warranty}</p>}
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
            {error.description && <p className="text-danger">{error.description}</p>}
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
            {error.image && <p className="text-danger">{error.image}</p>}
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
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductPage;
