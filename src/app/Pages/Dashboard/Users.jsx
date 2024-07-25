"use client";
import Modal from "@/app/components/Modal/Modal";
import { DashboardContext } from "@/app/context/ApiContext";
import React, { useContext, useState } from "react";

const Users = () => {
  const {
    users,
    newUser,
    setNewUser,
    addUser,
    deleteUser,

    handleOpenModal,
    handleCloseModal,
    showModalAddProduct,
    showModalDeleteUser,
    setShowModalDeleteUser,
  } = useContext(DashboardContext);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleAddOrUpdateUser = () => {
    if (isEditingUser) {
      updateUser();
    } else {
      addUser();
    }
  };

  const updateUser = async () => {
    try {
      await fetch(`http://localhost:4000/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      }).then((res) => res.json());

      setIsEditingUser(false);
      setNewUser({ username: "", email: "", password: "" });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleEdit = (user) => {
    setIsEditingUser(true);
    setUserId(user.id);
    setNewUser(user);
  };

  const hanselShowDelete = () => {
    setShowModalDeleteUser(true)
    handleOpenModal()
  }
  

  return (
    <div>
      <h3>Users</h3>
      <input
        type="text"
        placeholder="Username"
        value={newUser.username}
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />
      <button onClick={handleAddOrUpdateUser}>
        {isEditingUser ? "Update User" : "Add User"}
      </button>

      <table className="responsive-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Gmail</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <>
              <tr key={user.id}>
                <td style={{ textAlign: "center" }}>{user.id}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => handleEdit(user)}
                    style={{ backgroundColor: "#444" }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => hanselShowDelete()}
                    style={{ backgroundColor: "#c82333" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>

              {!showModalAddProduct && showModalDeleteUser && (
                <Modal>
                  <div className="snackbar">
                    <p>Are you sure you want to delete User Account?</p>
                    <div className="snackbar-buttons">
                      <button
                        className="confirm-btn"
                        onClick={() => {
                          deleteUser(user.id);
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

export default Users;
