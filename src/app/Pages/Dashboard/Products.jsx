"use client";
import Modal from "@/app/components/Modal/Modal";
import { DashboardContext } from "@/app/context/ApiContext";
import React, { useContext, useState } from "react";

const Products = () => {
  const {
    products,
    newProduct,
    setNewProduct,
    addProduct,
    deleteProduct,

    handleOpenModal,
    handleCloseModal,
    showModalAddProduct,
    showModalDeleteUser,
  } = useContext(DashboardContext);
  const [isEditing, setIsEditing] = useState(false);
  const [productId, setProductId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddOrUpdateProduct = () => {
    if (isEditing) {
      updateProduct();
    } else {
      addProduct();
    }
  };

  const updateProduct = async () => {
    try {
      await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      }).then((res) => res.json());

      setIsEditing(false);
      setNewProduct({ title: "", price: "", description: "", image: "" });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setProductId(product.id);
    setNewProduct(product);
  };

  return (
    <div>
      <h3>Products</h3>
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={newProduct.title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Price"
        name="price"
        value={newProduct.price}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Description"
        name="description"
        value={newProduct.description}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Image URL"
        name="image"
        value={newProduct.image}
        onChange={handleInputChange}
      />

      <button onClick={handleAddOrUpdateProduct}>
        {isEditing ? "Update Product" : "Add Product"}
      </button>

      <table className="responsive-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <>
              <tr key={product.id}>
                <td style={{ textAlign: "center" }}>{product.id}</td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                </td>
                <td>
                  <button
                    onClick={() => handleOpenModal()}
                    style={{ backgroundColor: "#c82333" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
              {!showModalAddProduct && !showModalDeleteUser && (
                <Modal>
                  <div className="snackbar">
                    <p>Are you sure you want to delete Product?</p>
                    <div className="snackbar-buttons">
                      <button
                        className="confirm-btn"
                        onClick={() => {
                          deleteProduct(product.id);
                          handleCloseModal()
                        }}
                      >
                        Yes
                      </button>
                      <button
                        className="cancel-btn"
                        onClick={() => handleCloseModal()}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </Modal>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
