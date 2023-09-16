/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleProduct } from '../utils/data/productData';
import { deleteRoutProd } from '../utils/data/mergedData';

export default function ProductCard({
  prodObj, onUpdate, pageContext,
}) {
  const reload = () => window.location.reload();

  const deleteThisProduct = () => {
    if (window.confirm('Delete this product?')) {
      deleteSingleProduct(prodObj.firebaseKey).then(() => onUpdate(reload));
    }
  };

  const deleteThisRoutProd = () => {
    if (window.confirm('Delete this product?')) {
      deleteRoutProd(prodObj.routProdKey).then(() => onUpdate(reload));
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
          <Button onClick={deleteThisRoutProd} className="prod-delete">
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
        <Card.Title>{prodObj.prodType} </Card.Title>
        <Link href={`/product/${prodObj.productId}`} passHref>
          <Button className="m-2">VIEW</Button>
        </Link>
        <Link href={`/product/edit/${prodObj.productId}`} passHref>
          <Button className="m-2">EDIT</Button>
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
    routProdKey: PropTypes.string,
    prodType: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  pageContext: PropTypes.oneOf(['deleteProd', 'deleteRoutProd']).isRequired,
};
