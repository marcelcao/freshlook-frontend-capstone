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
      <div className="single-prod-container">
        <div className="single-prod-item">
          <img src={prodDetails.prodImg} alt="Product" className="view-prod-photo" />
          <h1 className="prod-title">
            {prodDetails.prodName}
          </h1>
        </div>
        <div className="product-content">
          <div className="product-heading">
            <h2 className="prod-category">
              Product Type:
            </h2>
            {prodTypeKey.typeObj?.label}
            <h2 className="prod-category">
              Description:
            </h2>
            {prodDetails.prodDescription}
          </div>
        </div>
        <div className="product-update-btn">
          <ProductModal obj={prodDetails} key={firebaseKey} />
        </div>
      </div>
    </>
  );
}

export default ViewProduct;
