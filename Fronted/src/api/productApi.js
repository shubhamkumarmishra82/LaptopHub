import { setProducts , setProduct } from "../store/ProductSlice";

const BASE_URL = "http://localhost:9090";


// 1. Add Product
export const addProduct = async (formData) => {

    const response = await fetch(`${BASE_URL}/api/admin/products/add`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: formData
    });

    const data = await response.text();

    if (!response.ok) {
        throw new Error(data || "Product add failed");
    }

    return data;
};


// 2. Get All Products
export const getAllProducts = () => async (dispatch) => {

    const response = await fetch(`${BASE_URL}/api/products/all`);

    if (!response.ok) {
        throw new Error("Products not found");
    }

    const data = await response.json();

    dispatch(setProducts(data));

    return data;
};


// 3. Get Product By ID
export const getProductById = (id) => async (dispatch) => {

    const response = await fetch(`${BASE_URL}/api/products/${id}`);

    if (!response.ok) {
        throw new Error("Product not found");
    }

    const data = await response.json();

    dispatch(setProduct(data));

    return data;
};


// 4. Update Product
export const updateProduct = async (id, formData) => {

    const response = await fetch(
        `${BASE_URL}/api/admin/products/update/${id}`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: formData
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Product update failed");
    }

    return data;
};


// 5. Delete Product
export const deleteProduct = async (id) => {

    const response = await fetch(
        `${BASE_URL}/api/admin/products/delete/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    );

    if (!response.ok) {
        throw new Error("Product delete failed");
    }

    return true;
};
export const getProductsByBrand = async (brand) => {

  const response = await fetch(
    `http://localhost:9090/api/products/brand/${brand}`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch products");
  }

  return await response.json();
};

export const searchProducts = async (keyword) => {

    const response = await fetch(
        `${BASE_URL}/api/products/search?keyword=${keyword}`
    );

    if (!response.ok) {
        throw new Error("Product search failed");
    }

    return await response.json();
};