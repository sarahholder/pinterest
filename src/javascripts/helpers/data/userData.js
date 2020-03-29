import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getUsers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json`)
    .then((response) => {
      const gotUsers = response.data;
      const users = [];
      Object.keys(gotUsers).forEach((userId) => {
        gotUsers[userId].id = userId;
        users.push(gotUsers[userId]);
      });
      resolve(users);
    })
    .catch((err) => reject(err));
});

const getUserById = (userId) => axios.get(`${baseUrl}/users/${userId}.json`);

export default { getUsers, getUserById };
