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
      const filter = Object.values(data).filter((obj) => obj.prodType === '-NdcCch-21q60DQkS0ng');
      resolve(filter);
    })
    .catch(reject);
});

const sortSerum = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const filter = Object.values(data).filter((obj) => obj.prodType === '-NdcD6hfC1EAQW-hIeW5');
      resolve(filter);
    })
    .catch(reject);
});

const sortMoisturizer = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const filter = Object.values(data).filter((obj) => obj.prodType === '-NdcDCP6jWhykn27CmQq');
      resolve(filter);
    })
    .catch(reject);
});

const sortToner = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const filter = Object.values(data).filter((obj) => obj.prodType === '-NdcDOeToxk5mpIRCit8');
      resolve(filter);
    })
    .catch(reject);
});

const sortCream = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const filter = Object.values(data).filter((obj) => obj.prodType === '-NdcDVlatKF3fqs7RZFe');
      resolve(filter);
    })
    .catch(reject);
});

const sortEssence = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const filter = Object.values(data).filter((obj) => obj.prodType === '-NdcDazKZ-Sfspn7YyTf');
      resolve(filter);
    })
    .catch(reject);
});

const sortLotion = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const filter = Object.values(data).filter((obj) => obj.prodType === '-NdcDjeiB6MdORGNDBlh');
      resolve(filter);
    })
    .catch(reject);
});

const sortOil = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const filter = Object.values(data).filter((obj) => obj.prodType === '-NdcDqZWZ_zl-tmaqIr_');
      resolve(filter);
    })
    .catch(reject);
});

const sortExfoliant = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const filter = Object.values(data).filter((obj) => obj.prodType === '-NdcE5eUuhdlXlrYlcDw');
      resolve(filter);
    })
    .catch(reject);
});

const sortSunscreen = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const filter = Object.values(data).filter((obj) => obj.prodType === '-NdcECvX251mOsPlg1Wq');
      resolve(filter);
    })
    .catch(reject);
});

const sortMask = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const filter = Object.values(data).filter((obj) => obj.prodType === '-NdcEMhsUnpNRPimaMTO');
      resolve(filter);
    })
    .catch(reject);
});

const sortRemover = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const filter = Object.values(data).filter((obj) => obj.prodType === '-NdcEauvowdMvuOivYyG');
      resolve(filter);
    })
    .catch(reject);
});

const sortTreatment = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const filter = Object.values(data).filter((obj) => obj.prodType === '-NdcF_h-vxzo_jclBewR');
      resolve(filter);
    })
    .catch(reject);
});

export {
  getProductTypes,
  getSingleProductType,
  viewProductType,
  sortCleanser,
  sortSerum,
  sortMoisturizer,
  sortToner,
  sortCream,
  sortEssence,
  sortLotion,
  sortOil,
  sortExfoliant,
  sortSunscreen,
  sortMask,
  sortRemover,
  sortTreatment,
};
