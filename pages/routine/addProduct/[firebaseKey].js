/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import { getSingleRoutine } from '../../../utils/data/routineData';
import { getProducts } from '../../../utils/data/productData';
import { useAuth } from '../../../utils/context/authContext';

function AddProductsToRoutine() {
  const router = useRouter();
  const [routDetails, setRoutDetails] = useState({});
  const [products, setProducts] = useState([]);
  const { firebaseKey } = router.query;
  const { user } = useAuth();

  const getRoutDetails = () => {
    getSingleRoutine(firebaseKey).then(setRoutDetails);
  };

  const availableProducts = () => {
    getProducts(user.uid).then(setProducts);
  };

  useEffect(() => {
    availableProducts();
    getRoutDetails();
  }, [firebaseKey]);

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="text-white ms-5 details">
          <h2>
            Add Products to {routDetails.routineName}
          </h2>
          <h2>
            Your Available Products:
          </h2>
          <div>
            {products.map((item) => (
              <Form.Group key={item.firebaseKey}>
                <div>
                  <Form.Check type="checkbox" label={item.prodName} value={item.prodName} />
                  <div>
                    <img src={item.prodImg} alt={item.prodName} height="100rem" />
                  </div>
                </div>
              </Form.Group>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default AddProductsToRoutine;
