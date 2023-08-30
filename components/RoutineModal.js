import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../utils/context/authContext';
import { createRoutines, updateRoutine } from '../utils/data/routineData';

const initialState = {
  routineName: '',
  routineDescription: '',
};

function RoutineModal({ obj }) {
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
      updateRoutine(formInput).then(() => {
        handleClose();
        router.push('/');
      });
    } else {
      const payload = { ...formInput, uid: user.uid };
      createRoutines(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateRoutine(patchPayload).then(() => {
          handleClose();
          router.push('/');
        });
      });
    }
  };

  const reload = () => window.location.reload();

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <p className="form-label">{obj.firebaseKey ? 'Update' : 'Create'} Routine</p>
      </Button>

      <Modal show={show} onHide={handleClose} onExit={reload}>
        <Modal.Header closeButton>
          <h2 className="form-label">{obj.firebaseKey ? 'Update' : 'Create'} Routine</h2>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleClose}>
            <Form.Group className="mb-3" controlId="formRoutineName">
              <Form.Label>Routine Name</Form.Label>
              <Form.Control type="text" placeholder="Routine Name Here" name="routineName" value={formInput.routineName} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRoutineDescription">
              <Form.Label>Routine Description</Form.Label>
              <Form.Control type="text" placeholder="Routine Description Here" name="routineDescription" value={formInput.routineDescription} onChange={handleChange} required />
            </Form.Group>
            <Button type="submit" className="submit-btn" onClick={handleSubmit}>{obj.firebaseKey ? 'Update' : 'Create'} Routine</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

RoutineModal.propTypes = {
  obj: PropTypes.shape({
    routineName: PropTypes.string,
    routineDescription: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};
RoutineModal.defaultProps = {
  obj: initialState,
};

export default RoutineModal;
