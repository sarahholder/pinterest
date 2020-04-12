import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';
import buildBoardsComp from '../buildBoards/buildBoards';
import singleBoard from '../pins/pins';
import pinsData from '../../helpers/data/pinsData';
import showModal from '../editBoard/editBoard';

import './boards.scss';

const boardsDiv = $('#boards');
const navHeadingBoardsDiv = $('#navHeadingBoards');
const navHeadingPinsDiv = $('#navHeadingPins');

const boardEvent = (e) => {
  const selectedBoardId = e.target.closest('.card').id;
  boardsDiv.addClass('hide');
  navHeadingBoardsDiv.addClass('hide');
  singleBoard.printPins(selectedBoardId);
  navHeadingPinsDiv.removeClass('hide');
  $('#pins').removeClass('hide');
};

const deleteBoardEvent = (e) => {
  const selectedBoardId = e.target.closest('.card').id;
  boardData.deleteBoard(selectedBoardId)
    .then(() => {
      pinsData.getPinsByBoardId(selectedBoardId)
        .then((selectedPins) => {
          selectedPins.forEach((pin) => {
            pinsData.deletePin(pin.id);
          });
          // eslint-disable-next-line no-use-before-define
          printBoards();
        })
        .catch((err) => console.error('cannot delete entire board', err));
    });
};

const makeABoard = (e) => {
  e.preventDefault();
  // make a new board
  const { uid } = firebase.auth().currentUser;
  const userId = uid;
  const newBoard = {
    name: $('#add-board-title').val(),
    description: $('#add-board-desc').val(),
    img: $('#add-board-img').val(),
    uid: userId,
  };
  // save to firebase
  boardData.addBoard(newBoard)
    .then(() => {
      // reprint boards
      // eslint-disable-next-line no-use-before-define
      printBoards();
    })
    .catch((err) => console.error('could not add board', err));
};

const editABoard = (e) => {
  e.preventDefault();
  const { uid } = firebase.auth().currentUser;
  const userId = uid;
  const boardId = e.target.closest('.modal-footer').id;
  const modifiedBoard = {
    name: $('#edit-board-name').val(),
    description: $('#edit-board-desc').val(),
    img: $('#edit-board-img').val(),
    uid: userId,
  };
  boardData.updateBoard(boardId, modifiedBoard)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printBoards(boardId);
    })
    .catch((err) => console.error('could not update board', err));
  console.error('this is the board Id', boardId);
};

const showModalEvent = (e) => {
  e.preventDefault();
  const boardId = e.target.closest('.card').id;
  showModal.showModal(boardId);
};

const printBoards = () => {
  const { uid } = firebase.auth().currentUser;
  boardData.getBoards(uid)
    .then((boards) => {
      let domString = '';
      domString += `
      <div class="accordion" id="accordionExample">
      <h2 class="mb-0">
        <button class="btn" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        <i class="fas fa-plus-circle"></i> add Board</button>
      </h2>
      </div>
      <div class="form">
        <div id="collapseOne" class="collapse m-2" aria-labelledby="headingOne" data-parent="#accordionExample">
          <div class= "text-left row d-flex flex-wrap">
            <div class="form-group col-md-4">
              <label for="add-board-title">Board Title:</label>
              <input type="text" class="form-control" id="add-board-title" placeholder="add board title here">
            </div>
            <div class="form-group col-md-4">
              <label for="add-board-desc">Board Description:</label>
              <input type="text" class="form-control" id="add-board-desc" placeholder="add board description here">
            </div>
            <div class="form-group col-md-4">
              <label for="add-board-img">Board Image:</label>
              <input type="text" class="form-control" id="add-board-img" placeholder="add board image link here">
            </div>
          </div>
          <button id="addBoard" type="submit" class="btn btn-danger">Submit</button>
        </div>  
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div id="printModal" class="modal-dialog" role="document" appendTo="body">
          </div>
        </div>
      </div>`;
      domString += '<div class="card-columns justify-content-center">';
      boards.forEach((board) => {
        domString += buildBoardsComp.buildBoards(board);
      });
      domString += '</div>';
      utils.printToDom('boards', domString);
      $('body').on('click', '.show-pins', boardEvent);
      $('body').on('click', '.delete-btn', deleteBoardEvent);
      $('body').on('click', '#addBoard', makeABoard);
      $('body').on('click', '#edit-a-board', showModalEvent);
      $('body').on('click', '#save-board-edit', editABoard);
    })
    .catch((err) => console.error('problem with printBoards', err));
};

export default {
  printBoards,
  boardEvent,
  makeABoard,
  showModalEvent,
  editABoard,
};
