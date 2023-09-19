import { clientCredentials } from '../client';
import { getSingleProduct } from './productData';

const endpoint = clientCredentials.databaseURL;

const getProductTypes = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/types.json`, {
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

const getSingleProductType = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/types/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const viewProductType = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleProduct(firebaseKey)
    .then((prodObj) => {
      getSingleProductType(prodObj.prodType)
        .then((typeObj) => {
          resolve({ typeObj, ...prodObj });
        });
    }).catch((error) => reject(error));
});

const sortCleanser = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const cleansers = Object.values(data).filter((obj) => obj.prodType === '-NdcCch-21q60DQkS0ng');
      resolve(cleansers);
    })
    .catch(reject);
});

export {
  getProductTypes,
  getSingleProductType,
  viewProductType,
  sortCleanser,
};
