/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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
    const routProdsById = routProds.map((routProd) => routProd.productId);

    const matched = [];

    products.forEach((userProd) => {
      routProdsById.forEach((routProd) => {
        if (userProd.productId === routProd) {
          matched.push(userProd);
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
      <div className="mt-5 d-flex flex-wrap">
        <div className="text-white ms-5 details">
          <h2>
            {routDetails.routineName}
          </h2>
          <h2>
            {routDetails.routineDescription}
          </h2>
          <RoutineModal obj={routDetails} key={firebaseKey} />
        </div>
        <div>
          <h2>Your Routine Products</h2>
          {matchedProducts.map((routProd) => (
            <ProductCard key={routProd.firebaseKey} prodObj={routProd} onUpdate={getRoutProds} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewRoutine;
