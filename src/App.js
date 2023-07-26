import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NewProduct from "./components/NewProduct";
import Register from "./components/Register";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Admin from "./components/Admin";
import Checkout from "./components/Checkout";
import Contact from "./components/Contact";

const BASE_URL = `http://localhost:3001`;

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeOrder, setActiveOrder] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const [allProductOrders, setAllProductOrders] = useState([]);
  const [updateProduct, setupdateProduct] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products`, {
        contentType: "application/json",
      });
      const info = await response.json();
      setProducts(info);
      // setProducts(" ");
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users`);
      const info = await response.json();
      return setAllUsers(info);
    } catch (error) {
      console.error(error);
    }
  };

  const filterCartProducts = () => {
    if (activeOrder.id) {
      const filteredProdOrds = allProductOrders.filter(
        (prodOrd) => prodOrd.order_id == activeOrder.id
      );
      return setCartProducts(filteredProdOrds);
    }
  };

  const fetchCartProducts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/productorders`, {
        contentType: "application/json",
      });
      const info = await response.json();
      const filteredCartProd = info.filter(
        (cart) => cart.order_id == activeOrder.id
      );
      setAllProductOrders(info);
    } catch (error) {
      console.error(error);
    }
  };

  const checkForCart = async () => {
    if (user) {
      const orders = await fetch(`${BASE_URL}/orders/${user.id}/orders`);
      const cartOrder = orders.filter((order) => {
        return order.status == "pending";
      });
      if (cartOrder.length > 0) {
        return setActiveOrder(cartOrder[0]);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const savedToken = localStorage.getItem("token");
      if (!savedToken) {
        return;
      }
      try {
        const resp = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });
        const info = await resp.json();
        setUser({
          id: info.user.id,
          username: info.user.username,
          admin: info.user.admin,
        });
        setToken(savedToken);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
    fetchProducts();
    checkForCart();
    fetchCartProducts();
    fetchAllUsers();
  }, []);

  useEffect(() => {
    filterCartProducts();
  }, [allProductOrders, user]);

  return (
    <div>
      <Navbar
        fetchProducts={fetchProducts}
        user={user}
        setUser={setUser}
        products={products}
        setProducts={setProducts}
      />
      <Routes>
        <Route exact path="/" element={<Home user={user} />} />
        <Route
          path="/register"
          element={<Register setToken={setToken} setUser={setUser} />}
        />

        <Route
          path="/login"
          element={
            !user && (
              <Login
                user={user}
                setUser={setUser}
                token={token}
                setToken={setToken}
              />
            )
          }
        />

        <Route
          path="/create_product"
          element={<NewProduct user={user} fetchProducts={fetchProducts} />}
        />
        <Route
          path="/products"
          element={
            <Products
              products={products}
              setProducts={setProducts}
              fetchProducts={fetchProducts}
              fetchCartProducts={fetchCartProducts}
              setCartProducts={setCartProducts}
              user={user}
              activeOrder={activeOrder}
              setActiveOrder={setActiveOrder}
              // updateProduct={updateProduct}
              // setupdateProduct={setupdateProduct}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              user={user}
              activeOrder={activeOrder}
              setActiveOrder={setActiveOrder}
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
              fetchCartProducts={fetchCartProducts}
              filterCartProducts={filterCartProducts}
              checkForCart={checkForCart}
            />
          }
        />
        <Route
          path="/admin"
          element={<Admin allUsers={allUsers} user={user} />}
        />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}
export default App;
