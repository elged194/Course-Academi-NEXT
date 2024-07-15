import React, { createContext, useEffect, useState, useMemo } from "react";
import useFetchData from "../hooks/useFetchData";

const DashboardContext = createContext();

const Provider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // ---------------------- / Get User / ----------------------
  const {
    data: usersData,
    loading: usersLoading,
    errMsg: usersErrMsg,
  } = useFetchData("/api/users");

  // ---------------------- / Get products / ----------------------
  const {
    data: productsData,
    loading: productsLoading,
    errMsg: productsErrMsg,
  } = useFetchData("/api/products");

  useEffect(() => {
    if (productsData) setProducts(productsData);
  }, [productsData]);

  // ----------------------------/ Add New Product /----------------------------
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });

  const addProduct = async () => {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    const data = await response.json();
    setProducts([...products, data]);
    setNewProduct({ title: "", price: "", description: "", image: "" });
  };

  // ----------------------------/ Add New User /----------------------------
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const addUser = async () => {
    const usersResponse = await fetch("/api/users");
    const usersData = await usersResponse.json();

    // تحقق مما إذا كان البريد الإلكتروني موجودًا
    const emailExists = usersData.some((user) => user.email === newUser.email);

    // Email Exists
    if (emailExists) {
      alert("The email already exists go and log in");
    } else {
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      setNewUser({ username: "", email: "", password: "" });
    }
  };

  // ---------------------- / Delete User && Product /----------------------------
  // ---- / Delete Product /-----
  const deleteProduct = async (id) => {
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    setProducts(products.filter((product) => product.id !== id));
    handleCloseModal();
  };

  // ---- / Delete User /-----
  const deleteUser = async (id) => {
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    // setUsers(users.filter((user) => user.id !== id));
  };

  // ---------------------- / Login Account && check User Account /----------------------------
  const [isLoginEnabled, setIsLoginEnabled] = useState(true);
  const AdminUser = "elged194@gmail.com";
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lastLoginTime, setLastLoginTime] = useState(null);

  const [checkUser, setCheckUser] = useState({
    email: "",
    password: "",
  });

  const checkUserAcc = () => {
    if (checkUser.email === AdminUser || isLoginEnabled) {
      const user = usersData.find(
        (user) =>
          user.email === checkUser.email && user.password === checkUser.password
      );

      if (user) {
        const loginTime = new Date().toString(); // وقت تسجيل الدخول الحالي
        localStorage.setItem("loggedInUser", JSON.stringify(user)); // تخزين معلومات المستخدم في localStorage
        localStorage.setItem("loginTime", loginTime); // تخزين وقت تسجيل الدخول
        setCurrentUser(user);
        setIsLoggedIn(true);
        setLastLoginTime(formatLoginTime(loginTime));
        return true;
      } else {
        setIsLoggedIn(false);
        return false;
      }
    } else {
      alert("تم إيقاف تسجيل الدخول حالياً.");
      return false;
    }
  };

  const formatLoginTime = (loginTime) => {
    const options = {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(loginTime).toLocaleString(undefined, options);
  };

  // ---------------------- / Show User Account in My Profile /----------------------------
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const loginTime = localStorage.getItem("loginTime");

    if (loggedInUser && loginTime) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(loggedInUser)); // تعيين المستخدم الحالي في حالة التطبيق
      setLastLoginTime(formatLoginTime(loginTime));
    }
  }, [setIsLoggedIn, setCurrentUser, setLastLoginTime]);

  // ---------------------- / LogOut User in Account /----------------------------
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCart([]); // حزف محتوي الcart
    localStorage.removeItem("loggedInUser"); // إزالة بيانات المستخدم من localStorage
    localStorage.removeItem("loginTime"); // إزالة وقت تسجيل الدخول من localStorage
  };

  // ---------------------- / Add To Cart /----------------------------
  const [cart, setCart] = useState([]);
  let quantityCart = cart.length;
  const [totalPrice, setTotalPrice] = useState(0);

  const addCart = (productItem) => {
    const isProductInCart = cart.some(
      (cartItem) => cartItem.id === productItem.id
    );

    if (!isProductInCart) {
      setCart((prevCart) => [...prevCart, productItem]);
    }

    setShowSnackbarCart(true);

    setTimeout(() => {
      setShowSnackbarCart(false);
    }, 3000); // Hide the snackbar after 3 seconds
  };

  // Calculate total price
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += Number(item.price);
    });
    setTotalPrice(total);
  }, [cart]);

  // Delete Item from Cart
  const deleteItemCart = (id) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id));
  };

  // ---------------------- / My Favorite Products /----------------------------
  const [favProduct, setFavProduct] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteProducts");
    if (savedFavorites) {
      setFavProduct(JSON.parse(savedFavorites));
    }
  }, []);

  const addMyFavorite = (id) => {
    const productFav = productsData.find((item) => item.id === id);

    const isProductInFav = favProduct.some((favItem) => favItem.id === id);

    if (!isProductInFav) {
      const updatedFavProduct = [...favProduct, productFav];
      setFavProduct(updatedFavProduct);

      localStorage.setItem(
        "favoriteProducts",
        JSON.stringify(updatedFavProduct)
      );
    }
  };

  // Delet Item To Favorit
  const deletItemFavorit = (id) => {
    const updatedFavProducts = favProduct.filter((item) => item.id !== id);

    setFavProduct(updatedFavProducts);

    localStorage.setItem(
      "favoriteProducts",
      JSON.stringify(updatedFavProducts)
    );
  };

  // ---------------------- / Show Modal /----------------------------
  const [showModal, setShowModal] = useState(false);
  const [showModalAddProduct, setshowModalAddProduct] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // ---------------------- / Search /----------------------------
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  // ---------------------- / Show Snackbar /----------------------------
  const [showSnackbarCart, setShowSnackbarCart] = useState(false);

  return (
    <DashboardContext.Provider
      value={{
        products,
        usersData,
        productsData,
        newProduct,
        setNewProduct,
        newUser,
        setNewUser,
        addProduct,
        deleteProduct,
        addCart,
        cart,
        deleteItemCart,
        addUser,
        deleteUser,
        checkUser,
        setCheckUser,
        checkUserAcc,
        isLoggedIn,
        usersLoading,
        usersErrMsg,
        productsLoading,
        productsErrMsg,
        currentUser,
        setCurrentUser,
        handleLogout,
        addMyFavorite,
        favProduct,
        deletItemFavorit,

        showModal,
        setShowModal,
        handleOpenModal,
        handleCloseModal,

        setSearch,
        setPriceFilter,
        search,
        priceFilter,

        quantityCart,
        totalPrice,
        setTotalPrice,
        setCart,

        showModalAddProduct,
        setshowModalAddProduct,
        showModalDeleteUser,
        setShowModalDeleteUser,

        showSnackbarCart,
        setShowSnackbarCart,

        lastLoginTime,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardContext, Provider };
