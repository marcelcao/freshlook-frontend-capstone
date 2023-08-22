import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const getRoutines = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/routines.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createRoutines = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/routines.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleRoutine = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/routines/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleRoutine = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/routines/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateRoutine = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/routines/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getRoutines,
  createRoutines,
  getSingleRoutine,
  deleteSingleRoutine,
  updateRoutine,
};
