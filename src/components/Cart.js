import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = `http://localhost:3001`;

const Cart = (props) => {
  let plus_btns = document.querySelectorAll("#plus-button");
  let minus_btns = document.querySelectorAll("#minus-button");
  let qty_inputs = document.querySelectorAll("#quantity");

  plus_btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      qty_inputs.forEach((qty) => {
        qty.value++;
      });
    });
  });
  minus_btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      qty_inputs.forEach((qty) => {
        if (qty.value > 1) {
          qty.value--;
        } else {
          qty.value = 0;
        }
      });
    });
  });

  const {
    activeOrder,
    products,
    setActiveOrder,
    cartProducts,
    setCartProducts,
    fetchCartProducts,
    checkForCart,
    filterCartProducts,
  } = props;
  console.log(activeOrder);
  const [userProduct, setUserProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async (id) => {
    const resp = await fetch(`${BASE_URL}/productorders/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const info = await resp.json();
    console.log(info);
    // fetchCartProducts();
    const newCart = cartProducts.filter((cartProduct) => cartProduct.id != id);
    setCartProducts(newCart);
    if (info.error) {
      setErrorMessage(info.error);
      return;
    }
    setErrorMessage("");
  };

  useEffect(() => {
    fetchCartProducts();
    filterCartProducts();
  }, []);

  console.log(cartProducts);

  const sum = cartProducts.reduce(
    (partial_sum, product) =>
      partial_sum +
      parseFloat(product.cartprice) * parseFloat(product.cartquantity),
    0
  );
  return (
    <div>
      <div>
        <div>
          <h2 className="items-text">Items:</h2>

          <div className="cart-grid">
            {cartProducts.map((product) => {
              return (
                <div className="product-cart">
                  <div>
                    {product.image.includes("https") ? (
                      <img className="thumbnail-cart" src={product.image} />
                    ) : (
                      <img
                        className="thumbnail-cart"
                        src={`/images/${product.image}`}
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="product-title">{product.title}</h3>
                  </div>
                  <div>
                    <h3 className="product-price"> ${product.cartprice}</h3>
                  </div>
                  <div>
                    <h3 className="product-quantity">
                      Quantity:
                      <input
                        type="button"
                        value="-"
                        id="minus-button"
                        for="quantity"
                      />
                      <input type="number" id="quantity" value="1" min="0" />
                      <input
                        type="button"
                        value="+"
                        id="plus-button"
                        for="quantity"
                      />
                    </h3>
                  </div>
                  <div>
                    <button onClick={() => handleDelete(product.id)}>
                      REMOVE
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="subtotal">
            <div className="total">Subtotal: ${sum}</div>

            <a href="/checkout">
              <button class="checkout-btn">
                <b>Checkout</b>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
