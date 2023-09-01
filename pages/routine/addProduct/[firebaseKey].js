/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { getSingleRoutine } from '../../../utils/data/routineData';
import { getProducts } from '../../../utils/data/productData';
import { useAuth } from '../../../utils/context/authContext';
import { addProdToRoutine } from '../../../utils/data/mergedData';

const initialPayloadState = {
  firebaseKey: '',
  productId: '',
  routineId: '',
};

function AddProductsToRoutine() {
  const [routDetails, setRoutDetails] = useState({});
  const [products, setProducts] = useState([]);
  const [checkedProdIdValue, setCheckedProdIdValue] = useState({ availableProductIds: [], selectedProductId: [] });
  const [payloadValues, setPayloadValues] = useState(initialPayloadState);

  const router = useRouter();
  const { firebaseKey } = router.query;
  const { user } = useAuth();

  const getRoutDetails = () => {
    getSingleRoutine(firebaseKey).then(setRoutDetails);
  };

  const availableProducts = () => {
    getProducts(user.uid).then(setProducts);
  };

  // const getPageRoutineId = () => {
  //   routDetails.map((routDetail) => routDetail.routineId);
  // };

  const getCheckedProductIds = checkedProdIdValue.selectedProductId;

  useEffect(() => {
    availableProducts();
    getRoutDetails();
  }, [firebaseKey]);

  const handleChange = (e) => {
    const { value, checked } = e.target;
    const { availableProductIds } = checkedProdIdValue;

    if (checked) {
      setCheckedProdIdValue({
        availableProductIds: [...availableProductIds, value],
        selectedProductId: [...availableProductIds, value],
      });
    } else {
      setCheckedProdIdValue({
        availableProductIds: availableProductIds.filter(() => e !== value),
        selectedProductId: availableProductIds.filter(() => e !== value),
      });
    } const payload = { ...payloadValues, productId: getCheckedProductIds };

    addProdToRoutine(payload)
      .then(setPayloadValues);
  };

  const routeBack = () => {
    router.push(`/routine/${firebaseKey}`);
  };

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
              <Form key={item.firebaseKey}>
                <Form.Group>
                  <div>
                    <Form.Check type="checkbox" label={item.prodName} value={item.productId} onChange={handleChange} />
                    <div>
                      <img src={item.prodImg} alt={item.prodName} height="100rem" />
                    </div>
                  </div>
                </Form.Group>
              </Form>
            ))}<Button onClick={routeBack}>Add Products</Button>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddProductsToRoutine;
