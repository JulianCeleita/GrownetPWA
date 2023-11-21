export const registerApiUrl = "http://localhost:5000/register";

// AUTHENTICATION
export const otpApiUrl =
  "https://api.grownetapp.com/grownet/public/api/authenticate/login";
export const validationApiUrl =
  "https://api.grownetapp.com/grownet/public/api/authenticate/validateTelephone";
export const onlyCountries =
  "https://api.grownetapp.com/grownet/public/api/countries/all";

// RESTAURANTS
export const availableRestaurants =
  "https://api.grownetapp.com/grownet/public/api/customers/chef";
export const availableSuppliers =
  "https://api.grownetapp.com/grownet/public/api/suppliers/customer";

// CATEGORIES
export const allCategories =
  "https://api.grownetapp.com/grownet/public/api/categories/supplier/";
export const selectedCategory =
  "https://api.grownetapp.com/grownet/public/api/categoriesProducts/products/{id}";
export const supplierCategorie =
  "https://api.grownetapp.com/grownet/public/api/products/supplierCategorie";

// PRODUCTS
export const supplierProducts =
  "https://api.grownetapp.com/grownet/public/api/products/supplier";

// ORDERS RECORD
export const createStorageOrder =
  "https://api.grownetapp.com/grownet/public/api/orders/create";
export const allStorageOrders =
  "https://api.grownetapp.com/grownet/public/api/orders/chef/";
export const selectedStorageOrder =
  "https://api.grownetapp.com/grownet/public/api/orders";

//FAVORITES
export const addFavorite =
  "https://api.grownetapp.com/grownet/public/api/products/favorite";
export const favoritesBySupplier =
  "https://api.grownetapp.com/grownet/public/api/products/favoritesBySupplier";
  
// DISPUTES
export const createDisputeOrder =
  "https://api.grownetapp.com/grownet/public/api/disputeOrder/create";
export const closeSelectedOrder =
  "https://api.grownetapp.com/grownet/public/api/orders/state";
