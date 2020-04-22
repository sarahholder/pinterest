import firebase from 'firebase/app';
import 'firebase/auth';
import pins from '../../helpers/data/pinsData';
import utils from '../../helpers/utils';
import showEditPinModal from '../editPins/editPins';
import buildPins from '../buildPins/buildPins';
import './pins.scss';

const boardsDiv = $('#boards');
const navHeadingBoardsDiv = $('#navHeadingBoards');
const navHeadingPinsDiv = $('#navHeadingPins');
const pinsDiv = $('#pins');


const closePinsView = (e) => {
  e.preventDefault();
  boardsDiv.removeClass('hide');
  navHeadingPinsDiv.addClass('hide');
  navHeadingBoardsDiv.removeClass('hide');
  pinsDiv.addClass('hide');
};

const deletePinEvent = (e) => {
  const selectedPin = e.target.closest('.card').id;
  const selectedBoardId = e.target.closest('.card-body').id;

  pins.deletePin(selectedPin)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printPins(selectedBoardId);
    })
    .catch((err) => console.error('cannot delete pin', err));
};

const makeAPin = (e) => {
  const selectedBoardId = e.target.closest('.form').id;
  e.preventDefault();
  console.log('this is the selected board . form id', selectedBoardId);
  const newPin = {
    boardId: selectedBoardId,
    name: $('#add-pin-name').val(),
    imageUrl: $('#add-pin-img').val(),
  };
  pins.addPin(newPin)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printPins(selectedBoardId);
    })
    .catch((err) => console.error('could not add pin', err));
};

const editAPin = (e) => {
  const thisIsIt = e.target.closest('.modal-body').id;
  const boardIdVal = $('#edit-pin-board-id').val();
  console.log('this is it');
  e.preventDefault();
  const { uid } = firebase.auth().currentUser;
  const userId = uid;
  const modifiedPin = {
    boardId: boardIdVal,
    name: $('#edit-pin-name').val(),
    imageUrl: $('#edit-pin-img').val(),
    uid: userId,
  };
  pins.updatePin(thisIsIt, modifiedPin)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printPins(boardIdVal);
    })
    .catch((err) => console.error('could not update pin', err));
};

const showPinModalEvent = (e) => {
  e.preventDefault();
  const selectedPinId = e.target.closest('.card').id;
  showEditPinModal.showPinModal(selectedPinId);
  console.log('showPinModalEvent .card', selectedPinId);
};

const printPins = (boardId) => {
  pins.getPinsByBoardId(boardId)
    .then((response) => {
      const selectedPins = response;
      let domString = '';
      domString += `
      <i id="floater" class="m-3 goBack far fa-arrow-alt-circle-left float-left fa-2x"></i>
      <div class="accordion" id="accordionExample2">
        <h2 class="mb-0">
          <button class="btn" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          <i class="fas fa-plus-circle"></i> add Pin</button>
        </h2>
      </div>
      <div id=${boardId} class="form m-2">
        <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample2">
          <div class= "text-left row d-flex flex-wrap justify-content-center">
            <div class="form-group col-md-4">
              <label for="add-pin-name">Pin Name:</label>
              <input type="text" class="form-control" id="add-pin-name" placeholder="add pin name here">
            </div>
            <div class="form-group col-md-4">
              <label for="add-pin-img">Pin Image:</label>
              <input type="text" class="form-control" id="add-pin-img" placeholder="add pin image link here">
            </div>
          </div>
          <button id="addPin" type="submit" class="btn btn-danger">Submit</button>
        </div>
      </div>
      <div class="modal fade" id="exampleModal2" role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
        <div id="printPinModal" class="modal-dialog" role="document" appendTo="body">
        <div id="${selectedPins.name}" class="selected-pin">
        </div>
        </div>
      </div>
      `;
      domString += '<div class="card-columns justify-content-center ml-5 mr-5">';
      selectedPins.forEach((selectedPin) => {
        domString += buildPins.buildPins(selectedPin);
      });
      domString += '<div>';
      utils.printToDom('pins', domString);
    })
    .catch((err) => console.error('Problem with printPins', err));
};
const pinsClickEvents = () => {
  $('body').on('click', '.goBack', closePinsView);
  $('body').on('click', '.delete-pin', deletePinEvent);
  $('body').on('click', '#addPin', makeAPin);
  $('body').on('click', '#edit-a-pin', showPinModalEvent);
  $('body').on('click', '#save-pin-edit', editAPin);
};

export default {
  printPins,
  closePinsView,
  showPinModalEvent,
  editAPin,
  makeAPin,
  pinsClickEvents,
};
