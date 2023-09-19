import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth } from '../utils/context/authContext';
import { sortCleanser } from '../utils/data/productType';
import ProductCard from './ProductCard';

export default function Filter() {
  const [cleansers, setCleansers] = useState([]);

  const { user } = useAuth();

  const getAllCleansers = () => {
    sortCleanser(user.uid).then(setCleansers);
  };

  const handleChangeCleansers = () => {
    cleansers.map((cleanser) => (
      <ProductCard key={cleanser.firebaseKey} prodObj={cleanser} onUpdate={getAllCleansers} pageContext="deleteProd" />
    ));
  };

  useEffect(() => {
    getAllCleansers();
  }, []);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Filter Products
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">All Products</Dropdown.Item>
        <Dropdown.Item onChange={handleChangeCleansers}>Cleanser</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Serum</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Moisturizer</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Toner</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Cream</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Essence</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Lotion</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Oil</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Exfoliant</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Sunscreen</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Mask</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Makeup Remover</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Treatment</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
