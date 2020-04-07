import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';
import buildBoardsComp from '../buildBoards/buildBoards';
import './boards.scss';
import singleBoard from '../pins/pins';

const boardsDiv = $('#boards');
const navHeadingBoardsDiv = $('#navHeadingBoards');
const navHeadingPinsDiv = $('#navHeadingPins');

const boardEvent = (e) => {
  const selectedBoardId = e.target.closest('.card').id;
  console.error('Selected Board Id is: ', selectedBoardId);
  boardsDiv.addClass('hide');
  navHeadingBoardsDiv.addClass('hide');
  singleBoard.printPins(selectedBoardId);
  navHeadingPinsDiv.removeClass('hide');
};

const printBoards = () => {
  const { uid } = firebase.auth().currentUser;
  boardData.getBoards(uid)
    .then((boards) => {
      let domString = '';
      domString += '<h2 class="text-center"></h2>';
      domString += '<div class="card-columns justify-content-center m-5">';
      boards.forEach((board) => {
        domString += buildBoardsComp.buildBoards(board);
      });
      domString += '</div>';
      utils.printToDom('boards', domString);
      $('body').on('click', '.board', boardEvent);
    })
    .catch((err) => console.error('problem with printBoards', err));
};

export default { printBoards, boardEvent };
