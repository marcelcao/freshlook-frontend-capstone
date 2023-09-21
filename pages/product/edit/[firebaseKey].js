/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleProduct } from '../../../utils/data/productData';
import ProductModal from '../../../components/ProductModal';
import { viewProductType } from '../../../utils/data/productType';

export default function EditProduct() {
  const [editProd, setEditProd] = useState({});
  const [prodTypeKey, setProdTypeKey] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  const getProdDetails = () => {
    getSingleProduct(firebaseKey).then(setEditProd);
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
          <img src={editProd.prodImg} alt="Product" width="200px" height="300px" className="view-prod-photo" />
          <h2>
            {editProd.prodName}
          </h2>
          <h2>
            Product Type:
          </h2>
          {prodTypeKey.typeObj?.label}
          <h2>
            Description:
          </h2>
          {editProd.prodDescription}
        </div>
        <ProductModal obj={editProd} key={firebaseKey} />
      </div>
    </>
  );
}
