import firebase from 'firebase/app';
import 'firebase/auth';
import boardsComponent from '../../components/boards/boards';
import pinsComponent from '../../components/pins/pins';

const authDiv = $('#auth');
const boardsDiv = $('#boards');
const logoutButton = $('#navbar-logout-button');
const navHeadingDiv = $('#navHeading');
const navHeadingBoardsDiv = $('#navHeadingBoards');
const navHeadingPinsDiv = $('#navHeadingPins');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.addClass('hide');
      boardsDiv.removeClass('hide');
      logoutButton.removeClass('hide');
      navHeadingDiv.addClass('hide');
      navHeadingBoardsDiv.removeClass('hide');
      navHeadingPinsDiv.addClass('hide');
      boardsComponent.printBoards();
      pinsComponent.printPins();
    } else {
      authDiv.removeClass('hide');
      boardsDiv.addClass('hide');
      navHeadingDiv.removeClass('hide');
      navHeadingBoardsDiv.addClass('hide');
      logoutButton.addClass('hide');
      navHeadingPinsDiv.addClass('hide');
    }
  });
  boardsComponent.boardsClickEvents();
  pinsComponent.pinsClickEvents();
};
export default { checkLoginStatus };
