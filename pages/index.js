/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getRoutines } from '../utils/data/routineData';
import { useAuth } from '../utils/context/authContext';
import RoutineCard from '../components/RoutineCard';

function Home() {
  const [routines, setRoutines] = useState([]);

  const { user } = useAuth();

  const getAllRoutines = () => {
    getRoutines(user.uid).then(setRoutines);
  };

  useEffect(() => {
    getAllRoutines();
  }, []);

  return (
    <div>
      <h1>Welcome back, {user.displayName}</h1>
      {routines.map((routine) => (
        <RoutineCard key={routine.firebaseKey} routineObj={routine} onUpdate={getAllRoutines} />
      ))}
    </div>
  );
}

export default Home;
