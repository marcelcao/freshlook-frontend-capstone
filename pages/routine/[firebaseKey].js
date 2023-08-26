/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleRoutine } from '../../utils/data/routineData';
import { getRoutineProducts } from '../../utils/data/mergedData';
import ProductCard from '../../components/ProductCard';

function ViewRoutine() {
  const [routDetails, setRoutDetails] = useState({});
  const [routProds, setRoutProds] = useState([]);
  const router = useRouter();

  const { firebaseKey } = router.query;

  const getRoutDetails = () => {
    getSingleRoutine(firebaseKey).then(setRoutDetails);
  };

  const getRoutProds = () => {
    getRoutineProducts(firebaseKey).then(setRoutProds).then(console.warn('routprods func', routProds));
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
            <ProductCard key={routProd.firebaseKey} prodObj={routProd} onUpdate={getRoutProds} />
          ))}
        </div>
      </div>

    </>
  );
}

export default ViewRoutine;
