import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoards = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${uid}"`)
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


const deleteBoard = (boardId) => axios.delete(`${baseUrl}/boards/${boardId}.json`);

const addBoard = (newBoard) => axios.post(`${baseUrl}/boards.json`, newBoard);

export default { getBoards, deleteBoard, addBoard };
