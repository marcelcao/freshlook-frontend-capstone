/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getProducts } from '../utils/data/productData';
import { useAuth } from '../utils/context/authContext';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import SearchBar from '../components/SearchBar';

function Products() {
  const [products, setProducts] = useState([]);

  const { user } = useAuth();

  const getAllProducts = () => {
    getProducts(user.uid).then(setProducts);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const filterResult = (query) => {
    if (!query) {
      getAllProducts();
    } else {
      const filter = products.filter((product) => product.prodName.toLowerCase().includes(query));
      setProducts(filter);
    }
  };

  return (
    <div>
      <div>
        <h1>Your Products</h1>
        <ProductModal />
        <SearchBar onKeyUp={(query) => filterResult(query)} />
      </div>
      <div>
        {products.map((product) => (
          <ProductCard key={product.firebaseKey} prodObj={product} onUpdate={getAllProducts} pageContext="deleteProd" />
        ))}
      </div>
    </div>
  );
}

export default Products;
