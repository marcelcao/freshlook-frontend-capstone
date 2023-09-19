/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getProducts } from '../utils/data/productData';
import { useAuth } from '../utils/context/authContext';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';

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
    <div className="product-container">
      <div className="prods">
        <div className="prods-head">
          <h1 className="prods-title">Your Products</h1>
          <ProductModal />
        </div>
        <SearchBar onKeyUp={(query) => filterResult(query)} />
        <Filter />
        <div className="prodcard-container">
          {products.map((product) => (
            <ProductCard key={product.firebaseKey} prodObj={product} onUpdate={getAllProducts} pageContext="deleteProd" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
