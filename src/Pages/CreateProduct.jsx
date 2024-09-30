import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    productImage: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://ecomm-backend-dc9u.onrender.com/api/products/create",
        formData
      );
      navigate("/"); //redirect to home page
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    // console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      <h3>Create New Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            name="productName"
            className="form-control"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Price</label>
          <input
            type="number"
            name="productPrice"
            className="form-control"
            value={formData.productPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Image</label>
          <input
            type="text"
            name="productImage"
            className="form-control"
            value={formData.productImage}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
