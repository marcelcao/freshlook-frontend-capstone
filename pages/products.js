/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getProducts, deleteSingleProduct } from '../utils/data/productData';
import { useAuth } from '../utils/context/authContext';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

function Products({ prodObj, onUpdate }) {
  const [products, setProducts] = useState([]);

  const { user } = useAuth();

  const getAllProducts = () => {
    getProducts(user.uid).then(setProducts);
    console.warn(getAllProducts);
  };

  const deleteThisProduct = () => {
    if (window.confirm('Delete this product?')) {
      deleteSingleProduct(prodObj.productId).then(() => onUpdate());
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <div>
        <h1>Your Products</h1>
        <ProductModal />
      </div>
      <div>
        {products.map((product) => (
          <ProductCard key={product.firebaseKey} prodObj={product} onUpdate={getAllProducts} onClick={deleteThisProduct} />
        ))}
      </div>
    </div>
  );
}

export default Products;

Products.propTypes = {
  prodObj: PropTypes.shape({
    productId: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
