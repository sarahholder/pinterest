import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPins = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json`)
    .then((response) => {
      const demPins = response.data;
      const pins = [];
      Object.keys(demPins).forEach((pinId) => {
        demPins[pinId].id = pinId;
        pins.push(demPins[pinId]);
      });
      resolve(pins);
    })
    .catch((err) => reject(err));
});

const getPinsByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      const demPins = response.data;
      const pins = [];
      if (demPins) {
        Object.keys(demPins).forEach((pinId) => {
          demPins[pinId].id = pinId;
          pins.push(demPins[pinId]);
        });
      }
      resolve(pins);
    })
    .catch((err) => reject(err));
});
const getSinglePin = (pinId) => axios.get(`${baseUrl}/pins/${pinId}.json`);

const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

const addPin = (newPin) => axios.post(`${baseUrl}/pins.json`, newPin);

const updatePin = (pinId, modifiedPin) => axios.put(`${baseUrl}/pins/${pinId}.json`, modifiedPin);

export default {
  getPins,
  getPinsByBoardId,
  deletePin,
  addPin,
  updatePin,
  getSinglePin,
};
