import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoards = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json`)
    .then((response) => {
      const gotBoards = response.data;
      const boards = [];
      if (gotBoards) {
        Object.keys(gotBoards).forEach((boardId) => {
          gotBoards[boardId].id = boardId;
          boards.push(gotBoards[boardId]);
        });
      }
      resolve(boards);
    })
    .catch((err) => reject(err));
});
export default { getBoards };
