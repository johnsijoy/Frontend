import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    productImage: "",
  });

  //to get the product
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://ecomm-backend-dc9u.onrender.com/api/products/get"
      );
      setProducts(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  //to edit the products

  //to get the values and display in input box
  const handleEdit = (product) => {
    setEditProduct(product);
    setFormData({
      productName: product.productName,
      productPrice: product.productPrice,
      productImage: product.productImage,
    });
  };

  const handleChange = (e) => {
    // console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://ecomm-backend-dc9u.onrender.com/api/products/edit/${editProduct._id}`,
        formData
      );
      setEditProduct(null); //clear after edited
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  //to delete the product
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://ecomm-backend-dc9u.onrender.com/api/products/delete/${id}`
      );
      fetchData(); // to refresh the product list after deleting
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row g-4">
        {products.map((ele) => (
          <div className="col-md-4 col-sm-6" key={ele._id}>
            <div className="card">
              <div className="card-header text-center">
                <h2>{ele.productName}</h2>
              </div>
              <img
                src={ele.productImage}
                className="card-img-top"
                alt={ele.productName}
              />
              <div className="card-body text-center">
                <h5 className="card-title">${ele.productPrice}</h5>
              </div>
              <div className="card-footer text-center">
                <button
                  type="button"
                  className="btn btn-warning mx-1"
                  onClick={() => handleEdit(ele)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger mx-1"
                  onClick={() => handleDelete(ele._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editProduct && (
        <div className="mt-4">
          <h3>Edit Product</h3>
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
            <button type="submit" className="btn btn-success ">
              Update Product
            </button>
            <button
              type="button"
              className="btn btn-danger ms-2 "
              onClick={() => setEditProduct(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
