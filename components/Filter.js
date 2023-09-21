/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth } from '../utils/context/authContext';
import {
  sortCleanser, sortSerum, sortMoisturizer, sortToner, sortCream, sortEssence, sortLotion, sortOil, sortExfoliant, sortSunscreen, sortMask, sortRemover, sortTreatment,
} from '../utils/data/productType';

export default function Filter({ setShowProducts, products }) {
  const { user } = useAuth();

  const handleSelect = (eventKey) => {
    if (eventKey === 'All Products') {
      setShowProducts(products);
    } else if (eventKey === 'Cleanser') {
      sortCleanser(user.uid).then(setShowProducts);
    } else if (eventKey === 'Serum') {
      sortSerum(user.uid).then(setShowProducts);
    } else if (eventKey === 'Moisturizer') {
      sortMoisturizer(user.uid).then(setShowProducts);
    } else if (eventKey === 'Toner') {
      sortToner(user.uid).then(setShowProducts);
    } else if (eventKey === 'Cream') {
      sortCream(user.uid).then(setShowProducts);
    } else if (eventKey === 'Essence') {
      sortEssence(user.uid).then(setShowProducts);
    } else if (eventKey === 'Lotion') {
      sortLotion(user.uid).then(setShowProducts);
    } else if (eventKey === 'Oil') {
      sortOil(user.uid).then(setShowProducts);
    } else if (eventKey === 'Exfoliant') {
      sortExfoliant(user.uid).then(setShowProducts);
    } else if (eventKey === 'Sunscreen') {
      sortSunscreen(user.uid).then(setShowProducts);
    } else if (eventKey === 'Mask') {
      sortMask(user.uid).then(setShowProducts);
    } else if (eventKey === 'Remover') {
      sortRemover(user.uid).then(setShowProducts);
    } else if (eventKey === 'Treatment') {
      sortTreatment(user.uid).then(setShowProducts);
    }
  };

  return (
    <div>
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Filter Products
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="All Products">All Products</Dropdown.Item>
          <Dropdown.Item eventKey="Cleanser">Cleanser</Dropdown.Item>
          <Dropdown.Item eventKey="Serum">Serum</Dropdown.Item>
          <Dropdown.Item eventKey="Moisturizer">Moisturizer</Dropdown.Item>
          <Dropdown.Item eventKey="Toner">Toner</Dropdown.Item>
          <Dropdown.Item eventKey="Cream">Cream</Dropdown.Item>
          <Dropdown.Item eventKey="Essence">Essence</Dropdown.Item>
          <Dropdown.Item eventKey="Lotion">Lotion</Dropdown.Item>
          <Dropdown.Item eventKey="Oil">Oil</Dropdown.Item>
          <Dropdown.Item eventKey="Exfoliant">Exfoliant</Dropdown.Item>
          <Dropdown.Item eventKey="Sunscreen">Sunscreen</Dropdown.Item>
          <Dropdown.Item eventKey="Mask">Mask</Dropdown.Item>
          <Dropdown.Item eventKey="Makeup Remover">Makeup Remover</Dropdown.Item>
          <Dropdown.Item eventKey="Treatment">Treatment</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

Filter.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    prodImg: PropTypes.string,
    prodName: PropTypes.string,
    prodDescription: PropTypes.string,
    firebaseKey: PropTypes.string,
    productId: PropTypes.string,
    routineId: PropTypes.string,
    routProdKey: PropTypes.string,
  })).isRequired,
  setShowProducts: PropTypes.func.isRequired,
};
