import { useState, useEffect } from "react";
// import BASE_URL from "../BaseURL";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = `http://localhost:3001`;

const Products = (props) => {
  const {
    products,
    setProducts,
    fetchProducts,
    user,
    activeOrder,
    setActiveOrder,
    fetchCartProducts,
    setCartProducts,
  } = props;
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [categoryId, setCategoryId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryName, setCategoryName] = useState("All");
  const [cartNotification, setCartNotification] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filteredProducts = products.filter(
      (product) => product.category_id === categoryId
    );
    return setProducts(filteredProducts);
  }, [categoryId]);

  const filterByCategory = async (category_id) => {
    await fetchProducts();
    if (category_id == 1) {
      setCategoryName("Cookies");
      setCategoryId(1);
    } else if (category_id == 2) {
      setCategoryName("Bagels");
      setCategoryId(2);
    } else if (category_id == 3) {
      setCategoryName("Cakes");
      setCategoryId(3);
    } else {
      setCategoryName("All");
      await fetchProducts();
      return;
    }
  };

  const addToCart = async ({ product_id, price, quantity }) => {
    setCartProducts([]);
    const response = await fetch(`${BASE_URL}/orders/${user.id}/orders`);
    const orders = await response.json();
    const cartOrder = orders.filter((order) => {
      return order.status == "pending";
    });
    if (cartOrder.length > 0) {
      setActiveOrder(cartOrder[0]);
    } else {
      const response = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user.id, status: "pending" }),
      });
      const order = await response.json();
      setActiveOrder(order);
    }

    const resp = await fetch(`${BASE_URL}/productorders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: product_id,
        price: price,
        order_id: activeOrder.id,
        quantity: quantity,
      }),
    });
    const productOrder = await resp.json();

    fetchCartProducts();
  };

  return (
    <>
      <div className="add-product">
        {user && user.admin && (
          <Link to="/create_product">ADD NEW PRODUCT</Link>
        )}
      </div>
      <div className="searchbar-div">
        <input
          className="product-searchbar"
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      <div className="category-bar">
        <div className="category-select">
          Shop Products by category:{" "}
          <span
            className="category"
            onClick={() => {
              filterByCategory(1);
            }}
          >
            Cookies{" "}
          </span>
          <span
            className="category"
            onClick={() => {
              filterByCategory(2);
            }}
          >
            Bagels{" "}
          </span>
          <span
            className="category"
            onClick={() => {
              filterByCategory(3);
            }}
          >
            Cakes{" "}
          </span>
          {/* <span
            className="category"
            onClick={() => {
              filterByCategory(4);
            }}
          >
            All Products
          </span> */}
        </div>

        <div className="category-select">Currently Viewing {categoryName}</div>
      </div>

      <div className="productGrid">
        {products
          .filter((product) => {
            if (searchTerm == "") {
              return product;
            } else if (
              product.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
              return product;
          })
          .map((product) => {
            return (
              <div className="product-columns">
                {product.image.includes("https") ? (
                  <img
                    className="thumbnail"
                    src={product.image}
                    alt="product-top"
                  />
                ) : (
                  <img
                    className="thumbnail"
                    src={`/images/${product.image}`}
                    alt="product-bottom"
                  />
                )}
                <h2>{product.title}</h2>
                <h3>${product.price}</h3>
                <h5>{product.description}</h5>
                {product.category_id == 1 ? (
                  <h5>Cookies</h5>
                ) : product.category_id == 2 ? (
                  <h5>Bagels</h5>
                ) : (
                  <h5>Cakes</h5>
                )}
                {user && product.quantity > 0 && (
                  <>
                    <div>
                      <p>Choose Quantity– {product.quantity} remaining:</p>
                      <select
                        className="quantity"
                        value={quantity}
                        onChange={(e) => {
                          setQuantity(e.target.value);
                        }}
                      >
                        {/* {Array(product.quantity)
                          .fill(" ")
                          .map((index) => {
                            return (
                              <option value={index + 1}>{index + 1}</option>
                            );
                          })} */}
                      </select>
                      <button
                        className="addCart"
                        onClick={() => {
                          setCartNotification(product.id);
                          addToCart({
                            product_id: product.id,
                            price: product.price,
                            quantity: quantity,
                          });
                        }}
                      >
                        Add to cart!
                      </button>
                      {cartNotification == product.id && (
                        <span className="cart-notif">Added to Cart!</span>
                      )}
                    </div>
                  </>
                )}
                {user && product.quantity == 0 && <p>SOLD OUT</p>}
              </div>
            );
          })}
      </div>
    </>
  );
};
export default Products;
