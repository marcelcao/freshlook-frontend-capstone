/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleRoutine } from '../../utils/data/routineData';
import { getProdByRoutine, deleteRoutProd } from '../../utils/data/mergedData';
import ProductCard from '../../components/ProductCard';
import { getProducts } from '../../utils/data/productData';
import { useAuth } from '../../utils/context/authContext';

function ViewRoutine() {
  const [routDetails, setRoutDetails] = useState({});
  const [routProds, setRoutProds] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const { firebaseKey } = router.query;

  const getRoutDetails = () => {
    getSingleRoutine(firebaseKey).then(setRoutDetails);
  };

  const getRoutProds = () => {
    getProdByRoutine(firebaseKey)
      .then(setRoutProds);
  };

  const getAllUserProducts = () => getProducts(user.uid);

  const getAllRoutineProducts = () => {
    const allProdsById = getAllUserProducts().filter((product) => product.productId);
    const routProdsById = routProds.filter((routProd) => routProd.productId);

    let matchId = [];

    allProdsById.forEach((userProd) => {
      routProdsById.forEach((routProd) => {
        if (userProd.productId === routProd.productId) {
          matchId = userProd;
        }
      });
    });
    return matchId;
  };

  const deleteProdInRout = ({ prodObj, onUpdate }) => {
    if (window.confirm('Delete this product?')) {
      deleteRoutProd(prodObj.firebaseKey).then(() => onUpdate());
    }
  };

  useEffect(() => {
    getRoutDetails();
    getRoutProds();
  }, [firebaseKey]);

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
        </div>
        <div>
          <h2>Your Routine Products</h2>
          {routProds.map((routProd) => (
            <ProductCard key={routProd.firebaseKey} prodObj={routProd} onUpdate={getAllRoutineProducts} onClick={deleteProdInRout} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewRoutine;
