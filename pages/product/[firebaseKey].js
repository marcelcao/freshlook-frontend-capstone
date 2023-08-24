/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleProduct } from '../../utils/data/productData';

function ViewProduct() {
  const [prodDetails, setProdDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  const getProdDetails = () => {
    getSingleProduct(firebaseKey).then(setProdDetails);
  };

  useEffect(() => {
    getProdDetails();
  }, [firebaseKey]);

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="text-white ms-5 details">
          <img src={prodDetails.prodImg} alt="Product" width="200px" height="300px" className="view-prod-photo" />
          <h2>
            {prodDetails.prodName}
          </h2>
          <h2>
            {prodDetails.prodDescription}
          </h2>
        </div>
      </div>
    </>
  );
}

export default ViewProduct;
