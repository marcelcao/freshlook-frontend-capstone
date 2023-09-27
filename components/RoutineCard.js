/* eslint-disable @next/next/no-img-element */
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
    <Card className="routine-card">
      <Card.Body>
        <div className="routcard-contain">
          <Card.Title>{routineObj.routineName} </Card.Title>
          <div className="routcard-btns">
            <Link href={`/routine/${routineObj.firebaseKey}`} passHref>
              <Button variant="primary" className="m-2">
                <img src="/icons/viewicon.png" alt="view button" className="card-icon" />
              </Button>
            </Link>
            <Link href={`/routine/${routineObj.firebaseKey}`} passHref>
              <Button variant="primary" className="m-2">
                <img src="/icons/editicon.png" alt="edit button" className="card-icon" />
              </Button>
            </Link>
            <Button onClick={deleteThisRoutine} className="routine-delete">
              <img src="/icons/trashicon.png" alt="delete button" className="card-icon" />
            </Button>
          </div>
        </div>
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
