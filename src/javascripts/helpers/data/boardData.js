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

const getSingleBoard = (boardId) => axios.get(`${baseUrl}/boards/${boardId}.json`);

const deleteBoard = (boardId) => axios.delete(`${baseUrl}/boards/${boardId}.json`);

const addBoard = (newBoard) => axios.post(`${baseUrl}/boards.json`, newBoard);

const updateBoard = (boardId, modifiedBoard) => axios.put(`${baseUrl}/boards/${boardId}.json`, modifiedBoard);

export default {
  getBoards,
  deleteBoard,
  addBoard,
  getSingleBoard,
  updateBoard,
};
