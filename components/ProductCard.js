import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleProduct } from '../utils/data/productData';
// import { deleteRoutProd } from '../utils/data/mergedData';

// need to add link to edit button using modal //

export default function ProductCard({
  prodObj, onUpdate, pageContext, onClick,
}) {
  const reload = () => window.location.reload();

  const deleteThisProduct = () => {
    if (window.confirm('Delete this product?')) {
      deleteSingleProduct(prodObj.firebaseKey).then(() => onUpdate(reload));
    }
  };

  const renderDeleteBtns = () => {
    if (pageContext === 'deleteProd') {
      return (
        <>
          <Button onClick={deleteThisProduct} className="prod-delete">
            DELETE
          </Button>
        </>
      );
    } if (pageContext === 'deleteRoutProd') {
      return (
        <>
          <Button onClick={onClick} className="prod-delete">
            REMOVE
          </Button>
        </>
      );
    } return null;
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }} className="product-card">
      <Card.Img variant="top" src={prodObj.prodImg} alt={prodObj.productId} style={{ height: '8em' }} className="product-img" />
      <Card.Body>
        <Card.Title>{prodObj.prodName} </Card.Title>
        <Link href={`/product/${prodObj.productId}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/product/edit/${prodObj.productId}`} passHref>
          <Button variant="primary" className="m-2">EDIT</Button>
        </Link>
        {renderDeleteBtns()}
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  prodObj: PropTypes.shape({
    prodImg: PropTypes.string,
    prodName: PropTypes.string,
    prodDescription: PropTypes.string,
    firebaseKey: PropTypes.string,
    productId: PropTypes.string,
    routineId: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  pageContext: PropTypes.oneOf(['deleteProd', 'deleteRoutProd']).isRequired,
};
