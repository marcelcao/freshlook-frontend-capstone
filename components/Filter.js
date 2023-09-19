/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth } from '../utils/context/authContext';
import { getProducts } from '../utils/data/productData';
import { sortCleanser } from '../utils/data/productType';
import ProductCard from './ProductCard';

export default function Filter() {
  const [allProducts, setAllProducts] = useState([]);
  const [cleansers, setCleansers] = useState([]);

  const { user } = useAuth();

  const getAllProducts = () => {
    getProducts(user.uid).then(setAllProducts);
  };

  const getAllCleansers = () => {
    sortCleanser(user.uid).then(setCleansers);
  };

  const handleChangeAllProducts = () => {
    allProducts.map((products) => (
      <ProductCard key={products.firebaseKey} prodObj={products} onUpdate={getAllProducts} pageContext="deleteProd" />
    ));
  };

  const handleChangeCleansers = () => {
    cleansers.map((cleanser) => (
      <ProductCard key={cleanser.firebaseKey} prodObj={cleanser} onUpdate={getAllCleansers} pageContext="deleteProd" />
    ));
  };

  useEffect(() => {
    getAllProducts();
    getAllCleansers();
  }, []);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Filter Products
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleChangeAllProducts}>All Products</Dropdown.Item>
        <Dropdown.Item value="Cleanser" onChange={handleChangeCleansers}>Cleanser</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
