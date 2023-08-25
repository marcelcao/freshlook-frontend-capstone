/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleProduct } from '../../../utils/data/productData';
import ProductModal from '../../../components/ProductModal';

export default function EditProduct() {
  const [editProd, setEditProd] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  const getProdDetails = () => {
    getSingleProduct(firebaseKey).then(setEditProd);
  };

  useEffect(() => {
    getProdDetails();
  }, [firebaseKey]);

  return (
    <div>
      <div className="mt-5 d-flex flex-wrap">
        <div className="text-white ms-5 details">
          <img src={editProd.prodImg} alt="Product" width="200px" height="300px" className="view-prod-photo" />
          <h2>
            {editProd.prodName}
          </h2>
          <h2>
            {editProd.prodDescription}
          </h2>
        </div>
      </div>
      <ProductModal obj={editProd} key={firebaseKey} />
    </div>
  );
}
