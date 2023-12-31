import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../utils/context/authContext';
import { createProduct, updateProduct } from '../utils/data/productData';
import { getProductTypes } from '../utils/data/productType';

const initialState = {
  prodName: '',
  prodDescription: '',
  prodImg: '',
  prodType: '',
};

function ProductModal({ obj }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formInput, setFormInput] = useState(initialState);
  const [labels, setLabels] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getProductTypes().then(setLabels);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const reload = () => window.location.reload();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateProduct(formInput).then(() => {
        handleClose();
        router.push(`/product/edit/${obj.firebaseKey}`);
        reload();
      });
    } else {
      const payload = { ...formInput, uid: user.uid };
      createProduct(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name, productId: name };

        updateProduct(patchPayload).then(() => {
          handleClose();
          router.push('/products');
          reload();
        });
      });
    }
  };

  return (
    <>
      <Button onClick={handleShow} className="prod-modal">
        <p className="form-label">{obj.firebaseKey ? 'Update' : 'Add'} Product</p>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton id="modal-head">
          <h2 className="form-head">{obj.firebaseKey ? 'Update' : 'Add'} Product</h2>
        </Modal.Header>
        <Modal.Body id="modal-body">
          <Form onSubmit={handleClose}>
            <Form.Group className="mb-3" controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control className="form-placeholder" type="text" placeholder="Product Name Here" name="prodName" value={formInput.prodName} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductDescription">
              <Form.Label>Product Description</Form.Label>
              <Form.Control className="form-placeholder" type="text" placeholder="Product Description Here" name="prodDescription" value={formInput.prodDescription} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductImg">
              <Form.Label>Product Image</Form.Label>
              <Form.Control className="form-placeholder" type="url" placeholder="Product Image URL Here" name="prodImg" value={formInput.prodImg} onChange={handleChange} required />
            </Form.Group>

            <Form.Group>
              <Form.Label controlId="floatingSelect" label="Product Type">Product Type
                <Form.Select
                  className="form-dropdown"
                  aria-label="Product Type"
                  name="prodType"
                  onChange={handleChange}
                  value={formInput.prodType}
                  required
                >
                  <option value="">Select Product Type</option>
                  {
                    labels.map((label) => (
                      <option
                        key={label.firebaseKey}
                        value={label.firebaseKey}
                      >
                        {label.label}
                      </option>
                    ))
                  }
                </Form.Select>
              </Form.Label>
            </Form.Group>
            <div className="modal-submit">
              <Button type="submit" className="submit-btn" onClick={handleSubmit}>{obj.firebaseKey ? 'Update' : 'Add'} Product</Button>
            </div>
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
    prodType: PropTypes.string,
  }),
};
ProductModal.defaultProps = {
  obj: initialState,
};

export default ProductModal;
