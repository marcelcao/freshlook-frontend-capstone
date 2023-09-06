import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const getProdByRoutine = (routineId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/routineproducts.json?orderBy="routineId"&equalTo="${routineId}"`, {
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

const getProdById = (productId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/routineproducts.json?orderBy="firebaseKey"&equalTo="${productId}"`, {
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

const addProdToRoutine = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/routineproducts.json`, {
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

const updateRoutineProduct = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/routineproducts/${payload.firebaseKey}.json`, {
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

const getSingleRoutProd = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/routineproducts/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteRoutProd = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/routineproducts/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getProdByRoutine,
  getProdById,
  addProdToRoutine,
  updateRoutineProduct,
  deleteRoutProd,
  getSingleRoutProd,
};
