/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import { getSingleProduct } from '../../utils/data/productData';
import ProductModal from '../../components/ProductModal';
import { viewProductType } from '../../utils/data/productType';

function ViewProduct() {
  const [prodDetails, setProdDetails] = useState({});
  const [prodTypeKey, setProdTypeKey] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query || {};

  const getProdDetails = () => {
    getSingleProduct(firebaseKey)
      .then(setProdDetails);
  };

  const getProdTypeKey = () => {
    viewProductType(firebaseKey).then(setProdTypeKey);
  };

  useEffect(() => {
    getProdDetails();
    getProdTypeKey();
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
            Product Type: {prodTypeKey.typeObj?.label}
          </h2>
          <h2>
            {prodDetails.prodDescription}
          </h2>
        </div>
      </div>
      <ProductModal obj={prodDetails} key={firebaseKey} />
    </>
  );
}

export default ViewProduct;
