/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getSingleRoutine } from '../../utils/data/routineData';
import { getProdByRoutine } from '../../utils/data/mergedData';
import ProductCard from '../../components/ProductCard';
import RoutineModal from '../../components/RoutineModal';
import { getProducts } from '../../utils/data/productData';
import { useAuth } from '../../utils/context/authContext';

function ViewRoutine() {
  const [routDetails, setRoutDetails] = useState({});
  const [routProds, setRoutProds] = useState([]);
  const [products, setProducts] = useState([]);
  const [matchedProducts, setMatchedProducts] = useState([]);

  const router = useRouter();
  const { user } = useAuth();

  const { firebaseKey } = router.query;

  const getRoutDetails = () => {
    getSingleRoutine(firebaseKey).then(setRoutDetails);
  };

  const getAllRoutineProducts = () => {
    const matched = [];

    products.forEach((userProd) => {
      routProds.forEach((routProd) => {
        if (userProd.productId === routProd.productId) {
          const updatedProd = { ...userProd, routProdKey: routProd.firebaseKey };
          matched.push(updatedProd);
        }
      });
    });
    setMatchedProducts(matched);
  };

  const getRoutProds = () => {
    getProdByRoutine(firebaseKey)
      .then(setRoutProds);
  };

  useEffect(() => {
    getProducts(user.uid).then(setProducts)
      .then(() => {
        getRoutDetails();
        getRoutProds();
      });
  }, [firebaseKey]);

  useEffect(() => {
    getAllRoutineProducts();
  }, [routProds]);

  return (
    <>
      <div className="single-rout-container">
        <div className="update-rout-btn">
          <RoutineModal obj={routDetails} key={firebaseKey} />
        </div>
        <div className="single-rout-item">
          <h2 className="rout-category">
            {routDetails.routineName}
          </h2>
          <p>
            {routDetails.routineDescription}
          </p>
        </div>
        <div className="routine-products-content">
          <div className="rout-prod-head">
            <h2 className="rout-category">Your Routine Products</h2>
            <Link href={`/routine/addProduct/${firebaseKey}`} passHref>
              <Button variant="primary" className="add-prods-btn">ADD PRODUCTS</Button>
            </Link>
          </div>
          <div className="added-prods">
            {matchedProducts.map((routProd) => (
              <ProductCard key={routProd.firebaseKey} prodObj={routProd} onUpdate={getRoutProds} pageContext="deleteRoutProd" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewRoutine;
