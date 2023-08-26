import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleRoutine } from '../utils/data/routineData';

// need to add link to edit button using modal //

export default function RoutineCard({ routineObj, onUpdate }) {
  const deleteThisRoutine = () => {
    if (window.confirm('Delete this routine?')) {
      deleteSingleRoutine(routineObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }} className="routine-card">
      <Card.Body>
        <Card.Title>{routineObj.routineName} </Card.Title>
        <Link href={`/routine/${routineObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Button onClick={deleteThisRoutine} className="routine-delete">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

RoutineCard.propTypes = {
  routineObj: PropTypes.shape({
    routineName: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
