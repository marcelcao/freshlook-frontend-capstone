import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../utils/context/authContext';
import { createProduct, updateProduct } from '../utils/data/productData';

const initialState = {
  prodName: '',
  prodDescription: '',
  prodImg: '',
};

function ProductModal({ obj }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput(obj);
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateProduct(formInput).then(() => {
        handleClose();
        router.push('/products');
      });
    } else {
      const payload = { ...formInput, uid: user.uid };
      createProduct(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateProduct(patchPayload).then(() => {
          handleClose();
          router.push('/products');
        });
      });
    }
  };

  const reload = () => window.location.reload();

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Product
      </Button>

      <Modal show={show} onHide={handleClose} onExit={reload}>
        <Modal.Header closeButton>
          <h2 className="form-label">{obj.firebaseKey ? 'Update' : 'Add'} Product</h2>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleClose}>
            <Form.Group className="mb-3" controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" placeholder="Product Name Here" name="prodName" value={formInput.prodName} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductDescription">
              <Form.Label>Product Description</Form.Label>
              <Form.Control type="text" placeholder="Product Description Here" name="prodDescription" value={formInput.prodDescription} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductImg">
              <Form.Label>Product Image</Form.Label>
              <Form.Control type="url" placeholder="Product Image URL Here" name="prodImg" value={formInput.prodImg} onChange={handleChange} required />
            </Form.Group>

            <Button type="submit" className="submit-btn" onClick={handleSubmit}>{obj.firebaseKey ? 'Update' : 'Add'} Product</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

ProductModal.propTypes = {
  obj: PropTypes.shape({
    prodName: PropTypes.string,
    prodDescription: PropTypes.string,
    prodImg: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};
ProductModal.defaultProps = {
  obj: initialState,
};

export default ProductModal;
