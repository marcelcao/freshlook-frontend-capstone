/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { getSingleRoutine } from '../../../utils/data/routineData';
import { getProducts } from '../../../utils/data/productData';
import { useAuth } from '../../../utils/context/authContext';
import { addProdToRoutine, updateRoutineProduct } from '../../../utils/data/mergedData';

function AddProductsToRoutine() {
  const [routDetails, setRoutDetails] = useState({});
  const [products, setProducts] = useState([]);
  const [prodIdArray, setProdIdArray] = useState([]);
  const [routineId, setRoutineId] = useState(null);

  const router = useRouter();
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
    setRoutineId(firebaseKey);
  }, [firebaseKey]);

  const handleChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      if (!prodIdArray.includes(value)) {
        setProdIdArray([...prodIdArray, value]);
      }
    } else {
      const productIndex = prodIdArray.findIndex((productId) => productId === value);
      const newArray = [...prodIdArray];
      newArray.splice(productIndex, 1);
      setProdIdArray(newArray);
    }
  };

  const handleSubmit = () => {
    const promises = prodIdArray.map((prodId) => {
      const payload = {
        productId: prodId,
        routineId,
      };
      return addProdToRoutine(payload)
        .then(({ name }) => {
          const patchPayload = { firebaseKey: name };
          updateRoutineProduct(patchPayload);
        });
    });
    Promise.all(promises).then(() => {
      router.push(`/routine/${firebaseKey}`);
    });
  };

  return (
    <>
      <div className="add-product-container">
        <div>
          <h2 className="rout-category">
            Add Products to {routDetails.routineName}
          </h2>
          <h2>
            Your Available Products:
          </h2>
          <div className="available-prods">
            {products.map((item) => (
              <Form key={item.firebaseKey}>
                <Form.Group>
                  <div className="checkform">
                    <div>
                      <img src={item.prodImg} alt={item.prodName} height="100rem" />
                    </div>
                    <Form.Check type="checkbox" label={item.prodName} value={item.productId} onChange={handleChange} />
                  </div>
                </Form.Group>
              </Form>
            ))}
          </div>
          <Button onClick={handleSubmit} className="add-rout-prods-btn">Add Products</Button>
        </div>
      </div>
    </>
  );
}
export default AddProductsToRoutine;
