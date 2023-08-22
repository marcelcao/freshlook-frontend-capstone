import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteSingleProduct } from '../utils/data/productData';

// need to add link to edit button using modal //

export default function ProductCard({ prodObj, onUpdate }) {
  const deleteThisProduct = () => {
    if (window.confirm('Delete this product?')) {
      deleteSingleProduct(prodObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }} className="product-card">
      <Card.Img variant="top" src={prodObj.prodImg} alt={prodObj.prodName} style={{ height: '8em' }} className="product-img" />
      <Card.Body>
        <Card.Title>{prodObj.prodName} </Card.Title>
        <Card.Title className="prod-description">{prodObj.prodDescription}</Card.Title>
        <Button onClick={deleteThisProduct} className="prod-delete">
          DELETE
        </Button>
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
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
