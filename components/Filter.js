/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth } from '../utils/context/authContext';
import { getProducts } from '../utils/data/productData';
import { sortCleanser } from '../utils/data/productType';
import ProductCard from './ProductCard';

export default function Filter() {
  const [allProducts, setAllProducts] = useState([]);
  const [cleansers, setCleansers] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All Products'); // Default to 'All Products'
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { user } = useAuth();

  const getAllProducts = () => {
    getProducts(user.uid).then(setAllProducts);
  };

  const getAllCleansers = () => {
    sortCleanser(user.uid).then(setCleansers);
  };

  const handleSelect = (value) => {
    setSelectedFilter(value); // Update the selected filter

    if (value === 'All Products') {
      setFilteredProducts(allProducts);
    } else if (value === 'Cleanser') {
      setFilteredProducts(cleansers);
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllCleansers();
  }, []);

  // Render the filtered products based on selected filter
  const renderedProducts = filteredProducts.map((product) => (
    <ProductCard key={product.firebaseKey} prodObj={product} onUpdate={getAllProducts} pageContext="deleteProd" />
  ));

  return (
    <div>
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Filter Products
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="All Products">All Products</Dropdown.Item>
          <Dropdown.Item eventKey="Cleanser">Cleanser</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Render the filtered products */}
      {renderedProducts}
    </div>
  );
}
