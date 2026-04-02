import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export default function ProductDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        const item = res.data;
        setData({
          id: item.id,
          name: item.title,
          category: item.category,
          price: item.price,
          image: item.thumbnail,
        });
      });
  }, [id]);

  if (!data) return <CircularProgress />;

  return (
    <div style={{ padding: "20px" }}>
      <img src={data.image} width={200} alt="" />
      <h2>{data.name}</h2>
      <p>{data.category}</p>
      <h3>₹{data.price}</h3>
    </div>
  );
}