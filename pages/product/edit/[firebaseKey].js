/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleProduct } from '../../../utils/data/productData';
import ProductModal from '../../../components/ProductModal';

export default function EditProduct() {
  const [editProd, setEditProd] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleProduct(firebaseKey).then(setEditProd);
  }, [firebaseKey]);

  return (
    <div>
      <ProductModal obj={editProd} key={firebaseKey} />
    </div>
  );
}
