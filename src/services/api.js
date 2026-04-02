import axios from "axios";

export const fetchProducts = async (limit , page) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const res = await axios.get(`${apiUrl}?limit=${limit}&skip=${(page - 1) * limit}`);

  return {
   data:  res.data.products.map((item) => ({
    id: item.id,
    name: item.title,
    category: item.category,
    price: item.price,
    image: item.thumbnail,
  })),
  total: res.data.total
}
};