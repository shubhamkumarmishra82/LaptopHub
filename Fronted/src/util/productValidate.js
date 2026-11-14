
const productValidate = (product) => {
  const errors = {};

  // Product Name
  if (!product.name.trim()) {
    errors.name = "Product name is required";
  } else if (product.name.trim().length < 3) {
    errors.name = "Minimum 3 characters required";
  }

  // Brand
  if (!product.brand) {
    errors.brand = "Please select brand";
  }

  // Category
  if (!product.category) {
    errors.category = "Please select category";
  }

  // Model Number
  if (!product.modelNumber.trim()) {
    errors.modelNumber = "Model number is required";
  }

  // Processor
  if (!product.processor.trim()) {
    errors.processor = "Processor is required";
  }

  // RAM
  if (!product.ram) {
    errors.ram = "Please select RAM";
  }

  // Storage
  if (!product.storage) {
    errors.storage = "Please select storage";
  }

  // Graphics
  if (!product.graphics.trim()) {
    errors.graphics = "Graphics details are required";
  }

  // Display
  if (!product.display.trim()) {
    errors.display = "Display details are required";
  }

  // Operating System
  if (!product.operatingSystem) {
    errors.operatingSystem = "Please select operating system";
  }

  // Price
  if (!product.price || Number(product.price) <= 0) {
    errors.price = "Price must be greater than 0";
  }

  // Discount
  if (
    product.discount === "" ||
    Number(product.discount) < 0 ||
    Number(product.discount) > 100
  ) {
    errors.discount = "Discount must be between 0 and 100";
  }

  // Stock
  if (
    product.stock === "" ||
    !Number.isInteger(Number(product.stock)) ||
    Number(product.stock) < 0
  ) {
    errors.stock = "Enter valid stock quantity";
  }

  // Warranty
  if (!product.warranty) {
    errors.warranty = "Please select warranty";
  }

  // Description
  if (product.description.trim().length < 20) {
    errors.description = "Minimum 20 characters required";
  }

  // Image
  if (!product.image) {
    errors.image = "Product image is required";
  } else if (
    !["image/jpeg", "image/png", "image/webp"].includes(
      product.image.type
    )
  ) {
    errors.image = "Only JPG, PNG and WEBP allowed";
  } else if (product.image.size > 2 * 1024 * 1024) {
    errors.image = "Image must be less than 2 MB";
  }

  return errors;
};

export default productValidate;
