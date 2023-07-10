import { useState, useEffect } from "react";
import { fetchProductUsersData } from ".../users";
const BASE_URL = `http://localhost:3001`;
let token = null;
let productUsersData = null;
async function initAuth() {
  token = localStorage.getItem("token");
  productUsersData = await fetchProductUsersData(token);
}
async function createProduct(productData) {
  try {
    if (!productUsersData || !productUsersData.isAdmin) {
      await initAuth();
    }
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
    const product = await response.json();
    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function getAllProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    const products = await response.json();
    return products;
  } catch (error) {
    console.log(error);
  }
}
const searchProducts = async (searchQuery) => {
  try {
    const response = await fetch(
      `${BASE_URL}/products/search?q=${searchQuery}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
async function updateProduct(id, updates) {
  try {
    if (!productUsersData || !productUsersData.isAdmin) {
      await initAuth();
    }
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function deleteProduct(id) {
  try {
    if (!productUsersData || !productUsersData.isAdmin) {
      await initAuth();
    }
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export {
  createProduct,
  getAllProducts,
  searchProducts,
  updateProduct,
  deleteProduct,
};
