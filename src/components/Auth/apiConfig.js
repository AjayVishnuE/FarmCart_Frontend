const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const API_ENDPOINTS = {
  media: `${API_BASE_URL}`,
  users: `${API_BASE_URL}/api/user`,
  product: `${API_BASE_URL}/api/product`,
  cart: `${API_BASE_URL}/api/cart`,
  wishlist: `${API_BASE_URL}/api/wishlist`,
  order: `${API_BASE_URL}/api/order`,
  chat: `${API_BASE_URL}/api/chat`,
  productdetails: `${API_BASE_URL}/api/product/product-details/`,
  address: `${API_BASE_URL}/api/address/`,
  order: `${API_BASE_URL}/api/order/`,
  orderdetails: `${API_BASE_URL}/api/orderdetails/`,
  profile: `${API_BASE_URL}/api/profile/`,
  wishlsit: `${API_BASE_URL}/api/wishlist/`,
  farmdash: `${API_BASE_URL}/api/farmerdashboard/`,
  farmerdetails: `${API_BASE_URL}/api/farmerdetails/`,
  search: `${API_BASE_URL}/api/search/`,
  reviews: `${API_BASE_URL}/api/review/`,
  

};