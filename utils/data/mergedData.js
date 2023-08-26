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
  fetch(`${endpoint}/routineproducts.json?orderBy="productId"&equalTo="${productId}"`, {
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

const getRoutineProducts = (routineId) => new Promise((resolve, reject) => {
  console.warn(routineId);
  getProdByRoutine(routineId)
    .then((productId) => {
      getProdById(productId)
        .then((prodsArray) => {
          resolve({ ...productId, products: prodsArray });
          console.warn(prodsArray);
          console.warn(productId);
        });
    }).catch((error) => reject(error));
});

export {
  getProdByRoutine,
  getProdById,
  addProdToRoutine,
  updateRoutineProduct,
  getRoutineProducts,
};
