import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = `http://localhost:3001`;

const NewProduct = (props) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category_id, setCategoryId] = useState("");
  const { user, fetchProducts } = props;
  return (
    <>
      {user.admin ? (
        <>
          <h3>Add a new product to inventory:</h3>
          <div className="newProduct">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData();
                formData.append("title", title);
                formData.append("image", image);
                formData.append("quantity", quantity);
                formData.append("price", price);
                formData.append("description", description);
                formData.append("categoryId", category_id);

                const response = await fetch(`${BASE_URL}/products`, {
                  method: "POST",
                  body: formData,
                });
                console.log(response);
                const info = await response.json();
                fetchProducts();
                console.log(info);
                navigate("/products");
              }}
            >
              <input
                className="name"
                placeholder="Product Type"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                className="description"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                className="number"
                placeholder="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />

              <input
                className="price"
                placeholder="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <span className="category">Category:</span>
              <select name="selectList" id="selectList">
                <option value={category_id[1]}>Cookies</option>{" "}
                <option value={category_id[2]}>Bagels</option>{" "}
                <option value={category_id[3]}>Cakes</option>
              </select>

              <input
                className="file"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <button id="addingProduct">Add product!</button>
            </form>
          </div>
        </>
      ) : (
        <h3>NOT AUTHORIZED TO CREATE NEW PRODUCT</h3>
      )}
    </>
  );
};

export default NewProduct;
