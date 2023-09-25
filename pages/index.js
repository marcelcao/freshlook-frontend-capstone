/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getRoutines } from '../utils/data/routineData';
import { useAuth } from '../utils/context/authContext';
import RoutineCard from '../components/RoutineCard';
import RoutineModal from '../components/RoutineModal';
import SearchBar from '../components/SearchBar';

function Home() {
  const [routines, setRoutines] = useState([]);
  const [showRoutines, setShowRoutines] = useState([]);

  const { user } = useAuth();

  const getAllRoutines = () => {
    getRoutines(user.uid).then(setRoutines);
  };

  useEffect(() => {
    getAllRoutines();
  }, []);

  useEffect(() => {
    setShowRoutines(routines);
  }, [routines]);

  const filterResult = (query) => {
    const filter = routines.filter((routine) => routine.routineName.toLowerCase().includes(query));
    setShowRoutines(filter);
  };

  return (
    <>
      <div className="index-contain">
        <div className="index-items">
          <div>
            <div className="index-head">
              <h1 className="user-welcome">Your Routines</h1>
              <RoutineModal />
            </div>
            <div className="search-rout">
              <SearchBar onChange={(query) => filterResult(query)} />
            </div>
          </div>
          <div className="routine-cards-contain">
            {showRoutines.map((routine) => (
              <RoutineCard key={routine.firebaseKey} routineObj={routine} onUpdate={getAllRoutines} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
