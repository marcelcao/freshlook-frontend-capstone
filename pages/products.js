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
  const [showProducts, setShowProducts] = useState([]);

  const { user } = useAuth();

  const getAllProducts = () => {
    getProducts(user.uid).then(setProducts);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    setShowProducts(products);
  }, [products]);

  const filterResult = (query) => {
    const filter = products.filter((product) => product.prodName.toLowerCase().includes(query));
    setShowProducts(filter);
  };

  return (
    <div className="product-container">
      <div className="prods">
        <div className="prods-head">
          <h1 className="prods-title">Your Products</h1>
          <ProductModal />
        </div>
        <div className="sorting-container">
          <SearchBar onChange={(query) => filterResult(query)} />
          <div className="filter-container">
            <Filter setShowProducts={setShowProducts} products={products} />
          </div>
        </div>
        <div className="prodcard-container">
          {showProducts.map((product) => (
            <ProductCard key={product.firebaseKey} prodObj={product} onUpdate={getAllProducts} pageContext="deleteProd" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
