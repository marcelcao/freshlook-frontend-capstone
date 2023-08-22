/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getProducts } from '../utils/data/productData';
import { useAuth } from '../utils/context/authContext';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

function Products() {
  const [products, setProducts] = useState([]);

  const { user } = useAuth();

  const getAllProducts = () => {
    getProducts(user.uid).then(setProducts);
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
          <ProductCard key={product.firebaseKey} prodObj={product} onUpdate={getAllProducts} />
        ))}
      </div>
    </div>
  );
}

export default Products;
